const emailValidation = require("../helpers/emailValidation");
const passwordValidation = require("../helpers/passwordValidation");
const User = require('../model/userSchema')
const bcrypt = require('bcrypt');

const registrationController = async (req, res)=>{
    const { name, email, password } = req.body;

    const existingUser = await User.find({email:email})
    if(existingUser.length === 0){
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
        }
    
        // password validation
        // const passwordError = passwordValidation(password);
        // if (passwordError) {
        //     return res.send(passwordError);
        // }

        // Hash the password and create a new user
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                return res.status(500).send("Error hashing password");
            }

            const newUser = new User({
                name: name,
                email: email,
                password: hash,
            });

            newUser.save();

            res.send(newUser);
        });
    
    }else{
        res.send("Email Already Exist ")
    }
}

module.exports = registrationController