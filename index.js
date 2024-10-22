const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port =  3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the Sage Syntax Email Service!");
});

app.post("/send-email", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "enquirysagesyntax@gmail.com",
      pass: "wnfu xcwt yarn kdwr",
    },
  });

  const mailOptions = {
    from: "enquirysagesyntax@gmail.com",
    to: "info@sagesyntax.com",
    subject: `Interested In ${message.courseIntrestedIn} | Sage Syntax`,
    text: `
      Name: ${name}
      Email: ${email}
      Mobile Number: ${message.mobile},
      Education : ${message.edu},
      Passing Year : ${message.passingYear},
      Shows Intrest In Course Name : ${message.courseIntrestedIn},
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(mailOptions);
    if (error) {
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send({code:200 ,msg:"Email sent successfully"});
    }
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:/${port}`);
});
