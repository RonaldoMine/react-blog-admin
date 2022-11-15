import {useQuery} from "react-query";
import request from "./axios";
import {message} from "antd";

export const useQueries = (url, queryKey) => {
    return useQuery(queryKey, () => request(url, "get"), {
        onError: (error) => {
            message.error(error.response.data.message)
        }
    });
}
