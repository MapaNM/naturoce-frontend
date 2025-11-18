import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiTrash } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

const sampleProducts = [
     {
    productId: "P001",
    name: "Hydrating Face Cream",
    altNames: ["Moisturizer", "Daily Cream"],
    labelledPrice: 2500,
    price: 1999,
    images: ["/images/face-cream.jpg"],
    description: "A lightweight hydrating face cream that nourishes and softens skin. Perfect for daily use.",
    stock: 50,
    isAvailable: true,
    category: "skincare"
  },
  {
    productId: "P002",
    name: "Matte Liquid Lipstick",
    altNames: ["Lip Color", "Lip Paint"],
    labelledPrice: 1800,
    price: 1499,
    images: ["/images/liquid-lipstick.jpg"],
    description: "Long-lasting matte liquid lipstick with rich pigments for all-day wear.",
    stock: 100,
    isAvailable: true,
    category: "makeup"
  },
  {
    productId: "P003",
    name: "Aloe Vera Face Wash",
    altNames: ["Cleanser", "Gentle Face Wash"],
    labelledPrice: 1200,
    price: 950,
    images: ["/images/aloe-facewash.jpg"],
    description: "Refreshing aloe vera face wash that deeply cleanses while keeping skin hydrated.",
    stock: 80,
    isAvailable: true,
    category: "skincare"
  },
  {
    productId: "P004",
    name: "Herbal Shampoo",
    altNames: ["Anti-Dandruff Shampoo", "Natural Hair Wash"],
    labelledPrice: 1600,
    price: 1399,
    images: ["/images/herbal-shampoo.jpg"],
    description: "Herbal shampoo with natural extracts that gently cleanses and strengthens hair.",
    stock: 70,
    isAvailable: true,
    category: "haircare"
  },
  {
    productId: "P005",
    name: "Sunscreen SPF 50",
    altNames: ["Sunblock", "UV Protection Cream"],
    labelledPrice: 2200,
    price: 1899,
    images: ["/images/sunscreen.jpg"],
    description: "Broad-spectrum sunscreen with SPF 50 to protect against harmful UV rays.",
    stock: 90,
    isAvailable: true,
    category: "skincare"
  }
];

export default function ProductAdminPage(){

  const [productives, setProductives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [a, setA] = useState(0);

  useEffect(
    ()=>{
      if(isLoading){
          axios.get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then(
        (res)=>{
          setProductives(res.data);
          setIsLoading(false);
        }
      )
      }

    },[isLoading]);

  const navigate = useNavigate();

    return(
        <div className="h-full w-full border-[3px]">

          {isLoading ? (
            <Loader/>
          ) : (
            <table>
              <thead>
                  <tr>
                      <th className="p-[10px]">Image</th>
                      <th className="p-[10px]">Product ID</th> 
                      <th className="p-[10px]">Name</th>
                    <th className="p-[10px]">Category</th>
                    <th className="p-[10px]">Price</th>
                    <th className="p-[10px]">Labelled Price</th>
                    <th className="p-[10px]">Stock</th>
                    <th className="p-[10px]">Actions</th>
                     
                </tr>
            </thead>
            <tbody>
               {
                productives.map(
                    (product, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                  <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px] object-cover" />
                                </td>
                                <td className="p-[10px]">{product.productId}</td>
                                <td className="p-[10px]">{product.name}</td>
                                <td className="p-[10px]">{product.category}</td>
                                <td className="p-[10px]">{product.price}</td>
                                <td className="p-[10px]">{product.labelledPrice}</td>
                                <td className="p-[10px]">{product.stock}</td>
                                <td className="p-[10px] flex flex-row justify-center items-center gap-[10px]">
                                  <BiTrash className="bg-red-500 text-2xl text-white cursor-pointer rounded-full p-1" onClick={
                                    ()=>{
                                      const token = localStorage.getItem("token");
                                      if(!token){
                                        navigate("/login");
                                        return;
                                      }
                                      axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + product.productId, 
                                        {
                                          headers: {
                                            Authorization: `Bearer ${token}`
                                          }
                                        }
                                      ).then(
                                        (res) => {
                                          console.log("Product Delete Successfully");
                                          console.log(res.data);
                                          toast.success("Product Deleted Successfully");
                                          setIsLoading(!isLoading);
                                        }
                                      ).catch(
                                        (err) => {
                                          console.error(err);
                                          toast.error("Error in Deleting Product");
                                        }
                                      );
                                    }
                                  }/>
                                  <BiEdit onClick={
                                    ()=>{
                                      navigate("/admin/updateProduct" , {
                                        state: product
                                      })
                                    }
                                  } className="bg-blue-500 text-2xl text-white cursor-pointer rounded-full p-1"/>
                                </td>
                            </tr>
                        );
                    }
                )}
            </tbody>
          </table>)}

            <Link to={"/admin/newProduct"} className="fixed right-[60px] bottom-[60px] p-[20px] bg-black rounded-full cursor-pointer">
                <PiPlus className="text-3xl text-white"/>

            </Link>
             
        </div>
    )
}