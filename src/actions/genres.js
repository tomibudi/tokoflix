import axios from 'axios'

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const ALL_GENRES = () => {
    return {
        type : "ALL_GENRES",
        payload : axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    }
}
