
import User from '../models/UserModel.js'; // Assuming the path to your model file is correct
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Secret key to sign JWT tokens
const JWT_SECRET = "your_secret_key";

export const registerUser = async () => {
    const userData = {
        firstName: "M Zied",
        lastName: "Brichni",
        email: "admin@leoni.com",
        password: "123456",
        confPassword: "123456",
        role: "admin"
    };

    try {
        // Check if the password matches the confirmed password
        if (userData.password !== userData.confPassword) {
            throw new Error('Passwords do not match');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create the user
        const newUser = await User.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: hashedPassword,
            role: userData.role
        });

        console.log('User created successfully:', newUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
    }
};






export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("user.password",user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        token: token,
      });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};


// Me function
export const me = async (req, res) => {
  console.log("me",req.userId)
const user = await User.findOne({ where: { id: req.userId } });
        if(!user){
          res.status(404).json({ message: "user not found" });
        }
        else {
          return res.json({  user });
        }


};

// Logout function
export const logOut = async (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
};

// Update user by admin function
export const updateUserByAdmin = async (req, res) => {
    // Implement logic to update user by admin
};
// Function to update user profile
export const updateProfile = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Find the user by their ID
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user's profile information if provided
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        // Respond with success message
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
};
