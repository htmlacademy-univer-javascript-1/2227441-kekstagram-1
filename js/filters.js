const filtersSection = document.querySelector('.img-filters');
let currentFilter = 'default';

const FILTERS = {
  default: filtersSection.querySelector('#filter-default'),
  random: filtersSection.querySelector('#filter-random'),
  discussed: filtersSection.querySelector('#filter-discussed'),
};

function showFilters() {
  filtersSection.classList.remove('img-filters--inactive');
}

function setFilterClick(filterName, callback) {
  FILTERS[filterName].addEventListener('click', () => {
    FILTERS[currentFilter].classList.remove('img-filters__button--active');
    currentFilter = filterName;
    FILTERS[currentFilter].classList.add('img-filters__button--active');
    callback();
  });
}

export { showFilters, setFilterClick };
