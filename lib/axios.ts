import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = '/login';
      } else if (error.response.status === 500) {
        alert('Internal Server Error. Please try again later.');
      } else {
        alert('An error occurred. Please try again.');
      }
    } else if (error.request) {
      alert('Network error. Please check your internet connection.');
    } else {
      alert('An error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default instance;
