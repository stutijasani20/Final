import React from "react";


const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              About Our Airline
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              gravida justo eget velit pretium, nec dictum ipsum gravida.
              Integer efficitur mi eu massa maximus, sed lobortis arcu
              consectetur. Proin suscipit enim ac tempor placerat. Donec
              tristique enim et tortor mollis, nec vestibulum dui ultricies.
              Suspendisse potenti. Sed dignissim metus in odio efficitur, at
              congue metus ullamcorper.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Nullam nec quam sed nunc commodo congue eget in velit. Nam
              elementum risus eget tellus cursus interdum. Duis euismod justo
              ut convallis volutpat. Maecenas non commodo nulla. Ut tempor
              sapien non dolor sollicitudin, at convallis est scelerisque.
              Quisque nec leo risus.
            </p>
          </div>
          <div>
            <img
              src="/2.jpeg"
              alt="Airplane"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            gravida justo eget velit pretium, nec dictum ipsum gravida.
            Integer efficitur mi eu massa maximus, sed lobortis arcu
            consectetur.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            gravida justo eget velit pretium, nec dictum ipsum gravida.
            Integer efficitur mi eu massa maximus, sed lobortis arcu
            consectetur.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            gravida justo eget velit pretium, nec dictum ipsum gravida.
            Integer efficitur mi eu massa maximus, sed lobortis arcu
            consectetur.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our History
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            gravida justo eget velit pretium, nec dictum ipsum gravida.
            Integer efficitur mi eu massa maximus, sed lobortis arcu
            consectetur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
