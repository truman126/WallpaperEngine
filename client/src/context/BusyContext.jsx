import { createContext, useReducer, useEffect } from 'react';

export const BusyContext = createContext();

export const busyReducer = (state, action) => {
    switch (action.type) {
        case 'BUSY':
            return {busy:true}
        case 'FREE':
            return {busy:false}
        default:
            return busy
    }
}

export const BusyContextProvider = ({ children }) => {
    const [state, dispatchBusy] = useReducer(busyReducer, {
        busy: false
    })



    return (
        <BusyContext.Provider value={{...state, dispatchBusy}}>
            {children}
        </BusyContext.Provider>
    )
}

