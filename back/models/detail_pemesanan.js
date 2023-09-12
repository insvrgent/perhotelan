'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.detail_transaksi,{
        foreignKey: "id_detail_pemesanan",
        as : "detail_produk"
      })
    }
  };
  detail_pemesanan.init({
    id_detail_pemesanan:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    id_pemesanan: DataTypes.INTEGER,
    id_kamar: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    tgl_akses: DataTypes.STRING,
    bln_akses: DataTypes.STRING,
    thn_akses: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'detail_pemesanan',
    tableName: 'detail_pemesanan'
  });
  return detail_pemesanan;
};