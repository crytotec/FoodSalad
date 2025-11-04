import { useParams } from "react-router-dom";
import { offers } from "../Data/Items";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMenu } from "../features/items/itemSlice";
import { Appdispatch } from "../app/store";




export interface MenuDetails{
  id?:number,
  title:string;
  img:string;
  description:string,
  price:number,
  quantity:number,
  category?:string,   
} 

function OfferDetails() {
  const { title } = useParams();

  const offer = offers.find(
    (item) =>
      item.title.replace(/\s+/g, "").toLowerCase() ===
      title?.replace(/\s+/g, "").toLowerCase()
  );

  const FoodList = offer?.Lunch || offer?.weekend || offer?.desert || [];

  if (!offer) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold text-xl">
        Offer not found 😔
      </div>
    );
  }
const dispatch=useDispatch<Appdispatch>()

const HandleAdd = (food:MenuDetails) => {
  const formated={ 
  Title:food.title,
  img:food.img,
  description:food.description,
  price:food.price,
  quantity:1,
  };
     dispatch(addMenu(formated))
}
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-400 text-white py-20 px-6 text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{offer.title}</h1>
          <p className="text-lg md:text-xl opacity-90">{offer.description}</p>
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
              {offer.tag}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
              {offer.expires}
            </span>
          </div>
        </div>
      </section>

      {/* Offer Food List */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          {offer.title.includes("Weekend")
            ? "Weekend Family Feast Menu 🍽️"
            : offer.title.includes("Lunch")
            ? "Lunch Specials 🍔"
            : "Dessert Treats 🍰"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {FoodList.map((food, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={food.img}
                alt={food.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex flex-col justify-between h-[250px]">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {food.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {food.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-red-600">
                    ₦{food.price.toLocaleString()}
                  </span>
                  <button onClick={ () =>HandleAdd(food)} className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2 px-5 rounded-lg transition duration-300">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-400 text-white text-center py-16 mt-10">
        <Link to='/offer'>
         <button className="p-2 bg-white text-red-600 font-bold">Back to Offer</button>
         </Link>
        <h3 className="text-3xl font-bold mb-3">
          Don’t Miss Out On This Deal! 🔥
        </h3>
        <p className="text-lg mb-6">
          Order now and enjoy exclusive discounts before the offer expires.
        </p>
        <button className="bg-white text-red-600 font-semibold py-3 px-8 rounded-lg hover:bg-red-100 transition duration-300">
          Explore More Offers
        </button>
      </section>
    </div>
  );
}

export default OfferDetails;
