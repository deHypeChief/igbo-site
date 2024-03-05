import axios from "axios";
const API_BASE_URL = 'https://igbo-site.vercel.app/'; // Replace this with your API base URL

const api = axios.create({
    baseURL: API_BASE_URL,
});
function headers(token){
    return(
        {
            'Access-Control-Allow-Origin': "*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    )
}

// user actions
export function userSigned() {
    const userStat = localStorage.getItem('user')
    if (userStat) {
        return JSON.parse(userStat)
    }
    if (userStat == null) {
        return false
    }
}
export function userLogOut(callback) {
    if (userSigned()) {
        localStorage.removeItem('user')
        callback()
    } else {
        return null
    }
}



export const authUser = async (endpoint, payload) => {
    return await api.post(endpoint, payload)
}
export const createUser = async (endpoint, data) => {
    return await api.post(endpoint, data)
}
export const getUser = async (endpoint, token) => {
    return await api.get(endpoint, {
        withCredentials: true, 
        headers: headers(token)
    })
}
// QuickAction
export const getUserData = async (endpoint) => {
    return await api.get(endpoint)
}
export const postUserData = async (endpoint, data) => {
    return await api.post(endpoint, data)
}




// admin Methods
export async function authAdmin(endpoint, payload) {
    return await api.post(endpoint, payload)
}



export function adminSigned() {
    const userStat = localStorage.getItem('admin')
    if (userStat) {
        return JSON.parse(userStat)
    }
    if (userStat == null) {
        return false
    }
}
export async function getAdmin(endpoint, token) {
    return await api.get(endpoint, {
        headers: headers(token)
    })
}
export async function adminGet(endpoint, token) {
    return await api.get(endpoint, {
        withCredentials: true, 
        headers: headers(token)
    })
}

export async function adminPost(endpoint, payload, token) {
    return await api.post(endpoint, payload, {
        withCredentials: true, 
        headers: headers(token)
    })
}