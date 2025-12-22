export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen bg-[#F4F7F2] flex items-center justify-center px-6 text-[#2E3A2C]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-[#DCE5D8]">
    
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2B1D] mb-2">Create Account</h1>
          <p className="text-[#4A5B42]">Join Naturoce for natural beauty</p>
        </div>

    
        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          />

          <button className="mt-2 px-6 py-3 bg-[#3E5632] text-white rounded-full shadow hover:bg-[#2e4024] transition">
            Register
          </button>
        </form>

    
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#DCE5D8]"></div>
          <span className="text-sm text-[#5F6F5A]">OR</span>
          <div className="flex-1 h-px bg-[#DCE5D8]"></div>
        </div>

    
        <p className="text-center text-sm text-[#5F6F5A]">
          Already have an account?{' '}
          <span className="text-[#3E5632] font-semibold cursor-pointer hover:underline">Login</span>
        </p>
      </div>
    </div>
  );
}
