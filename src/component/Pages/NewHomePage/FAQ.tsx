import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
};

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      question: "What skin types are your products suitable for?",
      answer: "We understand that skincare can be complex, so we've gathered the most common questions to help guide you on your journey to healthy, beautiful skin. Find answers to your skincare concerns.",
      isOpen: true
    },
    {
      id: 2,
      question: "Are your products cruelty-free and vegan?",
      answer: "Yes, all our products are 100% cruelty-free and vegan. We never test on animals and don't use any animal-derived ingredients in our formulations. We're certified by Leaping Bunny and PETA.",
      isOpen: false
    },
    {
      id: 3,
      question: "How long will it take to see results?",
      answer: "Results vary depending on the product and your skin type. Most customers notice improvements within 2-4 weeks of consistent use. For concerns like hyperpigmentation and fine lines, optimal results typically develop after 8-12 weeks of regular application.",
      isOpen: false
    },
    {
      id: 4,
      question: "How should I store your skincare products?",
      answer: "For maximum efficacy and shelf life, store your products in a cool, dry place away from direct sunlight. Some products, particularly those containing vitamin C, may benefit from refrigeration. Always ensure containers are tightly closed after use.",
      isOpen: false
    },
    {
      id: 5,
      question: "How do I choose the right products for my skin?",
      answer: "We recommend taking our skin assessment quiz to receive personalized product recommendations. Alternatively, you can book a free virtual consultation with one of our skincare experts who can guide you through product selection based on your unique skin concerns and goals.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (id: number) => {
    setFaqs(
      faqs.map(faq => 
        faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return (
    <div className=" mx-auto px-20 py-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            We understand that skincare can be complex, so we've gathered the most common questions to help guide you on your journey to healthy, beautiful skin. Find answers to your skincare concerns.
          </p>
        </div>

        <div className="md:w-1/2">
          {faqs.map(faq => (
            <div 
              key={faq.id} 
              className={`mb-4 overflow-hidden rounded-lg transition-all duration-300 ${
                faq.isOpen ? "bg-sage-100" : "bg-gray-50"
              }`}
            >
              <button
                className={`flex items-center justify-between w-full p-6 text-left ${
                  faq.isOpen ? "bg-[#8ba57e] text-white" : "bg-gray-50"
                }`}
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {faq.isOpen ? (
                  <Minus className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 flex-shrink-0" />
                )}
              </button>
              {faq.isOpen && (
                <div className="p-6 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}