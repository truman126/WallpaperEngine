import DAOFactory from './DAOFactory.js';

    const DAO = DAOFactory();


    export async function uploadImageKey(request, response) { 
        const user_id = request.user._id;
        const files = request.files; 
        //images are uploaded in the multer middleware,

        //upload the image keys
        try {
            await DAO.uploadImageKey(user_id, files);
            response.sendStatus(201);
        }
        catch (error) {
            console.log(error)
            response.status(500);
            response.send( {error: error.toString()});
        }
    }
    export async function deleteImage(request, response) {
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
    export async function deleteAllImages(request, response) {
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
    export async function getAllImages(request, response) {
        const user_id = request.user._id;
        try {
            const images = await DAO.getAllImages(user_id)
            console.log(images)
            response.status(200);
            response.send({data:images});

        }
        catch (error) {
            response.sendStatus(500, "Error getting all images")

        }

    };
    export function getThumbnail(request, response) {
        //return url to thumbnail
        //TODO:deal with this
    };

