import axios from 'axios';

export const makeRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});
