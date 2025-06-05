import User from "../../../model/user/index.js";
import { sendResponse } from "../../../middlewares/helper.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, userName, password } = req.body;
    if (!name || !email || !phone || !userName || !password) {
      return sendResponse(
        res,
        401,
        false,
        "Name, Email, Contact No, Username & Password are required"
      );
    }
    const isEmailExist = await User.findOne({
      email: email,
    });
    if (isEmailExist) {
      return sendResponse(
        res,
        401,
        false,
        "User already exists with this email"
      );
    }
    const isPhoneExits = await User.findOne({
      phone: phone,
    });
    if (isPhoneExits) {
      return sendResponse(
        res,
        401,
        false,
        "User already exists with this Phone Number"
      );
    }

    const user = await User.create(req.body);
    return sendResponse(res, 200, true, "User registered successfully", user);
  } catch (error) {
    console.log(`Error in user registration - ${error}`);
    return sendResponse(res, 500, false, "User registration failed");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(res, 401, "Email and password are required");
    }
    const user = User.findOne({ email: email, password: password });
    return sendResponse(res, 200, true, "User logged in successfully");
  } catch (error) {
    console.error("User login failed", error);
    return sendResponse(res, 500, false, "User login failed");
  }
};
