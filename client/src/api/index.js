import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})


export const insertWallpaper = payload => api.post(`/images`, payload)
export const getWallpapers = () => api.get(`/images`)
export const updateWallpaperById = (id, payload) => api.put(`/images/${id}`, payload)
export const deleteWallpaperById = id => api.delete(`/images/${id}`)


const apis = {
    insertWallpaper,
    getWallpapers,
    updateWallpaperById,
    deleteWallpaperById,
}
export default apis