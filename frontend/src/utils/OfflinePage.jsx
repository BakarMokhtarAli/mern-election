export const OfflinePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m-6-8h6m2 4a8 8 0 11-16 0 8 8 0 0116 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Connection Lost
        </h1>
        <p className="text-gray-600 mb-8">
          Internet-kaaga wuu xunyahay. Fadlan hubi xiriirkaaga shabakadda.
        </p>
      </div>
    </div>
  );
};
