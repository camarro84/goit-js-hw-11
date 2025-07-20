import axios from 'axios';

const API_KEY = '39125776-01859ab612adb3a8e49b815c3';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, per_page = 40) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 20,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}