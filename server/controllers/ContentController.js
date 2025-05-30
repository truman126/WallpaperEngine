import { getUserPath } from "../utils/UserPaths.js";


export function deliverImage(request, response){

    const {userId, imageId} = request.params;
    console.log({userId}, {imageId})
    response.status(200)
    response.sendFile(getUserPath(userId, 'thumbnails') + imageId );
}