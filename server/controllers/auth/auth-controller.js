const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user exists by email
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Check if user exists by username
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser)
      return res.json({
        success: false,
        message:
          "Whoops! Looks like you don’t have an account. Register first!",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Password mismatch. Let’s try that again!",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "SREE_AVANTHIGA",
      { expiresIn: "40m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false,sameSite: "Lax",  }).json({
      success: true,
      message: "Login Successfull",
      user: {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

//logout

const logoutUser = (req,res)=>{
  res.clearCookie("token").json({
      success:true,
      message:"Logged out Successfully"
  })
}

//auth middleware

const authMiddleware = async (req, res, next) => {
  console.log("Request cookies:", req.cookies); // Log all cookies

  const token = req.cookies.token;
  if (!token){
    console.log("Token not found in cookies.");

    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
    console.log("Token received:", token);
  try {
    const decoded = jwt.verify(token, "SREE_AVANTHIGA");
    req.user = decoded;
    console.log("Token is valid. User authenticated:", decoded);
    next();
  } catch (error) {
     return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};


module.exports = { registerUser,loginUser,logoutUser ,authMiddleware};
