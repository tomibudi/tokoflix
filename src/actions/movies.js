import axios from 'axios'

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const ALL_MOVIES = (page) => {
    return {
        type : "ALL_MOVIES",
        payload : axios.get(`${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`)
    }
}