import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Wires = db.define('wire', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    crossSection: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    insulationMaterial: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
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

Users.hasMany(Wires);
Wires.belongsTo(Users, { foreignKey: 'userId' });

// Function to seed initial wire data
// const seedWireData = async () => {
//     try {
//         const wireData = [
//             { type: 'FLRY-A', crossSection: '0.13', insulationMaterial: 'PVC (Polyvinyl Chloride)' },
//             { type: 'FLRY-A', crossSection: '0.35', insulationMaterial: 'PVC (Polyvinyl Chloride)' },
//             { type: 'FLRY-A', crossSection: '0.5', insulationMaterial: 'PVC (Polyvinyl Chloride)' },
//             { type: 'FLRY-A', crossSection: '0.75', insulationMaterial: 'PVC (Polyvinyl Chloride)' },
//             { type: 'FLRY-A', crossSection: '1', insulationMaterial: 'PVC (Polyvinyl Chloride)' },
//             { type: 'FLRY-A', crossSection: '1.5', insulationMaterial: 'PVC (Polyvinyl Chloride)' },
//             { type: 'FLRY-A', crossSection: '2', insulationMaterial: 'PVC (Polyvinyl Chloride)' },
//             { type: 'FLRY-A', crossSection: '2.5', insulationMaterial: 'PVC (Polyvinyl Chloride)' }
//         ];

//         await Wires.bulkCreate(wireData);
//         console.log("Wire data seeded successfully.");
//     } catch (error) {
//         console.error("Error seeding wire data:", error);
//     }
// };

// // Call the function to seed initial wire data
// seedWireData();

export default Wires;