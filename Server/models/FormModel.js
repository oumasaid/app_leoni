
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Shrinkform = db.define('Shrinkform', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    setupParameters: {
        type: DataTypes.JSON,

    },
    userMethod: {
        type: DataTypes.JSON,

    },
    date: {
        type: DataTypes.DATE,

    },
    applicant: {
        type: DataTypes.STRING,
    },
    pf: {
        type: DataTypes.STRING,

    },
    machineName: {
        type: DataTypes.STRING,

    },
    spliceType: {
        type: DataTypes.STRING,

    },
    wireType: {
        type: DataTypes.STRING,

    },
    crossSection: {
        type: DataTypes.STRING,

    },
    
    glueDesignation: {
        type: DataTypes.STRING,

    },
    valueTechnician1: {
        type: DataTypes.STRING,

    },
    valueTechnician2: {
        type: DataTypes.STRING,

    },
    valueTechnician3: {
        type: DataTypes.STRING,

    },
    averageValue: {
        type: DataTypes.STRING,

    },
    temperature: {
        type: DataTypes.INTEGER,

    },
    timeOrVelocity: {
        type: DataTypes.STRING,

    },
    coolingTime: {
        type: DataTypes.INTEGER,

    },
    coreTemperature: {
        type: DataTypes.INTEGER,

    },
    filePath: {
        type: DataTypes.STRING,

    },
    fileType: {
        type: DataTypes.STRING,

    },
    fileSize: {
        type: DataTypes.INTEGER,

    },
}, {
    // sequelize,
    modelName: 'Shrinkform',
    tableName: 'Shrinkforms',
    timestamps: false
});


export default Shrinkform;
