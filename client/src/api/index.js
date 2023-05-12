import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:3000/api',

})



export const fetchImages = () => api.get(`/allimages`)
export const updateWallpaperById = (id, payload) => api.put(`/images/${id}`, payload)
export const deleteWallpaperById = (id) => api.delete(`/images/${id}`)
export const generateWallpapers = (payload) => api.post(`/create`, payload)
export const uploadImage = (payload) => api.post(`/upload`, payload, {headers: {'Content-Type' : 'multipart/form-data'} })


const apis = {
    fetchImages,
    updateWallpaperById,
    deleteWallpaperById,
    generateWallpapers,
    uploadImage
}
export default apis