import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})


export const insertWallpaper = payload => api.post(`/wallpaper`, payload)
export const getWallpapers = () => api.get(`/wallpaper`)
export const updateWallpaperById = (id, payload) => api.put(`/wallpaper/${id}`, payload)
export const deleteWallpaperById = id => api.delete(`/wallpaper/${id}`)


const apis = {
    insertWallpaper,
    getWallpapers,
    updateWallpaperById,
    deleteWallpaperById,
}
export default apis