import React from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import withLoading from "./components/withLoading";
const MiddleSection: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl italic font-semibold text-center mb-8">
            Explore Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Flight Booking"
              description="Book your flights hassle-free with our easy-to-use booking system."
              icon="✈️"
            />
            <ServiceCard
              title="Travel Destinations"
              description="Discover our wide range of travel destinations and plan your next adventure."
              icon="🌍"
            />
            <ServiceCard
              title="Customer Support"
              description="Our dedicated customer support team is available 24/7 to assist you."
              icon="📞"
            />
            <ServiceCard
              title="Complimentary Amenities"
              description="Enjoy a range of complimentary amenities onboard, ensuring a comfortable and enjoyable journey."
              icon="🎁"
            />

            <ServiceCard
              title="Exclusive Deals and Discounts"
              description="Unlock exclusive deals and discounts when you book with us, saving you money on your travels."
              icon="💰"
            />

            <ServiceCard
              title="Flexible Booking Options"
              description="Choose from a variety of flexible booking options, including refundable fares and date changes."
              icon="📅"
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl italic font-semibold text-center mb-8">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <OfferCard
              title="Spring Sale"
              image="/spring.webp"
              discount="Up to 30% off"
              expiry="Expires on May 31, 2024"
              description="Book now and save on your spring travels."
            />
            <OfferCard
              title="Family Package"
              image="/family-cover.jpg"
              discount="Kids fly free"
              expiry="Limited time offer"
              description="Travel with your family and enjoy special discounts."
            />
            <OfferCard
              title="Weekend Getaway"
              image="/weekend4.jpg"
              discount="20% off"
              expiry="Valid for weekends"
              description="Escape for a weekend and save on your flight."
            />
            <OfferCard
              title="Summer Vacation Sale"
              image="/summer.jpg"
              discount="Up to 40% off"
              expiry="Expires on August 31, 2024"
              description="Book now and enjoy huge discounts on your summer vacation packages."
            />

            <OfferCard
              title="Last Minute Deals"
              image="/last_minute.webp"
              discount="Save big on last-minute bookings"
              expiry="Limited time offer"
              description="Don't miss out on our last-minute deals! Book now and travel soon."
            />

            <OfferCard
              title="Adventure Package"
              image="/adventure.avif"
              discount="20% off adventure trips"
              expiry="Valid for bookings made in June"
              description="Embark on an adventure and save with our exclusive adventure package discounts."
            />

            <OfferCard
              title="Winter Wonderland"
              image="/winter.jpg"
              discount="Special winter rates"
              expiry="Expires on December 31, 2024"
              description="Experience the magic of winter with our special winter wonderland offers."
            />

            <OfferCard
              title="Holiday Bonanza"
              image="/holiday.jpg"
              discount="Holiday season discounts"
              expiry="Valid for bookings from November to January"
              description="Celebrate the holidays with our exclusive holiday bonanza discounts."
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl italic font-semibold text-center mb-8">
            Explore Featured Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DestinationCard
              title="Paris, France"
              image="/paris.jpg"
              description="Experience the charm of the city of love."
            />
            <DestinationCard
              title="Rome, Italy"
              image="/rome.avif"
              description="Discover the ancient wonders of the Eternal City."
            />

            <DestinationCard
              title="Bali, Indonesia"
              image="/bali.webp"
              description="Relax on pristine beaches and explore lush landscapes."
            />

            <DestinationCard
              title="Cape Town, South Africa"
              image="/capetown.jpg"
              description="Experience the breathtaking beauty of the Mother City."
            />

            <DestinationCard
              title="Kyoto, Japan"
              image="/kyoto.avif"
              description="Immerse yourself in the rich culture and history of Kyoto."
            />

            <DestinationCard
              title="Sydney, Australia"
              image="/sydney.webp"
              description="Explore the iconic landmarks and vibrant culture of Sydney."
            />

            <DestinationCard
              title="Tokyo, Japan"
              image="/tokyo.jpg"
              description="Discover the blend of tradition and modernity."
            />
            <DestinationCard
              title="New York City, USA"
              image="/nyc.webp"
              description="Explore the city that never sleeps."
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl italic font-semibold text-center mb-8">
            Featured Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PackageCard
              name="Paris Getaway"
              image="/paris2.webp"
              price="999"
              duration="5 Days / 4 Nights"
              includes={["Flight", "Accommodation", "City Tour"]}
            />
            <PackageCard
              name="Tropical Escape"
              image="/tropical.avif"
              price="1299"
              duration="7 Days / 6 Nights"
              includes={["Flight", "Resort Stay", "Activities"]}
            />
            <PackageCard
              name="European Adventure"
              image="/europe.jpg"
              price="1999"
              duration="10 Days / 9 Nights"
              includes={[
                "Multiple Destinations",
                "Guided Tours",
                "Transportation",
              ]}
            />
            <PackageCard
              name="City Explorer"
              image="/cityexplorer.jpeg"
              price="15,999"
              duration="4 Days / 3 Nights"
              includes={[
                "Flight tickets",
                "City center hotel accommodation",
                "Sightseeing tours",
              ]}
            />

            <PackageCard
              name="Beach Paradise"
              image="/beach.jpg"
              price="28,499"
              duration="6 Days / 5 Nights"
              includes={[
                "Flight tickets",
                "Beach resort accommodation",
                "Water sports activities",
              ]}
            />

            <PackageCard
              name="Historical Journey"
              image="/1020.jpg"
              price="23,999"
              duration="7 Days / 6 Nights"
              includes={[
                "Flight tickets",
                "Historic hotel accommodation",
                "Guided historical tours",
              ]}
            />

            <PackageCard
              name="Ski Adventure"
              image="/groups.jpg"
              price="35,999"
              duration="9 Days / 8 Nights"
              includes={[
                "Flight tickets",
                "Ski lodge accommodation",
                "Skiing and snowboarding",
              ]}
            />

            <PackageCard
              name="Cultural Expedition"
              image="/back.jpg"
              price="42,999"
              duration="12 Days / 11 Nights"
              includes={[
                "Flight tickets",
                "Cultural immersion experiences",
                "Local cuisine sampling",
              ]}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl italic font-semibold text-center mb-8">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Comfortable Seating"
              icon="✈️"
              description="Enjoy spacious and comfortable seating throughout your journey."
            />
            <FeatureCard
              title="In-flight Entertainment"
              icon="🎥"
              description="Access a wide range of movies, TV shows, and music during your flight."
            />
            <FeatureCard
              title="Gourmet Dining"
              icon="🍽️"
              description="Indulge in delicious gourmet meals prepared by our expert chefs."
            />
            <FeatureCard
              title="Spacious Cabin"
              icon="🛋️"
              description="Enjoy ample space to stretch out and relax during your flight."
            />
            <FeatureCard
              title="Wi-Fi Connectivity"
              icon="📶"
              description="Stay connected with high-speed Wi-Fi available throughout the flight."
            />
            <FeatureCard
              title="Personalized Service"
              icon="🎩"
              description="Experience personalized service from our attentive flight crew."
            />
            <FeatureCard
              title="Onboard Amenities"
              icon="🛁"
              description="Access to premium amenities such as blankets, pillows, and toiletries."
            />
            <FeatureCard
              title="Business Class Upgrade"
              icon="💼"
              description="Upgrade to our luxurious business class for enhanced comfort and services."
            />
            <FeatureCard
              title="Priority Boarding"
              icon="🛫"
              description="Skip the lines and board the aircraft first with our priority boarding service."
            />
            <FeatureCard
              title="Child-Friendly Services"
              icon="👶"
              description="Special amenities and services tailored for young travelers, including kid-friendly meals and entertainment."
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl italic font-semibold text-center mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="John Doe"
              location="Los Angeles, USA"
              quote="Amazing experience! I booked my flight with ease and enjoyed excellent service throughout my journey."
              rating={4.5}
            />
            <TestimonialCard
              name="Emily Smith"
              location="New York City, USA"
              quote="The airline staff were incredibly helpful and made my journey seamless."
              rating={4}
            />

            <TestimonialCard
              name="Michael Johnson"
              location="Chicago, USA"
              quote="I had a wonderful experience flying with this airline. Highly recommended!"
              rating={5}
            />

            <TestimonialCard
              name="Sophia Martinez"
              location="Miami, USA"
              quote="From booking to landing, everything was smooth and hassle-free."
              rating={4.8}
            />

            <TestimonialCard
              name="Oliver Brown"
              location="London, UK"
              quote="Excellent service and comfortable flights. Will definitely fly again!"
              rating={3.7}
            />

            <TestimonialCard
              name="Isabella Wilson"
              location="Sydney, Australia"
              quote="Friendly staff and great amenities. Made my long-haul flight enjoyable."
              rating={4}
            />

            <TestimonialCard
              name="Jane Smith"
              location="London, UK"
              quote="Highly recommended! The airline staff were friendly and helpful, and I had a comfortable flight."
              rating={3.9}
            />
            <TestimonialCard
              name="David Johnson"
              location="Sydney, Australia"
              quote="Outstanding service! I've traveled with many airlines, but this one exceeded my expectations."
              rating={4.5}
            />
          </div>
        </div>
      </div>
    </>
  );
};
const OfferCard: React.FC<{
  title: string;
  image: string;
  discount: string;
  expiry: string;
  description: string;
}> = ({ title, image, discount, expiry, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-800 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg text-blue-600 font-semibold">{discount}</p>
          <p className="text-sm text-gray-500">{expiry}</p>
        </div>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: string;
}> = ({ title, description, icon }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-800">{description}</p>
    </div>
  );
};

