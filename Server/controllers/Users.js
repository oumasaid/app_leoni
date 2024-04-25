import User from "../models/UserModel.js";
import argon2 from "argon2";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";


export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'firstName', 'lastName', 'email', 'role'] // Mise à jour pour inclure le prénom et le nom de famille
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'firstName', 'lastName', 'email', 'role'], // Mise à jour pour inclure le prénom et le nom de famille
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, confPassword, role } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: email });
    console.log("result",existingUser.email===email);
    if (existingUser.email === email) {
      return res
        .status(400)
        .json({ msg: "Email already exists", existingUser, success: false });
    }

    // If the email doesn't exist, create the user
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashed",hashedPassword);

      // Create the user
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: role,
      });

    const message = `hello ${firstName} ${lastName} this is your password ${password}`;
    const subject = "Password of Leoni App"; // Define subject here
    await sendEmail(email, subject, message);

    res.status(201).json({ msg: "Registration confirmed!", success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message, success: false });
  }
};


export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const { firstName, lastName, email, password, confPassword, role } = req.body; // Mise à jour pour utiliser les nouveaux champs
    let hashPassword;
    if(password){
        hashPassword=await bcrypt.hash(password,10);
    }
    //
    try {
        await User.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
