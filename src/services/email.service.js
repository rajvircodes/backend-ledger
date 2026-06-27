const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Common Styles & Wrapper
const emailWrapper = (content) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #1a73e8; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Backend Ledger</h1>
    </div>
    <div style="padding: 30px;">
        ${content}
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">© 2026 Backend Ledger Inc. | Secure Financial Systems</p>
        <p style="margin: 5px 0 0;">You received this email because you are a registered user.</p>
    </div>
</div>
`;

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"Backend Ledger Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: emailWrapper(html),
        });
    } catch (error) {
        console.error('Email Error:', error);
    }
};

/**
 * 1. Registration Email
 */
async function sendRegistrationEmail(userEmail, name) {
    const html = `
        <h2 style="color: #1a73e8;">Welcome aboard, ${name}!</h2>
        <p>We're thrilled to have you join <b>Backend Ledger</b>. Your account is now active and ready for secure transactions.</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #1a73e8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Explore Your Dashboard</a>
        </div>
        <p>If you have any questions, feel free to reply to this email.</p>
    `;
    await sendEmail(userEmail, 'Welcome to Backend Ledger! ', html);
}

/**
 * 2. Transaction Success Email
 */
async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const html = `
        <h2 style="color: #28a745;">Transaction Successful!</h2>
        <p>Hello ${name}, your recent transfer has been processed successfully.</p>
        <div style="background-color: #f1f3f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="color: #5f6368; padding: 5px 0;">Amount:</td>
                    <td style="text-align: right; font-weight: bold; color: #202124;">₹${amount}</td>
                </tr>
                <tr>
                    <td style="color: #5f6368; padding: 5px 0;">Recipient Account:</td>
                    <td style="text-align: right; font-weight: bold; color: #202124;">${toAccount}</td>
                </tr>
                <tr>
                    <td style="color: #5f6368; padding: 5px 0;">Status:</td>
                    <td style="text-align: right; color: #28a745; font-weight: bold;">COMPLETED</td>
                </tr>
            </table>
        </div>
        <p style="font-size: 13px; color: #5f6368;">If you did not authorize this transaction, please contact our support immediately.</p>
    `;
    await sendEmail(userEmail, 'Payment Confirmation: Transaction Successful ', html);
}

/**
 * 3. Transaction Failure Email
 */
async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const html = `
        <h2 style="color: #d93025;">Transaction Failed</h2>
        <p>Hello ${name}, we couldn't process your transaction of <b>₹${amount}</b> to account <b>${toAccount}</b>.</p>
        <p style="color: #5f6368;">Common reasons for failure include insufficient funds or temporary server issues.</p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="border: 1px solid #1a73e8; color: #1a73e8; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Try Again</a>
        </div>
    `;
    await sendEmail(userEmail, 'Urgent: Transaction Failed ', html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};