const DAOFactory = require('./DAOFactory');


export default function DAOController(){

    const DAO = new DAOFactory();

    async function uploadImage(request, response){
        const user_id = request.user_id;
        
        //uploads images to desired place, uploads image keys
        await DAO.uploadImage();
        await DAO.uploadImageKeys();
    };
    function deleteImage(){
        //delete image from dao, deletes image keys
    };
    function deleteAllImages(){

    };
    function getAllImages(){
        //idk what i wanna do with this one yet
    };
    function getThumbnail(){
        //return url to thumbnail
    };
}