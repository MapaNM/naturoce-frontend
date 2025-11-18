import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";

export default function ForgetPasswordPage(){

    const[emailSent, setEmailSent] = useState(false);
    const[email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function sendOTP(){
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/send-otp", {email: email});
            toast.success("OTP Send Successfully");
            setEmailSent(true);
        } catch {
            toast.error("Failed to send OTP")
        }
    }

    async function resetPassword(){
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/reset-password", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password Reset Successfully");
        } catch {
            toast.error("Failed to reset password")
        }
    }

    return(
        <div className="w-full h-full flex justify-center items-center text-secondary">
            {!emailSent&&<div className="w-[500px] h-[500px] bg-accent shadow-2xl flex flex-col justify-center items-center">
                <h1 className="text-2xl bold pb-5">Reset Password</h1>
                <input type="email" placeholder="Enter your email.." className="w-[350px] h-[40px] border border-white rounded-xl text-center"
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <button onClick={sendOTP} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-secondary">Send OTP</button>

            </div>}
           {
            emailSent&&<div className="w-[500px] h-[600px] bg-accent shadow-2xl flex flex-col justify-center items-center">
                <h1 className="text-2xl bold pb-5">Enter OTP and New Password</h1>
                <input type="text" placeholder="Enter OTP.." className="w-[350px] h-[40px] border border-white rounded-xl text-center mb-4"
                    onChange={(e)=> setOtp(e.target.value)}
                />
                <input type="password" placeholder="Enter New Password.." className="w-[350px] h-[40px] border border-white rounded-xl text-center mb-4"
                    onChange={(e)=> setNewPassword(e.target.value)}
                />
                <input type="password" placeholder="Confirm New Password.." className="w-[350px] h-[40px] border border-white rounded-xl text-center mb-4"
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                />
                <button onClick={resetPassword} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-secondary">Reset Password</button>

            </div>
           }
            
        </div>
    )
}