const DestinationCard: React.FC<{
  title: string;
  image: string;
  description: string;
}> = ({ title, image, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
};

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const TestimonialCard: React.FC<{
  name: string;
  location: string;
  quote: string;
  rating: number;
}> = ({ name, location, quote, rating }) => {
  // Extracting initials from the name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="bg-white shadow-lg rounded-md p-6 transition duration-300 ease-in-out transform hover:shadow-xl">
      <div className="flex items-center mb-4">
        {/* Custom Avatar with initials and background color */}
        <Avatar sx={{ bgcolor: "violet", marginRight: "8px" }}>
          {initials}
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{name}</p>

          <p className="text-gray-600">{location}</p>
        </div>
      </div>
      <div>
        <Rating
          value={rating}
          precision={0.5}
          readOnly
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      </div>
      <p className="text-lg mb-4">{quote}</p>
    </div>
  );
};

const PackageCard: React.FC<{
  name: string;
  image: string;
  price: string;
  duration: string;
  includes: string[];
}> = ({ name, image, price, duration, includes }) => {
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl font-serif">
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Rs. {price}</span>
          <span>{duration}</span>
        </div>
        <ul className="list-disc list-inside">
          {includes.map((item, index) => (
            <li key={index} className="text-gray-600">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  title: string;
  icon: string;
  description: string;
}> = ({ title, icon, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-6 hover:shadow-xl transition ease-in-out duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center bg-gray-200 rounded-full w-16 h-16 mb-4">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default MiddleSection;
