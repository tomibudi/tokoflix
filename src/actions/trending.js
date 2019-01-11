import axios from 'axios'

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const ALL_TRENDING = () => {
    return {
        type : "ALL_TRENDING",
        payload : axios.get(`${API_URL}/trending/all/week?api_key=${API_KEY}`)
    }
}