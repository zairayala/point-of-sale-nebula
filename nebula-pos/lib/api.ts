import axios from 'axios'
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEBULA_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest'
    },
    withCredentials: true
})

export default apiClient