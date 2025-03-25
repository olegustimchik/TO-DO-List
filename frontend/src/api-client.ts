import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  headers: { 
    'ngrok-skip-browser-warning': '69420',
    'Access-Control-Allow-Credentials': true
  }
});

