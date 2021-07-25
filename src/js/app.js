import countryCardTpl from '../templates/country.hbs';
import API from './fetchCountries';
const debounce = require('lodash.debounce');

const refs = {
  inputEl: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryContainer: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  refs.countryContainer.innerHTML = '';

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery).then(renderCardCountry).catch(onFetchError);
}

function renderCardCountry(country) {
  const markup = countryCardTpl(country[0]);
  refs.countryContainer.innerHTML = markup;
}

function onFetchError() {
  alert('Упс, что-то пошло не так и мы не нашли вашу страну');
}
