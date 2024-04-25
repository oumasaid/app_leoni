import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Document = db.define('Document', {
    reference: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('Draft', 'Pending Approval', 'Approved', 'Rejected'),
    },
    PF: {
        type: DataTypes.STRING,
    },
    combination_Id: {
        type: DataTypes.INTEGER,
    },
    user_Id: {
        type: DataTypes.INTEGER,
    },
    documentClassification_Id: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize: db,
    modelName: 'Document',
    tableName: 'Documents'
});

Document.associate = function(models) {
    Document.belongsTo(models.Combination, { foreignKey: 'combination_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Document.belongsTo(models.User, { foreignKey: 'user_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Document.belongsTo(models.Documentclassification, { foreignKey: 'documentClassification_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Document.belongsTo(models.Pf, { foreignKey: 'PF', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Document.hasMany(models.Documentversion, { foreignKey: 'document_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
};

export default Document;
