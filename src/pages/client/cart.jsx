import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart"
import { BiTrash } from "react-icons/bi"
import { useNavigate } from "react-router-dom";

export default function CartPage(){


    const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();
    console.log(cart);

    return(
        <div className="w-full h-full flex flex-col md:py-[20px] py-[20px]  items-center ">
            {
                cart.map(
                    (item)=>{
                        return(
                        
                            <div key={item.productId} className=" md:w-[800px] w-full h-[300px] md:mt-[20px] shadow-2xl flex md:flex-row flex-col  items-center relative ">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover mt-[20px] md:mt-0" />
                                <div className="w-[350px] h-full flex flex-col justify-center pl-[10px]">
                                    <span className="font-bold">{item.name}</span>
                                    <span className="font-bold "> Rs.{item.price.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                                </div>
                                <div className="w-full md:w-[175px] h-full flex flex-row justify-center items-center">
                                    <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-400" onClick={
                                    ()=>{
                                        addToCart(item, -1)
                                        setCart(getCart())
                                    }
                                } >-</button>
                                    <span className="mx-[10px]">{item.quantity}</span>
                                    <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-400" onClick={
                                    ()=>{
                                        addToCart(item, 1)
                                        setCart(getCart())
                                    }
                                }>+</button>
                                </div>
                                <div className="w-[175px] h-full flex justify-end items-center pr-[10px] ">
                                    <span className="font-bold "> Rs.{(item.quantity * item.price).toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                                </div>
                                <button className="w-[30px] h-[30px] absolute right-[-40px] bg-red-400 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-500 hover:bg-white hover:text-red-600 cursor-pointer " 
                                onClick={
                                    ()=>{
                                        addToCart(item, -item.quantity)
                                        setCart(getCart())
                                    }
                                }>
                                    <BiTrash className="text-xl"/>
                                </button>


                            </div>
                            
                        )
                    }
                )
            }
            <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end relative">
                <span className="font-bold text-2xl">
                    Total : Rs.{getTotal().toLocaleString("en-US", {minimumFractionDigits: 2})}
                </span>
                <button className="absolute left-[20px] w-[150px] h-[40px] bg-blue-600 text-white font-medium  rounded-lg cursor-pointer hover:bg-blue-900"
                onClick={
                    ()=>{
                        navigate("/checkout", { state: { items: cart }});
                    }
                }>
                    Checkout
                </button>
                 
            </div>
            
        </div>
           
       
        
    );
}