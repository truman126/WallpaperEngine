const express = require('express')


const ImageCtrl = require('../controllers/image-ctrl')


const router = express.Router()


router.post('/images', ImageCtrl.createWallpaper) //creates a wallpaper
router.put('/images/:id', ImageCtrl.editWallpaper) //edit the wallpaper like the name or the colour
router.delete('/images/:id', ImageCtrl.deleteWallpaper) //remove the wallpaper from the list
router.get('/images', ImageCtrl.getWallpapers) //returns list of all wallpapers


module.exports = router