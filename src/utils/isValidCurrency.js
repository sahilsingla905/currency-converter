export const isValidCurrency = (toCurrency, fromCurrency, currencySymbols) => {
  if (!toCurrency || !fromCurrency || toCurrency === fromCurrency || !currencySymbols[toCurrency] ||
    !currencySymbols[fromCurrency]) {
    return false;
  }
  return true;
}
