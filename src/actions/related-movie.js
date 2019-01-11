import axios from 'axios'

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export const RELATED_MOVIE = (movie_id) => {
    return {
        type : "RELATED_MOVIE",
        payload : axios.get(`${API_URL}/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
    }
}
