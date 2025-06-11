import { useState } from "react";
import {
  formatPurchaseMessage,
  sendToWhatsApp,
  copyToClipboard,
} from "../utils/whatsapp";

function PurchaseForm({ onBack }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    productCategory: "",
    productName: "",
    quantity: "",
    deliveryAddress: "",
    deliveryDate: "",
    paymentMethod: "",
    cardHolderName: "",
    cardNumber: "",
    monthYear: "",
    cvcCvv: "",
    billingAddress: "",
    postalCode: "",
    city: "",
    country: "",
    specialInstructions: "",
    giftWrap: false,
    newsletter: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
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

    // Format the purchase data for WhatsApp
    const whatsappMessage = formatPurchaseMessage(formData);

    // Show user-friendly options
    const userChoice = confirm(
      "📱 Send your purchase order to WhatsApp?\n\n" +
        "✅ OK = Open WhatsApp automatically\n" +
        "📋 Cancel = Copy message to clipboard (paste manually)\n\n" +
        "Target: +254 741 027 920"
    );

    if (userChoice) {
      // User chose to open WhatsApp automatically
      sendToWhatsApp(whatsappMessage);
      alert(
        "Opening WhatsApp... If it doesn't open, use the 'Copy Message' button below."
      );
    } else {
      // User chose to copy to clipboard
      copyToClipboard(whatsappMessage);
    }
  };

  const handleCopyMessage = () => {
    const whatsappMessage = formatPurchaseMessage(formData);
    copyToClipboard(whatsappMessage);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        <h1>PURCHASE ORDER</h1>
        <h2>PRODUCT PURCHASE FORM</h2>
        <p className="form-description">
          Complete this form to place your order. All required fields must be
          filled.
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

        {/* Product Information Section */}
        <div className="form-section">
          <label>
            Product Category <span className="required">*</span>
          </label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="electronics"
                name="productCategory"
                value="electronics"
                checked={formData.productCategory === "electronics"}
                onChange={handleChange}
                required
              />
              <label htmlFor="electronics">Electronics</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="clothing"
                name="productCategory"
                value="clothing"
                checked={formData.productCategory === "clothing"}
                onChange={handleChange}
                required
              />
              <label htmlFor="clothing">Clothing</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="books"
                name="productCategory"
                value="books"
                checked={formData.productCategory === "books"}
                onChange={handleChange}
                required
              />
              <label htmlFor="books">Books</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="home-garden"
                name="productCategory"
                value="home-garden"
                checked={formData.productCategory === "home-garden"}
                onChange={handleChange}
                required
              />
              <label htmlFor="home-garden">Home & Garden</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="sports"
                name="productCategory"
                value="sports"
                checked={formData.productCategory === "sports"}
                onChange={handleChange}
                required
              />
              <label htmlFor="sports">Sports & Outdoors</label>
            </div>
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="productName">
            Product Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter the product name"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="quantity">
            Quantity <span className="required">*</span>
          </label>
          <select
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          >
            <option value="">Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="other">
              Other (specify in special instructions)
            </option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="deliveryAddress">
            Delivery Address <span className="required">*</span>
          </label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            placeholder="Enter your delivery address"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="deliveryDate">
            Preferred Delivery Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            required
          />
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
                id="credit-card-purchase"
                name="paymentMethod"
                value="credit-card"
                checked={formData.paymentMethod === "credit-card"}
                onChange={handleChange}
                required
              />
              <label htmlFor="credit-card-purchase">Credit Card</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="debit-card-purchase"
                name="paymentMethod"
                value="debit-card"
                checked={formData.paymentMethod === "debit-card"}
                onChange={handleChange}
                required
              />
              <label htmlFor="debit-card-purchase">Debit Card</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="paypal-purchase"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
                required
              />
              <label htmlFor="paypal-purchase">PayPal</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="apple-pay"
                name="paymentMethod"
                value="apple-pay"
                checked={formData.paymentMethod === "apple-pay"}
                onChange={handleChange}
                required
              />
              <label htmlFor="apple-pay">Apple Pay</label>
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
          <label htmlFor="specialInstructions">Special Instructions</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            rows="4"
            placeholder="Any special delivery instructions or comments"
          />
        </div>

        {/* Additional Options */}
        <div className="form-section">
          <div className="checkbox-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="giftWrap"
                name="giftWrap"
                checked={formData.giftWrap}
                onChange={handleChange}
              />
              <label htmlFor="giftWrap">Gift wrap this item</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <label htmlFor="newsletter">
                Subscribe to our newsletter for updates and offers
              </label>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">
            📱 Submit Purchase
          </button>
          <button
            type="button"
            className="submit-button"
            onClick={handleCopyMessage}
            style={{ backgroundColor: "#6c757d" }}
          >
            📋 Copy Message
          </button>
          <button
            type="button"
            className="clear-button"
            onClick={() =>
              setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                productCategory: "",
                productName: "",
                quantity: "",
                deliveryAddress: "",
                deliveryDate: "",
                paymentMethod: "",
                cardHolderName: "",
                cardNumber: "",
                monthYear: "",
                cvcCvv: "",
                billingAddress: "",
                postalCode: "",
                city: "",
                country: "",
                specialInstructions: "",
                giftWrap: false,
                newsletter: false,
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

export default PurchaseForm;
