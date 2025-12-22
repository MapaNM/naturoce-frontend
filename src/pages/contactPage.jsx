export default function ContactPage() {
  return (
    <div className="w-full h-full bg-[#F4F7F2] font-serif flex flex-col items-center text-[#2E3A2C]">

      <section className="max-w-6xl w-full py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <p className="text-[#4A5B42] leading-relaxed">
            Have questions about our products, orders, or partnerships? Reach out to Naturoce — we're always happy to help.
          </p>

          <div className="space-y-4">
            <p><span className="font-semibold">Email:</span> support@naturoce.com</p>
            <p><span className="font-semibold">Phone:</span> +94 71 234 5678</p>
            <p><span className="font-semibold">Location:</span> Sri Lanka</p>
          </div>
        </div>

        
        <div className="bg-white p-8 rounded-2xl shadow-md border border-[#DCE5D8]">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <form className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
            />

            <textarea
              placeholder="Your Message"
              className="p-3 rounded-xl border border-[#C8D4C2] min-h-[130px] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
            ></textarea>

            <button className="px-6 py-3 bg-[#3E5632] text-white rounded-full shadow hover:bg-[#2e4024] transition w-fit self-end">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="w-full bg-[#2E3A2C] text-white py-10 text-center">
        <p className="text-sm opacity-90">© {new Date().getFullYear()} Naruroce Cosmetics • Inspired by Nature</p>
      </footer>
    </div>
  );
}