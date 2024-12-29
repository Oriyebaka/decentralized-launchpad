const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "oriyebakap6@gmail.com", // Replace with your email
        pass: "xljeduvvnpcwtjdo", // Replace with the app password
    },
});

const mailOptions = {
    from: `"Test Sender" <oriyebakap6@gmail.com>`,
    to: "oriyebakap6@gmail.com",
    subject: "Test Email",
    text: "This is a test email",
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error("Error sending email:", err);
    } else {
        console.log("Email sent successfully:", info.response);
    }
});
