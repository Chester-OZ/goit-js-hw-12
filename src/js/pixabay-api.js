import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

let currentQuery = '';

async function fetchImages(query, page = 1) {
  currentQuery = query;
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '44613226-2c9c9ee480393e9e269050800',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 21,
  });

  try {
    const { data } = await axios(`${BASE_URL}?${params}`);
    const totalHits = data.totalHits;
    if (totalHits === 0) {
      urlError();
    } else {
      return data.hits;
    }
  } catch (error) {
    console.error(error.message);
  }
}

const optionsError = {
  icon: '',
  position: 'topRight',
  messageColor: 'white',
  close: false,
  closeOnEscape: true,
  closeOnClick: true,
  displayMode: 'replace',
};

const urlError = () =>
  iziToast.error({
    message:
      'Sorry, there are no images matching your search query. Please, try again!',
    backgroundColor: '#CB1E1E',
    ...optionsError,
  });

const showError = message =>
  iziToast.error({
    message: 'Please! Type something.',
    backgroundColor: '#CB1E1E',
    ...optionsError,
  });

const endOfSearchResults = () =>
  iziToast.error({
    message: "We're sorry, but you've reached the end of search results.",
    backgroundColor: 'blue',
    ...optionsError,
  });

export { currentQuery, fetchImages, urlError, showError, endOfSearchResults };
