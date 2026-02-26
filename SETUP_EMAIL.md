# Email Form Setup Instructions

The contact form is now configured to send emails to **Sinai@sheva-digital.com**.

## Setup Steps

### Option 1: Web3Forms (Recommended - Free & Easy)

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email: **Sinai@sheva-digital.com**
3. Click "Create Access Key"
4. Copy the access key you receive
5. Create a `.env.local` file in the root directory:
   ```
   WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
6. Restart your development server

### Option 2: Alternative Email Services

If you prefer to use a different email service, you can modify `app/api/send-email/route.ts`:

#### Using Resend (Recommended for production)

```bash
npm install resend
```

Then update the API route to use Resend's API.

#### Using SendGrid

```bash
npm install @sendgrid/mail
```

#### Using Nodemailer (SMTP)

```bash
npm install nodemailer
```

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check the email inbox at **Sinai@sheva-digital.com**
4. You should receive an email with:
   - Sender's name
   - Sender's email (for reply)
   - Phone number
   - Project description
   - Submission timestamp

## Form Validation

The form includes validation for:

- ✅ All fields are required
- ✅ Name: 2-50 characters
- ✅ Email: Valid email format
- ✅ Phone: Valid phone number (min 10 digits)
- ✅ Description: 10-500 characters

## Success Message

After successful submission:

- Form fields are cleared
- Success message is displayed for 5 seconds
- User can submit another form

## Error Handling

If submission fails:

- Error message is displayed
- Form data is preserved
- User can try again

## Security Features

- Server-side validation
- Rate limiting (recommended to add)
- CORS protection
- Input sanitization
