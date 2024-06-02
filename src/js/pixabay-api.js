'use strict';
import axios from 'axios';

async function fetchImages(query, page) {
  const apiKey = '44064586-c85ee0d0f4282a04fbc0070f7';
  //   const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
  //     query
  //   )}&image_type=photo&orientation=horizontal&safesearch=true`;
  const url = 'https://pixabay.com/api/';
  const queryParams = {
    key: apiKey,
    q: query,
    safesearch: true,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 15,
    page: page,
  };

  const config = { params: queryParams };

  console.log('url', url);
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export default fetchImages;
