import path from "path";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getUserPath(user_id, type){

    const __dirname = dirname(fileURLToPath(import.meta.url));


    let user_path = path.join(__dirname + '/../data/' + user_id)

    switch(type){
        case 'images':
            user_path = path.join(user_path + '/images/' );
            break;
        case 'wallpapers':
            user_path = path.join(user_path + '/wallpapers/' );
            break;
        case 'thumbnails':
            user_path = path.join(user_path + '/thumbnails/' ); 
            break;
        case 'base':
            user_path = path.join(user_path + '/' );
            break;
    }
    return user_path.toString();
}