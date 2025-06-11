import { useState } from "react";
import { formatBookingMessage, sendToWhatsApp } from "../utils/whatsapp";

function BookingForm({ onBack }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    checkInDate: "",
    checkOutDate: "",
    destination: "",
    roomType: "",
    numberOfGuests: "",
    numberOfRooms: "",
    paymentMethod: "",
    cardHolderName: "",
    cardNumber: "",
    monthYear: "",
    cvcCvv: "",
    billingAddress: "",
    postalCode: "",
    city: "",
    country: "",
    specialRequests: "",
    additionalServices: [],
    emergencyContact: "",
    emergencyPhone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle multiple checkboxes for additional services
      const updatedServices = [...formData.additionalServices];
      if (checked) {
        updatedServices.push(value);
      } else {
        const index = updatedServices.indexOf(value);
        if (index > -1) {
          updatedServices.splice(index, 1);
        }
      }
      setFormData((prev) => ({
        ...prev,
        additionalServices: updatedServices,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the booking data for WhatsApp
    const whatsappMessage = formatBookingMessage(formData);

    // Send to WhatsApp
    sendToWhatsApp(whatsappMessage);

    // Show success message
    alert("Redirecting to WhatsApp to send your booking request!");
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        <h1>BOOKING RESERVATION</h1>
        <h2>HOTEL & TRAVEL BOOKING FORM</h2>
        <p className="form-description">
          Complete this form to make your reservation. All required fields must
          be filled.
        </p>
        <p className="required-note">* Indicates required question</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="form-section">
          <label htmlFor="fullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="phoneNumber">
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Booking Details Section */}
        <div className="form-section">
          <label htmlFor="checkInDate">
            Check-in Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="checkOutDate">
            Check-out Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="destination">
            Destination <span className="required">*</span>
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination city/location"
            required
          />
        </div>

        <div className="form-section">
          <label>
            Room Type <span className="required">*</span>
          </label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="single"
                name="roomType"
                value="single"
                checked={formData.roomType === "single"}
                onChange={handleChange}
                required
              />
              <label htmlFor="single">Single Room</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="double"
                name="roomType"
                value="double"
                checked={formData.roomType === "double"}
                onChange={handleChange}
                required
              />
              <label htmlFor="double">Double Room</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="suite"
                name="roomType"
                value="suite"
                checked={formData.roomType === "suite"}
                onChange={handleChange}
                required
              />
              <label htmlFor="suite">Suite</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="family"
                name="roomType"
                value="family"
                checked={formData.roomType === "family"}
                onChange={handleChange}
                required
              />
              <label htmlFor="family">Family Room</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="deluxe"
                name="roomType"
                value="deluxe"
                checked={formData.roomType === "deluxe"}
                onChange={handleChange}
                required
              />
              <label htmlFor="deluxe">Deluxe Room</label>
            </div>
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="numberOfGuests">
            Number of Guests <span className="required">*</span>
          </label>
          <select
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            required
          >
            <option value="">Select number of guests</option>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
            <option value="6+">6+ Guests</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="numberOfRooms">
            Number of Rooms <span className="required">*</span>
          </label>
          <select
            id="numberOfRooms"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleChange}
            required
          >
            <option value="">Select number of rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
            <option value="4">4 Rooms</option>
            <option value="5+">5+ Rooms</option>
          </select>
        </div>

        {/* Payment Information Section */}
        <div className="form-section">
          <label>
            Payment Method <span className="required">*</span>
          </label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="credit-card"
                name="paymentMethod"
                value="credit-card"
                checked={formData.paymentMethod === "credit-card"}
                onChange={handleChange}
                required
              />
              <label htmlFor="credit-card">Credit Card</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="debit-card"
                name="paymentMethod"
                value="debit-card"
                checked={formData.paymentMethod === "debit-card"}
                onChange={handleChange}
                required
              />
              <label htmlFor="debit-card">Debit Card</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
                required
              />
              <label htmlFor="paypal">PayPal</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="bank-transfer"
                name="paymentMethod"
                value="bank-transfer"
                checked={formData.paymentMethod === "bank-transfer"}
                onChange={handleChange}
                required
              />
              <label htmlFor="bank-transfer">Bank Transfer</label>
            </div>
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="cardHolderName">
            Card Holder's Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleChange}
            placeholder="Name as it appears on card"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="cardNumber">
            Card Number <span className="required">*</span>
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="monthYear">
            Expiry Date <span className="required">*</span>
          </label>
          <input
            type="text"
            id="monthYear"
            name="monthYear"
            value={formData.monthYear}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="cvcCvv">
            CVC/CVV <span className="required">*</span>
          </label>
          <input
            type="text"
            id="cvcCvv"
            name="cvcCvv"
            value={formData.cvcCvv}
            onChange={handleChange}
            placeholder="123"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="billingAddress">
            Billing Address <span className="required">*</span>
          </label>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            placeholder="Enter your billing address"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="postalCode">
            Postal/ZIP Code <span className="required">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter postal code"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="city">
            City <span className="required">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="country">
            Country <span className="required">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="4"
            placeholder="Any special requests or comments"
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">
            Submit Booking
          </button>
          <button
            type="button"
            className="clear-button"
            onClick={() =>
              setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                checkInDate: "",
                checkOutDate: "",
                destination: "",
                roomType: "",
                numberOfGuests: "",
                numberOfRooms: "",
                paymentMethod: "",
                cardHolderName: "",
                cardNumber: "",
                monthYear: "",
                cvcCvv: "",
                billingAddress: "",
                postalCode: "",
                city: "",
                country: "",
                specialRequests: "",
                additionalServices: [],
                emergencyContact: "",
                emergencyPhone: "",
              })
            }
          >
            Clear form
          </button>
        </div>
      </form>

      <div className="form-disclaimer">
        <p>Never submit passwords through this form.</p>
      </div>
    </div>
  );
}

export default BookingForm;
