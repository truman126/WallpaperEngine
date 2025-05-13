import { Link } from "react-router-dom";
import LightToggle from "./LightToggle";
import { Navigation } from "./Navigation";

function UserBar(props) {



    return (

        <div className="navbar h-24 bg-base-100 shadow-sm flex justify-between px-16">
            <div className="overflow-hidden">
                <Link to="/" ><h1 className="max-sm:text-sm">Truman's Wallpaper Engine</h1></Link>
            </div>
            <div className="flex min-w-1/3 justify-end ">
                <ul className="menu menu-horizontal gap-x-2">

                    <LightToggle />

                    <Navigation />
                </ul>
            </div>
        </div>
    );
}

export default UserBar;
