import { Appdispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeMenu } from "../features/items/itemSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface menuLayout {
  Title: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
}

function Cart() {
  const handShow = useSelector((state: RootState) => state.items.menu);
  const dispatch = useDispatch<Appdispatch>();
  const navigate = useNavigate();

  const total = handShow.reduce((a, b) => a + b.price * b.quantity, 0);

  const Del = (title: string) => dispatch(removeMenu(title));
  const increase = (item: menuLayout) => dispatch(increaseQuantity(item));
  const decrease = (item: menuLayout) => dispatch(decreaseQuantity(item));

  return (
    <div className="min-h-screen w-[90%] bg-gray-50 py-10 px-6 mx-auto">
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
              <p className="text-red-600 font-bold text-lg mb-2">{`₦${item.price * item.quantity}`}</p>
              <div className="flex gap-10 items-center mb-4">
                <FaArrowLeft
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => decrease(item)}
                />
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <FaArrowRight
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => increase(item)}
                />
              </div>
              <button
                onClick={() => Del(item.Title)}
                className="px-6 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {handShow.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            Total: <span className="text-red-600 font-bold">₦{total}</span> | Items: {handShow.length}
          </h2>
          <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-semibold">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
