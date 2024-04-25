import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Combination = db.define('Combination', {
    reference: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.ENUM('End Splice', 'Parallel Splice'),
    },
    numberOfWires: {
        type: DataTypes.STRING,
    },
    machine_Id: {
        type: DataTypes.INTEGER,
    },
    shrinkSleeve_Id: {
        type: DataTypes.INTEGER,
    },
    glue_Id: {
        type: DataTypes.INTEGER,
    },
    createdByUser: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize: db,
    modelName: 'Combination',
    tableName: 'Combinations'
});

Combination.associate = function(models) {
    Combination.hasMany(models.Document, { foreignKey: 'combination_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Combination.belongsTo(models.User, { foreignKey: 'createdByUser', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Combination.belongsTo(models.Glue, { foreignKey: 'glue_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Combination.belongsTo(models.Machine, { foreignKey: 'machine_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Combination.belongsTo(models.Shrinksleeve, { foreignKey: 'shrinkSleeve_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Combination.belongsToMany(models.Wire, { through: models.Combinationwire, foreignKey: 'combination_Id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
};

export default Combination;
