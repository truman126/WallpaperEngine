import { useAuthContext } from "./useAuthContext";
import { useFilesContext } from "./useFilesContext";


export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: filesDispatch } = useFilesContext()


    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        filesDispatch({type : 'SET_FILES', payload: null})

    }
    return { logout }

}
