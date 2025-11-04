import React, { useState, useEffect } from 'react';
import chicken1 from '../assets/image/chicken1.jpeg';
import { all, Burger, drinks, side, chickenCategory } from '../Data/Items';
import { useDispatch } from 'react-redux';
import { Appdispatch } from '../app/store';
import { addMenu } from '../features/items/itemSlice';
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from 'firebase/auth';
import { Auth } from '../Firebase';

export interface MenuDetails {
  Title: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
}

function Menu() {
  const [formInput, setFormInput] = useState<string>('');
  const [searchResult, setSearchResult] = useState<MenuDetails[] | null>(null);
  const [menu, setMenu] = useState(all);
  const [category, setCategory] = useState<string>('All');
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location=useNavigate()
  const cat = ['All', 'Burger', 'Drinks', 'Chicken', 'Side'];
  const dispatch = useDispatch<Appdispatch>();

  // Add to cart
  const HandAdd = (food: MenuDetails) => {
    dispatch(addMenu(food));
  };

  // Category filter
  const updateMenu = (cate: string) => {
    setCategory(cate);
    if (cate === 'All') setMenu(all);
    else if (cate === 'Burger') setMenu(Burger);
    else if (cate === 'Drinks') setMenu(drinks);
    else if (cate === 'Side') setMenu(side);
    else if (cate === 'Chicken') setMenu(chickenCategory);

    setSearchResult(null);
  };

  // Search handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = formInput.trim().toLowerCase();
    if (!search) {
      setSearchResult(null);
      return;
    }

    const allItems = [...all, ...Burger, ...drinks, ...chickenCategory, ...side];
    let found: MenuDetails[] = [];

    if (search === 'burger') found = Burger;
    else if (search === 'drinks' || search === 'drink') found = drinks;
    else if (search === 'chicken') found = chickenCategory;
    else if (search === 'side' || search === 'sides') found = side;
    else if (search === 'all') found = all;
    else {
      found = allItems.filter(
        (item) =>
          item.Title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search)
      );
    }

    setSearchResult(found.length > 0 ? found : []);
  };

  // Scroll background change
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
    <div className="w-full min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full flex justify-center z-50">
        <div
          className={`flex w-[90%] items-center justify-between px-[10%] py-3 transition-all duration-300 
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
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden mt-[80px]">
        <img
          src={chicken1}
          alt="Kitchen background"
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg tracking-wide">
            Discover Deliciousness
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl leading-relaxed drop-shadow-md">
            From juicy burgers to tasty sides — explore our handcrafted meals
            made fresh every day.
          </p>
          <button className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition duration-300 shadow-md">
            Order Now
          </button>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col items-center py-14 mx-auto justify-center mt-4 w-[90%] max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
          Our Menu
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mb-10">
          Choose from our range of mouth-watering meals prepared with love and
          the freshest ingredients.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-5 md:w-[50%] w-[90%]"
        >
          <input
            type="text"
            value={formInput}
            onChange={(e) => setFormInput(e.target.value)}
            placeholder="Search for a meal or category..."
            className="pl-4 focus:outline-none bg-gray-300 rounded-md md:w-[60%] w-full h-[50px]"
          />
          <button
            type="submit"
            className="bg-red-600 md:w-[100px] w-full p-2 rounded-md text-white font-bold"
          >
            Enter
          </button>
        </form>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 mt-6">
          {cat.map((item) => (
            <button
              key={item}
              onClick={() => updateMenu(item)}
              className={`px-6 py-2 rounded-full border-2 border-yellow-400 font-medium transition duration-300 
              ${
                category === item
                  ? 'bg-red-600 text-white shadow-md scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-red-600 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {(searchResult ?? menu).map((food, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={food.img}
                alt={food.Title}
                className="object-cover w-full h-[200px] md:h-[220px]"
              />
              <div className="flex flex-col gap-3 p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {food.Title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {food.description}
                </p>
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between mt-2">
                  <p className="text-red-600 font-bold text-lg">{`₦${food.price}`}</p>
                  <button
                    onClick={() => HandAdd(food)}
                    className="px-2 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Search Result */}
        {searchResult && searchResult.length === 0 && (
          <p className="text-gray-500 mt-6">
            No matching <span className="font-semibold">{formInput}</span> food
            found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Menu;
