import React from "react";

import Timeline from "../components/timeline";
import "@/app/styles/main.scss";
import Image from "next/image";
import { withLoadingPage } from "../components/withLoading";

const MyPage: React.FC = () => {
  return (
    <div className="about-page">
      <div
        className="about-section"
        // style={{ backgroundImage: "url('/1.jpeg')", height: "760px" }}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Image src={"/1.jpeg"} alt="1jepg" height={760} width={1600} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            textAlign: "left",
            color: "white",
          }}
        >
          <h1 style={{ color: "firebrick" }}>Our Founder</h1>
          <h3 style={{ color: "firebrick" }}>
            MORE THAN 50 YEARS OF INNOVATION:
          </h3>
          <p style={{ color: "firebrick" }}>
            Our founder, was also India`s` first commercial pilot
            license-holder. <br />
            His passion for aviation led to many firsts for the company.
          </p>
        </div>
      </div>

      <div className="about-page">
        <div
          className="about-section"
          // style={{ backgroundImage: "url('/1.jpeg')", height: "760px" }}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <Image src={"/4.jpg"} alt="1jepg" height={760} width={1600} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              textAlign: "left",
              color: "white",
            }}
          >
            <h1 style={{ color: "black" }}>Our Timeline</h1>
            <Timeline />
          </div>
        </div>
      </div>
      <div
        className="about-section"
        // style={{ backgroundImage: "url('/1.jpeg')", height: "760px" }}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Image src={"/2.jpeg"} alt="2.jpeg" height={1000} width={1600} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "22%",
            transform: "translate(-50%, -50%)",
            textAlign: "left",
            color: "white",
          }}
        >
          <h1 style={{ color: "white", width: "60%", marginLeft: "200" }}>
            CREATING NEW FLYING EXPERIENCES
          </h1>
          <p style={{ color: "white" }}>
            We are proud to have the largest international network in the
            country <br /> and the most nonstop routes connecting India with
            global destinations.
          </p>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>12000+</th>
                  <th>60</th>
                  <th>49</th>
                  <th>50</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Worldwide Employees</td>
                  <td>Destinations</td>
                  <td>Non Stop International Flights</td>
                  <td>Years Of Services</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <br />
      {/* <div className="about-section">
        <div className="mg-ri"> </div>
        <h1>Board of Directors</h1>

        <Image src={"/5.jpeg"} alt="chairman" height={200} width={200} />
        <p>Mr. Arjun Sharma</p>
        <p>Chairman</p>

        <Image src={"/6.jpg"} alt="chairman" height={200} width={200} />
        <p>Mr. Matt Heilinski</p>
        <p>CEO & MD</p>

        <Image src={"/5.jpeg"} alt="chairman" height={200} width={200} />
        <p>Mr.Krishna Banerjee </p>
        <p>Independent Director</p>
      
        <Image src={"/6.jpg"} alt="chairman" height={200} width={200} />
        <p>Mrs. Arya Ahuja</p>
        <p>Independent Director</p>

        <Image src={"/5.jpeg"} alt="chairman" height={200} width={200} />
        <p>Mr.Bhaskar Ahluwalia</p>
        <p>Independent Director</p>

        <h1>Executive Leadership Teams</h1>

        <Image src={"/6.jpg"} alt="chairman" height={200} width={200} />
        <p>Mr. Matt Heilinski</p>
        <p>CEO & MD</p>

        <Image src={"/5.jpeg"} alt="chairman" height={200} width={200} />
        <p>Mr.Vikram Agarwal</p>
        <p>Chief Commercial & Transformation Officer </p>

        <Image src={"/6.jpg"} alt="chairman" height={200} width={200} />
        <p>Mr.Klaus Smith</p>
        <p>Chief Operations Officer</p>

        <Image src={"/5.jpeg"} alt="chairman" height={200} width={200} />
        <p>Mr.Swapnil Jaiswal</p>
        <p>Chief Financial Officer</p>

        <Image src={"/6.jpg"} alt="chairman" height={200} width={200} />
        <p>Dr. Tushar Mehra</p>
        <p>Chief Digital & Technology Officer</p>

        <Image src={"/5.jpeg"} alt="chairman" height={200} width={200} />
        <p>Dr.Nitin Iyer</p>
        <p>Chief Human Resources Officer</p>

        <Image src={"/6.jpg"} alt="chairman" height={200} width={200} />
        <p>Mr.Rohit Oberoi</p>
        <p>Chief Customer Experience Officer</p>

        <Image src={"/5.jpeg"} alt="chairman" height={200} width={200} />
        <p>Mr.Yash Doshi</p>
        <p>Chief Technical Officer</p>

        <Image src={"/5.jpeg"} alt="chairman" height={200} width={200} />
        <p className="column-3">Captain Atharva Sachdev</p>
        <p>Head of Flight Operations </p>
      </div>
      <div>
        <h1>Our People</h1>
        <p>
          PEOPLE OF AIR INDIA From booking to baggage claim and everything in
          between, we want you to love the Air India experience. Our skilled,
          dedicated workforce from all over India and abroad is united by the
          spirit to connect homes and hearts, offering world class service to
          our global guests.
        </p>
      </div> */}

      <div
        style={{
          display: "flex",
          marginLeft: "10%",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <div style={{ marginRight: "30px" }}></div>
      </div>
      <div>
        <h1>Our Fleet</h1>
        <p>
          PEOPLE OF AIR INDIA From booking to baggage claim and everything in
          between, we want you to love the Air India experience. Our skilled,
          dedicated workforce from all over India and abroad is united by the
          spirit to connect homes and hearts, offering world class service to
          our global guests.
        </p>
      </div>
    </div>
  );
};

export default withLoadingPage(MyPage);
