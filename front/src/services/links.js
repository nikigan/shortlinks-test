import axios from "./base";

export const resolveShortLink = ({ shortLink }) => axios.get(`/${shortLink}`)

export const createShortLink = ({ redirect_url, custom_shortlink, commercial, end_date}) => {
    const formData = new FormData();
    formData.append('redirect_url', redirect_url);
    formData.append('custom_shortlink', custom_shortlink);
    formData.append('commercial', +commercial);
    formData.append('end_date', end_date);

    return axios.post('/short_links', formData);
}

export const fetchLinkStatistic = ({ statisticLink }) => axios.get(`/stat/${statisticLink}`);

export const fetchAllLinksStats = () => axios.get('/stat');

export default {
    resolveShortLink,
    createShortLink,
    fetchLinkStatistic,
    fetchAllLinksStats
};
