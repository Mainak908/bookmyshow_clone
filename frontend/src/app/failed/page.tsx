import Link from "next/link";

const BookingFailedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-red-500 mb-4">
          Booking Failed!
        </h2>
        <p className="text-lg text-gray-800 mb-6">sorry</p>
        <div className="flex justify-center">
          <Link
            href={"/"}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingFailedPage;
