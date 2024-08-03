import axios from "axios"
const API_Data = "https://login-service-8h2w.onrender.com/api/auth"
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_Data}/login`, { email, password })
        const data = await response.data
        console.log(data);
        if (data) {
            localStorage.setItem('auth', data.token)
            return data
        }
    } catch (error) {
        alert("Login Failed")
    }
}
export const logOutUser = async () => {
    try {
        await axios.get(`${API_Data}/logout`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth")}`
            }
        })
        localStorage.removeItem("auth")

    } catch (error) {
        console.error(error.message)
    }
}

export function IsAuth() {
    return localStorage.getItem("auth") !== null
}

