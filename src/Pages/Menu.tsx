import React, { useState, useEffect } from 'react';
import chicken1 from '../assets/image/chicken1.jpeg';
import { all, Burger, drinks, side, chickenCategory } from '../Data/Items';
import { useDispatch } from 'react-redux';
import { Appdispatch } from '../app/store';
import { addMenu } from '../features/items/itemSlice';
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  const HandleLogout = async () => {
    try {
      await signOut(Auth);
      navigate('/');
    } catch (error) {
      console.error('Logout Failed', error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
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
          <button
            onClick={HandleLogout}
            className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition duration-300 shadow-md"
          >
            Logout
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
