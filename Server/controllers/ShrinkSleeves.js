import upload from "../config/upload.js";
import ShrinkSleeve from "../models/ShrinkSleeveModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getShrinkSleeves = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await ShrinkSleeve.findAll({
        attributes: [
          "uuid",
          "type",
          "supplier",
          "designation",
          "pn",
          "suppliedDiameter",
          "recoveredDiameter",
          "dNet",
          "varMin",
          "varMax",
          "minBundleSize",
          "maxBundleSize",
          "minSizeProg",
          "createdBy",
          "image"

        ],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await ShrinkSleeve.findAll({
        attributes: [
          "uuid",
          "type",
          "supplier",
          "designation",
          "pn",
          "suppliedDiameter",
          "recoveredDiameter",
          "dNet",
          "createdBy",
          "varMin",
          "varMax",
          "minBundleSize",
          "maxBundleSize",
          "minSizeProg",
          "image"

        ],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getShrinkSleeves:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const getShrinkSleeveById = async (req, res) => {
  try {
    
    const shrinkSleeve = await ShrinkSleeve.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!shrinkSleeve) return res.status(404).json({ msg: "Data not found" });

    let response;
    if (req.role === "admin") {
      response = await ShrinkSleeve.findOne({
        attributes: [
          "uuid",
          "type",
          "supplier",
          "designation",
          "pn",
          "suppliedDiameter",
          "recoveredDiameter",
          "dNet",
          "varMin",
          "varMax",
          "minBundleSize",
          "maxBundleSize",
          "minSizeProg",
          "image"
        ],
        where: {
          id: shrinkSleeve.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await ShrinkSleeve.findOne({
        attributes: [
          "uuid",
          "type",
          "supplier",
          "designation",
          "pn",
          "suppliedDiameter",
          "recoveredDiameter",
          "dNet",
          "varMin",
          "varMax",
          "minBundleSize",
          "maxBundleSize",
          "minSizeProg",
          'image'
        ],
        where: {
          id: shrinkSleeve.id,
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createShrinkSleeve = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            const { type, supplier, designation, pn, suppliedDiameter, recoveredDiameter, dNet, varMin, varMax, minBundleSize, maxBundleSize, minSizeProg } = req.body;
            // console.log("type",type);

            const userId = req.userId;
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            let imagePath = null;
            if (req.file) {
              imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
            }


            const createdBy = `${user.firstName} ${user.lastName}`;

            const shrinkSleeve = await ShrinkSleeve.create({
                type,
                supplier,
                designation,
                pn,
                suppliedDiameter,
                recoveredDiameter,
                dNet,
                varMin,
                varMax,
                minBundleSize,
                maxBundleSize,
                minSizeProg,
                createdBy,
                image:imagePath,
                userId: req.userId
            });

            res.status(201).json({ msg: "ShrinkSleeve created successfully" ,shrinkSleeve});
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


export const updateShrinkSleeve = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
          return res.status(500).json({ message: err });
      }
    const shrinkSleeve = await ShrinkSleeve.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!shrinkSleeve) return res.status(404).json({ msg: "Data not found" });
  
    

    let updateData = req.body; // Get the data from the request body
    
    if (req.file) {
      // If a new file is uploaded, update the imagePath
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    } else {
      updateData.image = shrinkSleeve.imagePath; // Use shrinkSleeve's current imagePath
    }
    
    // Update the imagePath property in updateData
    // updateData.imagePath = imagePath;
    
    // Update the shrinkSleeve with the updated data
    await shrinkSleeve.update(updateData, {
      where: {
        uuid: req.params.id,
      },
    });
    
    res.status(200).json({ msg: "ShrinkSleeve updated successfully",ShrinkSleeve });
  });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteShrinkSleeve = async (req, res) => {
  try {
    const shrinkSleeve = await ShrinkSleeve.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!shrinkSleeve) return res.status(404).json({ msg: "Data not found" });

    if (req.role !== "admin" && req.userId !== shrinkSleeve.userId) {
      return res.status(403).json({ msg: "Unauthorized Access" });
    }

    await shrinkSleeve.destroy();
    res.status(200).json({ msg: "ShrinkSleeve deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
