import React from 'react';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const ThankYouPage = ({ onContinueShopping, orderNumber = "NK" + Math.random().toString(36).substr(2, 9).toUpperCase() }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Shopping!</h1>
          <p className="text-gray-600">Your order has been placed successfully</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <Package className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Order Number</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{orderNumber}</p>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p>You will receive an email confirmation shortly.</p>
          <p>We'll notify you when your order ships!</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onContinueShopping}
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;