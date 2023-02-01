import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    proxy: {
        host: process.env.REACT_APP_API_HOST,
        port: process.env.REACT_APP_API_PORT,
    }

})

export const getCustomers = async (page, limit) => {
    const response = await axiosInstance.get("/api/customers", { params: { page, limit } })
    return response.data
}