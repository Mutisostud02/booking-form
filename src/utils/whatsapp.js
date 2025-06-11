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
let WHATSAPP_NUMBER = "254741027920"; // Kenya number format

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
 * Generates alternative WhatsApp URL format for better compatibility
 * @param {string} message - The message to send
 * @returns {string} - Alternative WhatsApp URL
 */
export const generateWhatsAppURLAlt = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
};

/**
 * Opens WhatsApp with the formatted message using multiple strategies
 * @param {string} message - The message to send
 */
export const sendToWhatsApp = (message) => {
  // Strategy 1: Direct link creation and click
  const createAndClickLink = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Strategy 2: Window.open with immediate focus
  const openWithFocus = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.focus();
    }
    return newWindow;
  };



  const primaryURL = generateWhatsAppURL(message);
  const alternativeURL = generateWhatsAppURLAlt(message);

  console.log('Attempting to open WhatsApp with URL:', primaryURL);

  try {
    // Try Strategy 1: Create and click link
    createAndClickLink(primaryURL);

    // Wait a moment and check if it worked, if not try alternatives
    setTimeout(() => {
      console.log('Trying alternative URL format...');
      createAndClickLink(alternativeURL);
    }, 1000);

  } catch (error) {
    console.error('Error with link creation, trying window.open...', error);

    try {
      // Try Strategy 2: Window.open
      const newWindow = openWithFocus(primaryURL);

      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        console.log('Window.open failed, trying alternative URL...');
        openWithFocus(alternativeURL);
      }
    } catch (error2) {
      console.error('Window.open failed, offering manual copy...', error2);

      // Fallback: Copy to clipboard and show instructions
      copyToClipboard(message);
      alert(
        'WhatsApp could not be opened automatically.\n\n' +
        'The message has been copied to your clipboard.\n\n' +
        'Please:\n' +
        '1. Open WhatsApp manually\n' +
        '2. Go to chat with +254741027920\n' +
        '3. Paste the message (Ctrl+V or Cmd+V)\n' +
        '4. Send the message'
      );
    }
  }
};

/**
 * Copy WhatsApp message to clipboard as fallback
 * @param {string} message - The message to copy
 */
export const copyToClipboard = async (message) => {
  try {
    await navigator.clipboard.writeText(message);
    alert('Message copied to clipboard! You can paste it in WhatsApp manually.');
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = message;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Message copied to clipboard! You can paste it in WhatsApp manually.');
  }
};


