/**
 * THE MASTERY DR — Centralized Email Subsystem
 * Reusable, branded HTML transactional email dispatcher
 */

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions): Promise<boolean> {
  const from = process.env.EMAIL_FROM || 'The Mastery Dr <hello@themasterydr.com>';
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey && apiKey !== 're_sample_key_themasterydr') {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to, subject, html, text }),
      });
      return response.ok;
    } catch (err) {
      console.error('Failed to dispatch external email via Resend:', err);
    }
  }

  // Development & fallback logger for seamless visibility
  console.log('------------------------------------------------------------');
  console.log(`[TRANSACTIONAL EMAIL DISPATCHED]`);
  console.log(`TO: ${to}`);
  console.log(`SUBJECT: ${subject}`);
  console.log(`TIMESTAMP: ${new Date().toISOString()}`);
  console.log('------------------------------------------------------------');
  return true;
}

// ==========================================
// Branded Email Template Wrapper
// ==========================================
export function wrapBrandedEmail(headline: string, bodyContentHtml: string, ctaUrl?: string, ctaText?: string): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${headline}</title>
    <style>
      body { margin: 0; padding: 0; background-color: #0C0A08; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F5EEDC; line-height: 1.6; }
      .container { max-width: 600px; margin: 30px auto; background-color: #14110E; border: 1px solid rgba(199, 162, 75, 0.28); border-radius: 4px; overflow: hidden; }
      .header { padding: 36px 32px 24px; border-bottom: 1px solid rgba(199, 162, 75, 0.16); text-align: center; }
      .wordmark { font-size: 22px; font-weight: 700; color: #F5EEDC; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }
      .byline { font-size: 10px; color: #C7A24B; letter-spacing: 0.18em; text-transform: uppercase; margin-top: 6px; }
      .content { padding: 36px 32px; font-size: 15px; color: #EBE0C4; }
      .headline { font-size: 24px; font-weight: 600; color: #F5EEDC; margin-top: 0; margin-bottom: 20px; line-height: 1.25; }
      .btn { display: inline-block; background-color: #C7A24B; color: #0C0A08; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; padding: 14px 28px; text-decoration: none; border-radius: 2px; margin: 24px 0 16px; }
      .footer { padding: 24px 32px; background-color: #0C0A08; border-top: 1px solid rgba(199, 162, 75, 0.14); text-align: center; font-size: 11px; color: #A89E88; }
      .footer a { color: #C7A24B; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="wordmark">The Mastery Dr</div>
        <div class="byline">Moses Oladoye | Gain Mastery Institute</div>
      </div>
      <div class="content">
        <h1 class="headline">${headline}</h1>
        ${bodyContentHtml}
        ${ctaUrl && ctaText ? `<div style="text-align: center;"><a href="${ctaUrl}" class="btn">${ctaText}</a></div>` : ''}
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} The Mastery Dr &amp; Gain Mastery Institute. All rights reserved.</p>
        <p>Lagos, Nigeria &bull; Growth. Consistent Growth.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Helper dispatchers for specific domain events
export async function sendWelcomeEmail(to: string, fullName: string) {
  const html = wrapBrandedEmail(
    `Welcome to the Journey, ${fullName}`,
    `<p>You have taken a deliberate step toward clarity, consistent growth, and purposeful impact.</p>
     <p>At Gain Mastery Institute, we hold fast to the conviction that <em>"no one is empty, everyman is designed for something great, that greatness just needs to find expression."</em></p>
     <p>Your student account is now active. Explore the foundational courses, audit your life trajectory, and begin your journey into mastery.</p>`,
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/courses`,
    'Explore the Institute'
  );
  return sendEmail({ to, subject: 'Welcome to The Mastery Dr & Gain Mastery Institute', html });
}

export async function sendPaymentReceiptEmail(to: string, fullName: string, courseTitle: string, amountFormatted: string, reference: string) {
  const html = wrapBrandedEmail(
    `Enrollment Confirmed: ${courseTitle}`,
    `<p>Dear ${fullName},</p>
     <p>Your payment of <strong>${amountFormatted}</strong> has been verified via Paystack. Your enrollment is now active.</p>
     <div style="background: #1B1713; border: 1px solid rgba(199, 162, 75, 0.2); padding: 18px; margin: 20px 0; border-radius: 4px;">
       <p style="margin: 0 0 8px;"><strong>Transaction Reference:</strong> ${reference}</p>
       <p style="margin: 0;"><strong>Program:</strong> ${courseTitle}</p>
     </div>
     <p>You can access your modules, video lessons, and curriculum immediately through your student dashboard.</p>`,
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
    'Enter Student Dashboard'
  );
  return sendEmail({ to, subject: `Receipt & Enrollment: ${courseTitle}`, html });
}

export async function sendSpeakingRequestReceived(to: string, organizerName: string, eventName: string, applicationCode: string) {
  const html = wrapBrandedEmail(
    `Speaking Invitation Received [${applicationCode}]`,
    `<p>Dear ${organizerName},</p>
     <p>Thank you for inviting <strong>Moses Oladoye (The Mastery Dr)</strong> to minister and teach at <strong>${eventName}</strong>.</p>
     <p>Your speaking invitation brief has been logged with code <strong>${applicationCode}</strong>. Our executive scheduling team reviews every application thoroughly to ensure alignment of purpose, schedule availability, and logistics.</p>
     <p>We will contact you within 48 to 72 business hours.</p>`,
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}`,
    'Visit The Mastery Dr'
  );
  return sendEmail({ to, subject: `Speaking Invitation Received: ${eventName} (${applicationCode})`, html });
}

export async function sendBereansApplicationReceived(to: string, applicantName: string) {
  const html = wrapBrandedEmail(
    `The Bereans Application Received`,
    `<p>Dear ${applicantName},</p>
     <p>Thank you for applying to join <strong>The Bereans</strong> reading community.</p>
     <p>The Bereans is a dedicated circle of determined minds committed to cultivating the rigorous habit of reading and real-world life improvement. Applications are screened to maintain an atmosphere of high intellectual curiosity and accountability.</p>
     <p>You will receive an update regarding your admission status shortly.</p>`,
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/bereans`,
    'Learn More About The Bereans'
  );
  return sendEmail({ to, subject: 'Your Application to The Bereans Reading Community', html });
}
