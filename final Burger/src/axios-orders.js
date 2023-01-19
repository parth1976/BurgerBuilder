import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://raect-my-burger-58009-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

export default instance; 