import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images, shouldAppend = false) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <div class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </div>
          <div class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </div>
          <div class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </div>
          <div class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </div>
        </div>
      </li>
    `
    )
    .join('');

  if (shouldAppend) {
    galleryContainer.insertAdjacentHTML('beforeend', markup);
  } else {
    galleryContainer.innerHTML = markup;
  }
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}