import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
export default function MediaCard() {
  return (
    <>
      <br />
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "75%",
          marginLeft: "10%",
        }}
      >
        <h4>
          Elegance Air Cargo- One Of The World’s Most Leading Cargo Service
        </h4>
        <p style={{ color: "dimgrey" }}>
          Operators With its extensive network operations spread across India
          and the globe, Elegance Air Cargo can be your trusted partner for
          expanding your business to new heights. Elegance Air Cargo is a notch
          apart when it comes to service delivery. Our exceptionally trained
          workforce is our greatest strength as we continually strive to offer
          the highest quality air freight services with premium facilities. In
          addition to our skilled personnel, Elegance Air also has a dedicated
          fleet of Boeing and Airbus aircraft exclusively for our cargo
          operations. These modern aircraft are best-in-class and possess huge
          cargo-carrying capacities. With online services expanding to over 39
          international and 38 domestic destinations apart from hundreds of
          offline trucking points worldwide, our cargo operations cover the
          benefits of both air and road transportation and ensure that your
          cargo reaches safely. We also utilise state-of-the-art Logistics
          Management Systems that support EDI interface with Indian Customs to
          ensure a round-the-clock and seamless service delivery when it comes
          to cargo sales and operations. It also allows us to serve you better
          by providing an end-to-end solution with accuracy and availability of
          real-time information on booking, acceptance, stowage, unitisation,
          handling, manifestation, carriage, trans-shipment, delivery, and more
          within Air Indias network. As an active member of IATA and ICH, we are
          empowered to carry all major types of cargo and are committed to
          stringently following IATAs regulations for acceptance of cargo
          besides adhering to other standards that apply concerning the carriage
          of cargo. Every day, Elegance Air Cargo strives to become your
          preferred partner by setting new benchmarks in the industry by
          improving our reach, capabilities and service efficiency.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          marginLeft: "10%",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/7.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cargo Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                What can you carry as cargo on board our cargo carriers
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={"/cargo/cargo_products"}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 170 }}
              image="/8.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Our Fleet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our fleet of carriers that serve your every need.
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={"/fleet"}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/9.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reach out to us for queries and concerns about your cargo.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </div>

      <div style={{ display: "flex", marginLeft: "10%", marginTop: "30px" }}>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/10.jpeg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Domestic Cargo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Conditions of contract relating to non-international carriage of
                cargo performed by Elegance Air
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 170 }}
              image="/11.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                International Cargos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Conditions of contract relating to international carriage of
                cargo performed by Elegance Air.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345, height: 325 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/12.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cargo Tracking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your cargo through our tracking system.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
}
