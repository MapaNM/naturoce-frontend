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

   return (
  <div className="w-full min-h-screen bg-[#F4F7F2] px-4 md:px-10 py-10 text-[#2E3A2C]">

    {status === "loading" && <Loader />}

    {status === "success" && (
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">

        
        <h1 className="text-3xl font-bold text-center md:hidden">
          {product.name}
          <span className="block text-lg font-medium text-[#4A5B42]">
            {product.altNames.join(" | ")}
          </span>
        </h1>

        
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md border border-[#DCE5D8] p-6 flex justify-center items-center">
          <ImageSlider images={product.images} />
        </div>

        
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:pt-6">

          
          <h1 className="text-3xl font-bold hidden md:block">
            {product.name}
            <span className="block text-lg font-medium text-[#4A5B42]">
              {product.altNames.join(" | ")}
            </span>
          </h1>

          
          <p className="text-lg leading-relaxed text-[#4A5B42]">
            {product.description}
          </p>

          
          <div className="flex items-center gap-4 mt-2">
            {product.labelledPrice > product.price ? (
              <>
                <span className="text-xl font-semibold line-through text-[#8A9A85]">
                  Rs.
                  {product.labelledPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-3xl font-bold text-[#1F2B1D]">
                  Rs.
                  {product.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-[#1F2B1D]">
                Rs.
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          </div>

          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="px-8 py-3 rounded-full bg-[#E3E9E0] text-[#2E3A2C] font-medium hover:bg-[#D2DCCC] transition"
              onClick={() => {
                addToCart(product, 1);
                toast.success("Product added to cart");
                console.log(getCart());
              }}
            >
              Add to Cart
            </button>

            <button
              className="px-8 py-3 rounded-full bg-[#3E5632] text-white font-medium hover:bg-[#2e4024] transition"
              onClick={() => {
                navigate("/checkout", {
                  state: {
                    items: [
                      {
                        productId: product.productId,
                        quantity: 1,
                        name: product.name,
                        image: product.images[0],
                        price: product.price,
                      },
                    ],
                  },
                });
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    )}

    {status === "error" && (
      <h1 className="text-red-500 text-center mt-10">
        Error loading product
      </h1>
    )}
  </div>
);

}