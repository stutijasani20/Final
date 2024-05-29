import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CheckCircle } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderradus: 10,
  boxShadow: 24,
  p: 4,
};

export default function BookingSuccessModal({ open, onClose }:{open: any, onClose: any}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="booking-success-modal-title"
      aria-describedby="booking-success-modal-description"
    >
      <Box sx={style }>
        <CheckCircle sx={{ fontSize: 60, color: 'green', marginBottom: 2, justifyContent: "center" }} />
        <Typography id="booking-success-modal-title" variant="h6" component="h2" gutterBottom>
          Booking Cancelled Successfully
        </Typography>
        <Typography id="booking-success-modal-description" sx={{ mb: 2, justifyContent: "center" }}>
          Your booking has been successfully cancelled.
          Refund will be processed within 7 working days.
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ justifyContent: "center" }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
