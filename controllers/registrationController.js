const emailValidation = require("../helpers/emailValidation");
const passwordValidation = require("../helpers/passwordValidation");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.find({ email: email });
  if (existingUser.length === 0) {
    if (!name) {
      return res.send("Name Required");
    }

    if (!email) {
      return res.send("Email Required");
    } else if (!emailValidation(email)) {
      return res.send("Valid Email Required");
    }

    if (!password) {
      return res.send("Password Required");
    } else {
      // password validation
      // const passwordError = passwordValidation(password);
      // if (passwordError) {
      //     return res.send(passwordError);
      // }

      const otp = otpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: true });

      // Hash the password and create a new user
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(500).send("Error hashing password");
        }

        const newUser = new User({
          name: name,
          email: email,
          password: hash,
          otp: otp
        });

        newUser.save();

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "tushar789imran@gmail.com",
            pass: "tbrh akmi auug zscc",
          },
        });

        const info = await transporter.sendMail({
          from: "tushar789imran@gmail.com", // sender address
          to: "tusharimran789@gmail.com", // list of receivers
          subject: "Verify your Email", // Subject line
          html: `<div style="width: 600px; height: 200px; display: flex;"> <div style="width: 50%; height: 100px;"> Please verify your email by click on this button <a href="https://github.com/tushar-dev001/tushari789">Verify</a> ${otp} </div></div>`, // html body
        });

        res.send(newUser);
      });
    }
  } else {
    res.send("Email Already Exist ");
  }
};

module.exports = registrationController;
