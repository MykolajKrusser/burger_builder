import axios from 'axios';

const instance = axios.create({
    baseURL:"https://burger-app-4c52d.firebaseio.com/"
})

export default instance;