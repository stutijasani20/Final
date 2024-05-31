import React from "react";
import Styles from "@/app/styles/footer.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <div className={Styles.row}>
          <div className={Styles.col}>
            <h3>About Us</h3>
            <ul>
              <li><a href="/about">About Elegance Air</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/corporate_info">Corporate Info</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/cargo">Cargo</a></li>
            </ul>
          </div>
          <div className={Styles.col}>
            <h3>Book & Manage</h3>
            <ul>
              <li><a href="flights/search">Search Flight</a></li>
              <li><a href="#">Manage Booking</a></li>
              <li><a href="#">Flight Schedule</a></li>
            </ul>
          </div>
          <div className={Styles.col}>
            <h3>Where We Fly</h3>
            <ul>
              <li><a href="#">Popular Flights</a></li>
              <li><a href="/where_we_fly/route_map">Route Map</a></li>
            </ul>
          </div>
          <div className={Styles.col}>
            <h3>Prepare to Travel</h3>
            <ul>
              <li><a href="/prepare_travel/baggage_guidelines">Baggage Guide</a></li>
              <li><a href="/prepare_travel/Visa_Docs">Visas & Travel Tips</a></li>
              <li><a href="/prepare_travel/Medical_Assistance">Health & Medical</a></li>
            </ul>
          </div>
          <div className={Styles.col}>
            <h3>Support</h3>
            <ul>
              <li><a href="/contct">Contact Us</a></li>
              <li><a href="#">FAQ{"'"}s</a></li>
              <li><a href="#">Grievance Resolution</a></li>
            </ul>
          </div>
        </div>
        <div className={Styles.row}>
          <div className={Styles.newsletter}>
            <h3>Newsletter</h3>
            <form>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className={Styles.appIcons}>
          
         
            <div>
              <a><Image src="/google-play-badge.png" alt="Google Play" width={135} height={40} /></a>
              <div>
              <a><Image src="/Download_on_the_App_Store_2017.png" alt="App Store" width={120} height={40} /></a>
              </div>
              
            </div>
           
          </div>
        </div>
        <hr /><hr />
        <div className={Styles.row}>
         
          <div className={Styles.copyright}>

            &copy; {new Date().getFullYear()} Elegance Air. All rights reserved.

            
          </div>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;