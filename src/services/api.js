import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
export const getFetch = async (query, page) => {
  const params = {
    q: query,
    page: page,
    key: '32908918-e7cc5cba0888a51be5caa34d0',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };
  const { data } = await axios.get('/', { params });
  const hits = data.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
    return { id, webformatURL, largeImageURL, tags };
  });
  return { hits: hits, totalHits: data.totalHits };
};
