import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Combinationwire = db.define('Combinationwire', {
    combination_Id: {
        type: DataTypes.INTEGER,
    },
    wire_Id: {
        type: DataTypes.INTEGER,
    }  
}, {
    sequelize: db,
    modelName: 'Combinationwire',
    tableName: 'Combinationwires',
    timestamps: false
});

export default Combinationwire;
