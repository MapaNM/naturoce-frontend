import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductsPage from "./productsPage";
import ProductOverView from "./productOverView";
import CartPage from "./cart";
import CheckoutPage from "./checkpotPage";
import HomePage from "../homePage";
import ReviewsPage from "../reviewsPage";
import AboutPage from "../aboutPage";
import ContactPage from "../contactPage";

export default function ClientPage(){
    return(
        <div className="w-full h-screen max-h-screen">
            <Header/>

            <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center ">
                <Routes path="/">
                    <Route 
                    path="/" element={<HomePage/>}/>
                    
                    <Route 
                    path="/products" element={<ProductsPage/>} />

                    <Route 
                    path="/reviews" element={<ReviewsPage/>} />
                    
                    <Route 
                    path="/about-us" element={<AboutPage/>} />
                    
                    <Route 
                    path="/contact-us" element={<ContactPage/>} />

                    <Route
                    path="/cart" element={<CartPage/>} />

                    <Route
                    path="/overview/:productId" element={<ProductOverView/>} />

                     <Route
                    path="/checkout" element={<CheckoutPage/>} />
                    
                    <Route 
                    path="/*" element={<h1 className="text-3xl font-bold">404 Not Found</h1>} />
                </Routes>
            </div>
        </div>
      
        
    )
}