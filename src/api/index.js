import axios from 'axios';

const baseURL = __myapp.env.BASE_URL;

export function searchRequest(query) {
    return axios({
        method: 'GET',
        baseURL,
        url: '/search/users',
        params: {
            q: query
        }
    });
}