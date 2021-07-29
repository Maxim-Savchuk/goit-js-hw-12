import getRefs from './getRefs';
import API from './fetchCountries';
import countryInfoTpl from '../templates/country.hbs';
import countryListTpl from '../templates/countries-list.hbs';

import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const refs = getRefs();
const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

async function onSearch(e) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  const searchQuery = e.target.value.trim();

  if (searchQuery.length === 0) {
    addClassVisuallyHidden();
    return;
  }

  try {
    const country = await API.fetchCountries(searchQuery);
    const markup = renderCardCountry(country);
    return markup;
  } catch (error) {
    onFetchError();
  }
}

function renderCardCountry(country) {
  if (country.length === 1) {
    const markup = countryInfoTpl(...country);
    refs.countryInfo.insertAdjacentHTML('beforeend', markup);
  } else if (country.length >= 2 && country.length <= 10) {
    const markup = countryListTpl(country);
    removeClassVisuallyHidden();
    refs.countryList.insertAdjacentHTML('beforeend', markup);
  } else if (country.length > 10) {
    addClassVisuallyHidden();
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function onFetchError() {
  addClassVisuallyHidden();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function addClassVisuallyHidden() {
  refs.countryList.classList.add('visually-hidden');
}

function removeClassVisuallyHidden() {
  refs.countryList.classList.remove('visually-hidden');
}
