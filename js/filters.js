const filtersSection = document.querySelector('.img-filters');

const filters = {
  default : filtersSection.querySelector('#filter-default'),
  random : filtersSection.querySelector('#filter-random'),
  discussed : filtersSection.querySelector('#filter-discussed'),
};

let currentFilter = 'default';

function showFilters() {
  filtersSection.classList.remove('img-filters--inactive');
}

function setFilterClick(filterName, cb) {
  filters[filterName].addEventListener('click', () => {
    filters[currentFilter].classList.remove('img-filters__button--active');
    currentFilter = filterName;
    filters[currentFilter].classList.add('img-filters__button--active');
    cb();
  });
}

export { showFilters, setFilterClick };
