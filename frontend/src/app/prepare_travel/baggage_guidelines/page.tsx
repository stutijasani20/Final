
"use client";

import * as React from "react";
import styles from "@/app/styles/baggage.module.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function BaggageGuidelines() {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span> / </span>
        <Link href="/prepare_travel" className={styles.breadcrumbLink}>Prepare to Travel</Link>
        <span> / </span>
        <span className={styles.currentPage}>Baggage Guidelines</span>
      </div>
      <h4 className={styles.header}>Baggage Guidelines</h4>
      <h1 className={styles.subHeader}>Know Before You Go: Ultimate Guide to Packing for Travel</h1>
      <p className={styles.description}>
        Whether you are packing for a solo trip across Europe or taking the family to the Far East, we have all the information you need. You can also find out what you can and cannot carry onboard our flights or what to do if you have done a little extra shopping to take back home.
      </p>
      <div className={styles.cardContainer}>
        {cardData.map((card, index) => (
          <Card key={index} className={styles.card}>
            <CardMedia
              className={styles.media}
              image={card.image}
              title={card.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={card.link}>
                <Button size="small" className={styles.button}>Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

const cardData = [
  {
    title: "Cabin or Carry-on Baggage",
    description:
      "Not sure of what you can carry as cabin baggage? Learn more about weight, number of pieces, and what you can take onboard our flights.",
    image: "/13.jpeg",
    link: "/",
  },
  {
    title: "Checked Baggage",
    description:
      "For all the information you need on checked baggage allowance on domestic and international flights, codeshare flights and interline journeys.",
    image: "/16.jpg",
    link: "/fleet",
  },
  {
    title: "Restricted Items and Baggage Advisory",
    description:
      "Here is a list of what you can and cannot carry on our flights. You can also read our baggage advisory for a hassle-free travel experience.",
    image: "/20.png",
    link: "#",
  },
  {
    title: "Excess Baggage",
    description:
      "Need to pack something extra? Find out what you need to do and read up on our excess baggage fees.",
    image: "/18.jpg",
    link: "#",
  },
  {
    title: "Special Baggage",
    description:
      "Flying with your favourite cello or golf kit? Find out how you can carry them by booking an extra seat or cabin baggage.",
    image: "/19.jpeg",
    link: "#",
  },
  {
    title: "Unaccompanied Baggage",
    description:
      "Are you sending your baggage as cargo? Check this to know what you can carry and when your unaccompanied baggage will reach you.",
    image: "/17.jpg",
    link: "#",
  },
  {
    title: "Baggage Information at International Airports",
    description:
      "Find information on the baggage acceptance policy of Oman, Bahrain, Sharjah, and Dubai airports.",
    image: "/14.jpg",
    link: "#",
  },
  {
    title: "Prepaid Baggage",
    description:
      "Pay less when booking additional baggage using our prepaid baggage allowance scheme.",
    image: "/21.jpg",
    link: "#",
  },
  {
    title: "Lost or Damaged Baggage",
    description:
      "Still waiting for your baggage to arrive? Or has your baggage been damaged or lost? Learn about what we do to ensure your luggage is safe.",
    image: "/15.jpg",
    link: "#",
  },
];
