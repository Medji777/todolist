import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: 'https://repetitora.net/api/JS/Tasks/'
});

export default axios