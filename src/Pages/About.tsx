import kitchen from '../assets/image/Kitchen.jpeg'
import { Chef } from '../Data/Items'

function About() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img
          src={kitchen}
          alt="Kitchen background"
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute z-5 inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            The Taste Behind Our Brand
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl leading-relaxed drop-shadow-md">
            At <span className="font-semibold">FoodSalad</span>, we believe food is more than just a meal — 
            it’s a story of love, flavor, and community. Every dish we serve is crafted 
            with passion and care to bring joy to your table.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="w-[90%] md:w-[80%] mx-auto mt-12 flex flex-col gap-6 text-gray-700">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-red-600">
          Our Story
        </h2>
        <p className="text-center md:text-left leading-relaxed text-sm md:text-base">
          We started as a small kitchen with a dream — to bring the warmth of 
          home-cooked meals to everyone. Over the years, we’ve grown into a 
          trusted name, loved for our bold flavors, fresh ingredients, and excellent service.
        </p>

        {/* Mission & Vision */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-8">
          <div className="flex-1 bg-red-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-700 mb-2">🎯 Mission</h3>
            <p className="text-gray-700">
              “To serve delicious, high-quality meals that make every bite memorable.”
            </p>
          </div>
          <div className="flex-1 bg-yellow-100 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">🌟 Vision</h3>
            <p className="text-gray-700">
              “To become the most loved local food brand known for taste, trust, and quality.”
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-[90%] md:w-[80%] mx-auto mt-16 mb-20 flex flex-col gap-6 items-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-red-600">
          What Makes Us Special
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <p className="text-3xl mb-2">🍲</p>
            <h4 className="font-semibold text-lg mb-2">Fresh Ingredients</h4>
            <p className="text-gray-600 text-sm">We cook with only the best and freshest ingredients.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <p className="text-3xl mb-2">⚡</p>
            <h4 className="font-semibold text-lg mb-2">Fast Delivery</h4>
            <p className="text-gray-600 text-sm">Hot and ready when you want it, right on time.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <p className="text-3xl mb-2">❤️</p>
            <h4 className="font-semibold text-lg mb-2">Made with Love</h4>
            <p className="text-gray-600 text-sm">Every meal is crafted with care and passion.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <p className="text-3xl mb-2">💸</p>
            <h4 className="font-semibold text-lg mb-2">Affordable Prices</h4>
            <p className="text-gray-600 text-sm">Great taste doesn’t have to be expensive.</p>
          </div>
        </div>
        <div className="w-full md:[90%]  mx-auto mt-10  flex flex-col gap-6 items-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-red-600">
          Meet the Team
        </h2>
  <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
    {Chef.map((item, index) => (
      <div
        key={index}
        className="relative w-[150px] h-[250px] md:w-[250px] md:h-[300px] group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Chef Image */}
        <img
          src={item.img}
          alt={item.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-red-600 bg-opacity-60 flex w-full flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm italic text-red-300">{item.title}</p>
          <p className="text-sm mt-2">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
        </div>
      </div>
    <div className="w-full flex flex-col items-center justify-center py-5 px-4 bg-gradient-to-b from-white to-red-50">
  <div className="flex flex-col items-center text-center gap-6 w-[90%] max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-red-600">Our Promise</h2>
    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
      At <span className="font-semibold text-red-600">FoodSalad</span>, we promise freshness, flavor, and care 
      in every meal we make. Your satisfaction is our top priority — every single order, every single time.
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6">
      <div className="bg-white shadow-md rounded-xl py-4 px-2 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <span className="text-3xl mb-2">✅</span>
        <h3 className="font-semibold text-gray-800">Fresh Ingredients</h3>
      </div>

      <div className="bg-white shadow-md rounded-xl py-4 px-2 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <span className="text-3xl mb-2">⚡</span>
        <h3 className="font-semibold text-gray-800">Fast Delivery</h3>
      </div>

      <div className="bg-white shadow-md rounded-xl py-4 px-2 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <span className="text-3xl mb-2">❤️</span>
        <h3 className="font-semibold text-gray-800">Cooked with Love</h3>
      </div>

      <div className="bg-white shadow-md rounded-xl py-4 px-2 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
        <span className="text-3xl mb-2">💬</span>
        <h3 className="font-semibold text-gray-800">Friendly Service</h3>
      </div>
    </div>
  </div>

  <div className="flex flex-col items-center justify-center gap-4 mt-10">
    <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Hungry? Explore Our Menu!</h3>
    <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-8 py-3 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg">
      Contact Us
    </button>
  </div>
</div>

    </div>
  )
}

export default About
