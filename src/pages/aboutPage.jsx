export default function AboutPage() {
  return (
    <div className="w-full h-full bg-[#F4F7F2] flex flex-col font-serif items-center text-[#2E3A2C]">
     
      <section className="max-w-5xl w-full py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">

        <div className="w-full h-[350px] bg-[url('/aboutbg2.jpg')] bg-cover bg-center rounded-2xl shadow-md">
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-[#4A5B42] leading-relaxed mb-6">
            Naturoce was created with one mission in mind — to bring truly natural, botanical, and eco‑friendly cosmetics to everyone. Our products are crafted with the finest organic ingredients sourced from nature, ensuring purity, safety, and long‑lasting beauty.
          </p>

          <p className="text-[#4A5B42] leading-relaxed mb-6">
            We believe in sustainability, cruelty‑free manufacturing, and providing gentle formulas suitable for all skin types. Every item we create reflects our passion for nature‑driven beauty.
          </p>
        </div>
      </section>

      <section className="w-full bg-[#E9F0E5] py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-[#4A5B42] leading-relaxed">
            Our mission is to inspire confidence through natural beauty. We focus on clean ingredients, transparent production, and eco-conscious packaging — ensuring that every customer experiences nature’s best in every product.
          </p>
        </div>
      </section>

      <section className="max-w-6xl w-full py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {[{ title: "100% Natural", desc: "We use only botanical and organic ingredients." },
          { title: "Eco‑Friendly", desc: "Our products and packaging are earth‑safe." },
          { title: "Cruelty‑Free", desc: "No animal testing — ever." }].map((item, index) => (
          <div key={index} className=" bg-[#E9F0E5]  border border-[#DCE5D8] p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="text-[#4A5B42]">{item.desc}</p>
          </div>
        ))}
      </section>

      <footer className="w-full bg-[#2E3A2C] text-white py-10 text-center mt-10">
        <p className="text-sm opacity-90">© {new Date().getFullYear()} Naruroce Cosmetics • Inspired by Nature</p>
      </footer>
    </div>
  );
}
