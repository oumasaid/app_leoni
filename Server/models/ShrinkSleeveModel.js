// Import des modules requis
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

// Extraction du type de données et de la fonction Sequelize du module Sequelize
const { DataTypes } = Sequelize;

// Définition du modèle ShrinkSleeve
const ShrinkSleeve = db.define(
  "ShrinkSleeve",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.ENUM("End Splice", "Parallel Splice"),
    },
    supplier: {
      type: DataTypes.ENUM("Mecalbi", "DSG", "TE Raychem"),
    },
    designation: {
      type: DataTypes.STRING,
    },
    pn: {
      type: DataTypes.STRING,
    },
    suppliedDiameter: {
      type: DataTypes.DECIMAL(10, 2),
    },
    recoveredDiameter: {
      type: DataTypes.DECIMAL(10, 2),
    },
    dNet: {
      type: DataTypes.DECIMAL(10, 2),
    },
    varMin: {
      type: DataTypes.DECIMAL(10, 2),
    },
    varMax: {
      type: DataTypes.DECIMAL(10, 2),
    },
    minBundleSize: {
      type: DataTypes.DECIMAL(10, 2),
    },
    maxBundleSize: {
      type: DataTypes.DECIMAL(10, 2),
    },
    minSizeProg: {
      type: DataTypes.DECIMAL(10, 2),
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   notEmpty: true,
      //   len: [3, 100],
      // },
    },
    createdBy: {
      type: DataTypes.STRING,
    },
  },
  {
    // Options du modèle
    sequelize: db, // L'instance Sequelize
    modelName: "ShrinkSleeve", // Nom du modèle
    tableName: "ShrinkSleeve", // Nom de la table dans la base de données
    timestamps: false,
  }
);

// Association avec le modèle User
ShrinkSleeve.belongsTo(User); // Indique que chaque ShrinkSleeve appartient à un utilisateur

// Export du modèle ShrinkSleeve
export default ShrinkSleeve;