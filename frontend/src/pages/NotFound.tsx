import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-8xl font-extrabold text-red-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex justify-center items-center px-6 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Go to Homepage
          </Link>

          <Link
            to="/contact"
            className="inline-flex justify-center items-center px-6 py-3 rounded-md border border-red-600 text-red-600 font-semibold hover:bg-red-100 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
