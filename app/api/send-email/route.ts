import { NextResponse } from "next/server";

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

    // Create email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}

Project Description:
${description}

---
Submitted at: ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}
    `.trim();

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    // If no access key is configured, return success but log the data
    if (!accessKey || accessKey === "YOUR_WEB3FORMS_KEY") {
      console.log("=== NEW FORM SUBMISSION ===");
      console.log(emailContent);
      console.log("===========================");

      // Store in a simple JSON file or database in production
      // For now, just return success
      return NextResponse.json(
        {
          message: "Form submitted successfully",
          note: "Email service not configured. Check server logs for submission details.",
        },
        { status: 200 },
      );
    }

    // Try to send via Web3Forms
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Contact Form Submission from ${name}`,
          from_name: "Vector Graphics Website",
          to: "osama.khattak@alphinex.com",
          message: emailContent,
          replyto: email,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from email service");
      }

      const data = await response.json();

      if (data.success) {
        return NextResponse.json(
          { message: "Email sent successfully" },
          { status: 200 },
        );
      } else {
        throw new Error(data.message || "Failed to send email");
      }
    } catch (emailError) {
      console.error("Email service error:", emailError);

      // Log the submission even if email fails
      console.log("=== FORM SUBMISSION (Email Failed) ===");
      console.log(emailContent);
      console.log("======================================");

      // Still return success to user, but log the issue
      return NextResponse.json(
        {
          message: "Form submitted successfully",
          note: "Email notification may be delayed",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      { error: "Failed to process form. Please try again." },
      { status: 500 },
    );
  }
}
