import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
const per_page = 40;

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements['search-text'].value.trim();
  page = 1;

  if (!query) {
    iziToast.error({
      title: 'Ошибка',
      message: 'Поле поиска не может быть пустым!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, per_page);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Нет результатов',
        message:
          'К сожалению, нет изображений, соответствующих вашему запросу.',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
      const totalPages = Math.ceil(data.totalHits / per_page);
      if (page < totalPages) {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Ошибка',
      message: `Что-то пошло не так: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, per_page);
    createGallery(data.hits, true);
    const totalPages = Math.ceil(data.totalHits / per_page);
    if (page < totalPages) {
      showLoadMoreBtn();
    } else {
      iziToast.info({
        title: 'Конец',
        message: 'Вы достигли конца результатов поиска.',
        position: 'topRight',
      });
    }

    const { height: cardHeight } =
      galleryContainer.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Ошибка',
      message: `Что-то пошло не так: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});