import Wires from "../models/WireModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import upload from "../config/upload.js";

export const getWires = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Wires.findAll({
                attributes: ['uuid', 'type', 'crossSection', 'insulationMaterial','createdBy'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Wires.findAll({
                attributes: ['uuid', 'type', 'crossSection', 'insulationMaterial','createdBy'],
                where: {
                    userId: {
                        [Op.eq]: req.userId
                    }
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }

        const wires = await Wires.findAll({
            attributes: ['type', 'crossSection', 'insulationMaterial'],
        });

        wires.forEach((wire) => {
            console.log(`Type: ${wire.type}, Cross Section (mm²): ${wire.crossSection}, Insulation Material: ${wire.insulationMaterial}`);
        });

        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getWires:", error);
        res.status(500).json({ msg: error.message });
    }
}

// Other functions like getWireById and createWire can follow here

export const getWireById = async (req, res) => {
    try {
        const Wire = await Wires.findOne({
            where: {
                uuid: req.params.id
            }

        });
        if (!Wire) return res.status(404).json({ msg: "Data not found" });
        let response;
        if (req.role === "admin") {
            response = await Wires.findOne({
                attributes: ['uuid', 'type', 'crossSection', 'insulationMaterial'],
                where: {
                    [Op.and]: [{ id: Wire.id }, { userId: req.userId }] // on a pris un autre opérateur
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Wires.findOne({
                attributes: ['uuid', 'type', 'crossSection', 'insulationMaterial'],
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
        res.status(500).json({ msg: error.message });
    }
}

export const createWire = async (req, res) => {
    
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err });
            }
            const { type, crossSection, insulationMaterial } = req.body;

        const userId = req.userId;
        const user = await User.findOne({ where: { id: userId } });
        if (user){
            const createdBy=`${user.firstName} ${user.lastName}`;
        await Wires.create({
            type: type,
            crossSection: crossSection,
            insulationMaterial: insulationMaterial,
            createdBy:createdBy,
            userId: req.userId,
        });
    }
        res.status(201).json({ msg: "Wire Created Successfuly" });
    });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateWire = async (req, res) => {
    try {
        const Wire = await Wires.findOne({
            where: {
                uuid: req.params.id  // verifier les données du wire en foncction de l'identifiant envoyé par l'utlisateur
            }
        });
        if (!Wire) return res.status(404).json({ msg: "Data not found" });
        const { type, crossSection, insulationMaterial } = req.body;
        if (req.role === "admin") {
            await Wires.update({ type, crossSection, insulationMaterial }, {
                where: {
                    id: Wire.id
                }
            });
        } else {
            if (req.userId !== Wire.userId) return res.status(403).json({ msg: "Unauthorized Access" });
            await Wires.update({ type, crossSection, insulationMaterial }, {
                where: {
                    [Op.and]: [{ id: Wire.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Wire updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteWire = async (req, res) => {
    try {
        const Wire = await Wires.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!Wire) return res.status(404).json({ msg: "Data not found" });
        const { type, crossSection, insulationMaterial } = req.body;
        if (req.role === "admin") {
            await Wires.destroy({
                where: {
                    id: Wire.id
                }
            });
        } else {
            if (req.userId !== Wire.userId) return res.status(403).json({ msg: "Unauthorized Access" });
            await Wires.destroy({
                where: {
                    [Op.and]: [{ id: Wire.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Wire deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

