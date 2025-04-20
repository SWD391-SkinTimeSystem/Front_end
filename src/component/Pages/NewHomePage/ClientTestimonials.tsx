import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jenna Milton",
    role: "Beauty Blogger",
    content: "I've been using the Radiant Glow Moisturizer for just a week, and my skin has never felt so soft! It absorbs quickly without leaving any greasy residue, and the hydration lasts all day. My skin looks brighter, smoother, and I've even noticed fewer fine lines. This has become a must-have in my skincare routine!",
    avatar: "/api/placeholder/40/40",
    rating: 5
  },
  {
    id: 2,
    name: "Sharon Roberts",
    role: "Marketing Executive",
    content: "The Brightening Vitamin C Serum is a game-changer! I've been using it for a month, and the results are incredible. My dark spots have noticeably faded, and my complexion has never looked so even. My skin glows in a way I haven't seen in years, and I feel more confident going makeup-free!",
    avatar: "/api/placeholder/40/40",
    rating: 5
  },
  {
    id: 3,
    name: "Amanda R.",
    role: "Fitness Trainer",
    content: "I've struggled for years to find a sunscreen that works for my sensitive skin, and the Daily Defense Sunscreen SPF 50 is perfect! It's lightweight, non-greasy, and doesn't leave a white cast. I wear it every day, even under makeup, and it keeps my skin protected without causing any breakouts. I finally found the one!",
    avatar: "/api/placeholder/40/40",
    rating: 5
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-[#F8FCF3] rounded-lg p-6 shadow-sm">
      <p className="text-gray-700 mb-6">{testimonial.content}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={testimonial.avatar}
            alt={`${testimonial.name}'s avatar`}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h4 className="font-medium text-lg">{testimonial.name}</h4>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
};

export default function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = 3;
  const totalTestimonials = testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % Math.ceil(totalTestimonials / visibleTestimonials)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 
        ? Math.ceil(totalTestimonials / visibleTestimonials) - 1 
        : prevIndex - 1
    );
  };

  const startIdx = currentIndex * visibleTestimonials;
  const displayedTestimonials = testimonials.slice(startIdx, startIdx + visibleTestimonials);

  return (
    <div className=" mx-auto px-20 py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our clients love their results, and we are proud to share their experiences. Hear 
          from real customers who've transformed their skin with our expert care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        <button 
          onClick={prevSlide}
          className="rounded-full bg-gray-200 p-3 hover:bg-gray-300 transition-colors"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={nextSlide}
          className="rounded-full bg-[#8bc34a] p-3 hover:bg-green-600 text-white transition-colors"
          aria-label="Next testimonials"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}