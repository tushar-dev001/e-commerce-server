function passwordValidation(password) {
    if (!/(?=.*?[A-Z])/.test(password)) {
        return "At least one upper case English letter";
    }

    if (!/(?=.*?[a-z])/.test(password)) {
        return "At least one lower case English letter";
    }

    if (!/(?=.*?[\d])/.test(password)) {
        return "At least one digit";
    }

    if (!/(?=.*?[\W])/.test(password)) {
        return "At least one special character";
    }

    if (password.length < 8) {
        return "Minimum eight in length";
    }

    return null; // No error
}

module.exports = passwordValidation;



// function passwordValidation(password){

//     const passPattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/

//     return passPattern.test(password)

// }

// module.exports = passwordValidation