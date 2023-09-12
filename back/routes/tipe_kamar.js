const express = require('express')
const app = express();
app.use(express.json())
const md5 = require("md5")
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//import model
const models = require("../models/index")
const tipe_kamar = models.tipe_kamar
// //import auth
// const auth = require("../auth")
// const jwt = require("jsonwebtoken")
// const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//config storage image
const storage = multer.diskStorage({
    destination:(req, file,cb)=> {
        cb(null,"./image/customer")
    },
    filename: (req,file,cb)=> {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

//GET all customer, method: GET, function: findAll
app.get("/", (req, res) => {
    tipe_kamar.findAll()
    .then(result => {
        res.json({
            count: result.length,
            tipe_kamar: result 
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:tipe_id", (req, res) =>{
    tipe_kamar.findAll({where: {tipe_id: req.params.tipe_id}})
    .then(result => {
        res.json({
            tipe_kamar: result
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
        // admin_id: req.body.admin_id,
        nama_tipe: req.body.nama_tipe,
        harga: req.body.harga,
        // name: req.body.name,
        // phone: req.body.phone,
        // address: req.body.address,
        // image: req.file.filename,
        // username: req.body.username,
        // password: md5(req.body.password)
    }
    tipe_kamar.create(data)
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
// app.put("/:id", upload.single("image"), (req, res) =>{
//     let param = { customer_id: req.params.id}
//     let data = {
//         name: req.body.name,
//         phone: req.body.phone,
//         address: req.body.address,
//         username: req.body.username
//     }
//     if (req.file) {
//         // get data by id
//         const row = customer.findOne({where: param})
//         .then(result => {
//             let oldFileName = result.image
           
//             // delete old file
//             let dir = path.join(__dirname,"../image/customer",oldFileName)
//             fs.unlink(dir, err => console.log(err))
//         })
//         .catch(error => {
//             console.log(error.message);
//         })
 
//         // set new filename
//         data.image = req.file.filename
//     }
 
//     if(req.body.password){
//         data.password = md5(req.body.password)
//     }
 
//     customer.update(data, {where: param})
//         .then(result => {
//             res.json({
//                 message: "data has been updated",
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: error.message
//             })
//         })
// })
app.delete("/:id", async (req, res) =>{
    try {
        let param = { customer_id: req.params.id}
        let result = await customer.findOne({where: param})
        let oldFileName = result.image
           
        // delete old file
        let dir = path.join(__dirname,"../image/customer",oldFileName)
        fs.unlink(dir, err => console.log(err))
 
        // delete data
        customer.destroy({where: param})
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
 
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
app.post("/auth", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }
 
    let result = await customer.findOne({where: data})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app;