import {
  fetchImages,
  showError,
  endOfSearchResults,
} from './js/pixabay-api.js';
import {
  renderGallery,
  updateGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const input = document.querySelector('.input');
const loadMore = document.querySelector('.js-load-more');
const gallery = document.querySelector('.gallery');
loadMore.style.display = 'none';

let page = 1;
let totalPages = 0;
let currentQuery = '';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  clearGallery();
  page = 1;
  currentQuery = input.value.trim();

  if (currentQuery.length === 0) {
    showError();
    loadMore.style.display = 'none';
    return;
  }

  showLoader();
  input.value = '';

  try {
    const { images, totalHits } = await fetchImages(currentQuery, page);
    totalPages = Math.ceil(totalHits / 21);
    renderGallery(images);

    if (totalHits === 0) {
      loadMore.style.display = 'none';
    } else if (page >= totalPages) {
      loadMore.style.display = 'none';
      endOfSearchResults();
    } else {
      loadMore.style.display = 'block';
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    hideLoader();
  }
});

loadMore.addEventListener('click', async () => {
  if (!currentQuery) return;

  page += 1;
  showLoader();

  try {
    const { images } = await fetchImages(currentQuery, page);

    if (!images || images.length === 0 || page >= totalPages) {
      hideLoader();
      endOfSearchResults();
      loadMore.style.display = 'none';
      return;
    }

    updateGallery(images);

    const lastCard = gallery.lastElementChild;
    const cardHeight = lastCard.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader();
  }
});
