import axios from "axios"
const ApiHeroku=import.meta.env.VITE_API

const BASE_URL = "https://127.0.0.1:5000/"+"api"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})