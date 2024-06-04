/* eslint-disable @next/next/no-img-element */
"use client";
import React, {useState, useEffect} from "react";

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import { useRouter } from "next/navigation";
import  Footer from "@/app/components/Footer";
import {motion} from 'framer-motion';
import styles from "@/app/styles/Homepage.module.scss"
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";
import Loading from "./loading";


const MiddleSection: React.FC = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-md z-50">
        <Loading />
      </div>
    );
  }



  return (
    <motion.div
    className="main-container pt-16"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    <div className={styles.fullPage}>
    <div className={styles.gradientBackground}>
    <div className={styles.mainContainer}> 
      <div className={styles.container}> 
        <h2 className={styles.sectionTitle}>Explore Our Services</h2><br/>
        <div className={styles.grid}>
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
      </div><br/><br/>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Special Offers</h2>
        <div className={styles.grid}>
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
      </div><br/><br/>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Explore Featured Destinations</h2>
        <div className={styles.grid}>
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
      </div><br/><br/>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Featured Packages</h2>
        <div className={styles.grid}>
          <PackageCard
            name="Paris Getaway"
            image="/paris2.webp"
            price="999"
            duration="5 Days / 4 Nights"
            includes={["Flight", "Accommodation", "City Tour"]}
            city="Paris"
          />
          <PackageCard
            name="Tropical Escape"
            image="/tropical.avif"
            price="1299"
            duration="7 Days / 6 Nights"
            includes={["Flight", "Resort Stay", "Activities"]}
            city='Phuket'
          />
          <PackageCard
            name="European Adventure"
            image="/europe.jpg"
            price="1999"
            duration="10 Days / 9 Nights"
            includes={["Flight", "Accommodation", "Guided Tours"]}
            city='Venice'
          />
          <PackageCard
            name="Luxury Cruise"
            image="/cruise.avif"
            price="2999"
            duration="14 Days / 13 Nights"
            includes={["Cruise", "Meals", "Excursions"]}
            city='Cochin'
          />
          <PackageCard
            name="Ski Adventure"
            image="/groups.jpg"
            price="1499"
            duration="7 Days / 6 Nights"
            includes={["Flight", "Accommodation", "Ski Pass"]}
            city='Shimla'
          />
          <PackageCard
            name="Safari Expedition"
            image="/safari4.jpg"
            price="2499"
            duration="10 Days / 9 Nights"
            includes={["Flight", "Lodging", "Safari Tours"]}
            city='Jaipur'
          />
          <PackageCard
            name="Island Retreat"
            image="/island.jpg"
            price="1999"
            duration="8 Days / 7 Nights"
            includes={["Flight", "Accommodation", "Island Tours"]}
            city='andaman and nicobar islands'
          />
          <PackageCard
            name="Historic Journey"
            image="/1020.jpg"
            price="1799"
            duration="9 Days / 8 Nights"
            includes={["Flight", "Accommodation", "Historic Tours"]}
            city='Agra'
          />
        </div>
      </div><br/><br/>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Customer Reviews</h2>
        <div className={styles.grid}>
          <ReviewCard
            name="John Doe"

            rating={5}
            review="Excellent service and great deals! Highly recommended."
          />
          <ReviewCard
            name="Jane Smith"
           
            rating={4}
            review="Had a wonderful experience booking with them. Will use again!"
          />
          <ReviewCard
            name="Alice Johnson"
          
            rating={5}
            review="Top-notch customer support and seamless booking process."
          />
          <ReviewCard
            name="Michael Brown"
          
            rating={4}
            review="Great travel packages and competitive prices. Very satisfied."
          />
          <ReviewCard
            name="Emily Davis"
           
            rating={5}
            review="Amazing vacation experience! Everything was perfect."
          />
          <ReviewCard
            name="Daniel Wilson"
          
            rating={4}
            review="Good service but some room for improvement. Overall happy."
          />
          <ReviewCard
            name="Sophia Martinez"
          
            rating={5}
            review="Best travel agency I've used. Highly recommend to everyone!"
          />
          <ReviewCard
            name="James Anderson"
         
            rating={4}
            review="Easy booking and excellent customer care. Will book again."
          />
        </div>
       
      </div><br/><br/>
      
    </div>
</div>
<Footer />
</div>

</motion.div>
  );
};

const ServiceCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
  <div className={styles.card}>
    <div className={styles.cardContent}>
      <div className={styles.mb4}>
        <span className={styles.textLg}>{icon}</span>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  </div>
  
);

const OfferCard: React.FC<{ title: string; image: string; discount: string; expiry: string; description: string }> = ({
  title,
  image,
  discount,
  expiry,
  description,
}) => (
  <div className={styles.card}>
    <img src={image} alt={title} className={styles.cardImage} />
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <div className={styles.cardFooter}>
        <span className={styles.cardPrice}>{discount}</span>
        <span className={styles.cardDuration}>{expiry}</span>
      </div>
    </div>
  </div>
);



const DestinationCard: React.FC<{
  title: string;
  image: string;
  description: string;
}> = ({ title, image, description }) => {
  const router = useRouter();
  const handleCardClick = () => {
    const query = title.split(",")[0].trim();
    router.push(`flights/search/?city=${query}`);
  };
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4" onClick={handleCardClick}>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
};

const PackageCard: React.FC<{ name: string; image: string; price: string; duration: string; includes: string[], city:string }> = ({
  name,
  image,
  price,
  duration,
  includes,
  city,
}) => {
  const router = useRouter();

  const handleClick = () => {
    
    
 
    router.push(`flights/search/?city=${city}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={image} alt={name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardPrice}>${price}</p>
        <p className={styles.cardDuration}>{duration}</p>
        <ul className={styles.cardDescription}>
          {includes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};



const ReviewCard: React.FC<{ name: string; rating: number; review: string }> = ({
  name,

  rating,
  review,
}) => (
  <div className={styles.card}>
    <div className={styles.cardContent}>
      <div className={styles.flex}>
        
        <div>
          <h3 className={styles.cardTitle}>{name}</h3>
          <Rating name="read-only" value={rating} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
        </div>
      </div>
      <p className={`${styles.cardDescription} ${styles.mt4}`}>{review}</p>
    </div>
  </div>

);

export default MiddleSection;
