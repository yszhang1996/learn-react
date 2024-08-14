import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd';
// 引入qs模块，用来序列化post类型的数据
import qs from 'qs'
// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
    code: number;
    msg: string
}

// 请求响应参数，包含data
interface ResultData<T> extends Result {
    data: T;
}
const URL: string = process.env.BASE_API || ""

console.log("url==="+URL);

enum RequestEnums {
    TIMEOUT = 20000,
    FAIL = '500', // 请求失败
    SUCCESS = '000000', // 请求成功
}
const config = {
    // 默认地址
    baseURL: URL as string,
    // 设置超时时间
    timeout: RequestEnums.TIMEOUT as number,
    // 跨域时候允许携带凭证
    withCredentials: true
}

class RequestHttp {
    // 定义成员变量并指定类型
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        // 实例化axios
        this.service = axios.create(config);

        /**
         * 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token') || '';
                let { headers } = config
                // 合并原有headers和post请求时配置的headers，且以post请求的配置优先
                headers = Object.assign(headers || {}, { token })
                return {
                    ...config,
                    headers
                }
            },
            (error: AxiosError) => {
                // 请求报错
                Promise.reject(error)
            }
        )

        /**
         * 响应拦截器
         * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log('success');

                const { data, config } = response; // 解构
                console.log(data);
                if (data.code && data.code !== RequestEnums.SUCCESS) {
                    message.error(data.msg); // 此处也可以使用组件提示报错信息
                    return Promise.reject(data)
                }
                return data;
            },
            (error: AxiosError) => {
                console.log('error');
                const { response } = error;
                console.log(response);

                if (response) {
                    this.handleCode(response)
                    return Promise.reject(response.data)
                }
                if (!window.navigator.onLine) {
                    message.error('网络连接失败');
                    // 可以跳转到错误页面，也可以不做操作
                    // return router.replace({
                    //   path: '/404'
                    // });
                }
            }
        )
    }
    handleCode(response: AxiosResponse): void {
        switch (response.status) {
            case 401:
                message.error('登录失败，请重新登录');
                break;
            default:
                message.error(response.data.message);
                break;
        }
    }

    // 常用方法封装
    get<T>(url: string, params?: object): Promise<T> {
        return this.service.get(url, { params });
    }
    post<T>(url: string, params?: object, useForm = false): Promise<T> {
        // 通过useForm字段判断是否使用x-www-form-urlencoded和qs序列化
        let headers = {
            'Content-Type': useForm ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json;charset=UTF-8'
        }
        return this.service.post(url, useForm ? qs.stringify(params) : params,
            { headers });
    }
    put<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }
    delete<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.delete(url, { params });
    }
}

// 导出一个实例对象
export default new RequestHttp(config);