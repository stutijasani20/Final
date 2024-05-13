import React from "react";
import "../styles/footer.scss";
const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>About Us</h3>
            <ul>
              <li>
                <a href="/about">About Elegance Air</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/corporate_info">Coorporate Information</a>
              </li>
              <li>
                <a href="/press">Press</a>
              </li>
              <li>
                <a href="/cargo">Cargos</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Book and Manage</h3>
            <ul>
              <li>
                <a href="flights/search">Search Flight</a>
              </li>
              <li>
                <a href="#">Manage Booking</a>
              </li>
              <li>
                <a href="#">Flight Schedule</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Where We Fly</h3>
            <ul>
              <li>
                <a href="#">Popular Flights</a>
              </li>
              <li>
                <a href="/where_we_fly/route_map">Route Map</a>
              </li>
              <li>
                <a href="#">Non Stop International Flights</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Prepare To Travel</h3>
            <ul>
              <li>
                <a href="/prepare_travel/baggage_guidelines">
                  Baggage Guideline
                </a>
              </li>
              <li>
                <a href="#">Airport Information</a>
              </li>
              <li>
                <a href="#">Visas, Documents and Travel Tips</a>
              </li>
              <li>
                <a href="#">First Time Travelers, Childrens, pets</a>
              </li>
              <li>
                <a href="#">Health and Medical Assistance</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Loyalty</h3>
            <ul>
              <li>
                <a href="#">About Flying returns</a>
              </li>
              <li>
                <a href="#">Points Calculator</a>
              </li>
              <li>
                <a href="#">Earn Points</a>
              </li>
              <li>
                <a href="#">Spend Points</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Travel Experience</h3>
            <ul>
              <li>
                <a href="#">In the Air</a>
              </li>
              <li>
                <a href="#">At the Airport</a>
              </li>
              <li>
                <a href="#">Our Fleet</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="#">Contact US</a>
              </li>
              <li>
                <a href="#">FAQ`s</a>
              </li>
              <li>
                <a href="#">Greviance Resolution</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Elegance Air App</h3>
            <ul>
              <li>Download the app and book & manage the flights on the go.</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
