import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import Footer from "./Component/Footer";
import About from "./Pages/About";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import Offer from "./Pages/Offer";
import MainLayout from "./Layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { Appdispatch, RootState } from "./app/store";
import { useEffect } from "react";
import { setMenu } from "./features/items/itemSlice";
import OfferDetails from "./Pages/OfferDetails";
import Contact from "./Pages/Contact";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";

function App() {
  const menuItems = useSelector((state: RootState) => state.items.menu);
  const dispatch = useDispatch<Appdispatch>();

  
  useEffect(() => {
    const saved = localStorage.getItem("saved");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch(setMenu(parsed));
        }
      } catch (err) {
        console.error("Error parsing saved data:", err);
      }
    }
  }, [dispatch]);

  
  useEffect(() => {
    if (menuItems.length > 0) {
      localStorage.setItem("saved", JSON.stringify(menuItems));
    } else {
      localStorage.removeItem("saved");
    }
  }, [menuItems]);

  return (
    <div className="relative bg-white w-[90%] flex flex-col mx-auto items-center mt-10">
      <div className="absolute bg-yellow-200 rounded-full w-[150px] h-[200px] right-0 z-10 top-0" />
      <div className="absolute bg-red-200 rounded-full w-[150px] h-[200px] left-0 bottom-0 z-10" />
      <div className="relative z-10 w-full flex flex-col items-center">
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact/>}/>
            </Route>
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/sigin"  element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/offer/:title" element={<OfferDetails/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
