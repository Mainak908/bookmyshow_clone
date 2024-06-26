const LoadingPage = ({ className }: any) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${className}`}
    >
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
    </div>
  );
};

export default LoadingPage;
