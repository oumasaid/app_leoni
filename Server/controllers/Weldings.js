import { Op } from "sequelize";
import Weldings from "../models/WeldingModel.js";
import User from "../models/UserModel.js";
import upload from "../config/upload.js";

export const getWeldings = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Weldings.findAll({
                attributes: ['uuid', 'model', 'supplier','createdBy','image'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            })
        } else {
            response = await Weldings.findAll({
                attributes: ['uuid', 'model', 'supplier','createdBy','image'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getWeldings:", error);
        res.status(500).json({ msg: error.message });
    }
}

export const getWeldingById = async (req, res) => {
    try {
        const welding = await Weldings.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!welding) return res.status(404).json({ msg: "Data not found" });
        let response;
        if (req.role === "admin" || welding.userId === req.userId) {
            response = welding.toJSON();
            response.createdBy = welding.createdBy;
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createWelding = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err });
            }
            const { model, supplier } = req.body;
            
            let imagePath = null;
            if (req.file) {
                imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
            }
            const userId = req.userId; // Retrieve the ID of the logged-in user
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            const createdBy = `${user.firstName} ${user.lastName}`; // Construct the createdBy value from user information
            await Weldings.create({
                model: model,
                supplier: supplier,
                createdBy: createdBy,
                userId: userId,
                image:imagePath
            });
            res.status(201).json({ msg: "Welding Created Successfully" });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const updateWelding = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
        const welding = await Weldings.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!welding) return res.status(404).json({ msg: "Data not found" });
        const { model, supplier } = req.body;
        let updateData = req.body; 
        if (req.file) {
            // If a new file is uploaded, update the imagePath
            updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
          } else {
            // If no new file is uploaded, keep the existing imagePath
            updateData.image = welding.image; // Use shrinkSleeve's current imagePath
          }

        if (req.role === "admin" || welding.userId === req.userId) {
            await welding.update(updateData, {
                where: {
                  uuid: req.params.id,
                },
              });
            res.status(200).json({ msg: "Welding updated successfully" });
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
    });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteWelding = async (req, res) => {
    try {
        const welding = await Weldings.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!welding) return res.status(404).json({ msg: "Welding not found" });
        if (req.role === "admin" || welding.userId === req.userId) {
            await Weldings.destroy({
                where: {
                    uuid: req.params.id
                }
            });
            res.status(200).json({ msg: "Welding deleted successfully" });
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
