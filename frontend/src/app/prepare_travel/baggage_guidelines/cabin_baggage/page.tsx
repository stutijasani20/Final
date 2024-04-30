import React from "react";
import "tailwindcss/tailwind.css";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold text-center">Hello, Tailwind CSS!</h1>
      <p className="text-gray-600">This is a paragraph with Tailwind styling.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </div>
  );
}
