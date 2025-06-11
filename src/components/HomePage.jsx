import React from "react";

function HomePage({ onSelectOption }) {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Our Booking & Purchase Platform</h1>
        <p className="home-description">
          Professional booking and purchase services with instant WhatsApp
          communication
        </p>
      </div>

      <div className="options-container">
        <div className="option-card" onClick={() => onSelectOption("booking")}>
          <div className="option-icon">🏨</div>
          <h2>Hotel & Travel Booking</h2>
          <p>
            Complete booking form for hotel reservations and travel arrangements
            with secure payment processing
          </p>
          <button className="option-button">Start Booking</button>
        </div>

        <div className="option-card" onClick={() => onSelectOption("purchase")}>
          <div className="option-icon">🛒</div>
          <h2>Product Purchase</h2>
          <p>
            Order products and services with delivery options and secure payment
            processing
          </p>
          <button className="option-button">Start Purchase</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
