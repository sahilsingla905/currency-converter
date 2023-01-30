import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { ExchangeHistory } from "../components/data-display/ExchangeHistory";
import { ConversionSection } from "../components/data-display/ConversionSection";


export const CurrencyConversion = () => {
  let { from = "EUR", to = "INR", value = 1 } = useParams();
  const [toCurrency, setToCurrency] = useState(to);
  const [fromCurrency, setFromCurrency] = useState(from);
  const [currencySymbols, setCurrencySymbols] = useState({});
  const [showExchangeHistory, setShowExchangeHistory] = useState(false);

  useEffect(()=> {
    const getCurrenySymbols = async () => {
      const symbols = await fetch("https://api.exchangerate.host/symbols");
      const symbolList = await symbols.json();
      setCurrencySymbols(symbolList.symbols);
    }
    getCurrenySymbols();
  }, []);

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    const currencyInputName = e.target.name;

    switch(currencyInputName) {
      case "toCurrency":
        setToCurrency(currency)
        break;
      case "fromCurrency":
        setFromCurrency(currency)
        break;
      default:

    }
  }

  const handleCurrencySwap = () => {
    const toVal = toCurrency;
    setToCurrency(fromCurrency);
    setFromCurrency(toVal);
  }

  return (
    <>
      <ConversionSection
        toCurrency={toCurrency}
        setToCurrency={setToCurrency}
        setFromCurrency={setFromCurrency}
        fromCurrency={fromCurrency}
        handleCurrencySwap={handleCurrencySwap}
        handleCurrencyChange={handleCurrencyChange}
        value={value}
        currencySymbols={currencySymbols}
        displayExchangeHistory={setShowExchangeHistory}
      />
      { showExchangeHistory && (<ExchangeHistory
        toCurrency={toCurrency}
        fromCurrency={fromCurrency}
        currencySymbols={currencySymbols}
      />)}
    </>
  );
}
