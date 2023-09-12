'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan,{
        foreignKey: "id_pemesanan",
        as : "pemesanan"
      })
    }
  };
  pemesanan.init({
    id_pemesanan:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nomor_pemesanan: DataTypes.INTEGER,
    nama_pemesan: DataTypes.STRING,
    email_pemesan: DataTypes.STRING,
    tgl_pemesanan: DataTypes.DATE,
    tgl_check_in: DataTypes.DATE,
    tgl_check_out: DataTypes.DATE,
    nama_tamu: DataTypes.STRING,
    jumlah_kamar: DataTypes.INTEGER,
    totalharga: DataTypes.INTEGER,
    tipe_id: DataTypes.INTEGER,
    status_pemesanan: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'pemesanan',
    tableName: 'pemesanan'
  });
  return pemesanan;
};