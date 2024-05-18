import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { blue } from "@mui/material/colors";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Apply({ jobId }: { jobId: string }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [resume, setResume] = React.useState<File | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      // Get userId from localStorage
      const userId = localStorage.getItem("userId");

      const formData = {
        userId: userId,
        jobId: jobId,
        name: name,
        phoneNumber: phoneNumber,
        resume: resume,
      };

      // Send the form payload to the backend
      const response = await axios.post(
        "http://127.0.0.1:8000/applicant/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Optionally, you can handle response here if needed
      console.log("Response:", response.data);

      // Close the modal after successful submission
      handleClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      // Optionally, you can show an error message to the user.
      alert("Failed to submit application. Please try again later.");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ backgroundColor: blue, mb: 5 }}
      >
        Apply Now
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Apply Now
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              onChange={(e) =>
                setResume(e.target.files ? e.target.files[0] : null)
              }
              style={{ marginBottom: "1rem" }}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
