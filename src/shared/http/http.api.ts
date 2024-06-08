import axios from 'axios';

export const localStorageAccessTokenKey = 'access_token';

const $authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/${
    import.meta.env.VITE_API_BASE_URL_TYPE
  }`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem(localStorageAccessTokenKey),
  },
  withCredentials: true,
});

export { $authApi };
