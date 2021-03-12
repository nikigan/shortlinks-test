import axios from "axios";

const instance = axios.create({
    baseURL: "http://shortlinks.loc/api/",
    headers: {
        'Accept': 'application/json'
    }
});

instance.interceptors.response.use(
    (response) => {
        return response;
    }
);

export default instance;
