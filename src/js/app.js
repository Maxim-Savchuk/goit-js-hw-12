import countryCardTpl from '../templates/countries.hbs';
import API from './fetchCountries';
const _debounce = require('lodash.debounce');

const refs = {
    inputEl: document.querySelector('#search-box'),
    countriesList: document.querySelector('.country-list'),
    countryContainer: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', _debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    
    const searchQuery = e.target.value;

    API.fetchCountries(searchQuery).then(renderCardCountry).catch(onFetchError);
}

function renderCardCountry(country) {
    const markup = countryCardTpl(country);
    refs.countryContainer.innerHTML = markup;
}

function onFetchError() {
    alert('Упс, что-то пошло не так и мы не нашли вашу страну');
}

renderCardCountry(Colombia);