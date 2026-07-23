

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      service,
      message,
      bot_check,
    } = body;

    // ─────────────────────────────────────────────
    // Honeypot Protection
    // ─────────────────────────────────────────────
    if (bot_check && bot_check.trim().length > 0) {
      console.log("🚫 Bot blocked by honeypot.");
      return NextResponse.json({
        success: true,
        message: "Request received.",
      });
    }

    // ─────────────────────────────────────────────
    // Validate Required Fields
    // ─────────────────────────────────────────────
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    // ─────────────────────────────────────────────
    // Send Email
    // ─────────────────────────────────────────────
    const { data, error } = await resend.emails.send({
      from: "Queries <slick@layoutory.in>", // Must be a verified Resend sender
      to: ["info@scsfinc.com"],
      replyTo: email,
      subject: `New Inquiry: ${service} - ${name}`,
      react: EmailTemplate({
        name,
        email,
        phone,
        service,
        message,
      }),
    });

    // ─────────────────────────────────────────────
    // Resend Error
    // ─────────────────────────────────────────────
    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    // ─────────────────────────────────────────────
    // Success
    // ─────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      id: data?.id,
    });

  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      },
      {
        status: 500,
      }
    );
  }
}