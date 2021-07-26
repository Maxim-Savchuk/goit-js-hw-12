import getRefs from './getRefs';
import API from './fetchCountries';
import countryInfoTpl from '../templates/country.hbs';
import countryListTpl from '../templates/countries-list.hbs';

import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const refs = getRefs();
const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery).then(renderCardCountry).catch(onFetchError);
}

function renderCardCountry(country) {
  if (country.length === 1) {
    const markup = countryInfoTpl(country[0]);
    refs.countryInfo.insertAdjacentHTML('beforeend', markup);
  } else if (country.length >= 2 && country.length <= 10) {
    const markup = countryListTpl(country);
    refs.countryList.insertAdjacentHTML('beforeend', markup);
  } else if (country.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
