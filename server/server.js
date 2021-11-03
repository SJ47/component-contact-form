const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());
const port = 5001;
const nodemailer = require("nodemailer");
require("dotenv").config();

const validateData = ({ name, email, message }) => {
    // Validate name
    if (name.length < 2) return false;
    console.log("Name: ", name);

    // Validate email
    if (email.length < 2) return false;
    console.log("Email: ", email);

    // Validate message
    if (message.length < 2) return false;
    console.log("Message: ", message);

    // Passed all data checks
    return true;
}

const sendEmail = ({ name, email, message }) => {
    // Send email
    console.log("Sending email");
    const username = process.env.REACT_APP_USER;
    const password = process.env.REACT_APP_PASSWORD;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: password
        }
    });

    const mailOptions = {
        from: `${email}`,
        to: "bertybubbles@hotmail.com",
        subject: 'Contact form submission from website',
        html:
            `<h1>Contact Form Details</h1>
            <p>FROM: ${name}</p>
            <p>(their) EMAIL: ${email}</p>
            <p>MESSAGE: ${message}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


app.get("/", function (req, res) {
    res.send("Hello World from Express")
});

app.get("/test", function (req, res) {
    res.send("Hello test")
});

app.post("/contact-us", function (req, res) {
    console.log("client request: ", req.body)
    // Validate form data received
    let response = {};
    if (validateData(req.body)) {
        sendEmail(req.body);
        response = ({ "status": "success", "message": "Thank you.  Your message has been sent." })
    } else {
        response = ({ "status": "failure", "message": "Messaged failed to send.  Please check your form data and try again." })
    }
    res.send(response);
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});
