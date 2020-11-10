import { notification } from "antd";
import Axios, { AxiosError } from "axios";

Axios.defaults.baseURL = "http://localhost:8080";

Axios.interceptors.request.use((req) => {
    console.info("Request: ", req);
    return req;
});

Axios.interceptors.response.use(
    (res) => {
        console.info("Response: ", res);
        return res;
    },
    (err: AxiosError) => {
        notification.open({
            type: "error",
            message: err.message,
        });
        return Promise.reject(err);
    }
);

export default Axios;
