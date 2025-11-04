import { Appdispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeMenu } from "../features/items/itemSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from 'firebase/auth';
import { Auth } from '../Firebase';

 interface menuLayout{
  Title:string;
  img:string;
  description:string,
  price:number,
  quantity:number  
} 
function Cart() {
  const handShow = useSelector((state: RootState) => state.items.menu);
  const dispatch=useDispatch<Appdispatch>()    
  const total=handShow.reduce((a,b)=>{
    const price=b.price;
    return a + price * b.quantity
  } ,0)

  const Del = (dele:string) => {
    dispatch(removeMenu(dele))
  }

  const increase = (increaseMenu:menuLayout)=>{
    dispatch(increaseQuantity(increaseMenu))
  }

  const decrease = (decreaseMenu:menuLayout)=>{
    dispatch(decreaseQuantity(decreaseMenu))
  }
  const [scrolling, setScrolling] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location =useNavigate()

  useEffect(() => {
      const handleScroll = () => setScrolling(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    const HandleLogout = async () =>{
        try {
          await signOut(Auth)
          location('/')
        } catch (error) {
           console.error('Logout Failed', error)
        }
      }
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
                      onClick={() =>{ setMenuOpen(false), HandleLogout()}}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
    <div className="min-h-screen w-[90%] bg-gray-50 py-10 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-10">
        Your Cart
      </h1>

      {handShow.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {handShow.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center"
            >
              <img
                src={item.img}
                alt={item.Title}
                className="object-cover w-full h-56 rounded-xl mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {item.Title}
              </h2>
              <p className="text-red-600 font-bold text-lg mb-2">{` $${item.price * item.quantity}`}</p>
              <div className="flex gap-10 items-center">
                <FaArrowLeft onClick={() => decrease(item)}/>
              <p className="text-sm text-gray-500 mb-4">
                Quantity: {item.quantity}
              </p>
              <FaArrowRight onClick={() => increase(item)}/>
              </div>
              <button onClick={() => Del(item.Title)} className="px-6 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {handShow.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            Total Items:{` $${total}`}
            <span className="text-red-600 font-bold">{handShow.length}</span>
          </h2>
          <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-semibold">
            Checkout
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default Cart;
