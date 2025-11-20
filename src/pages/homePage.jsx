import skincareImg from "../assets/categories/skincare.jpg";
import makeupImg from "../assets/categories/makeup.jpg";
import haircareImg from "../assets/categories/haircare.jpg";


export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col font-serif items-center  text-[#2E3A2C]">
      {/* Hero Section */}
      <div className="w-full h-screen bg-[url('/homebg6.png')] bg-cover bg-center py-[8%] px-[8%]">
     <section className="w-full h-full flex items-center justify-center">
        <div className="bg-white/40 md:backdrop-blur-sm py-16 pr-15 pl-10   rounded-2xl shadow-xl text-center max-w-2xl border border-[#DCE5D8]">
          <h1 className="text-5xl font-bold  mb-2  text-[#2e4024]/80 md:flex font-serif"><img src="./logo-new.png" alt="" className="w-[400px] h-[50px] object-cover mb-3" />Cosmetics</h1>
          <p className="text-lg text-[#4A5B42] mb-8">Pure • Botanical • Natural Beauty</p>
          <button className="px-8 py-3 bg-[#3E5632] text-white rounded-full shadow-lg hover:bg-[#2e4024] transition">Shop Now</button>
        </div>
      </section>
        </div>

      {/* Featured Categories */}
    <div className="w-full  flex justify-center">
      <section className="max-w-6xl w-full py-10 px-6 ">
        <h2 className="text-4xl font-semibold mb-10 text-center text-[#2E3A2C]">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "Skincare", img: skincareImg },
            { title: "Makeup", img: makeupImg },
            { title: "Hair Care", img: haircareImg },
            ].map((item, index) => (
            <div
                key={index}
                className="rounded-2xl shadow-md overflow-hidden hover:scale-105 transition cursor-pointer bg-white border border-[#E3E9E0]"
            >
                <img
                src={item.img}
                alt={item.title}
                className="h-64 w-full object-cover"
                    />

                    <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#2F3C2E]">{item.title}</h3>
                    <p className="text-[#5F6F5A] text-sm mt-1">
                        Explore our natural {item.title.toLowerCase()} essentials.
                    </p>
                    </div>
                </div>
                ))}

        </div>
      </section>
          </div>
      {/* Promo Banner */}
      <div className="w-full bg-[#D9E4D1]  flex justify-center">
        <section className="w-full py-16 px-6 ">
        <div className="max-w-5xl mx-auto bg-[#3E5632] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <h3 className="text-3xl font-semibold">Enjoy 20% Off Your First Botanical Purchase!</h3>
          <button className="px-6 py-3 bg-white text-[#2F3C2E] rounded-full shadow hover:bg-gray-200 transition">Grab Offer</button>
        </div>
      </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#2E3A2C] text-white py-10 text-center">
        <p className="text-sm opacity-90">© {new Date().getFullYear()} Naturoce Cosmetics • Inspired by Nature</p>
      </footer>
    </div>
  );
}
