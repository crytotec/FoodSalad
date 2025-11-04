import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../Firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [user, setUser] = useState<User | null>(null); 
  const MenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
        setMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(Auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full p-4 z-20 fixed top-0 left-0">
      {/* Desktop Navbar */}
      <div
        className={`hidden md:flex items-center justify-between w-[80%] mx-auto p-4  transition-all duration-300 ${
          scroll ? "bg-red-100 shadow-lg" : "bg-white"
        }`}
      >
        <h1 className="text-red-600 font-bold text-xl">Food Salad</h1>
        <ul className="flex text-gray-600 font-bold items-center gap-10">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {user ? (
            <>
              <Link to="/menu">Menu</Link>
              <Link to="/offer">Offer</Link>
              <Link to="/cart">Cart</Link>
              <li
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-400 duration-500"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <Link className="bg-red-300 p-2 text-white" to="/sigin">Sign In</Link>
              <Link className="bg-red-300 p-2 text-white" to="/signup">Sign Up</Link>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div
        ref={MenuRef}
        className={`relative flex items-center justify-between w-full px-4 py-2 bg-white shadow-md md:hidden ${
          scroll ? "bg-red-100 shadow-lg" : "bg-white"
        }`}
      >
        <h1 className="text-red-600 font-bold text-xl">Food Salad</h1>

        <button
          onClick={() => setMenu(!menu)}
          className="text-2xl text-red-600 focus:outline-none"
        >
          {menu ? <FaTimes /> : <FaBars />}
        </button>

        {menu && (
          <ul className="absolute top-14 left-0 bg-red-600 w-full text-white p-6 flex flex-col items-center gap-6 rounded-b-xl shadow-xl">
            <Link to="/" onClick={() => setMenu(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenu(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenu(false)}>Contact</Link>

            {user ? (
              <>
                <Link to="/menu" onClick={() => setMenu(false)}>Menu</Link>
                <Link to="/offer" onClick={() => setMenu(false)}>Offer</Link>
                <Link to="/cart" onClick={() => setMenu(false)}>Cart</Link>
                <li onClick={() => { handleLogout(); setMenu(false); }} className="cursor-pointer">
                  Logout
                </li>
              </>
            ) : (
              <>
                <Link className="bg-red-300 p-2 text-white" to="/sigin" onClick={() => setMenu(false)}>Sign In</Link>
                <Link className="bg-red-300 p-2 text-white" to="/signup" onClick={() => setMenu(false)}>Sign Up</Link>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
