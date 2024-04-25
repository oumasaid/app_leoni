import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const RingTerminals = db.define(
  "ring_terminal",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    typeOfTerminal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    leoniTerminalNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    vwTerminalNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    supplierNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    bending: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    soldering: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default RingTerminals;
