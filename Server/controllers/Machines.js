import Machines from "../models/MachineModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import upload from "../config/upload.js";

export const getMachines = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Machines.findAll({
                attributes: ['uuid', 'name', 'supplier', 'machine_name', 'shrinkCategory', 'category', 'createdBy','image'], // Include createdBy for admins
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Machines.findAll({
                attributes: ['uuid', 'name', 'supplier', 'machine_name', 'shrinkCategory', 'category','image'],
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
        console.error("Error in getMachines:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const getMachineById = async (req, res) => {
    try {
        const machine = await Machines.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ['uuid', 'name', 'supplier', 'machine_name', 'shrinkCategory', 'category', 'createdBy'] // Include machine_name
        });
        if (!machine) return res.status(404).json({ msg: "Machine not found" });

        let response;
        if (req.role === "admin" || machine.userId === req.userId) {
            response = machine.toJSON(); // Convert Sequelize instance to plain JSON object
            response.createdBy = machine.createdBy; // Include createdBy field
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
//
export const createMachine = async (req, res) => {
    try {
        // Execute the upload middleware to handle file upload
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err });
            }

            const { name, supplier, shrinkCategory, category, machine_name } = req.body;
            const userId = req.userId;

            // Retrieve user details from the database using the user ID
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            // Build the value of createdBy using the user's first name and last name
            const createdBy = `${user.firstName} ${user.lastName}`;

            let imagePath = null;
            if (req.file) {
                imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
            }

            const machine = await Machines.create({
                name: name,
                supplier: supplier,
                shrinkCategory: shrinkCategory,
                machine_name: machine_name, 
                category: category,
                createdBy: createdBy,
                userId: userId,
                image: imagePath // Save the image path in the database
            });

            res.status(201).json({ msg: "Machine Created Successfully", machine });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const updateMachine = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err });
            }
        const machine = await Machines.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!machine) return res.status(404).json({ msg: "Machine not found" });

        if (req.role === "admin" || machine.userId === req.userId) {
            let updateData = req.body;
            
            // Check if an image file is uploaded
            if (req.file) {
                console.log("there's an image")
                updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
            }
            else {
                updateData.image=machine.image
            }


            await Machines.update(updateData, {
                where: {
                    uuid: req.params.id
                }
            });
            res.status(200).json({ msg: "Machine updated successfully" });
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
    });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const deleteMachine = async (req, res) => {
    try {
        const machine = await Machines.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!machine) return res.status(404).json({ msg: "Machine not found" });

        if (req.role === "admin" || machine.userId === req.userId) {
            await Machines.destroy({
                where: {
                    uuid: req.params.id
                }
            });
            res.status(200).json({ msg: "Machine deleted successfully" });
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
