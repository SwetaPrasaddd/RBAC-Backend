const nodemailer = require('nodemailer');

const sendVerificationMail = async (email, name, url) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"RBAC Blog App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your email",
        html: `
            <h3>Hi ${name},</h3>
            <h4>Thank You for Registering to our RBAC Blog !🚀</h4>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${url}">Verify Email</a>
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationMail;
