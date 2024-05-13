import React from 'react';

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful</h1>
        <p className="text-lg text-gray-700 mb-8">Thank you for your payment. Your transaction was successful.</p>
        <a href="/" className="text-blue-600 hover:underline">Return to Homepage</a>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
