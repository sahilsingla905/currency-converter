import { useState, useEffect, useMemo } from "react";

import moment from 'moment';

import { SelectField } from "../input-and-actions/SelectField";
import { Table } from "./Table";

import { isValidCurrency } from "../../utils/isValidCurrency";

const durationList = [
  {
    label: "7 days",
    value: 7,
  },
  {
    label: "14 days",
    value: 14,
  },
  {
    label: "30 days",
    value: 30,
  },
];
const DATE_FORMAT = "YYYY-MM-DD";
const DISPLAY_DATE_FORMAT = "DD/MM/YYYY";
export const ExchangeHistory = ({toCurrency, fromCurrency, currencySymbols }) => {
  const [duration, setDuration] = useState(7);
  const [summaryData, setSummaryData] = useState({});
  const [historyRates, setHistoryRates] = useState({});
  const [startDate, setStartDate] = useState(() => {
    return moment().subtract(duration, "days").format(DATE_FORMAT);
  });
  
  useEffect(()=> {
    const endDate = moment().format(DATE_FORMAT);
    const getRatesHistoryData = async () => {
      const rates = await fetch(`https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&symbols=${toCurrency}&base=${fromCurrency}`);
      const ratesHistory = await rates.json();
      setHistoryRates(ratesHistory.rates);
    }
    if (isValidCurrency(toCurrency, fromCurrency, currencySymbols)) {
      getRatesHistoryData();
    }
  }, [fromCurrency, toCurrency, startDate, currencySymbols]);

  const handleDurationChange = (e) => {
    const currentDuration = e.target.value;
    const startDate = moment().subtract(currentDuration, "days").format(DATE_FORMAT);
    setStartDate(startDate);
    setDuration(currentDuration);
  }

  const tableData = useMemo(() => {
    if (!isValidCurrency(toCurrency, fromCurrency, currencySymbols)) {
      return [];
    }
    let lowest = Number.MAX_SAFE_INTEGER;
    let highest = Number.MIN_SAFE_INTEGER;
    let sum = 0; 
    const rates = Object.keys(historyRates).map((date) => {
      lowest = Math.min(lowest, historyRates[date][toCurrency]) || lowest;
      highest = Math.max(highest, historyRates[date][toCurrency]) || highest;
      sum += historyRates[date][toCurrency] || 0;
      return {
        date: moment(date).format(DISPLAY_DATE_FORMAT),
        rate: historyRates[date][toCurrency] || 0,
      };
    });
    
    const average = sum / duration;
    setSummaryData({
      lowest,
      highest,
      average,
    })
    return rates;
  }, [currencySymbols, duration, fromCurrency, historyRates, toCurrency]);
  
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date', // accessor is the "key" in the data
      },
      {
        Header: 'Exchange Rate',
        accessor: 'rate',
      },
    ],
    []
  )

  return (
    <>
      <div className="px-40 py-20">
        <h2 className="mb-12">Exchange History</h2>
        <div>
          <SelectField
            label="Duration"
            name="duration"
            defaultValue={duration}
            handleChange={handleDurationChange}
            options={durationList}
            containerClass="flex flex-col mx-3 w-3/12"
          />
          <div className="flex gap-12 mt-12">
            <Table data={tableData} columns={columns} className="w-1/2" />
            { !!Object.keys(summaryData).length &&
              (<div className="w-1/2 mt-12 bg-white shadow-lg h-max shadow-silver-500/50">
                <div className="p-3 font-bold border-b-2 border-silver">Statistics</div>
                {
                  Object.keys(summaryData).map((key) => {
                    return (
                      <div key={key} className="flex w-full border-b-2 border-silver">
                        <div className="w-1/2 p-3 capitalize">
                          {key}
                        </div>
                        <div key={key} className="w-1/2 p-3">
                          {summaryData[key]}
                        </div>
                      </div>
                    )
                  })
                }
              </div>)
            }
          </div>
        </div>
      </div>
    </>
  );
}

