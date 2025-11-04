import { FaClock, FaFireAlt, FaGift } from "react-icons/fa";
import { offers } from "../Data/Items";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { signOut } from 'firebase/auth';
import { Auth } from '../Firebase';

function Offer() {
  const navigate = useNavigate();

  const HandleLogout = async () => {
    try {
      await signOut(Auth);
      navigate('/');
    } catch (error) {
      console.error('Logout Failed', error);
    }
  };

  return (
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
  );
}

export default Offer;
