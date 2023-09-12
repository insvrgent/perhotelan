const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const admin = require('./routes/admin');
app.use('/store/admin', admin);

const tipe_kamar = require('./routes/tipe_kamar');
app.use('/store/tipe', tipe_kamar);

const detail_pemesanan = require('./routes/detail_pemesanan');
app.use('/store/detail_pemesanan', detail_pemesanan);

const pemesanan = require('./routes/pemesanan');
app.use('/store/pemesanan', pemesanan);

const product = require('./routes/product');
app.use('/store/product', product);
const transaksi = require('./routes/transaksi');
app.use('/store/transaksi', transaksi);

app.use(express.static(__dirname));

app.listen(8080, () => {
    console.log('server run on port 8080');
})