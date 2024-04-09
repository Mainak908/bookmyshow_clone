const LoadingPage = ({ className }: any) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${className}`}
    >
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      <h2 className="mt-4 text-gray-600 text-lg">Loading...</h2>
    </div>
  );
};

export default LoadingPage;
