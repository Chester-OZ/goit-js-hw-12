import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages, currentQuery, endOfSearchResults } from './pixabay-api';

let lightbox;
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.js-load-more');

function renderGallery(images) {
  gallery.innerHTML = images.map(image => createImageCard(image)).join('');
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });
  }
  if (images.length > 0 && images.length < 14) {
    loadMore.style.display = 'none';
  } else {
    loadMore.style.display = 'block';
  }
}

function updateGallery(images) {
  gallery.insertAdjacentHTML(
    'beforeend',
    images.map(image => createImageCard(image)).join('')
  );
  if (lightbox) {
    lightbox.refresh();
  }
}

loadMore.addEventListener('click', onLoadMore);

let page = 1;

async function onLoadMore() {
  if (!currentQuery) {
    return;
  }

  page += 1;
  showLoader();

  try {
    const images = await fetchImages(currentQuery, page);

    if (!images || images.length === 0) {
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
}

function createImageCard(image) {
  return `<li class="gallery-item">
          <div class="gallery-item-image">
          <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
          </div>
          <ul class="image-details">
            <li class="image-details-item">
              <h2 class="image-details-title">Likes</h2>
              <p class="image-details-value">${image.likes}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Views</h2>
              <p class="image-details-value">${image.views}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Comments</h2>
              <p class="image-details-value">${image.comments}</p>
            </li>
            <li class="image-details-item">
              <h2 class="image-details-title">Downloads</h2>
              <p class="image-details-value">${image.downloads}</p>
            </li>
          </ul>
        </li>`;
}

function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export {
  renderGallery,
  updateGallery,
  onLoadMore,
  showLoader,
  hideLoader,
  clearGallery,
};
