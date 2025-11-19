export const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  </div>
);
