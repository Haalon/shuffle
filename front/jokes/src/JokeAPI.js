import axios from 'axios';
const API_URL = 'http://188.32.124.25:8000';

export default class JokeAPI{

    constructor(){}

    listJokes() {
        const url = `${API_URL}/api/jokes/`;
        return axios.get(url).then(response => response.data);
    }

    getJoke(pk) {
        const url = `${API_URL}/api/jokes/${pk}/`;
        return axios.get(url).then(response => response.data);
    }

    listCombinedJokes() {
        const url = `${API_URL}/api/combined_jokes/`;
        return axios.get(url).then(response => response.data);
    }

    getCombinedJoke(pk) {
        const url = `${API_URL}/api/combined_jokes/${pk}/`;
        return axios.get(url).then(response => response.data);
    }

    generateCombinedJoke(lang) {
        lang = lang || 'RU';
        const url = `${API_URL}/api/combined_jokes/generate/?lang=${lang}`;
        return axios.get(url).then(response => response.data);
    }

    reactCombinedJoke(pk, isPositive) {
        const url = `${API_URL}/api/combined_jokes/${pk}/react/`;
        return axios.patch(url, {positive: isPositive}).then(response => response.data);
    }
}