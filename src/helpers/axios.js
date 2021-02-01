import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        'X-RapidAPI-Key': 'a70717e713mshc229ac03e65f214p145a84jsne4c0a2d3a26b',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'useQueryString': true
    }
})
