import Link from "next/link";

const BookingSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-green-500 mb-4">
          Booking Successful!
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          Thank you for booking. Your booking has been confirmed.
        </p>
        <div className="flex justify-center">
          <Link
            href={"/"}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
