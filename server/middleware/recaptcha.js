import axios from "axios";

export default async function recaptcha (req, res, next){
  const {token} = req.body;
  console.log("attempting to verify recaptcha")
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (process.env.NODE_ENV == 'dev'){
    next();
  } 

  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    );
    console.log("google response" , response.data);
    // Check response status and send back to the client-side
    if (response.data.success) {
      console.log("captcha success")
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
}
