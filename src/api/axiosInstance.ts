import axios from "axios"

const BASE_URL = "https://e92545f9-8411-45b4-8f9f-e1e849eec2b0.mock.pstmn.io"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
