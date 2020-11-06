import imageSearch from './apiService';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import imageCard from '../templates/image-card.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  button: document.querySelector('button[data-action="load-more"]'),
  image: document.querySelector('#gallery_image'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.button.addEventListener('click', loadMoreСards);
refs.gallery.addEventListener('click', showOriginImage);

function showOriginImage(event) {
  const instance = basicLightbox.create(`
     <img src="${event.target.dataset.source}" width="100%">
 `);

  instance.show();
  console.log(event.target.dataset.source);
}

function searchFormSubmitHandler(e) {
  e.preventDefault();

  imageSearch.page;

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  imageSearch.resetPage();
  imageSearch.serchQuery = input.value;
  fetchImages();

  input.value = '';
}

function fetchImages() {
  imageSearch
    .fetchImages()
    .then(images => {
      insertListItems(images);
    })
    .catch(error => console.warn(error));
}

function insertListItems(images) {
  const markup = imageCard(images);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

function loadMoreСards() {
  if (imageSearch.page > 1) {
    imageSearch.fetchImages().then(images => {
      insertListItems(images);
      window.scrollTo({
        top: window.scrollY + 600,
        behavior: 'smooth',
      });
    });
  }
}
