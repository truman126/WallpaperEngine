import { Link } from "react-router-dom";
import LightToggle from "./LightToggle";
import { Navigation } from "./Navigation";

function UserBar(props) {



    return (

        <div className="navbar h-24 bg-base-100 shadow-sm px-15">
            <div className="flex-1">
                <Link to="/" className="min-lg:text-3xl max-sm:text-sm"><h1>Truman's Wallpaper Engine</h1></Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal max-sm:menu-vertical gap-x-2 mx-20 align-baseline">

                    <LightToggle />

                    <Navigation />
                </ul>
            </div>
        </div>
    );
}

export default UserBar;
