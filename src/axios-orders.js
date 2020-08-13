import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-47236.firebaseio.com/',
})

export default instance;
