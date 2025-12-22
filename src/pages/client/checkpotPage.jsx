import { useEffect, useState } from "react"
import { BiTrash } from "react-icons/bi"
import { useLocation, useNavigate } from "react-router-dom"
import { getTotal } from "../../utils/cart";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage(){

    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState(""); 

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("Please login first to checkout");
            navigate("/login");
            return;
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(
                (res)=>{
                    setUser(res.data);
                    setName(res.data.firstName + " " + res.data.lastName);
                }
            ).catch(
                (err)=>{
                    console.error(err);
                    toast.error("Please login first to checkout");
                    navigate("/login");
                    return;
                }
            )
        }
    }, [])

    const [cart, setCart] = useState(location.state.items || []);

   if (!location.state || !location.state.items) {
    toast.error("Please select items to checkout");
    navigate("/products");
    return null;
}

    
function getTotal() {
        let total = 0;
        cart.forEach(
            (item)=>{
                total += item.quantity * item.price;
            }
        );
        return total;
    }

    async function placeOrder(){
        const token = localStorage.getItem("token");
        if (token == null){
            toast.error("Please login first to palce an order");
            navigate("/login");
            return;
        }

        if(name === "" || address === "" || phone === ""){
            toast.error("Please fill all the fields");
            return;
        }

        const order = {
            address: address,
            phone: phone,
            items: []
        };
        cart.forEach((item)=>{
            order.items.push({
                productID: item.productId,
                qty: item.quantity
            })
        })
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/orders", order, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Order Placed Successfully");
            navigate("/products");

        } catch (err) {
            console.error(err);
            toast.error("Failed to place order");
            console.log(err);
            return;
        }
    }

    return (
  <div className="w-full h-full bg-[#F4F7F2] flex flex-col items-center py-10 px-4 text-[#2E3A2C]">

   
    <h1 className="text-4xl font-bold mb-10 text-[#1F2B1D]">
      Checkout
    </h1>

    
    {cart.map((item, index) => (
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
              const newCart = [...cart];
              newCart[index].quantity -= 1;
              if (newCart[index].quantity <= 0) {
                newCart.splice(index, 1);
              }
              setCart(newCart);
            }}
          >
            −
          </button>

          <span className="font-medium">{item.quantity}</span>

          <button
            className="w-8 h-8 rounded-full bg-[#3E5632] text-white hover:bg-[#2e4024]"
            onClick={() => {
              const newCart = [...cart];
              newCart[index].quantity += 1;
              setCart(newCart);
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
            const newCart = [...cart];
            newCart.splice(index, 1);
            setCart(newCart);
          }}
        >
          <BiTrash />
        </button>
      </div>
    ))}

    
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-[#DCE5D8] p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>

    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-[#DCE5D8] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="text-2xl font-bold">
        Total : Rs.
        {getTotal().toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </span>

      <button
        onClick={placeOrder}
        className="px-8 py-3 bg-[#3E5632] text-white rounded-full shadow hover:bg-[#2e4024] transition"
      >
        Place Order
      </button>
    </div>
  </div>
);
}
