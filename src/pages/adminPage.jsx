import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import ProductAdminPage from "./admin/productsAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";
import UpdateProductAdminPage from "./admin/updateProductPage";
import OrderAdminPage from "./admin/orderPageAdmin";
import { use, useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";
export default function AdminPage(){
    const navigate = useNavigate();
    const [adminValidated, setAdminValidated] = useState(false);
    useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("Please login to access admin panel");
                navigate("/login");
            }else{
                axios.get(import.meta.env.VITE_BACKEND_URL +  "/users/",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }).then(
                    (res)=>{
                        if(res.data.role === "admin"){
                            setAdminValidated(true);
                        }else{
                            toast.error("You are not authorized to access admin panel");
                            navigate("/login");
                        }
                    }
                ).catch(
                    (err)=>{
                        toast.error("Please login to access admin panel");
                        navigate("/login");
                    }
                )
            }
        }
    ,[])
    return(
        <div className="w-full h-screen  flex">

           {adminValidated ? <>
            <div className="w-[300px] h-full flex flex-col items-center">
                <span className="text-4xl font-bold my-5">Admin Panel</span>
                <Link className="flex flex-row h-[60px] w-full pl-20  items-center gap-[20px] text-[20px]" to="/admin/products"><FaBoxArchive />Products</Link>
                <Link className="flex flex-row h-[60px] w-full pl-20 items-center gap-[20px] text-[20px]" to="/admin/orders"><MdOutlineBookmarkBorder />Orders</Link>
                <Link className="flex flex-row h-[60px] w-full pl-20  items-center gap-[20px] text-[20px]" to="/admin/users"><FaUsers />Users</Link>
                <Link className="flex flex-row h-[60px] w-full pl-20 items-center gap-[20px] text-[20px]" to="/admin/settings"><IoSettingsOutline />Settings</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full">
                <Routes path="/">
                    <Route path="/" element={<h1>Dashboard</h1>}></Route>
                    <Route path="/products" element={<ProductAdminPage/>}></Route>
                    <Route path="/newProduct" element={<AddProductAdminPage/>}></Route>
                    <Route path="/orders" element={<OrderAdminPage/>}></Route>
                    <Route path="/updateProduct" element={<UpdateProductAdminPage/>}></Route>
                </Routes>
            </div>
            </>:<Loader/> }
           
        </div>
    )
    
}