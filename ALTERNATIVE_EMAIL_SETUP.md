# Alternative Email Setup - Using Resend (Recommended)

Resend is a more reliable email service that's perfect for production use.

## Setup Steps

### 1. Install Resend

```bash
npm install resend
```

### 2. Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the API key

### 3. Configure Environment Variable

Create or update `.env.local`:

```
RESEND_API_KEY=re_your_api_key_here
```

### 4. Update API Route

Replace the content of `app/api/send-email/route.ts` with:

```typescript
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, description } = body;

    // Validate required fields
    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Vector Graphics <onboarding@resend.dev>", // Use your verified domain
      to: ["Sinai@sheva-digital.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Project Description:</h3>
        <p>${description.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}</small></p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      { error: "Failed to process form. Please try again." },
      { status: 500 },
    );
  }
}
```

### 5. Verify Your Domain (Optional but Recommended)

For production, verify your domain in Resend:

1. Go to Resend dashboard
2. Add your domain (e.g., sheva-digital.com)
3. Add DNS records as instructed
4. Update the `from` field to use your domain

## Benefits of Resend

- ✅ More reliable than Web3Forms
- ✅ Better deliverability
- ✅ Email tracking and analytics
- ✅ 100 emails/day on free plan
- ✅ Professional email templates
- ✅ Custom domain support

## Current Setup (Fallback)

The current setup will:

- Log all form submissions to the console
- Return success to the user
- Work without any email service configured
- Allow you to see submissions in your terminal/logs

To see submissions, check your terminal where the dev server is running.
