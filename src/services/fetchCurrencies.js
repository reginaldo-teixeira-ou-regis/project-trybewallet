const fetchCurrencies = async () => {
  const fetchCurr = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesJson = await fetchCurr.json();
  const currencies = Object
    .keys(currenciesJson)
    .map((coins) => coins)
    .filter((coins) => coins !== 'USDT');
  return currencies;
};

export default { fetchCurrencies };
