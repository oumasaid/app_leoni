import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  // Extract the token from the request headers
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("token",token)
  if (!token) {
    return res.status(401).json({ msg: "Please provide a token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your_secret_key");
    console.log("decoded",decoded);
    // Extract the userId from the decoded token
    const userId = decoded.id;
    console.log("userId: " + userId);
    // Find the user in the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Attach userId and user role to the request object
    req.userId = userId;
    req.role = user.role;
    next();
  } catch (error) {
    return res.status(400).send( error);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

export const adminOnly = async (req, res, next) => {
  // Check if the user is an admin
  if (req.role !== "admin") {
    return res.status(403).json({ msg: "Unauthorized access" });
  }
  next();
};
