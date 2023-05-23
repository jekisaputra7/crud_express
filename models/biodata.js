const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Biodata = sequelize.define('Biodata', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tempatLahir: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggalLahir: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Biodata;