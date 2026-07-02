// src/app/api/send/route.ts
import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 1. Destructure bot_check along with the rest of your data
    const { name, email, phone, service, message, bot_check } = body;

    // 2. HONEYPOT CHECK: If a bot filled out the hidden field, stop here.
    if (bot_check && bot_check.length > 0) {
      console.log("Bot blocked successfully by honeypot.");
      // Return a fake 200 success so the bot thinks it worked and moves on
      return NextResponse.json({ success: true, message: "Blocked by honeypot" });
    }

    // 3. If the honeypot is empty, it's a real human. Proceed with sending.
    const data = await resend.emails.send({
      from: 'Queries <pivotal@layoutory.in>', 
      to: ['paul@pivotalbuilderssf.com'], 
      replyTo: email, 
      subject: `New Inquiry: ${service} - ${name}`,
      react: EmailTemplate({ name, email, phone, service, message }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error });
  }
}