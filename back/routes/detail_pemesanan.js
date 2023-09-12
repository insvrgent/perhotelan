const express = require('express')
const app = express();
app.use(express.json())
const md5 = require("md5")
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//import model
const models = require("../models/index")
const detail_pemesanan = models.detail_pemesanan


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
    detail_pemesanan.findAll()
    .then(result => {
        res.json({
            count: result.length,
            product: result 
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:tgl/:bln/:thn", (req, res) =>{
    detail_pemesanan.findAll({where: {tgl_akses: req.params.tgl, bln_akses: req.params.bln, thn_akses: req.params.thn}})
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
        id_pemesanan: req.body.id_pemesanan,
        id_kamar: req.body.id_kamar,
        tgl_akses: req.body.tgl_akses,
        bln_akses: req.body.bln_akses,
        thn_akses: req.body.thn_akses,
        harga: req.body.harga,
    }
    detail_pemesanan.create(data)
    .then(result => {
        res.json({
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
    let param = { id_pemesanan: req.params.id}
    let data = {
        tipe: req.body.tipe,
    }
    if (req.file) {
        // get data by id
        const row = detail_pemesanan.findOne({where: param})
        .then(result => {
            let oldFileName = result.image
           
            // delete old file
            let dir = path.join(__dirname,"../image/product",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })
 
        // set new filename
        data.image = req.file.filename
    }
 
    if(req.body.password){
        data.password = md5(req.body.password)
    }
 
    detail_pemesanan.update(data, {where: param})
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
        let param = { product_id: req.params.id}
        let result = await product.findOne({where: param})
        
    try {
        let oldFileName = result.image
           
        // delete old file
        let dir = path.join(__dirname,"../image/product",oldFileName)
        fs.unlink(dir, err => console.log(err))
 
    } catch (error) {}
        // delete data
        product.destroy({where: param})
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