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

   return (
  <div className="w-full min-h-screen bg-[#F4F7F2] flex justify-center items-center px-4 text-[#2E3A2C]">

    
    {!emailSent && (
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#DCE5D8] p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1F2B1D] mb-2">
            Reset Password
          </h1>
          <p className="text-[#4A5B42]">
            Enter your email to receive an OTP
          </p>
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendOTP}
          className="w-full px-6 py-3 bg-[#3E5632] text-white rounded-full shadow hover:bg-[#2e4024] transition"
        >
          Send OTP
        </button>
      </div>
    )}

    
    {emailSent && (
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#DCE5D8] p-8 flex flex-col gap-5">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-[#1F2B1D] mb-2">
            Verify & Reset
          </h1>
          <p className="text-[#4A5B42]">
            Enter OTP and your new password
          </p>
        </div>

        <input
          type="text"
          placeholder="OTP Code"
          className="w-full p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={resetPassword}
          className="w-full px-6 py-3 bg-[#3E5632] text-white rounded-full shadow hover:bg-[#2e4024] transition mt-2"
        >
          Reset Password
        </button>
      </div>
    )}
  </div>
);

}