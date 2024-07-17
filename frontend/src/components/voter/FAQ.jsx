// FAQ.js
import React, { useState } from "react";

export const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  const faqs = [
    {
      question: "What can this app be used for?",
      answer: "This app can be used to conduct elections easily and securely.",
    },
    {
      question: "How can I register?",
      answer:
        "You can register by clicking the 'Register' button and filling in your details.",
    },
    {
      question: "How does voting work?",
      answer:
        "Voting works by clicking the 'Vote' button and selecting your preferred candidate.",
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-md text-gray-600">
            Find answers to the most frequently asked questions here.
          </p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <button
                  className="text-2xl font-bold text-blue-500"
                  onClick={() => toggleFAQ(index)}
                >
                  {openFAQ === index ? (
                    <i className="bi bi-arrow-up-short"></i>
                  ) : (
                    <i className="bi bi-arrow-down-short"></i>
                  )}
                </button>
              </div>
              {openFAQ === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
