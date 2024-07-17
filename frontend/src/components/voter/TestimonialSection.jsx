import { TestimonialCard } from "./TestimonialCard";

export const TestimonialSection = () => {
  return (
    <div className="py-12 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
          <p className="mt-4 text-md text-gray-600">
            What our users are saying about us.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard
            quote="This platform made voting so easy and transparent!"
            author="Jane Doe"
            role="Voter"
          />
          <TestimonialCard
            quote="I love the real-time updates. It keeps me informed."
            author="John Smith"
            role="Candidate"
          />
        </div>
      </div>
    </div>
  );
};
