"use client"; // Add this directive at the top

import React, { useState } from "react";
import styles from "@/app/styles/medical.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function HealthMedicalAssistance() {
    const [modalContent, setModalContent] = useState(null);

    const handleLearnMoreClick = (content: any) => {
        setModalContent(content);
    };

    const handleCloseModal = () => {
        setModalContent(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                <span> / </span>
                <Link href="/travel-information" className={styles.breadcrumbLink}>Travel Information</Link>
                <span> / </span>
                <span className={styles.currentPage}>Health & Medical Assistance</span>
            </div>
            <h2 className={styles.header}>Health & Medical Assistance</h2>

            <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h5" component="div">Comfortable Travel, Accessible Journeys</Typography>
                    <Typography variant="body2" color="text.secondary">
                        We are committed to making the travel of our guests with special needs as comfortable and hassle-free as possible.
                    </Typography>
                </CardContent>
                <CardMedia
                    className={styles.cardMedia}
                    component="img"
                    alt="Comfortable Travel, Accessible Journeys"
                    image="/comfort.jpg"
                />
            </Card>

            <div className={styles.travelContainer}>
                <h1 className={styles.travelHeader}>Special Assistance Services</h1>
                <div className={styles.cardRow}>
                    <Card className={styles.cards}>
                        <CardMedia
                            className={styles.cardMedias}
                            component="img"
                            alt="Canada"
                          
                            image="/needs.jpeg"
                        />
                        <Typography variant="h5" align="center" className={styles.cardTitle}>Medical needs and clearance requirements </Typography>
                        <p className={styles.cardContent}>Whether {"it's"} medical care in the air or conditions that need attention, we are here to care.</p>
                        <a onClick={() => handleLearnMoreClick("Medical needs and clearance requirements")} className={styles.learnMore}>Learn More</a>
                    </Card>
                    <Card className={styles.cards}>
                        <CardMedia
                            className={styles.cardMedias}
                            component="img"
                            alt="USA"
                            height="220"
                            image="/united-states.jpg"
                        />
                        <Typography variant="h5" align="center" className={styles.cardTitle}> Special needs assistance </Typography>
                        <p className={styles.cardContent}>Please learn about our accessible travel services for passengers with reduced mobility or visual and hearing impairments..</p>
                        <a onClick={() => handleLearnMoreClick("Special needs assistance")} className={styles.learnMore}>Learn More</a>
                    </Card>
                    <Card className={styles.cards}>
                        <CardMedia
                            className={styles.cardMedias}
                            component="img"
                            alt="Gulf Countries"
                           
                            image="/assistance.jpg"
                        />
                        <Typography variant="h5" align="center" className={styles.cardTitle}>Passengers who require a wheelchair</Typography>
                        <p className={styles.cardContent}>If you need a wheelchair, let us know at the time of your reservation, ticketing, or reconfirmation of the booking. </p>

                        <a onClick={() => handleLearnMoreClick("Passengers who require a wheelchair")} className={styles.learnMore}>Learn More</a>
                    </Card>

                    <Card className={styles.cards}>
                        <CardMedia
                            className={styles.cardMedias}
                            component="img"
                            alt="Gulf Countries"
                            
                            image="/medical.jpg"
                        />
                        <Typography variant="h5" align="center" className={styles.cardTitle}>Flying with medical conditions </Typography>
                        <p className={styles.cardContent}>Medical clearance is required for medical conditions that raise concerns about completing the flight safely or pose a risk to other guests. </p>

                        <a onClick={() => handleLearnMoreClick("Flying with medical conditions ")} className={styles.learnMore}>Learn More</a>
                    </Card>

                    <Card className={styles.cards}>
                        <CardMedia
                            className={styles.cardMedias}
                            component="img"
                            alt="Gulf Countries"
        
                            image="/dog.jpg"
                        />
                        <Typography variant="h5" align="center" className={styles.cardTitle}>Travelling with a Service Dog  </Typography>
                        <p className={styles.cardContent}>Flying with a loyal companion by your side? Read about the requirements and guidelines when travelling with your service dog. </p>

                        <a onClick={() => handleLearnMoreClick("ravelling with a Service Dog  ")} className={styles.learnMore}>Learn More</a>
                    </Card>
                </div>
            </div>
            {modalContent && (
                <Modal
                    open={true}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box className={styles.modalBox}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
                        <Typography variant="h5" id="modal-title">{modalContent}</Typography>
                        <Typography variant="body1" id="modal-description">
                            Detailed information about {modalContent}.
                        </Typography>
                    </Box>
                </Modal>
            )}


            <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h5" component="div">Guidelines and regulations by country</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Find out country-specific guidelines regarding visa, boarding, and carrying funds.
                    </Typography>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Australia</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>Are you planning to carry funds in or out of Australia?</strong><br />
                                Here are some pointers you should know:<br /><br />
                                <ul>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />If asked by a customs or police officer, please report traveller’s cheques, cheques, money orders or any other bearer negotiable instrument (BNI) of any amount.</li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Always inform if you carry more than AUD 10,000 or foreign currency equivalent in cash using a form issued by Customs.</li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />The funds you can take in or out of Australia are unlimited.</li>
                                </ul>
                                For more information, visit <a href="http://www.austrac.gov.au" target="_blank" rel="noopener noreferrer">www.austrac.gov.au</a>.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    </CardContent>
                    </Card>






                </div>
                );
}