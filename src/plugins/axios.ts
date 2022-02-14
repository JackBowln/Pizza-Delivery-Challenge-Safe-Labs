import axios, { AxiosInstance } from "axios"
const URL = `https://raw.githubusercontent.com/SAFE-Labs-Brasil/frontend-challenge/main/server/`

export default class Api {
    private static axiosInstance: AxiosInstance

    static init() {
        return (this.axiosInstance = axios.create({
            baseURL: URL,
        }))
    }

    static async get<ResponseType>(url: string) {
        return await Api.init().get<ResponseType>(url)
    }
}
