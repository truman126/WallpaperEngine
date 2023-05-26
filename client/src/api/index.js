import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:3000/api/'
    
})



export const fetchImages = () => api.get(`/allimages`)
export const deleteImage = (id) => api.delete(`/images/${id}`)
export const generateWallpapers = (payload) => api.post(`/create`, payload)
export const uploadImage = (payload) => api.post(`/upload`, payload, {headers: {'Content-Type' : 'multipart/form-data'} })
export const getDownload = () => api.get(`/download`, {responseType: 'arraybuffer'})


const apis = {
    fetchImages,
    generateWallpapers,
    uploadImage,
    getDownload,
    deleteImage
}
export default apis