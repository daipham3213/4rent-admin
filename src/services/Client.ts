import axios from 'axios';

export const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY ?? 'token_key';
export const host =
  process.env.NEXT_PUBLIC_API_HOST_URL ?? 'http://localhost/api';

const getAuthToken = () =>
  typeof window !== 'undefined' && window.localStorage.getItem(tokenKey)
    ? {
        Authorization: tokenKey,
      }
    : undefined;

export const api = axios.create({
  baseURL: host,
  withCredentials: true,
  headers: {
    ...getAuthToken(),
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/json',
  },
});

api.interceptors.response.use(
  (success) => success,
  (error) => {
    console.log(error);
    return error;
  }
);
