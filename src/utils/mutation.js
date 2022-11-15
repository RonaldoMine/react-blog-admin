import {useMutation, useQueryClient} from "react-query";
import request from "./axios";
import {message} from "antd";

export const useMutate = (url, type = 'post') => {
    return useMutation((payloads) => request(url, type, payloads), {
        onError: (error) => {
            message.error(error.response.data.message)
        }});
}

export const useMutateWithInvalidateQueries = (url, type = 'post', queryKey = null) => {
    const queryClient = useQueryClient();
    return useMutation((payloads) => request(url, type, payloads), {
        onSuccess: () => {
            return queryClient.invalidateQueries(queryKey);
        },
        onError: (error) => {
            message.error(error.response.data.message)
        },
    });
}
export const useMutateWithSetQueriesData = (url, type = 'post', queryKey = null) => {
    const queryClient = useQueryClient();
    return useMutation((payloads) => request(url, type, payloads), {
        onSuccess: (data) => {
            return queryClient.setQueryData(queryKey, data);
        },
        onError: (error) => {
            message.error(error.response.data.message)
        }
    });
}
