"use client";
import React from 'react';
import withLoading from '../components/withLoading';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Elegance Air Airlines</h1>
      <p>Welcome to Elegance Air Airlines! We are committed to providing the best travel experience for our passengers.</p>
      <p>Our mission is to offer luxurious and comfortable flights to destinations all around the world.</p>
      <p>Whether you are traveling for business or pleasure, Elegance Air Airlines ensures a seamless journey with top-notch services.</p>
    </div>
  );
};

export default withLoading(AboutPage);