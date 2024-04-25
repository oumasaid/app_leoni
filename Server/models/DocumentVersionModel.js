import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Documentversion = db.define('Documentversion', {
    version: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING,
    },
    percentage: {
        type: DataTypes.INTEGER,
    },
    document_Id: {
        type: DataTypes.INTEGER,
    },
    user_Id: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize: db,
    modelName: 'Documentversion',
    tableName: 'Documentversions',
});

Documentversion.associate = function(models) {
    Documentversion.belongsTo(models.Document, { foreignKey: 'document_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Documentversion.belongsTo(models.User, { foreignKey: 'user_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
};

export default Documentversion;
