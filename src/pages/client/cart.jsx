import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart"
import { BiTrash } from "react-icons/bi"
import { useNavigate } from "react-router-dom";

export default function CartPage(){


    const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();
    console.log(cart);

    return (
  <div className="w-full h-full bg-[#F4F7F2] font-serif flex flex-col items-center py-10 px-4 text-[#2E3A2C]">
  
    <h1 className="text-4xl font-bold mb-10 text-[#1F2B1D]">
      Your Cart
    </h1>

    {cart.map((item) => (
      <div
        key={item.productId}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-[#DCE5D8] flex flex-col md:flex-row items-center gap-6 p-6 mb-6 relative"
      >

        <img
          src={item.image}
          className="w-24 h-24 rounded-xl object-cover border border-[#E3E9E0]"
        />


        <div className="flex-1 flex flex-col gap-1">
          <span className="font-semibold text-lg">{item.name}</span>
          <span className="text-[#4A5B42]">
            Rs.{item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>

        
        <div className="flex items-center gap-4">
          <button
            className="w-8 h-8 rounded-full bg-[#3E5632] text-white hover:bg-[#2e4024]"
            onClick={() => {
              addToCart(item, -1);
              setCart(getCart());
            }}
          >
            −
          </button>

          <span className="font-medium">{item.quantity}</span>

          <button
            className="w-8 h-8 rounded-full bg-[#3E5632] text-white hover:bg-[#2e4024]"
            onClick={() => {
              addToCart(item, 1);
              setCart(getCart());
            }}
          >
            +
          </button>
        </div>

        
        <div className="w-32 text-right font-semibold">
          Rs.
          {(item.quantity * item.price).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </div>

        
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
          onClick={() => {
            addToCart(item, -item.quantity);
            setCart(getCart());
          }}
        >
          <BiTrash />
        </button>
      </div>
    ))}

    
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-[#DCE5D8] p-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
      <span className="text-2xl font-bold">
        Total : Rs.
        {getTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </span>

      <button
        className="px-8 py-3 bg-[#3E5632] text-white rounded-full shadow hover:bg-[#2e4024] transition"
        onClick={() => {
          navigate("/checkout", { state: { items: cart } });
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
);

}