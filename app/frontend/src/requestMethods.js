import axios from "axios"
const ApiHeroku=import.meta.env.VITE_API

const BASE_URL = ApiHeroku+"api"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})