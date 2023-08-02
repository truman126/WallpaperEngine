import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:3000/api/'
})



export const fetchImages = (user) => api.get(`/allimages`, {headers : {'Authorization' : `Bearer ${user.token}`}} )
export const deleteImage = (id, user) => api.delete(`/images/${id}`, {headers : {'Authorization' : `Bearer ${user.token}`}})
export const generateWallpapers = (payload, user) => api.post(`/submit`,payload ,{responseType: 'arraybuffer', headers : {'Authorization' : `Bearer ${user.token}`}} )
export const uploadImage = (payload, user) => api.post(`/upload`, payload, {headers : {'Authorization' : `Bearer ${user.token}`}} )
export const reloadThumbnail = (id, user) => api.get(`/reloadThumbnail/${id}`,  {headers : {'Authorization' : `Bearer ${user.token}`}} )

export const signup = (payload) => api.post(`/user/signup`, payload)
export const login = (payload) => api.post(`/user/login`, payload)



const apis = {
    fetchImages,
    generateWallpapers,
    uploadImage,
    deleteImage,
    signup,
    login,
    reloadThumbnail,
}
export default apis