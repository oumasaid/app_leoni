import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Documentclassification = db.define('Documentclassification', {
    documentType: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: db,
    modelName: 'Documentclassification',
    tableName: 'Documentclassifications',
    timestamps: false
});

Documentclassification.associate = function(models) {
    Documentclassification.hasMany(models.Document, { foreignKey: 'documentClassification_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
};

export default Documentclassification;
