import { BusyContext } from "../context/BusyContext";

import { useContext } from "react";

export const useBusyContext = () => {
    const context = useContext(BusyContext);

    if (!context) { 
        throw Error('useBusyContext must be used inside a filesContextProvider')
    }

    return context;
}