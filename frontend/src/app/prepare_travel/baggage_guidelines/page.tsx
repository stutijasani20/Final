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
      <div
        style={{
          display: "flex",
          marginLeft: "10%",
          marginTop: "5%",
        }}
      >
        <h1>Ultimate Guide to Packing your travel !</h1>
      </div>
      <p
        style={{
          display: "flex",
          marginLeft: "10%",
          marginBottom: "5%",
          marginRight: "10%",
          color: "dimgrey",
        }}
      >
        Whether you are packing for a solo trip across Europe or taking the
        family to the Far East, we have all the information you need. You can
        also find out what you can and cannot carry onboard our flights or what
        to do if you have done a little extra shopping to take back home.
      </p>
      <div
        style={{
          display: "flex",
          marginLeft: "10%",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/13.jpeg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cabin or Hand In Luggage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Not sure of what you can carry as cabin baggage? Learn more
                about weight, number of pieces, and what you can take onboard
                our flights.
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={"/"}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 170 }}
              image="/16.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Checked Baggage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                For all the information you need on checked baggage allowance on
                domestic and international flights, codeshare flights and
                interline journeys.
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
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/20.png"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Restricted Items and Baggage Advisory
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here is a list of what you can and cannot carry on our flights.
                You can also read our baggage advisory for a hassle-free travel
                experience.
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
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/18.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Excess Baggage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Need to pack something extra? Find out what you need to do and
                read up on our excess baggage fees.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 170 }}
              image="/19.jpeg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Special Baggage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Flying with your favourite cello or golf kit? Find out how you
                can carry them by booking an extra seat or cabin baggage.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/17.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Unaccompanied Baggage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Are you sending your baggage as cargo? Check this to know what
                you can carry and when your unaccompanied baggage will reach
                you.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <div style={{ display: "flex", marginLeft: "10%", marginTop: "80px" }}>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/14.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Baggage Information at International Airports
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find information on the baggage acceptance policy of Oman,
                Bahrain, Sharjah, and Dubai airports.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 170 }}
              image="/21.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Prepaid Baggage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pay less when booking additional baggage using our prepaid
                baggage allowance scheme.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div style={{ marginRight: "30px" }}>
          <Card sx={{ maxWidth: 345, height: 370 }}>
            <CardMedia
              sx={{ height: 150 }}
              image="/15.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lost or Damaged Baggage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Still waiting for your baggage to arrive? Or has your baggage
                been damaged or lost? Learn about what we do to ensure your
                luggage is safe.
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
