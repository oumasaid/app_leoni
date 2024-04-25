import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Weldings = db.define('welding', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [3, 100],
        },
      },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [3, 100],
        },
      },


}, {
    freezeTableName: true
});

Users.hasMany(Weldings);
Weldings.belongsTo(Users, { foreignKey: 'userId' });

// Données du tableau des machines de soudage
// const weldingData = [
//     { model: "Schunk MINIC II", supplier: "Schunk" },
//     { model: "Schunk MINIC III", supplier: "Schunk" },
//     { model: "Schunk GS40", supplier: "Schunk" },
//     { model: "TS6", supplier: "Telsonic" }
// ];

// // Création des modèles Weldings à partir des données du tableau
// const weldingModels = await Promise.all(weldingData.map(async data => { //promise.all  pour attendre que toutes les opérations d'insertion dans la base de données soient terminées
//     try {
//         return await Weldings.findOrCreate({
//             where: data
//         });
//     } catch (error) {
//         console.error("Error inserting data:", error);
//     }
// }));


export default Weldings;