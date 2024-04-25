import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Machines = db.define('machine', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    machine_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100]
        }

    },
    shrinkCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['multiple', 'single']],
                msg: "shrinkCategory must be 'multiple' or 'single'"
            }
        }
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
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

// Map categories to corresponding values
const categoryMap = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6
};

// Update category attribute with specific categories
Machines.addHook('beforeValidate', (machine) => {
    machine.category = categoryMap[machine.category];
});

Users.hasMany(Machines);
Machines.belongsTo(Users, { foreignKey: 'userId' });

export default Machines;