const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());
const port = 5001;

app.get("/", function (req, res) {
    res.send("Hello World from Express")
});

app.get("/test", function (req, res) {
    res.send("Hello test")
});

app.post("/contact-us", function (req, res) {
    console.log("client request: ", req.body)
    const response = ({ "message": "Thank you.  Your message has been sent." })
    res.send(response);
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});
