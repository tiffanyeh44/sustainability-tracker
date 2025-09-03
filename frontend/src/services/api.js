import axios from 'axios';

// Axios helper for backend Django REST endpoints
const API_BASE_URL = 'http://localhost:8000/api/actions/';

export const getActions = () => axios.get(API_BASE_URL);

export const addAction = (action) => axios.post(API_BASE_URL, action);

export const updateAction = (id, action) => axios.put(`${API_BASE_URL}${id}/`, action);

export const deleteAction = (id) => axios.delete(`${API_BASE_URL}${id}/`);
