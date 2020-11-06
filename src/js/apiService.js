const BASE_URL = 'https://pixabay.com/api';
export default {
  page: 1,
  query: '',
  key: '19007608-e874a299d8f055128ef720218',
  fetchImages() {
    return fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.key}`,
    )
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      })
      .catch(error => console.warn(error));
  },

  get serchQuery() {
    return this.query;
  },
  set serchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
