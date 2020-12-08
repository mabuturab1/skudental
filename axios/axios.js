import axios from 'axios';
const AUTH_TOKEN = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
export default axios;
