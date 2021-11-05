const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());
const port = 5001;
const nodemailer = require("nodemailer");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

const validateData = ({ name, email, message }) => {
    // Validate name
    console.log("Message length: ", message.length);
    return name.length >= 2 && message.length >= 2;
}

const sendEmail = ({ name, email, message }) => {
    // Send email
    // console.log("Sending email");
    // return;
    const username = process.env.REACT_APP_USER;
    const password = process.env.REACT_APP_PASSWORD;
    const recipient = process.env.REACT_APP_RECIPIENT;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: password
        }
    });

    const mailOptions = {
        from: email,   // Email of person completing contact form
        to: recipient,  // Person who's email is sent to (me)
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
    res.send("Hello World!")
});

app.post("/contact-us",
    // username must be an email
    body('email').isEmail(),
    // name must be at least 2 chars
    body('name').isLength({ min: 2, max: 40 }),
    // message must be at least 2 chars
    body('message').isLength({ min: 1, max: 1000 }),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            // Validation looks good, lets send the email and send success message back to client
            sendEmail(req.body)
            res.status(200).send({ "message": "Thank you.  Your message has been sent." })
        }
    }
)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});
