import { useState, useMemo } from "react";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import { InputField } from "../input-and-actions/InputField/InputField";
import { SelectField } from "../input-and-actions/SelectField/SelectField";
import { Button } from "../input-and-actions/Button/Button";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { isValidCurrency } from "../../utils/isValidCurrency";

export const ConversionSection = ({
  toCurrency,
  setToCurrency,
  fromCurrency,
  setFromCurrency,
  handleCurrencyChange,
  handleCurrencySwap,
  value,
  currencySymbols,
  displayExchangeHistory
}) => {
  const [amount, setAmount] = useState(value);
  const [rate, setRate] = useState(0);
  const [conversion, setConversion] = useState(0);
  const [history, setHistory] = useLocalStorage("history", {});

  const symbolList = useMemo(() => {
    return Object.keys(currencySymbols).map((symbol) => {
      return {
        label: symbol,
        value: currencySymbols[symbol].code
      }
    })
  }, [currencySymbols])

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !isValidCurrency(toCurrency, fromCurrency, currencySymbols)) {
      return;
    }
    const conversion = await fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
    const conversionVal = await conversion.json()
    const date = new Date();
    const historyData = {
      ...history,
      [date.valueOf()]: {
        date: date,
        toCurrency,
        fromCurrency, 
        amount, 
      }
    };
    setHistory(historyData);
    setConversion(conversionVal.result);
    setRate(conversionVal.info.rate);
    displayExchangeHistory(true);
  }

  return (
    <div className="px-40 py-20 border-b-2 border-silver">
      <h1 className="mb-12">I want to convert</h1>
      <form onSubmit={handleSubmit} className="flex items-end w-full">
        <InputField
          label="Amount"
          type="number"
          name="amount"
          value={amount}
          min="1"
          handleValueChange={handleAmountChange}
          containerClass="flex flex-col w-3/12"
          className=""
        />
        <SelectField
          label="From"
          name="fromCurrency"
          defaultValue={fromCurrency}
          handleChange={handleCurrencyChange}
          options={symbolList}
          containerClass="flex flex-col mx-3 w-3/12"
        />
        <Button type="button" onClick={handleCurrencySwap} className="bg-white text-teal">
          <CompareArrowsIcon />
        </Button>
        <SelectField
          label="To"
          name="toCurrency"
          defaultValue={toCurrency}
          handleChange={handleCurrencyChange}
          options={symbolList}
          containerClass="flex flex-col mx-3 w-3/12"
        />
        <Button type="submit" className="text-white bg-teal">
          Convert
        </Button>
      </form>
      {
        !!conversion && (
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="text-5xl">
              <span>
                {amount} {fromCurrency}
              </span>
              <span className="px-5">
                =
              </span>
              <span className="font-bold text-green">
                {conversion} {toCurrency}
              </span>
            </div>
            <div className="flex flex-col py-5">
              <span>1 {fromCurrency} = {rate} {toCurrency}</span>
              <span>1 {toCurrency} = {1 / rate} {fromCurrency}</span>
            </div>
          </div>
        )
      }
    </div>
  );
}

