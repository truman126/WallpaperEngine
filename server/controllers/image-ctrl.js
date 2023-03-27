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


    let d = await Image.findOneAndDelete({ _id: req.params.id });
    
    res.status(200).json({
        success: true,
        data:d
    })
    res.status(404).json({
        success: false,
        error: `Image not found`
    })
    res.status(400).json({
        success: false,
        error: 'error?'
    })
}

getWallpapers = async (req, res) => {

    const allImages = await Image.find()

    res.status(200).send({
        success: true,
        data: allImages
    })
    res.status(404).send({
        success:false, 
        error: `Images not found.`
    })
    res.status(400).send({
        success: false,
        error: `Error: 404`
    })
}



module.exports = {
    createWallpaper,
    editWallpaper,
    deleteWallpaper,
    getWallpapers,
}