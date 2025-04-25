import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL;
const api = axios.create({
    baseURL: `${BASE_URL}`
})



export const fetchImages = (user) => api.get(`/allimages`, {headers : {'Authorization' : `Bearer ${user.token}`}} )
export const deleteImage = (id, user) => api.delete(`/images/${id}`, {headers : {'Authorization' : `Bearer ${user.token}`}})
export const deleteAllImages = (user) => api.delete(`/allimages`, {headers : {'Authorization' : `Bearer ${user.token}`}})

export const generateWallpapers = (payload, user) => api.post(`/submit`,payload ,{responseType: 'arraybuffer', headers : {'Authorization' : `Bearer ${user.token}`}} )
export const uploadImage = (payload, user) => api.post(`/upload`, payload, {headers : {'Authorization' : `Bearer ${user.token}`}} )
export const reloadThumbnail = (id, user) => api.get(`/reloadThumbnail/${id}`,  {headers : {'Authorization' : `Bearer ${user.token}`}} )


export const signup = (payload) => api.post(`/user/signup`, payload)
export const login = (payload) => api.post(`/user/login`, payload)
export const guestLogin = (payload) => api.post(`/user/guestlogin`, payload)



const apis = {
    fetchImages,
    generateWallpapers,
    uploadImage,
    deleteImage,
    deleteAllImages,
    signup,
    login,
    reloadThumbnail,
    guestLogin
}
export default apis