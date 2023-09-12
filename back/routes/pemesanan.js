const express = require('express')
const app = express();
app.use(express.json())
const md5 = require("md5")
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//import model
const models = require("../models/index")
const pemesanan = models.pemesanan


//config storage image
const storage = multer.diskStorage({
    destination:(req, file,cb)=> {
        cb(null,"./image/product")
    },
    filename: (req,file,cb)=> {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

//GET all product, method: GET, function: findAll
app.get("/", (req, res) => {
    pemesanan.findAll()
    .then(result => {
        res.json({
            count: result.length,
            pemesanan: result 
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:id", (req, res) =>{
    pemesanan.findAll({where: {nomor_pemesanan: req.params.id}})
        .then(result => {
            res.json({
                pemesanan: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
app.post("/", (req,res)=>{
    let data = {
        nomor_pemesanan: req.body.nomor_pemesanan,
        nama_pemesan: req.body.nama_pemesan,
        email_pemesan: req.body.email_pemesan,
        tgl_pemesanan: req.body.tgl_pemesanan,
        tgl_check_in: req.body.tgl_check_in,
        tgl_check_out: req.body.tgl_check_out,
        nama_tamu: req.body.nama_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        totalharga: req.body.totalharga,
        tipe_id: req.body.tipe_id,
        status_pemesanan: req.body.status_pemesanan,
        admin_id: req.body.admin_id,
    }
    pemesanan.create(data)
    .then(result => {
        res.json({
            id_pemesanan: res.insertId,
            message: "data has been inserted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message  
        })
    })
})
app.put("/:id", upload.single("image"), (req, res) =>{
    let param = { nomor_pemesanan: req.params.id}
    let data = {
        status_pemesanan: req.body.status_pemesanan,
    }
    // if (req.file) {
    //     // get data by id
    //     const row = pemesanan.findOne({where: param})
    //     .then(result => {
    //         let oldFileName = result.image
           
    //         // delete old file
    //         let dir = path.join(__dirname,"../image/product",oldFileName)
    //         fs.unlink(dir, err => console.log(err))
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //     })
 
    //     // set new filename
    //     data.image = req.file.filename
    // }
 
    // if(req.body.password){
    //     data.password = md5(req.body.password)
    // }
 
    pemesanan.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
app.delete("/:id", async (req, res) =>{
        let param = { id_pemesanan: req.params.id}

        // delete data
        pemesanan.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})


module.exports = app;