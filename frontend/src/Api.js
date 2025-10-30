import axios from 'axios'
import React from 'react'

const Api=axios.create({
    baseURL:'https://social-app-x8zt.onrender.com/api'
})
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api