/**'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class atestadoModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     
    static associate(models) {
        this.belongsTo(models.medicoModel, { foreignKey: 'medicoFK' });
        this.belongsTo(models.pacienteModel, { foreignKey: 'pacienteFK' });
    }
  }
  atestadoModel.init({
    medicoFK: DataTypes.STRING,
    pacienteFK: DataTypes.STRING,
    dataConsulta: DataTypes.DATEONLY,
    horaInicioConsulta: DataTypes.TIME,
    horaFimConsulta: DataTypes.TIME,
    dispensaAlgorismo: DataTypes.INTEGER,
    dispensaExtenso: DataTypes.STRING,
    cid: DataTypes.STRING,
    InativeAt: DataTypes.DATE
  }, {
    tableName: 'atestado',
    sequelize,
    modelName: 'atestadoModel',
    paranoid: true,
    deletedAt: 'InativeAt'
  });
  return atestadoModel;
};
*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  const atestadoModel = sequelize.define('atestadoModel', {
    medicoFK: DataTypes.STRING,
    pacienteFK: DataTypes.STRING,
    dataConsulta: DataTypes.DATEONLY,
    horaInicioConsulta: DataTypes.TIME,
    horaFimConsulta: DataTypes.TIME,
    dispensaAlgorismo: DataTypes.INTEGER,
    dispensaExtenso: DataTypes.STRING,
    cid: DataTypes.STRING,
    InativeAt: DataTypes.DATE
  }, {
    tableName: 'atestado',
    paranoid: true,
    deletedAt: 'InativeAt'
  });

  atestadoModel.associate = (models) => {
    atestadoModel.belongsTo(models.medicoModel, { foreignKey: 'medicoFK' });
    atestadoModel.belongsTo(models.pacienteModel, { foreignKey: 'pacienteFK' });
  };

  return atestadoModel;
};