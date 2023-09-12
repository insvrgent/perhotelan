'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipe_kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "tipe_id",
        as : "transaksi_customer"
      })
    }
  };
  tipe_kamar.init({
    tipe_id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nama_tipe: DataTypes.STRING,
    harga: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    foto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tipe_kamar',
    tableName: 'tipe_kamar'
  });
  return tipe_kamar;
};