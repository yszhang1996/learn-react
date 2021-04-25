import request, { extend } from 'umi-request';
import { message } from "antd";
import { FormVavlues } from "./data.d";

const errorHandler = function (error: any) {
    if (error.response) {
        if (error.response.status > 400) {
            message.error(error.data.message ? error.data.message : error.data);
        }
    } else {
        // The request was made but no response was received or error occurs when setting up the request.
        // console.log(error.message);
        message.error('Network Error.');
    }

    throw error; // If throw. The error will continue to be thrown.

    // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
    // return {some: 'data'};
};

request.interceptors.request.use((url, options) => {
    console.log(url, options);
    return {
        url: `${url}`,
        options: { ...options, headers: { 'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9' } },
    };
});


const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
    return extendRequest('/api/users', {
        method: 'get',
    }).then(res => {
        return res
    }).catch(err => {
        return false
    })
}

export const editRecord = async ({ id, record }: { id: number, record: FormVavlues }) => {
    return extendRequest(`/api/users/${id}`, {
        method: 'put',
        data: record
    }).then(res => {
        message.success('编辑成功！')
        return true
    }).catch(err => {
        return false
    })
}

export const deleteRecord = async ({ id }: { id: number }) => {
    return extendRequest(`/api/users/${id}`, {
        method: 'delete'
    }).then(res => {
        message.success('删除成功！')
        return true
    }).catch(err => {
        return false
    })
}

export const addRecord = async ({ record }: { record: FormVavlues }) => {
    return extendRequest(`/api/users/`, {
        method: 'post',
        data: record
    }).then(res => {
        message.success('添加成功！')
        return true
    }).catch(err => {
        return false
    })
}