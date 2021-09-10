const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");



const JWT_SECRET = 'vik@skum@RNirmalL';




// ROUTE 1
// Create user using: Post "api/auth/createuser" log in not required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    //Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if user is already exist or not
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "'Please try to log in with correct credentials.'" });
      }
      // adding hash and salt
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)

      res.json({authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);





// ROUTE 2
// Authenticate a  user using: Post "api/auth/login" log in not required


                
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false
    //Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} =req.body;
    try {

      let user = await User.findOne({email});
        if(!user){
          return(
            res.status(400).json({ error: 'Please try to log in with correct credentials.'})
          
          )
            
        }

        const passwordcompare = await bcrypt.compare(password, user.password)

        if(!passwordcompare){
          return(
          res.status(400).json({ error: 'Please try to log in with correct credentials.'})
          )
        }

        const data = {
          user:{
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authtoken});


      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })


// ROUTE 2
// get logged in user details using: Post "api/auth/getuser" log in required
router.post(
  "/getuser", fetchuser,
  async (req, res) => {

    try {
      userId =  req.user.id;
      const user = await User.findById(userId).select("-password")

      res.send(user)



    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }


  })

module.exports = router;
