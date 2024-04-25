import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const WireType = (sequelize) => {
  const Wiretype = sequelize.define('Wiretype', {
    reference: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: "Wiretype",
    tableName: 'Wiretypes', 
    timestamps: false  
  });
  
  Wiretype.associate = function (models) {
    Wiretype.hasMany(models.Wire, { foreignKey: 'wireType', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  }

  return Wiretype;
};

export default WireType;
