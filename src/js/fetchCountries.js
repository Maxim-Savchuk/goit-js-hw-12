const BASE_URL = 'https://restcountries.eu/rest/v2';

async function fetchCountries(name) {
  const response = await fetch(
    `${BASE_URL}/name/${name}?fields=name;capital;population;flag;languages`,
  );

  if (!response.ok) {
    const status = await Promise.reject(response.status);
    return status;
  }

  const country = await response.json();
  return country;
}

export default { fetchCountries };
