import axios from "axios"
import { LOGIN } from "./apiConstants.js"


export const login = async (data) => {
    return axios.post(LOGIN,data)
}