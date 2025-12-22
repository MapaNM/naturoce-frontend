import axios from "axios";
import { useEffect, useState } from "react"
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductsPage(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [query, setQuery] = useState("");
    
    useEffect(
        () => {
            if(loading){
                if(query == ""){
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/products")
                    .then(
                    (res) => {
                        setProducts(res.data);
                        setLoading(false);
                    }
                )
                }else{
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/products/search/" + query).then(
                    (res) => {
                        setProducts(res.data);
                        setLoading(false);
                    }
                )
                }
                
            }
        },
        [loading]
    );

    return (
  <div className="w-full h-full bg-[#F4F7F2] font-serif text-[#2E3A2C]">

    
    <div className="w-full py-10 flex flex-col items-center gap-6">
      <input
        type="text"
        placeholder="Search natural products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setLoading(true);
        }}
        className="w-full max-w-md h-12 px-5 rounded-full border border-[#C8D4C2] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
      />
    </div>

    {loading ? (
      <Loader />
    ) : (
      <div className="w-full max-w-7xl mx-auto flex flex-wrap gap-8 justify-center px-6 pb-16">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}
      </div>
    )}
  </div>
);

}