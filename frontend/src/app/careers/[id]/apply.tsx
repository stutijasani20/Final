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
  const [success, setSuccess] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [resumeError, setResumeError] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      // Validate fields
      if (!name) {
        setNameError(true);
        return;
      }
      if (!phoneNumber) {
        setPhoneNumberError(true);
        return;
      }
      if (!resume) {
        setResumeError(true);
        return;
      }

      // Get userId from localStorage
      const userId = localStorage.getItem("userId");

      const formData = new FormData();
      formData.append("user", userId || "");
      formData.append("job", jobId);
      formData.append("name", name);
      formData.append("phone_number", phoneNumber);
      formData.append("resume", resume || "");

      // Send the form payload to the backend
      const response = await axios.post(
        "http://127.0.0.1:8000/applicant/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Optionally, you can handle response here if needed
      console.log("Response:", response.data);

      // Set success state to true
      setSuccess(true);

      // Close the modal after successful submission
      handleClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      // Optionally, you can show an error message to the user.
      alert("Failed to submit application. Please try again later.");
    }
  };

  const handleModalClose = () => {
    // Reset success state
    setSuccess(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
      setResumeError(false);
    } else {
      setResume(null);
      setResumeError(true);
      alert("Please select a PDF file.");
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
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
              fullWidth
              margin="normal"
              error={nameError}
              helperText={
                nameError && (
                  <span role="alert" id="nameError" aria-hidden="true">
                    Please enter Name
                  </span>
                )
              }
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d{0,10}$/.test(inputValue)) {
                  setPhoneNumber(inputValue);
                  setPhoneNumberError(false);
                } else {
                  setPhoneNumberError(true);
                }
              }}
              fullWidth
              margin="normal"
              error={phoneNumberError}
              helperText={
                phoneNumberError && (
                  <span role="alert" id="phoneNumberError" aria-hidden="true">
                    Phone number is required and should be 10 digits
                  </span>
                )
              }
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              style={{ marginBottom: "1rem" }}
              required
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={success}
        onClose={handleModalClose}
        aria-labelledby="transition-modal-title"
        
        component="div" 
        aria-describedby="transition-modal-description"
      >
        <Fade in={success}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Application Submitted Successfully!
            </Typography>
            <Typography>We will contact you soon.</Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}