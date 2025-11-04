import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../Component/Navbar";
import Cart from "../Pages/Cart";
import Offer from "../Pages/Offer";



function MainLayout() {
    const location=useLocation();

    const hideNavbar=location.pathname==='/Cart' || location.pathname==='/Offer'
    return(
        <>
        {!hideNavbar && <Navbar/>}
        <Outlet/>
        </>
    )
}
export default MainLayout