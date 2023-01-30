import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment';

import { Table } from "../components/data-display/Table";
import { useLocalStorage } from "../hooks/useLocalStorage";

function ConversionHistory() {
  const [history, setHistory] = useLocalStorage("history", {});
  const [activeRow, setActiveRow] = useState(null);
  
  const tableData = useMemo(() => {
    return Object.keys(history).map((row) => {
      return {
        date: history[row].date,
        event: `Converted an amount of ${history[row].amount}
          from ${history[row].fromCurrency} to ${history[row].toCurrency}`,
      };
    })
  }, [history]);

  const setActiveClass = (row) => {
    if (activeRow === row.index) {
      return "active"
    }
    return "active";
  }

  const handleDeleteHistory = useCallback((row) => {
    const key = new Date(row.values.date).valueOf()
    const removeKey = (key, { [key]: _, ...rest }) => rest;
    setHistory(prev => removeKey(key, prev));
  }, [setHistory]);

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props) => {
          const displayFormat = moment(props.value).format("DD/MM/YYYY @ hh:mm");
          return displayFormat;
        },
      },
      {
        Header: 'Event',
        accessor: 'event',
      },
      {
        Header: 'Actions',
        accessor: 'action',
        Cell: (props) => {
          const key = new Date(props.row.values.date).valueOf();
          return (
            <div className="flex items-center justify-center invisible min-w-full gap-5 actions">
              <Link
                to={`/conversion/${history[key].fromCurrency}/${history[key].toCurrency}/${history[key].amount}`}
                className="font-bold text-teal"
              >
                <RemoveRedEyeIcon className="mr-2 align-top" />
                View
              </Link>
              <Button
                className="!text-red !font-bold !normal-case"
                onClick={() => handleDeleteHistory(props.row)}>
                  <DeleteForeverIcon className="mr-2 align-top" />
                  Delete from history
              </Button>
            </div>
          );
        },
      },
    ],
    [handleDeleteHistory, history]
  )

  return (
    <div className="px-40 py-20">
      <h2 className="mb-12">Conversion History</h2>
      <Table data={tableData} columns={columns} rowProps={(row) => ({
        onMouseEnter: () => setActiveRow(row.index),
        onMouseLeave: () => setActiveRow(null),
        className: setActiveClass(row),
      })} className="w-full" />
    </div>
  );
}

export default ConversionHistory;
