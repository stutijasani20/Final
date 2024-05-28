/* eslint-disable react/no-unescaped-entities */
"use client"; // Add this directive at the top

import React, { useState } from "react";
import styles from "@/app/styles/visa.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function VisaDocuments() {
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
                <span className={styles.currentPage}>Visa Documents</span>
            </div>
            <h2 className={styles.header}>Visas, Documents and Travel Tips</h2>
            <p className={styles.intro}>
                We are excited about your upcoming trip with us, and we promise to make it memorable and seamless. Before leaving for the airport, please check if you have your documents in place. Also, read Elegance Air`s travel advisory for various airports and cities across India and the world.
            </p>
            <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h5" component="div">Documents to carry</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ensure you carry all necessary documents, including domestic or international flight tickets. If you’re flying to an international destination, please have a valid visa and passport.
                    </Typography>
                    <a onClick={() => handleLearnMoreClick("Documents to carry content")} className={styles.learnMore}>Learn More</a>
                </CardContent>
                <CardMedia
                    className={styles.cardMedia}
                    component="img"
                    alt="Documents to carry"
                    image="/documents-to-carry.jpg"
                />
            </Card>

            <Card className={styles.card}>
                <CardMedia
                    className={styles.cardMedia}
                    component="img"
                    alt="Travelling to India"
                    image="/travelling-to-india.jpg"
                />
                <CardContent>
                    <Typography variant="h5" component="div">Travelling to India</Typography>
                    <Typography variant="body2" color="text.secondary">
                        The Indian government provides information about visa requirements and the online application process. If you’re an Indian citizen travelling to Mizoram, Imphal, Lakshadweep, or Andaman and Nicobar Islands, you will require an entry permit and other permissions to travel.
                    </Typography>
                    <a onClick={() => handleLearnMoreClick("View permit requirements")} className={styles.learnMore}>Learn More</a>
                </CardContent>
            </Card>

            <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h5" component="div">Overseas citizen of India</Typography>
                    <Typography variant="body2" color="text.secondary">
                        The Indian government has eased rules for overseas citizen of India (OCI) cardholders travelling to or from India. Find out about the regulations and renewal norms that apply to OCI cardholders.
                    </Typography>
                    <a onClick={() => handleLearnMoreClick(" Overseas citizen of India")} className={styles.learnMore}>Learn More</a>

                </CardContent>
                <CardMedia
                    className={styles.cardMedia}
                    component="img"
                    alt="Overseas citizen of India"
                    image="/OCI_card.jpg"
                />
            </Card>

            <Card className={styles.card}>
                <CardMedia
                    className={styles.cardMedia}
                    component="img"
                    alt="Travelling through multiple airports"
                    image="/travelling-through-multiple-airports.jpg"
                />
                <CardContent>
                    <Typography variant="h5" component="div">Travelling through multiple airports</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Are you flying to another country via multiple airports? Not sure what necessary details you need to check before your travel? Needn't worry. Let's simplify your travel through multiple airports. Read our transit rules and have a hassle-free journey.
                    </Typography>
                    <a onClick={() => handleLearnMoreClick(" Travelling through multiple airports ")} className={styles.learnMore}>Learn More</a>
                </CardContent>
            </Card>

            <div className={styles.travelContainer}>
                <h1 className={styles.travelHeader}>Travel to Canada, the US, and Gulf countries</h1>
                <p className={styles.intro}>
                    We are excited about your upcoming trip with us, and we promise to make it memorable and seamless. Before leaving for the airport, please check if you have your documents in place. Also, read Air India’s travel advisory for various airports and cities across India and the world.
                </p>
                <div className={styles.cardRow}>
                    <Card >
                        <CardMedia
                           
                            component="img"
                            alt="Canada"
                            height="220"
                            image="/canada.jpg"
                        />
                        <Typography variant="h5" align="center" className={styles.cardTitle}>Canada</Typography>
                        <a onClick={() => handleLearnMoreClick("Canada")} className={styles.learnMore}>Learn More</a>
                    </Card>
                    <Card >
                        <CardMedia
                          
                            component="img"
                            alt="USA"
                            height="220"
                            image="/united-states.jpg"
                        />
                        <Typography variant="h5" align="center" className={styles.cardTitle}>USA</Typography>
                        <a onClick={() => handleLearnMoreClick("United States Of America")} className={styles.learnMore}>Learn More</a>
                    </Card>
                    <Card >
                        <CardMedia
                           
                            component="img"
                            alt="Gulf Countries"
                            height="220"
                            image="/gulf-countries.jpg"
                        />
                        <Typography variant="h5" align="center" className={styles.cardTitle}>Gulf Countries</Typography>
                        <a onClick={() => handleLearnMoreClick("Gulf Countries")} className={styles.learnMore}>Learn More</a>
                    </Card>
                </div>
            </div>

            {modalContent && (
                <>
                    <div className={styles.modalOverlay} onClick={handleCloseModal}></div>
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
                        <Typography variant="h5">{modalContent}</Typography>
                        <Typography variant="body1">
                            Detailed information about {modalContent}.
                        </Typography>
                    </div>
                </>
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
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Iraq</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>Travel details on Iraq</strong><br />
                                Passengers can only travel to Iraq by obtaining an entry visa from the Embassy of the Republic of Iraq. Passengers travelling to Najaf, Iraq, must secure immigration clearance from Iraqi authorities before the commencement of their journey.<br />

                                Passengers or travel agents are required to send scanned copies of the following documents to njfai.oktb@gmail.com at least 72 hours before the scheduled departure: <br /><br />


                                <strong>For individual passenger </strong><br />

                                You will need to carry the following documents with you:<br />
                                <ul>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of passport of first, last page with address detail, ECNR</li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of visa, stamped on passport or paper visa </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of ticket (ITR) where the ticket number is legible</li>
                                </ul><br /><br />

                                <strong>For group PNR </strong><br />

                                Please ensure the below-mentioned documents are available to be presented to officials:<br />
                                <ul>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of passport </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of ticket of any one passenger  </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of group visa </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Group visa approval number  </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Group PNR print with names of all passengers. </li><br />

                                </ul>
                                Other conditions: All passengers in the group must travel together inbound and outbound; otherwise, permission is to be sought via email. Our Najaf office will access the above email, obtain Iraq immigration and update PNR.<br /><br />

                                Before reporting to the airport, passengers must check the relevant clearance by contacting the AI office or contact centre. Please reach the airport at least four hours before departure.<br />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Nepal</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>Travel advisory for Nepal</strong><br />

                                Are you planning to trek through the Himalayan ranges or visit the majestic temples in Nepal? We at Air India want you to have an experience of a lifetime. If you are an Indian citizen travelling to or from Nepal, we request you to refer to the guidelines below.<br />

                                You should carry the following documents: <br /><br />

                                <ul>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />A valid Indian passport or voter ID card.</li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />A valid photo ID proof issued by the Government of India/State government/Union Territory administration in India to their employees or an election ID card issued by the Election Commission of India. </li>

                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Emergency certificate issued by the Embassy of India, Kathmandu.</li>

                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of ticket (ITR) where the ticket number is legible</li>

                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Identity certificate issued by the Embassy of India, Kathmandu.</li>

                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Persons above 65 years and below 15 years would be exempted from the requirement of approved identity documents mentioned above. However, they must have documents with a photograph confirming their age and identity, such as a PAN card, driver's license, Central Government Health Scheme card or ration card.</li>

                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Children between the ages of 15 and 18 may be allowed to travel between India and Nepal on the strength of an identity certificate issued by the school principal in the prescribed format.</li>

                                    <li><ArrowRightIcon sx={{ color: 'red' }} />If you and your family are travelling together to or from Nepal
                                        a. Any one adult in the family should present all four documents mentioned above.<br />

                                        b. The rest of the family members are exempt from presenting the above documents except for a valid photo ID and a document that proves the relationship as a family, such as a Central Government Health Scheme card, ration card, driving license or ID card issued by school/college, etc.</li>
                                </ul><br /><br />

                                <strong>Note: </strong><br />

                                <ul>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />An Aadhaar (UID) card is not an acceptable travel document for travel to Nepal. </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Emergency and identity certificate is valid only for a single journey from Nepal.  </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Certificate of Registration issued by the Embassy of India in Nepal to Indian nationals will not be accepted when travelling to or from Nepal. </li><br />
                                </ul>

                                For the latest information on travel guidelines when travelling to Nepal, visit

                                <ul>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />https://www.indembkathmandu.gov.in/page/valid-travel-documents/</li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Emergency and identity certificate is valid only for a single journey from Nepal.  </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />https://www.immigration.gov.np/post/information-for-indian-nationals</li><br />
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>New Zealand</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>New Zealand’s Electronic Travel Authority  </strong><br /><br />

                                Passengers are requested to visit<a href="https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}> immigration.govt.nz</a> to check if they need an NZeTA before travelling to New Zealand. The only official way to request an NZeTA is through the <a href="https://immigration.govt.nz/" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}> government website </a> or the mobile app. Passengers should not request their NZeTA through any unauthorized third party.<br />

                                Passengers travelling on New Zealand or Australian passports and those without visas do not need an NZeTA. To find out more, visit <a href="https://www.immigration.govt.nz/new-zealand-visas/visas/visa/nzeta" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>  immigration.govt.nz/zeta.</a> <br /><br />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Russia</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>Waiver on flights for Russia</strong><br /><br />

                                Have you booked a flight ticket to or from Moscow, Russia, but are still determining your travel due to the recent events in the country? Don't worry. We understand your concern and have come up with a solution. Passengers with confirmed Air India tickets flying in and out of Sheremetyevo - A.S. Pushkin International Airport (SVO), Moscow, can make one free change (flight or date) to a new date within the ticket's validity.<br />

                                Passengers can apply for a refund free of cost. However, make sure the booking is cancelled for the ticket to be considered a 'no-show'. <br /><br />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header">

                            <Typography>Thailand</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>Visa on arrival </strong><br /><br />

                                To facilitate passenger flow, the Immigration Authority of Thailand has requested all passengers to download the visa on arrival form and fill it out before arriving in Thailand. <a href="https://www.airindia.com/content/dam/air-india/pdfs/countries-entitled-for-visa-on-arrival-to-thailand.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}> Click Here</a> to check if you require a visa for your trip.<br />

                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>UK</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>Passport and visa requirements</strong><br />
                                You can cross the UK border using a valid passport, which should be valid the whole time you are in the UK. The EU, EEA, and Swiss citizens can travel for short trips without a visa to the UK.  <br />

                                You will need to carry the following documents with you:<br />
                                <ul>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />You have settled or pre-settled status under the EU Settlement Scheme, Jersey, Guernsey, or the Isle of Man's settlement schemes. </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />You have an EU Settlement Scheme family permit or the equivalent from Jersey, Guernsey or the Isle of Man. </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Have a frontier worker permit. </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />You are a S2 Healthcare visitor. </li>
                                </ul><br /><br />


                                EU, EEA and Swiss nationals in the groups mentioned can still use their ID cards to travel to the UK until 31 December 2025. They will also be able to use them after that date if the cards meet the security standards set by the International Civil Aviation Organisation.<br /><br />

                                This will also not apply to Gibraltar ID cards issued to British citizens or passport cards issued to Irish citizens. They will continue to be accepted for travel to the UK.<br /><br />

                                <strong>Passengers under 18 years of age</strong><br />

                                For the safety and welfare of every child, passengers under 18 years travelling without a parent or legal guardian must arrive with written consent as per the UK Border Force. <br /><br />

                                If the child is travelling alone to the UK, a consent form must be signed by both parents. <br /><br />

                                For the most recent and additional information, visit https://www.gov.uk/standard-visitor/if-youre-under-18..<br /><br />

                                <strong>Children travelling from the UK</strong><br />

                                Suppose you are travelling with a child from the United Kingdom. In that case, you must get the permission of everyone with parental responsibility for the child or from a court of law before taking the minor abroad.  <br /><br />

                                You must carry a valid photo identification proof (passport or driving license) of both the parents and the child's birth certificate. <br /><br />

                                For more details, refer to https://www.gov.uk/permission-take-child-abroad.<br />


                                <ul>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of passport </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of ticket of any one passenger  </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Copy of group visa </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Group visa approval number  </li>
                                    <li><ArrowRightIcon sx={{ color: 'red' }} />Group PNR print with names of all passengers. </li><br />

                                </ul>
                                Other conditions: All passengers in the group must travel together inbound and outbound; otherwise, permission is to be sought via email. Our Najaf office will access the above email, obtain Iraq immigration and update PNR.<br /><br />

                                Before reporting to the airport, passengers must check the relevant clearance by contacting the AI office or contact centre. Please reach the airport at least four hours before departure.<br />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>




                </CardContent>
            </Card>
        </div>
    );
}