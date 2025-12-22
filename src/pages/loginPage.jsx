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

   return (
  <div className="w-full min-h-screen bg-[#F4F7F2] flex items-center justify-center px-6 text-[#2E3A2C]">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-[#DCE5D8]">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2B1D] mb-2">
          Welcome Back
        </h1>
        <p className="text-[#4A5B42]">
          Login to continue your natural journey
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          />

          <p className="text-sm text-[#5F6F5A] mt-2">
            Forgot password?{" "}
            <Link to="/forget" className="text-[#3E5632] font-medium hover:underline">
              Reset here
            </Link>
          </p>
        </div>

        <button
          onClick={login}
          className="mt-2 px-6 py-3 bg-[#3E5632] text-white rounded-full shadow hover:bg-[#2e4024] transition"
        >
          Login
        </button>
      </div>

      
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-[#DCE5D8]"></div>
        <span className="text-sm text-[#5F6F5A]">OR</span>
        <div className="flex-1 h-px bg-[#DCE5D8]"></div>
      </div>

      
      <button
        onClick={googleLogin}
        className="w-full px-6 py-3 bg-[#1F2B1D] text-white rounded-full shadow hover:bg-[#141c13] transition"
      >
        Continue with Google
      </button>

     
      <p className="text-center text-sm text-[#5F6F5A] mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[#3E5632] font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  </div>
)
}