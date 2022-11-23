import axios from "axios";
import {message, Modal} from "antd";

let sessionExpired = true;
const expiredSessionAction  = (reason) => {
    if (reason?.response?.status === 403) {
        Modal.warning({
            title: 'Session expirée',
            content: `Votre session a expiré, vous allez être déconnectés`,
            okButtonProps: {
                hidden: true
            }
        });
        setTimeout(() => {
            localStorage.removeItem("auth");
            sessionExpired = false;
            window.location.replace("/sign-in");
        }, 3000)
    }else{
        message.error("Une erreur est survenue, nous travaillons pour un rétablissement à la normale au plus vite");
    }
};

const request = (url, type, datas = null) => {
    if (sessionExpired){
        const user = JSON.parse(localStorage.getItem("auth"));
        let config = null;
        if (user) {
            config = {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            }
        }
        switch (type) {
            case "delete":
                return axios.delete(url, config);
            case 'get':
                return axios.get(url, config).catch(expiredSessionAction);
            case 'patch':
                return axios.patch(url, datas, config).catch(expiredSessionAction);
            case 'put':
                return axios.put(url, datas, config).catch(expiredSessionAction);
            default:
                return axios.post(url, datas, config).catch(expiredSessionAction);
        }
    }else{
        return null;
    }
}
export default request;