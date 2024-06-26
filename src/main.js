'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import fetchImages from './js/pixabay-api';
import renderImages from './js/render-functions';

const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');

const buttonmore = document.getElementById('load_more_btn');
buttonmore.style.display = 'none';

let page = 1;
let query = '';
const handleClick = () => {
  page += 1;
  getImages(page);
};
buttonmore.addEventListener('click', handleClick);

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error:',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }
  gallery.innerHTML = '';
  page = 1;
  getImages(page);
  form.reset();
  return;
});

const getImages = async page => {
  try {
    loader.style.display = 'block';
    buttonmore.style.display = 'none';
    const response = await fetchImages(query, page);
    const images = response.hits;
    await renderImages(images);
    if (page > 1) {
      galleryScroll();
    }
    if (response.total <= page * 15) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    buttonmore.style.display = 'inline-block';
  } catch (error) {
    iziToast.error({
      title: 'Error:',
      message:
        'An error occurred while fetching images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
};

const galleryScroll = () => {
  const galleryItem = document.querySelector('.gallery-item');
  const rect = galleryItem.getBoundingClientRect();
  const scrollValue = rect.height * 2;
  window.scrollBy({
    top: scrollValue,
    left: 0,
    behavior: 'smooth',
  });
};
