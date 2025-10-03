import { useState, useEffect } from "react";
import {MobileNavigation} from "./MobileNavigation"
import {DesktopNavigation} from "./DesktopNavigation"
import { useLogout } from "../../hooks/useLogout";
export function Navigation(props) {

    const [isDesktop, setDesktop] = useState(window.innerWidth >= 768);
    const [isMobile, setMobile] = useState(window.innerWidth < 768);

    const { logout } = useLogout();
    
    function handleLogoutButtonClick(){
        props.logout() || logout();
    }

    const updateMedia = () => {
        setDesktop(window.innerWidth >= 768);
        setMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <>
            {isDesktop && <DesktopNavigation user={props.user} handleLogoutButtonClick={handleLogoutButtonClick}/>}
            {isMobile && <MobileNavigation user={props.user} handleLogoutButtonClick={handleLogoutButtonClick}/>}
        </>
    )
}
