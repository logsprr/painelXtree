import axios from 'axios';
const companyName = 'logsprr';
const url = `https://${companyName}.pipedrive.com/api/v1/`;

const api = axios.create({
    baseURL: url
});

export default api;