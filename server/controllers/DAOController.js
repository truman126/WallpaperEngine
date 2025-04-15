const DAOFactory = require('./DAOFactory');


export default function DAOController() {

    const DAO = new DAOFactory();

    async function uploadImage(request, response) {
        const user_id = request.user_id;
        const files = request.files;

        //images are uploaded in the multer middleware,

        //upload the image keys
        try {
            await DAO.uploadImageKeys(user_id, files);
            response.sendStatus(201);
        }
        catch (error) {
            response.sendStatus(500)

        }
    };
    async function deleteImage(request, response) {
        const user_id = request.user._id;
        const id = request.params.id

        try {
            await DAO.deleteImage(user_id, id);
            await DAO.deleteImageKey(user_id, id);

            response.sendStatus(200)
        }
        catch (error) {
            response.sendStatus(500)

        }
    };
    async function deleteAllImages() {
        const user_id = request.user._id;

        try {
            await DAO.deleteAllImages(user_id);
            await DAO.deleteAllImageKeys(user_id);

            response.sendStatus(200)


        }
        catch (error) {
            response.sendStatus(500)

        }
    };
    async function getAllImages(request, response) {
        const user_id = request.user._id;
        try {
            const images = await DAO.getAllImages(user_id)
            response.status(200).json({data: images });

        }
        catch (error) {
            response.sendStatus(500)
        }

    };
    function getThumbnail(request, response) {
        //return url to thumbnail
    };
    function downloadImages(request, response) {

    }
}