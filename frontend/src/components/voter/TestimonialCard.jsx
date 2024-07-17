export const TestimonialCard = ({ quote, author, role }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <p className="italic text-gray-700">{quote}</p>
      <p className="mt-4 font-bold text-gray-900">{author}</p>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};
