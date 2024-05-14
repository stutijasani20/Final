"use client";
import React from "react";
import withLoading from "../components/withLoading";
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6 mb-6">
      <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">
        About Elegance Air Airlines
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 font-serif">
          Welcome Aboard!
        </h2>
        <p className="text-lg text-gray-700">
          Elegance Air Airlines is committed to providing the best travel
          experience for our passengers. Whether you are traveling for business
          or pleasure, we ensure a seamless journey with top-notch services.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg text-gray-700">
          Our mission is to offer luxurious and comfortable flights to
          destinations all around the world. With modern aircraft equipped with
          state-of-the-art amenities, we prioritize your comfort and safety.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc text-lg text-gray-700 pl-6">
          <li>Personalized services</li>
          <li>Delectable cuisine</li>
          <li>Entertainment options</li>
          <li>Hassle-free experience</li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Performance Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PerformanceHighlight
            image="/time.png"
            alt="On-time Performance"
            text="On-time performance"
          />
          <PerformanceHighlight
            image="/money.png"
            alt="Affordable Prices"
            text="Affordable Prices"
          />
          <PerformanceHighlight
            image="/service.png"
            alt="Hassle-free Services"
            text="Hassle-free Services"
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Our Footprint</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FootprintCard
          icon="/share.png"
          alt="market"
          title="Domestic Share Market"
          data="Achieved a remarkable 62% increase in domestic market share compared to the
           same period last year. This significant growth demonstrates 
          our strong presence and popularity among domestic travelers."
        />
        <FootprintCard
          icon="/air.png"
          alt="Air"
          title="7th largest Airline"
          data="We proudly hold the title of the 7th largest airline in the world, based on 
          passenger traffic and fleet size. Our global reach and commitment to 
          excellence have positioned us among the top airlines."
        />
        <FootprintCard
          icon="/plane.png"
          alt="flights"
          title="2000+ daily flights"
          data="Elegance Air Airlines operates a robust network of over 2000 daily flights, 
          connecting passengers to destinations across the globe. Our commitment to providing a 
          seamless travel experience extends to every flight."
        />
        <FootprintCard
          icon="/workers.png"
          alt="force"
          title="Work Force 36K+"
          data="We are proud to have a 
          dedicated workforce of over 36,000 employees globally, including 44.96% women. We aim to reduce our ecological footprint and contribute to a
          more sustainable future for aviation."
        />
      </div>
      <h2 className="text-2xl font-semibold mt-4 mb-4">Our Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AchievementCard icon="/air.webp" title="2000+ Daily Flights" />
        <AchievementCard icon="/india.png" title="80+ Domestic Destinations" />
        <AchievementCard
          icon="/world.png"
          title="30+ International Destinations"
        />
        <AchievementCard
          icon="/passenger.png"
          title="500 million+ Happy Passengers"
        />
        <AchievementCard icon="/fleet.png" title="300+ Fleet" />
      </div>

      <p className="text-lg text-gray-700 mb-8 mt-8">
        We also prioritize sustainability and environmental responsibility,
        striving to minimize our carbon footprint and contribute to a greener
        future.
      </p>
    </div>
  );
};

const AchievementCard: React.FC<{ icon: string; title: string }> = ({
  icon,
  title,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Image alt={title} src={icon} width={100} height={100} className="mb-4" />
      <h3 className="text-xl font-semibold text-center">{title}</h3>
    </div>
  );
};

const PerformanceHighlight: React.FC<{
  image: string;
  alt: string;
  text: string;
}> = ({ image, alt, text }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image alt={alt} src={image} width={100} height={100} />
      <p className="mt-2 text-lg text-center">{text}</p>
    </div>
  );
};

// Component for each footprint card
const FootprintCard: React.FC<{
  icon: string;
  alt: string;
  title: string;
  data: string;
}> = ({ icon, alt, title, data }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg flex flex-col justify-between">
      <div className="flex items-center mb-4">
        <Image
          alt={alt}
          src={icon}
          width={100}
          height={100}
          className="h-10 w-10 mr-4"
        />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-700">{data}</p>
    </div>
  );
};

export default withLoading(AboutPage);
