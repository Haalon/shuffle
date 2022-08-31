import useAxios from "../utils/useAxios";
const API_URL = 'http://127.0.0.1:8000';

export function useApi() {
    const axios = useAxios()

    const listJokes = () => {
        const url = `${API_URL}/api/jokes/`;
        return axios.get(url).then(response => response.data);
    }

    const getJoke = (pk) => {
        const url = `${API_URL}/api/jokes/${pk}/`;
        return axios.get(url).then(response => response.data);
    }

    const listCombinedJokes = () => {
        const url = `${API_URL}/api/combined_jokes/`;
        return axios.get(url).then(response => response.data);
    }

    const getCombinedJoke = (pk) => {
        const url = `${API_URL}/api/combined_jokes/${pk}/`;
        return axios.get(url).then(response => response.data);
    }

    const generateCombinedJoke = (lang, dst, src) => {
        lang = lang || 'RU';
        let url = `${API_URL}/api/combined_jokes/generate/?lang=${lang}`;
        if (dst) url += '&dst=' + dst.toString();
        if (src) url += '&src=' + src.toString()
        return axios.get(url).then(response => response.data);
    }

    const reactCombinedJoke = (pk, isPositive) => {
        const url = `${API_URL}/api/combined_jokes/${pk}/react/`;
        return axios.patch(url, {positive: isPositive}).then(response => response.data);
    }

    return {
        listJokes,
        getJoke,
        listCombinedJokes,
        getCombinedJoke,
        generateCombinedJoke,
        reactCombinedJoke
    }
}