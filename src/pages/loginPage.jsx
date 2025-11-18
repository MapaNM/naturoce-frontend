import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";


export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin({
         onSuccess: (response) =>
            { axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", { token: response.access_token })
         .then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
                toast.success("login successfully with google")
                if(response.data.role == "admin"){
                    navigate("/admin")
                }else if(response.data.role == "user"){
                    navigate("/")
                }
            }
           ).catch(
            ()=>{
                toast.error("failed to login with google")
            }
           )
        }
    })

    function login(){
        console.log(email, password)
        axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token", response.data.token)

                //const token = localStorage.getItem("token")

                toast.success("login successfully")
                if(response.data.role == "admin"){
                    //Go to Admin page
                    navigate("/admin")

                }else if(response.data.role == "user"){
                    //Go to home page
                    navigate("/")
                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("failed to login!")
            }
        )
    }

    return(
        <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center px-4">
        <div className="w-full max-w-md p-10 border border-white/30 backdrop-blur-md bg-white/80 shadow-2xl rounded-2xl flex flex-col items-center gap-6">

            <h1 className="text-4xl font-extrabold text-black tracking-wide">
            LOGIN
            </h1>

        
            <div className="w-full flex flex-col gap-1">
            <label className="text-lg font-medium text-black">Email :</label>
            <input type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-3 border border-gray-400 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black/40"
            />
            </div>

           
            <div className="w-full flex flex-col gap-1">
            <label className="text-lg font-medium text-black">Password :</label>
            <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-3 border border-gray-400 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black/40"
            />
            <p className="text-black text-sm mt-1">
                Forget Password?{" "}
                <Link to="/forget" className="text-zinc-700 underline">
                click here to reset
                </Link>
            </p>
            </div>

            
            <button onClick={login}
            className="w-full h-12 bg-black rounded-xl text-white text-lg font-medium hover:bg-zinc-800 transition-all duration-300"
            >
            Login
            </button>

            
            <button onClick={googleLogin}
            className="w-full h-12 bg-black rounded-xl text-white text-lg font-medium hover:bg-zinc-800 transition-all duration-300"
            >
            Google Login
            </button>

            <p className="text-black text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-zinc-700 underline">
                Sign up
            </Link>{" "}
            here
            </p>
        </div>
        </div>

    )
}