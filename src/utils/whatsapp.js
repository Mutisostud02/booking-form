/**
 * WhatsApp Integration Utility
 *
 * IMPORTANT: To configure your WhatsApp number:
 * 1. Replace the WHATSAPP_NUMBER below with your actual WhatsApp number
 * 2. Include country code without the + sign
 * 3. Example: "1234567890" for +1-234-567-890
 * 4. Example: "447123456789" for +44-7123-456789 (UK)
 * 5. Example: "919876543210" for +91-9876543210 (India)
 */

// Default WhatsApp number - CHANGE THIS TO YOUR ACTUAL WHATSAPP NUMBER
let WHATSAPP_NUMBER = "1234567890";

/**
 * Set the WhatsApp number for sending messages
 * @param {string} phoneNumber - Phone number with country code (no + sign)
 */
export const setWhatsAppNumber = (phoneNumber) => {
  WHATSAPP_NUMBER = phoneNumber;
};

/**
 * Get the current WhatsApp number
 * @returns {string} - Current WhatsApp number
 */
export const getWhatsAppNumber = () => {
  return WHATSAPP_NUMBER;
};

/**
 * Formats booking form data for WhatsApp message
 * @param {Object} formData - The booking form data
 * @returns {string} - Formatted message for WhatsApp
 */
export const formatBookingMessage = (formData) => {
  const message = `🏨 *NEW BOOKING REQUEST*

📋 *Personal Information:*
• Name: ${formData.fullName}
• Email: ${formData.email}
• Phone: ${formData.phoneNumber}

🗓️ *Booking Details:*
• Check-in: ${formData.checkInDate}
• Check-out: ${formData.checkOutDate}
• Destination: ${formData.destination}
• Room Type: ${formData.roomType}
• Guests: ${formData.numberOfGuests}
• Rooms: ${formData.numberOfRooms}

💳 *Payment Information:*
• Payment Method: ${formData.paymentMethod}
• Card Holder: ${formData.cardHolderName}
• Card Number: ${formData.cardNumber ? "****-****-****-" + formData.cardNumber.slice(-4) : "Not provided"}
• Expiry: ${formData.monthYear || "Not provided"}
⚠️ *Note: Sensitive payment details (CVC/CVV) excluded for security*

📍 *Billing Address:*
• Address: ${formData.billingAddress}
• City: ${formData.city}
• Postal Code: ${formData.postalCode}
• Country: ${formData.country}

📝 *Special Requests:*
${formData.specialRequests || "None"}

---
Please confirm this booking request.`;

  return message;
};

/**
 * Formats purchase form data for WhatsApp message
 * @param {Object} formData - The purchase form data
 * @returns {string} - Formatted message for WhatsApp
 */
export const formatPurchaseMessage = (formData) => {
  const message = `🛒 *NEW PURCHASE ORDER*

📋 *Customer Information:*
• Name: ${formData.fullName}
• Email: ${formData.email}
• Phone: ${formData.phoneNumber}

📦 *Product Details:*
• Category: ${formData.productCategory}
• Product: ${formData.productName}
• Quantity: ${formData.quantity}

🚚 *Delivery Information:*
• Address: ${formData.deliveryAddress}
• Preferred Date: ${formData.deliveryDate}

💳 *Payment Information:*
• Payment Method: ${formData.paymentMethod}
• Card Holder: ${formData.cardHolderName}
• Card Number: ${formData.cardNumber ? "****-****-****-" + formData.cardNumber.slice(-4) : "Not provided"}
• Expiry: ${formData.monthYear || "Not provided"}
⚠️ *Note: Sensitive payment details (CVC/CVV) excluded for security*

📍 *Billing Address:*
• Address: ${formData.billingAddress}
• City: ${formData.city}
• Postal Code: ${formData.postalCode}
• Country: ${formData.country}

🎁 *Additional Options:*
• Gift Wrap: ${formData.giftWrap ? "Yes" : "No"}
• Newsletter: ${formData.newsletter ? "Yes" : "No"}

📝 *Special Instructions:*
${formData.specialInstructions || "None"}

---
Please confirm this purchase order.`;

  return message;
};

/**
 * Generates WhatsApp URL with pre-filled message
 * @param {string} message - The message to send
 * @returns {string} - WhatsApp URL
 */
export const generateWhatsAppURL = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/**
 * Opens WhatsApp with the formatted message
 * @param {string} message - The message to send
 */
export const sendToWhatsApp = (message) => {
  const whatsappURL = generateWhatsAppURL(message);
  window.open(whatsappURL, '_blank');
};
