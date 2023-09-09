/**'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pacienteModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    static associate(models) {
      this.hasMany(models.atestadoModel, { foreignKey: 'pacienteFK' });
    }
  }
  pacienteModel.init({
    rg: DataTypes.STRING,
    nome: DataTypes.STRING,
    dataNascimento: DataTypes.DATEONLY,
    genero: DataTypes.STRING,
    InativeAt: DataTypes.DATE

  }, {
    tableName: 'paciente',
    sequelize,
    modelName: 'pacienteModel',
    paranoid: true,
    deletedAt: 'InativeAt'
  });
  return pacienteModel;
};
*/
'use strict';

module.exports = (sequelize, DataTypes) => {
  const medicoModel = sequelize.define('medicoModel', {
    rg: DataTypes.STRING,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    genero: DataTypes.STRING,
    senha: DataTypes.STRING,
    endereco: DataTypes.STRING,
    dataNascimento: DataTypes.DATEONLY,
    crm: DataTypes.STRING,
    InativeAt: DataTypes.DATE
  }, {
    tableName: 'medico',
    paranoid: true,
    deletedAt: 'InativeAt'
  });

  medicoModel.associate = (models) => {
    medicoModel.hasMany(models.atestadoModel, { foreignKey: 'medicoFK' });
  };

  return medicoModel;
};
