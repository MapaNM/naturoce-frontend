export default function ReviewsPage() {
  return (
    <div className="w-full h-full bg-[#F4F7F2] font-serif flex flex-col items-center py-10 px-6 text-[#2E3A2C]">
      {/* Page Header */}
      <h1 className="text-4xl font-bold mb-10 text-center">Customer Reviews</h1>

      {/* Reviews Container */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((review) => (
          <div
            key={review}
            className="bg-white p-6 rounded-2xl shadow-md border border-[#DCE5D8] hover:shadow-xl transition"
          >
            {/* Reviewer */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#D9E4D1] rounded-full"></div>
              <div>
                <h3 className="font-semibold text-lg">Customer {review}</h3>
                <p className="text-sm text-[#5F6F5A]">Verified Buyer</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500 text-xl">★</span>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-[#4A5B42] leading-relaxed">
              "Amazing botanical product! Loved the natural scent and quality. Highly recommended for anyone looking for clean and safe cosmetics."
            </p>
          </div>
        ))}
      </div>

      {/* Add Review Section */}
      <div className="max-w-3xl w-full bg-white mt-16 p-8 rounded-2xl shadow-md border border-[#DCE5D8]">
        <h2 className="text-2xl font-semibold mb-6">Leave a Review</h2>

        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Your name"
            className="w-full p-3 rounded-xl border border-[#C8D4C2] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          />

          <textarea
            placeholder="Write your review..."
            className="w-full p-3 rounded-xl border border-[#C8D4C2] min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#3E5632]"
          ></textarea>

          <button className="px-6 py-3 bg-[#3E5632] text-white rounded-full shadow hover:bg-[#2e4024] transition w-fit self-end">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
