import DAOFactory from '../services/DAOFactory.js';
    //TODO: hide error messages from frontend?
    
    const DAO = DAOFactory();


    export async function uploadImageKey(request, response) { 
        
        try {
            const user_id = request.user._id;
            const files = request.files; 

            const savedKeys = await DAO.uploadImageKey(user_id, files);
            response.status(201);
            response.send({data: savedKeys})
        }
        catch (error) {
            response.status(500);
            response.send( {error: error.toString()});
        }
    }
    export async function deleteImage(request, response) {
        
        try {
            const user_id = request.user._id;
            const id = request.params.id
            await DAO.deleteImage(user_id, id);
            const key = await DAO.deleteImageKey(user_id, id);

            response.status(200);
            response.send({data: key});

        }
        catch (error) {
            response.status(500);
            response.send( {error: error.toString()});

        }
    };
    export async function deleteAllImages(request, response) {
        

        try {
            const user_id = request.user._id;

            await DAO.deleteAllImages(user_id);
            await DAO.deleteAllImageKeys(user_id);

            response.sendStatus(200)


        }
        catch (error) {
            response.status(500);
            response.send( {error: error.toString()});

        }
    };
    export async function getAllImages(request, response) {

        try {
            console.log(request.user)
            const user_id = request.user._id;
            const images = await DAO.getAllImages(user_id);
            response.status(200);
            response.send({data:images});

        }
        catch (error) {
            console.log(error)
            response.sendStatus(500, "Error getting all images")

        }

    };
    export async function getThumbnail(request, response) {
        
        try {
            console.log(request.params)
            const userId = request.user._id;
            const imageId = request.params.id;


            const updatedKey = await DAO.getThumbnail(userId, imageId);
            
            console.log({updatedKey})
            response.status(200);
            response.send({imageKey: updatedKey});


        }
        catch (error) {
            console.log(error);
            response.sendStatus(500, "Error getting thumbnail url");

        }
        

    };

