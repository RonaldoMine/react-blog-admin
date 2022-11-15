import axios from "axios";

const request = (url, type, datas = null) => {
    const user = JSON.parse(localStorage.getItem("auth"));
    let config = null;
    if (user){
        config = {
            headers: {
                "Authorization": "Bearer "+user.token
            }
        }
    }
    switch (type) {
        case "delete":
            return axios.delete(url, config);
        case 'get':
            return axios.get(url, config);
        case 'patch':
            return axios.patch(url, datas, config);
        case 'put':
            return axios.put(url, datas, config);
        default:
            return axios.post(url, datas, config);
    }
}
export default request;