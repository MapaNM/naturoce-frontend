import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";


export default function ProductOverView(){

    const params = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading"); // loading, error, success
    
    useEffect(
        () => {
            if(status === "loading"){
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${params.productId}`).then(
                    (res) => {
                        setProduct(res.data);
                        setStatus("success");
                    }
                ).catch(
                    () => {
                        setStatus("error");
                        toast.error("Error loading product");
                    }
                )
            }
        },[status]
    )

    return(
        <div className="w-full h-full">
            {
                status === "loading" && <Loader/>
            }
            {
                status === "success" && 
                <div className="w-full h-full flex flex-col md:flex-row ">
                    
                        <h1 className="text-3xl pt-5 font-bold text-center md:hidden">{product.name} <span className="text-xl flex flex-col font-medium">{product.altNames.join(" | ")}</span></h1>
                        <div className="w-full  h-full md:w-[49%] flex flex-col justify-center items-center ">
                        <ImageSlider images={product.images}/>
                    </div>
                    <div className="w-full  h-full md:w-[49%] flex flex-col  md:mt-[8%] md:mr-[8%]">
                        <h1 className="text-3xl font-bold text-center hidden md:block">{product.name} <span className="text-xl font-medium">{product.altNames.join(" | ")}</span></h1>
                        <p className="text-lg font-light mt-[20px] p-5 text-center">{product.description}</p>
                        <div className="w-full  flex flex-col  items-center mt-[20px]">
                            {
                                product.labelledPrice > product.price ?
                                <div>
                                    <span className="text-2xl font-bold  line-through mr-[10px]">Rs.{product.labelledPrice.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                                    <span className="text-3xl font-bold "> Rs.{product.price.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                                </div>
                                :
                                <div>
                                <span className="text-3xl font-bold "> Rs.{product.price.toLocaleString("en-US", {minimumFractionDigits: 2})}</span>
                                </div>
                            }

                        </div>
                        <div className="w-full  flex flex-row justify-center items-center mt-[20px] gap-5 " >
                            <button className="w-[150px] h-[40px] bg-gray-300 text-black font-medium  rounded-lg cursor-pointer hover:bg-gray-400"
                            onClick={
                                ()=>{
                                    addToCart(product, 1)
                                    toast.success("Product added to cart")
                                    console.log(getCart())
                                }
                            }>Add to Cart</button>
                            <button onClick={
                                ()=>{
                                    navigate("/checkout", { state: {
                                        items: [
                                            {
                                                productId: product.productId,
                                                quantity: 1,
                                                name: product.name,
                                                image: product.images[0],
                                                price: product.price

                                            }
                                        ]
                                    }});
                                }
                            } className="w-[150px] h-[40px] bg-blue-600 text-white font-medium  rounded-lg cursor-pointer hover:bg-blue-900">Buy Now</button>
                        </div>

                    </div>
                    
                </div>
            }
            {
                status === "error" && <h1 className="text-red-500">Error loading product</h1>
            }
            
        </div>
    )
}