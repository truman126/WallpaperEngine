import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;
const api = axios.create({
    baseURL: `${BASE_URL}/api`
})



export const fetchImages = (user) => api.get(`/allimages`, {headers : {'Authorization' : `Bearer ${user.token}`}} )
export const deleteImage = (id, user) => api.delete(`/images/${id}`, {headers : {'Authorization' : `Bearer ${user.token}`}})
export const deleteAllImages = (id, user) => api.delete(`/allimages/${id}`, {headers : {'Authorization' : `Bearer ${user.token}`}})

export const generateWallpapers = (payload, user) => api.post(`/submit`,payload ,{responseType: 'arraybuffer', headers : {'Authorization' : `Bearer ${user.token}`}} )
export const uploadImage = (payload, user) => api.post(`/upload`, payload, {headers : {'Authorization' : `Bearer ${user.token}`}} )
export const reloadThumbnail = (id, user) => api.get(`/reloadThumbnail/${id}`,  {headers : {'Authorization' : `Bearer ${user.token}`}} )


export const signup = (payload) => api.post(`/user/signup`, payload)
export const login = (payload) => api.post(`/user/login`, payload)
export const guestLogin = (payload) => api.post(`/user/guestlogin`, payload)
export const userDetails = (user) => api.get(`/useraction/userdetails`, {headers : {'Authorization' : `Bearer ${user.token}`}})

export const getUsers = (user) => api.get(`/admin/getUsers`, {headers : {'Authorization' : `Bearer ${user.token}`}})
export const deleteUser = (id, user) => api.delete(`/admin/deleteUser/${id}`, {headers : {'Authorization' : `Bearer ${user.token}`}})
export const updateRole = (id, role, user) => api.put(`/admin/updateRole/${id}/${role}`, {} ,{headers : {'Authorization' : `Bearer ${user.token}`}})

const apis = {
    fetchImages,
    generateWallpapers,
    uploadImage,
    deleteImage,
    deleteAllImages,
    signup,
    login,
    reloadThumbnail,
    guestLogin,
    getUsers,
    userDetails,
    deleteUser,
    updateRole
}
export default apis