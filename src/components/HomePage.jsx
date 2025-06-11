import React from "react";

function HomePage({ onSelectOption }) {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Our Service</h1>
        <p className="home-description">
          Choose the service you need to get started
        </p>
      </div>

      <div className="options-container">
        <div className="option-card" onClick={() => onSelectOption("booking")}>
          <div className="option-icon">🏨</div>
          <h2>Make a Booking</h2>
          <p>Book your hotel reservation and travel arrangements</p>
          <button className="option-button">Start Booking</button>
        </div>

        <div className="option-card" onClick={() => onSelectOption("purchase")}>
          <div className="option-icon">🛒</div>
          <h2>Make a Purchase</h2>
          <p>Purchase products or services from our catalog</p>
          <button className="option-button">Start Purchase</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
