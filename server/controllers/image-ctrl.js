const Image = require('../models/image-model')


createWallpaper = (req, res) => {
    const body = req.body


    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an image',
        })
    }


    const image = new Image(body)


    if (!image) {
        return res.status(400).json({ success: false, error: err })
    }


    image
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: image._id,
                message: 'Image created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Image not created!',
            })
        })
}


editWallpaper = async (req, res) => {
    const body = req.body


    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }


    Image.findOne({ _id: req.params.id }, (err, image) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Image not found!',
            })
        }
        image.name = body.name
        image
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: image._id,
                    message: 'image updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'image not updated!',
                })
            })
    })
}


deleteWallpaper = async (req, res) => {
    await Image.findOneAndDelete({ _id: req.params.id }, (err, image) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }


        if (!image) {
            return res
                .status(404)
                .json({ success: false, error: `image not found` })
        }


        return res.status(200).json({ success: true, data: image })
    }).catch(err => console.log(err))
}

getWallpapers = async (req, res) => {
    await images.find({}, (err, images) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!images.length) {
            return res
                .status(404)
                .json({ success: false, error: `Images not found` })
        }
        return res.status(200).json({ success: true, data: images })
    }).catch(err => console.log(err))
}


module.exports = {
    createWallpaper,
    editWallpapers,
    deleteWallpaper,
    getWallpapers,
}