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

    return(
        <div className="w-full h-screen flex flex-col py-[40px] items-center">
            {
                cart.map(
                    (item , index)=>{
                        return(
                            <div key={item.productId} className="w-[800px] h-[100px] mt-[40px] shadow-2xl flex flex-row items-center relative">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover" />
                                <div className="w-[350px] h-full flex flex-col justify-center pl-[10px]">
                                    <span className="font-bold">{item.name}</span>
                                    <span className="font-bold "> Rs.{item.price.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                                </div>
                                <div className="w-[175px] h-full flex flex-row justify-center items-center">
                                    <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-400" onClick={
                                    ()=>{
                                        const newCart = [...cart]
                                       newCart[index].quantity -= 1;
                                       if(newCart[index].quantity <= 0){
                                        newCart.splice(index, 1);
                                       }
                                       setCart(newCart);
                                    }
                                } >-</button>
                                    <span className="mx-[10px]">{item.quantity}</span>
                                    <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-400" onClick={
                                    ()=>{
                                       const newCart = [...cart]
                                       newCart[index].quantity += 1;
                                       setCart(newCart);
                                    }
                                }>+</button>
                                </div>
                                <div className="w-[175px] h-full flex justify-end items-center pr-[10px]">
                                    <span className="font-bold "> Rs.{(item.quantity * item.price).toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                                </div>
                                <button className="w-[30px] h-[30px] absolute right-[-40px] bg-red-400 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-500 hover:bg-white hover:text-red-600 cursor-pointer" 
                                onClick={
                                    ()=>{
                                        const newCart = [...cart];
                                        newCart.splice(index, 1);
                                        setCart(newCart);
                                    }
                                }>
                                    <BiTrash className="text-xl"/>
                                </button>


                            </div>
                        )
                    }
                )
            }
             <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-center relative">
                <input className="border border-gray-300 rounded-lg p-[10px] m-[5px] w-[300px]" 
                        placeholder="Enter your name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} />

                <input className="border border-gray-300 rounded-lg p-[10px] m-[5px] w-[300px]" 
                        placeholder="Enter your address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} />

                <input className="border border-gray-300 rounded-lg p-[10px] m-[5px] w-[300px]" 
                        placeholder="Enter your phone number" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
                <span className="font-bold text-2xl">
                    Total : Rs.{getTotal().toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <button onClick={placeOrder} className="absolute left-[20px] w-[150px] h-[40px] bg-blue-600 text-white font-medium  rounded-lg cursor-pointer hover:bg-blue-900"
                >
                        Place Order
                </button>
                 
            </div>
            
        </div>
    )}
