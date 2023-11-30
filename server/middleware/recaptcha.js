const axios = require("axios");
require("dotenv").config();

const recaptcha = async (req, res, next) => {
  const {token} = req.body;


  try {
    console.log("trying");
    console.log(token)
    // Sending secret key and response token to Google Recaptcha API for authentication.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=***REMOVED***&response=${token}`
    );
    console.log(response.data);
    // Check response status and send back to the client-side
    if (response.data.success) {
      // res.send("Human 👨 👩");
      next();
    } else {
      // res.send("Robot 🤖");
    }
  } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.error(error);
    res.status(500).send("Error verifying reCAPTCHA");
  }
};
module.exports = recaptcha;
