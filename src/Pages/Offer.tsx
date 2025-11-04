import { FaClock, FaFireAlt, FaGift } from "react-icons/fa";
import { offers } from "../Data/Items";
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from 'firebase/auth';
import { Auth } from '../Firebase';


function Offer() {   
  
  const [scrolling, setScrolling] = useState<boolean>(false);
      const [menuOpen, setMenuOpen] = useState<boolean>(false);
    
  const location=useNavigate()

  const HandleLogout = async () =>{
          try {
            await signOut(Auth)
            location('/')
          } catch (error) {
             console.error('Logout Failed', error)
          }
        }
    useEffect(() => {
        const handleScroll = () => setScrolling(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
  return (
    <div className="w-full">
      <div
                      className={`flex w-full items-center justify-between px-[10%] py-3 transition-all duration-300 
                      ${scrolling ? "bg-red-700 shadow-lg" : "bg-red-600"}`}
                    >
                      {/* Logo */}
                      <h1 className="text-white font-bold text-xl">Food Salad</h1>
            
                      {/* Desktop Menu */}
                      <ul className="hidden md:flex gap-6 text-white font-medium">
                        <Link to="/menu">
                          <li className="hover:text-yellow-300 cursor-pointer">Menu</li>
                        </Link>
                        <Link to="/cart">
                          <li className="hover:text-yellow-300 cursor-pointer">Cart</li>
                        </Link>
                        <Link to="/offer">
                          <li className="hover:text-yellow-300 cursor-pointer">Offer</li>
                        </Link>
                      </ul>
            
                      {/* Desktop Logout */}
                      <button onClick={HandleLogout} className="hidden md:block bg-red-400 p-2 font-bold text-white hover:bg-red-500 rounded-md">
                        Logout
                      </button>
            
                      {/* Mobile Menu Icon */}
                      <div
                        className="md:hidden text-white text-2xl cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                      >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                      </div>
            
                      {/* Mobile Dropdown */}
                      {menuOpen && (
                        <div className="absolute top-[70px] left-0 w-full bg-red-700 flex flex-col items-center gap-6 py-6 text-white font-medium shadow-lg md:hidden">
                          <Link to="/menu" onClick={() => setMenuOpen(false)}>
                            <p className="hover:text-yellow-300 cursor-pointer">Menu</p>
                          </Link>
                          <Link to="/cart" onClick={() => setMenuOpen(false)}>
                            <p className="hover:text-yellow-300 cursor-pointer">Cart</p>
                          </Link>
                          <Link to="/offer" onClick={() => setMenuOpen(false)}>
                            <p className="hover:text-yellow-300 cursor-pointer">Offer</p>
                          </Link>
                          <button
                            className="bg-red-400 px-4 py-2 font-bold text-white hover:bg-red-500 rounded-md"
                            onClick={() =>{ setMenuOpen(false),HandleLogout()}}
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      
      <section className="bg-gradient-to-r from-red-600 to-red-400 text-white py-16 text-center px-6">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Today’s Special Offers
        </h1>
        <p className="text-lg md:text-xl">
          Save big while enjoying your favorite meals 🍽️
        </p>
      </section>

      {/* Offer Cards */}
      <section className="max-w-6xl mx-auto py-14 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={offer.img}
              alt={offer.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="bg-red-100 text-red-600 px-3 py-1 text-sm font-semibold rounded-full flex items-center gap-1">
                  <FaFireAlt /> {offer.tag}
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <FaClock /> {offer.expires}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mt-2">
                {offer.title}
              </h2>
              <p className="text-gray-600 text-sm">{offer.description}</p>

              <div className="flex items-center gap-3 mt-2">
                <p className="line-through text-gray-400 font-medium">
                  {offer.oldPrice}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {offer.newPrice}
                </p>
              </div>
              <Link to={`/Offer/${offer.title.replace(/\s+/g, '')}`}>
              <button className="mt-4 bg-red-600 text-white p-4 rounded-lg hover:bg-red-500 transition duration-300">
                Order Now
              </button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Loyalty Section */}
      <section className="bg-red-600 text-white py-16 px-6 text-center">
        <FaGift className="text-4xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-3">Join Our Loyalty Club 🎁</h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Earn points on every order and get exclusive discounts, free desserts, and
          birthday gifts. Sign up today and start saving!
        </p>
        <button className="bg-white text-red-600 font-semibold py-3 px-8 rounded-lg hover:bg-red-100 transition duration-300">
          Join Now
        </button>
      </section>
    </div>
    </div>
  );
}

export default Offer;
