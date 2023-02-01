import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    proxy: {
        host: process.env.REACT_APP_API_HOST,
        port: process.env.REACT_APP_API_PORT,
    }

})

export const getOrders = async (customerId, page, limit) => {
    const response = await axiosInstance.get("/api/orders/customer/" + customerId, { params: { page, limit } })
    return response.data
}

export const calculateTotal = async (orders) => {
    const response = await axiosInstance.post("/api/orders/total", orders)
    return response.data
}