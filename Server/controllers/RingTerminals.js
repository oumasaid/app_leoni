import upload from "../config/upload.js";
import RingTerminals from "../models/RingTerminalModel.js";
import Users from "../models/UserModel.js";

export const getRingTerminals = async (req, res) => {
  try {
    const ringTerminals = await RingTerminals.findAll();
    res.status(200).json(ringTerminals);
  } catch (error) {
    console.error("Error in getRingTerminals:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
//
export const getRingTerminalById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const ringTerminal = await RingTerminals.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!ringTerminal) {
      return res.status(404).json({ msg: "Ring terminal not found" });
    }
    res.status(200).json(ringTerminal);
  } catch (error) {
    console.error("Error in getRingTerminalById:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const createRingTerminal = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      let imagePath = null;
      if (req.file) {
        imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
      }

      const {
        typeOfTerminal,
        leoniTerminalNo,
        vwTerminalNo,
        supplierNo,
        bending,
        soldering,
      } = req.body;
      const userId = req.userId;
      const user = await Users.findByPk(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const createdBy = `${user.firstName} ${user.lastName}`;
      const newRingTerminal = await RingTerminals.create({
        typeOfTerminal,
        leoniTerminalNo,
        vwTerminalNo,
        supplierNo,
        bending,
        soldering,
        createdBy,
        image: imagePath,
      });

      res.status(201).json(newRingTerminal);
    });
  } catch (error) {
    console.error("Error in createRingTerminal:", error);
    res.status(500).json({ msg: error });
  }
};

export const updateRingTerminal = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      const { id } = req.params;
      const {
        typeOfTerminal,
        leoniTerminalNo,
        vwTerminalNo,
        supplierNo,
        bending,
        soldering,
      } = req.body;

      let updateData = req.body;

      const ringTerminal = await RingTerminals.findOne({
        where: {
          uuid: req.params.id,
        },
      });
      if (!ringTerminal) {
        return res.status(404).json({ msg: "Ring terminal not found" });
      }
      if (req.file) {
        console.log("yes image");
        updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
      } else {
        console.log("no image");

        updateData.image = ringTerminal.image;
      }

      await RingTerminals.update(updateData, {
        where: { uuid: id },
      });

      res.status(200).json({ msg: "Ring terminal updated successfully" });
    });
  } catch (error) {
    console.error("Error in updateRingTerminal:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteRingTerminal = async (req, res) => {
  try {
    const { id } = req.params;

    const ringTerminal = await RingTerminals.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!ringTerminal) {
      return res.status(404).json({ msg: "Ring terminal not found" });
    }

    await RingTerminals.destroy({ where: { uuid: id } });
    res.status(200).json({ msg: "Ring terminal deleted successfully" });
  } catch (error) {
    console.error("Error in deleteRingTerminal:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
