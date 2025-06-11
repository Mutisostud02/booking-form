# WhatsApp Integration Setup

This application includes WhatsApp integration that allows form submissions to be sent directly to a WhatsApp number.

## How to Configure Your WhatsApp Number

1. **Open the WhatsApp utility file**: `src/utils/whatsapp.js`

2. **Find the WHATSAPP_NUMBER variable** (around line 13):
   ```javascript
   let WHATSAPP_NUMBER = "1234567890";
   ```

3. **Replace with your actual WhatsApp number**:
   - Include the country code
   - Remove the + sign
   - Remove any spaces or dashes

## Examples

| Country | Format | Example |
|---------|--------|---------|
| USA | 1 + 10 digits | `"15551234567"` |
| UK | 44 + mobile number | `"447123456789"` |
| India | 91 + mobile number | `"919876543210"` |
| Canada | 1 + 10 digits | `"16041234567"` |
| Australia | 61 + mobile number | `"61412345678"` |

## How It Works

When a user submits a form:

1. The form data is formatted into a readable WhatsApp message
2. Sensitive information (like full card numbers and CVC) is masked for security
3. A WhatsApp URL is generated with the pre-filled message
4. The user's default WhatsApp application opens with the message ready to send

## Security Features

- **Card numbers** are masked (only last 4 digits shown)
- **CVC/CVV codes** are completely excluded from messages
- **Expiry dates** are included but no sensitive security codes

## Testing

1. Fill out either the booking or purchase form
2. Click submit
3. Your WhatsApp should open with a pre-filled message
4. Review the message and send it to complete the process

## Customization

You can modify the message format by editing the `formatBookingMessage` and `formatPurchaseMessage` functions in `src/utils/whatsapp.js`.
