import Glue from "../models/GlueModel.js";
import User from "../models/UserModel.js";

export const getGlues = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Glue.findAll();
        } else {
            response = await Glue.findAll();
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getGlues:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const getGlueById = async (req, res) => {
    try {
        const glue = await Glue.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!glue) return res.status(404).json({ msg: "Glue not found" });

        let response;
        if (req.role === "admin" || glue.userId === req.userId) {
            response = glue.toJSON();
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createGlue = async (req, res) => {
    const { designation, leoniPN, supplier } = req.body; 

    try {
        const userId = req.userId;

        // Vérifiez si l'utilisateur avec l'ID fourni existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Créez une nouvelle colle avec les données fournies
        const glue = await Glue.create({
            designation: designation,
            leoniPN: leoniPN, 
            supplier: supplier, 
            createdBy: `${user.firstName} ${user.lastName}`,
            userId: userId // Assurez-vous que l'ID de l'utilisateur est valide
        });

        res.status(201).json({ msg: "Glue Created Successfully", glue });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateGlue = async (req, res) => {
    try {
        const glueId = req.params.id;
        const userId = req.userId;

        // Vérifiez si la colle avec l'ID fourni existe
        const glue = await Glue.findByPk(glueId);
        if (!glue) {
            return res.status(404).json({ msg: "Glue not found" });
        }

        // Vérifiez si l'utilisateur a le droit de mettre à jour cette colle
        if (req.role === "admin" || glue.userId === userId) {
            // Mettez à jour la colle avec les nouvelles données
            await Glue.update(req.body, {
                where: {
                    id: glueId
                }
            });

            return res.status(200).json({ msg: "Glue updated successfully" });
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteGlue = async (req, res) => {
    try {
        const glue = await Glue.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!glue) return res.status(404).json({ msg: "Glue not found" });

        if (req.role === "admin" || glue.userId === req.userId) {
            await Glue.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ msg: "Glue deleted successfully" });
        } else {
            return res.status(403).json({ msg: "Unauthorized Access" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
