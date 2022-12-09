const fetchCurrencies = async () => {
  const fetchCurr = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesResponse = await fetchCurr.json();
  const currencies = Object
    .keys(currenciesResponse)
    .map((coins) => coins)
    .filter((coinUSDT) => coinUSDT !== 'USDT');
  console.log(currencies);
  return currencies;
};

const fetchRates = async () => {
  const fetchCurr = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencyResponse = await fetchCurr.json();
  delete currencyResponse.USDT;
  return currencyResponse;
};

export default { fetchCurrencies, fetchRates };
