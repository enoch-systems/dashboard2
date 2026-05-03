import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Only allow specific emails
    const allowedEmails = ['amahchibu@gmail.com'];
    const normalizedEmail = email.toLowerCase().trim();
    
    if (!allowedEmails.includes(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Email not authorized for password reset' },
        { status: 403 }
      );
    }

    // Send password reset email using Resend
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; text-align: center;">
          <h1 style="color: #333; margin-bottom: 20px;">Password Reset Request</h1>
          <p style="color: #666; margin-bottom: 20px;">Hello,</p>
          <p style="color: #666; margin-bottom: 20px;">
            You requested to reset your password for Tech Trailblazer Academy. Please click the link below to reset your password:
          </p>
          <div style="margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; margin-bottom: 20px;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <p style="color: #999; font-size: 12px;">
            This link will expire in 24 hours for security reasons.
          </p>
        </div>
      </div>
    `;

    try {
      await resend.emails.send({
        from: 'noreply@techtrailblazeracademy.com',
        to: normalizedEmail,
        subject: 'Password Reset - Tech Trailblazer Academy',
        html: emailContent,
      });

      console.log(`Password reset email sent to: ${normalizedEmail}`);

      return NextResponse.json(
        { 
          message: 'Password reset instructions have been sent to your email.' 
        },
        { status: 200 }
      );

    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
