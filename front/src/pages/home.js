import React from 'react';
import axios from 'axios';
import Produk from '../component/produk'
import AdminList from '../component/adminList'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import styled, { css } from "styled-components";

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Modal, Form} from 'react-bootstrap';
document.body.style.overflow = "hidden"

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            produk: [],
            isModalOpen: false,
            nama: "",
            email: "",
            phone: "",
            address: "",
            image : true,
            admin: [],
            listtipe: [],
            username: "",
            password: "",
            lantai: 1,
            tipefilter: 1,
            nomor: 0,
            filteredProduk: [],
            showdate: false,
            showkamar: false,
            showpemesanan: false,
            showkode: false,
            sekarang: new Date(),
            checkin: new Date(),
            setcheckin: false,
            checkout: new Date(),
            setcheckout: false,
            tanggal: new Date(),
            harga: 0,
            status_pemesanan: "",
            jumlahMalam: 0
        }
        this.state.filteredProduk = this.state.produk;
        this.handleCheckin = this.handleCheckin.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }
    
handlecheckin = (e) => {

    let data = {}
    if(this.state.status_pemesanan == "baru")
        data = {
            status_pemesanan: "check_in"
        }
    else if(this.state.status_pemesanan == "check_in")
        data = {
            status_pemesanan: "check_out"
        }

    let url = "http://localhost:8080/store/pemesanan/"+this.state.kode
    axios.put(url, data)
}
  handlecek = (e) => {
    if(this.state.email!==""&&this.state.kode!=="")
        if (e.keyCode === 13||e===13) {
            let url = "http://localhost:8080/store/pemesanan/"+this.state.kode
            axios.get(url, this.headerConfig())
            .then(res => {
                if(this.state.email!=res.data.pemesanan[0].email_pemesan) return;

                if (Date.parse(res.data.pemesanan[0].tgl_check_out) -  new Date() > 0) this.setState({sah: false})
                else this.setState({sah: true})

                this.setState({
                    tgl_pemesanan: res.data.pemesanan[0].tgl_pemesanan, 
                    tgl_check_in: res.data.pemesanan[0].tgl_check_in, 
                    tgl_check_out: res.data.pemesanan[0].tgl_check_out, 
                    jumlah_kamar: res.data.pemesanan[0].jumlah_kamar, 
                    total_harga: res.data.pemesanan[0].total_harga, 
                    status_pemesanan: res.data.pemesanan[0].status_pemesanan, 
                })
            })
            .catch (err => {
                this.setState({
                    gagal: true
                })
                setTimeout(function() {
                    this.setState({
                        gagal: false
                    })
                }.bind(this), 2000)
            })
            
        }
  }
    handleCheckin(date) {
        this.setState({
            setcheckin: true,
            checkin: date,
            checkout: date,
            setcheckout: false
        });
    }
    
    handleCheckout(date) {
        this.setState({
            setcheckout: true,
            checkout: date
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    } 
    
    imageClick = (e) => {
        let ditemukan = false;
        {this.state.produk.map((item, index) => {
            if(item.nomor==e.target.parentNode.id) {
                {this.state.filteredProduk.map((item2, index) => {
                    if(item.nomor==item2.nomor) {ditemukan = true;}
                })}
                
                if(!ditemukan)
                    this.setState({ 
                        filteredProduk: [...this.state.filteredProduk, item] 
                    })
            }
        })}

        
        var list = document.getElementsByClassName("example");
                        
        for (var item of list) {
            if(item.id == e.target.parentNode.id) {
                if(item.style != "background: gray;"){
                    item.firstElementChild.disabled= false;
                    item.firstElementChild.innerHTML= item.id;
                    item.style = "background: yellow;";
                }
            }
        }

        setTimeout(function() {
            this.hitungharga()
        }.bind(this), 100)
    }
    hitungharga = () => {
        
        var Difference_In_Time = this.state.checkout.getTime() - this.state.checkin.getTime();
            
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        this.setState({ showkamar: true, harga: this.state.listtipe[this.state.tipefilter-1].harga* this.state.filteredProduk.length * Difference_In_Days})
        
        this.setState({
            jumlahMalam: Difference_In_Days
        })
    }
    handleEdit = (e, product_id) => {
        console.log(e)
        let data = {
            tipe : e,
        }
        
        let url = "http://localhost:8080/store/product/"+ product_id
        axios.put(url, data)
        .then(res => {
            this.getProduk()
        })
        .catch (err => {
            console.log(err.message)
        })
    }
    handleDelete = (e,ee) => {
        let filteredArray = this.state.filteredProduk.filter(item => item.product_id !== e)
        this.setState({filteredProduk: filteredArray});
        
        var list = document.getElementsByClassName("example");
                        
        for (var item of list) {
            if(item.id == ee) {
                item.firstElementChild.innerHTML= item.id;
                item.style = "background: rgb(31, 167, 255);";
                
            }
        }

        setTimeout(function() {
            this.hitungharga()
        }.bind(this), 100)
    }
    handleDeleteResepsionis = (id_admin) => {
        let url = "http://localhost:8080/store/admin/" + id_admin
        if(window.confirm("hapus?")){
            axios.delete(url)
            .then(res => {
                this.getAdmin()
            })
            .catch (err => {
                console.log(err.message)
            })
        }

    }
    handlePesanKamar = (e) => 
    {
        if(this.state.email=="") return
        var Difference_In_Time = this.state.checkout.getTime() - this.state.checkin.getTime();
            
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        let nomor_pemesanann = parseInt(Math.random() * (1000 , 9000)+Math.random() * (1000 , 9000))

        this.setState({kode: nomor_pemesanann});

        let data = {
            nomor_pemesanan: nomor_pemesanann,
            nama_pemesan: this.state.nama,
            email_pemesan: this.state.email,
            tgl_pemesanan: new Date(),
            tgl_check_in: this.state.checkin,
            tgl_check_out: this.state.checkout,
            nama_tamu: this.state.email,
            jumlah_kamar: this.state.filteredProduk.length,
            totalharga: this.state.listtipe[this.state.tipefilter-1].harga * this.state.filteredProduk.length * Difference_In_Days,
            tipe_id: this.state.tipefilter,
            status_pemesanan: 'baru',
            // admin_id: req.body.admin_id,
        }

        let url = "http://localhost:8080/store/pemesanan/"
        axios.post(url, data)
        .then(res => {
        this.getIdpemesanan(nomor_pemesanann)
        })
        .catch (err => {
            console.log(err.message)
        })
    }

    getIdpemesanan = (nomor_pemesanan) =>{
        let url = "http://localhost:8080/store/pemesanan/"+nomor_pemesanan
        axios.get(url, this.headerConfig())
        .then(res => {
            this.detailpesanan(res.data.pemesanan[0].id_pemesanan)
            console.log(res.data.pemesanan[0].id_pemesanan)
        })
        .catch (err => {
            console.log(err.message)
        })
    }

    detailpesanan = (id_pemesanann) =>{
        var Difference_In_Time = this.state.checkout.getTime() - this.state.checkin.getTime();
            
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        this.state.filteredProduk.map((item, index) => {
        {
            var tanggal = new Date()
            tanggal = this.state.checkin
            for(let i=0;i<Difference_In_Days;i++){
                    tanggal.setDate(tanggal.getDate() + 1)
                
                let data = {
                    id_pemesanan: id_pemesanann,
                    id_kamar: item.product_id,
                    tgl_akses: tanggal.getUTCDate(),
                    bln_akses: tanggal.getUTCMonth(),
                    thn_akses: tanggal.getUTCFullYear(),
                    harga: this.state.listtipe[this.state.tipefilter-1].harga
                }
                    
                let url = "http://localhost:8080/store/detail_pemesanan/"
                axios.post(url, data)
                .then(res => {
                    this.setState({
                        showpemesanan: true,
                    })
                })
                .catch (err => {
                    console.log(err.message)
                })
            }
        }});
    }

    getProduk = () => {
        let url = "http://localhost:8080/store/product/"+ this.state.lantai+"/"+this.state.tipefilter

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    produk: res.data.product.sort((a, b) => a - b).reverse(),
                })
                {this.state.produk.map((item, index) => {
                    {this.setKamar(item.nomor)}
                })}
            })
            .catch(err => {
                console.log(err.message)
            })
            
    }
    kuncikamar = (e) => {
        let url = "http://localhost:8080/store/product/"+ e
        console.log(e)
        axios.get(url, this.headerConfig())
            .then(res => {
                
                var list = document.getElementsByClassName("example");
                        
                console.log(res.data.product[0].nomor)
                for (var item of list) {
                    if(item.id == res.data.product[0].nomor) {
                        item.firstElementChild.disabled= true;
                        item.firstElementChild.innerHTML= item.id;
                        item.style = "background: gray;";
                    }
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    getPesanan = () => {
        
        var Difference_In_Time = this.state.checkout.getTime() - this.state.checkin.getTime();
            
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        
        var tanggal = new Date(this.state.checkin)
        tanggal.setDate(tanggal.getDate() + 1)
        // tanggal = this.state.checkin

        for(let i=0;i<Difference_In_Days;i++){
            
            let url = "http://localhost:8080/store/detail_pemesanan/"+ tanggal.getUTCDate()+"/"+tanggal.getUTCMonth()+"/"+tanggal.getUTCFullYear()

            

            axios.get(url, this.headerConfig())
                .then(res => {
                    {res.data.pemesanan.map((item, index) => {
                        {this.kuncikamar(item.id_kamar)}
                    })}
                })
                .catch(err => {
                    console.log(err.message)
                })
                tanggal.setDate(tanggal.getDate() + 1)
        }
            
    }
    getAdmin = () => {
        let url = "http://localhost:8080/store/admin/"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    admin: res.data.admin.sort((a, b) => a - b).reverse(),
                })
            })
            .catch(err => {
                console.log(err.message)
            })
            
    }
    
    headerConfig=() =>{
        let header = {
            headers: {Authorization: 'Bearer ${this.state.token}'}
        }
        return header
    }
    componentDidMount = () => {

        var list = document.getElementsByClassName("example");
    
        for (var item of list) {
            item.firstElementChild.disabled= true;
            item.firstElementChild.innerHTML= "";
            item.style = "background: gray;";
        }

        this.getTipe()
        this.getAdmin()
        this.setState({ showdate: true })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleFile = (e) => {
        this.setState({
            image : e.target.files[0]
        })
    }

    
  handleBuatResepsionis = (e) => {
    if(this.state.username!==""&&this.state.password!=="")
        if (e.keyCode === 13||e===13) {
          let data = {
              username : this.state.username,
              password : this.state.password,
              role : "resepsionis",
          }
            
            let url = "http://localhost:8080/store/admin/"
            axios.post(url, data)
            .then(res => {
                this.getAdmin()
            })
            .catch (err => {
                console.log(err.message)
            })
            
        }
  }
  keluar = () => {
    localStorage.clear()
    window.location = '/darkroom/'
  }
  setKamar = (e) => {
    var list = document.getElementsByClassName("example");
    
    for (var item of list) {
        if(item.id == e) {
            item.firstElementChild.disabled= false;
            item.firstElementChild.innerHTML= e;
            item.style = "background: rgb(31, 167, 255);";
        }
    }
  }
  
    getTipe = () => {
        let url = "http://localhost:8080/store/tipe/"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    listtipe: res.data.tipe_kamar
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        
    }
    setfilter = () => {
        this.setState({
            showdate: false,
            filteredProduk: []
        })

        var list = document.getElementsByClassName("example");
        for (var item of list) {
            item.firstElementChild.disabled= true;
            item.firstElementChild.innerHTML= "";
            item.style = "background: gray;";
        }

        setTimeout(function() {
            this.hitungharga()
        }.bind(this), 100)

        this.getTipe()
        this.getProduk()
        this.getAdmin()
        this.getPesanan()
    }
    rupiah = (e) => {
        return "Rp " + e.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    print(){
        window.print();
    }
    render(){
      return (
          <div>
            <meta name="viewport" 
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
          <Image>
          <Image2Row>
              <Image2 src={require("./ini_hotel.png")}></Image2>
              <IniHotelColumn>
              <IniHotel>perhotelan</IniHotel>
              <Button30 onClick={() => this.setState({ showdate: true })}>
                  <ButtonOverlay>
                      SET FILTER
                  </ButtonOverlay>
              </Button30>
              </IniHotelColumn>
          </Image2Row>
          <Button22ColumnRow>
              <Button22Column>
              <Button22 id = "22" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button22>
              <Button21 id = "21" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button21>
              <Button20 id = "20" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button20>
              <Button19 id = "19" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button19>
              </Button22Column>
              <Button23 id = "23" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button23>
              <Button24 id = "24" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button24>
              <Button25Column>
              <Button25 id = "25" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button25>
              <Button15 id = "15" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button15>
              </Button25Column>
              <Button26 id = "26" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button26>
              <Button27 id = "27" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button27>
              <Button28Column>
              <Button28 id = "28" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button28>
              <Button11 id = "11" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button11>
              </Button28Column>
              <Button29Column>
              <Button29 id = "29" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button29>
              <Button10 id = "10" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button10>
              </Button29Column>
              <ButtonColumn>
              <Button id = "1" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button>
              <Button9 id = "9"className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button9>
              </ButtonColumn>
              <Button2Column>
              <Button2 id = "2"className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button2>
              <Button8 id = "8" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button8>
              </Button2Column>
              <Button3Column>
              <Button3 id = "3" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button3>
              <Button7 id = "7" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button7>
              </Button3Column>
              <Button4Column>
              <Button4 id = "4" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button4>
              <Button5 id = "5" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button5>
              <Button6 id = "6" className="example" onClick={(e) => this.imageClick(e)}>
                  <ButtonOverlay>+</ButtonOverlay>
              </Button6>
              </Button4Column>
          </Button22ColumnRow>
          <Button18Row>
              <Button18 id = "18" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button18>
              <Button17 id = "17" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button17>
              <Button16 id = "16" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button16>
              <Button14 id = "14" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button14>
              <Button13 id = "13" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button13>
              <Button12 id = "12" className="example" onClick={(e) => this.imageClick(e)}>
              <ButtonOverlay>+</ButtonOverlay>
              </Button12>
          </Button18Row>
          </Image>
  
          
          
          <Offcanvas show={this.state.showkamar} className = "offcanvas" backdrop = "false" enforceFocus = "false"placement="end" onHide={() => this.setState({ showkamar: false})}>
              <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                LIST KAMAR
              </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                  <Form.Group className="mb-3">
                           
                  {this.state.filteredProduk.map((item, index) => {
                        return(
                        <Produk 
                            id={item.product_id}
                            role="customer"
                            nomor={item.nomor}
                            lantai={item.lantai}
                            tipe={item.tipe}
                            harga={this.rupiah(this.state.listtipe[item.tipe-1].harga) + "/ malam x " + this.state.jumlahMalam}
                            listtipe={this.state.listtipe}
                            onEdit={(e) => this.handleEdit(e,item.product_id)}
                            onDrop={() => this.handleDelete(item.product_id, item.nomor)}
                        />
                        )})
                    }
  
                  </Form.Group>
                  <div hidden= {this.state.filteredProduk == 0 ? true : false}>
                  <Form.Control
                        onChange={(e) => this.handleChange(e)} 
                        type="text"
                        name="nama"
                        placeholder='masukkan nama'
                    />
                  <Form.Control
                        onChange={(e) => this.handleChange(e)} 
                        type="text"
                        name="email"
                        placeholder='masukkan email'
                    />
                    <h1>{this.rupiah(this.state.harga)}</h1>
                  <button onClick={() => this.handlePesanKamar()} type="button" placeholder="Email" class="btn btn-secondary col-12">CHECKOUT</button>
                  </div>
              </Offcanvas.Body>
          </Offcanvas>
  

          
          <Modal
          show={this.state.showdate}

              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              >
                  <div>
                  <Container>
                    <Rect6></Rect6>
                    <Rect7 src={require("./1UZ1I6_UnkcnFtIBs66fxBA.png")}></Rect7>
                    <LoremIpsum> </LoremIpsum>
                    <Rect3>
                      <h5>CHECK OUT</h5>
                      <DatePicker 
                        selected={this.state.checkout}
                        onChange={this.handleCheckout}
                        className="form-control"
                        minDate={new Date(this.state.checkin).setDate(this.state.checkin.getDate() + 1 )}
                        disabled = {this.state.setcheckin? false : true}
                      />
                    </Rect3>
                    <Rect2>
                      <h5>CHECK IN</h5>
                      <DatePicker
                        selected={this.state.checkin}
                        onChange={this.handleCheckin}
                        className="form-control"
                        minDate={new Date(this.state.sekarang).setDate(this.state.sekarang.getDate() + 1)}
                      />
                      </Rect2>
                    <Rect1>
                      <h5>TIPE</h5>
                        <select onChange={this.handleChange} defaultValue = {this.state.tipefilter}name="tipefilter"
                        className="form-control">
                            <option value={0}>pilih</option>
                            {this.state.listtipe.map((item, index) => {
                                return(
                                    <option value={index+1}>{item.nama_tipe}</option>
                                )})
                            }
                        </select>
                      </Rect1>
                    <Rect5>
                      <button disabled = {this.state.setcheckout? false : true} onClick={() => this.setfilter()} type="button" class="btn btn-secondary col-12">set</button>
                    </Rect5>
                  </Container>
                  </div>
          </Modal>

          <Modal
          show={this.state.showpemesanan}

              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              >
                  <div>
                  <Container>
                    <Rect6></Rect6>
                    <Rect7 src={require("./1UZ1I6_UnkcnFtIBs66fxBA.png")}></Rect7>
                    <LoremIpsum> </LoremIpsum>
                    <Rect3>
                    </Rect3>
                    <Rect2>
                      <h5>Berhasil Berhasil</h5>
                      <h5>Hurray</h5> 
                        &nbsp;
                        <Form.Control disabled
                            placeholder={this.state.email}
                        />
                      </Rect2>
                    <Rect1>
                        <Form.Control disabled
                            placeholder={this.state.kode}
                        />
                        &nbsp;
                        <button onClick={() => this.setState({showpemesanan: false})} type="button" class="btn btn-secondary col-12">ok</button>
                        <a id="myLink" href="javascript:print();">cetak</a>
                      </Rect1>
                  </Container>
                  </div>
          </Modal>
          <Modal
          show={this.state.showkode}
          onHide={() => this.setState({ showdate: false})}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              >
                  <div>
                  <Container>
                    <Rect6>
                        
                    </Rect6>
                    <Rect7>
                        <Rect77 hidden={!this.state.sah}>
                                <button  onClick={()=>this.setState({showdate: false})} type="button" class="btn btn-secondary col-12">tiket hangus</button>
                        </Rect77>
                        <Rect77 hidden={this.state.sah||this.state.tgl_check_in==null}>
                                <button hidden={this.state.status_pemesanan!="baru"} onClick={(e) => this.handlecheckin(13)} type="button" class="btn btn-secondary col-12">check in sekarang</button>
                                <button hidden={this.state.status_pemesanan!="check_in"} onClick={(e) => this.handlecheckin(13)} type="button" class="btn btn-secondary col-12">check in sekarang</button>
                                <button disabled= {this.state.status_pemesanan!="check_out"}hidden={this.state.status_pemesanan!="check_out"} onClick={()=>this.setState({showdate: false})} type="button" class="btn btn-secondary col-12">sudah check out</button>
                        </Rect77>
                    </Rect7>
                    <Rect2>
                        <h5>email</h5>
                        <Form.Control
                        onChange={(e) => this.handleChange(e)} 
                        type="text"
                        name="email"
                        />
                        </Rect2>
                    <Rect3>
                        <h5>kode</h5>
                        <Form.Control
                        onChange={(e) => this.handleChange(e)} 
                        type="password"
                        name="kode"
                        aria-describedby="passwordHelpBlock"
                        />
                    </Rect3>
                      <Rect5>
                      <button disabled={this.state.gagal ? true : false}onClick={(e) => this.handlecek(13)} type="button" class="btn btn-secondary col-12">cek</button>
                      </Rect5>
                  </Container>
                  </div>
          </Modal>
          </div>
      )
    }
  }
  
const Rect77 = styled.div`
left: 480px;
width: 260px;
height: 58px;
position: absolute;
top: 160px;
`;
  
const Image = styled.div`
width: 1920px;
height: 1080px;
flex-direction: column;
display: flex;
background-image: url(${require("./Interface.png")});
background-size: cover;
`;

const ButtonOverlay = styled.button`
display: block;
background: none;
height: 100%;
width: 100%;
border:none
`;
const Image2 = styled.img`
width: 100%;
height: 91px;
margin-top: 3px;
object-fit: contain;
`;

const IniHotel = styled.span`
font-family: Arial;
font-style: normal;
font-weight: 400;
color: rgba(255,255,255,1);
height: 34px;
width: 375px;
font-size: 28px;
`;

const Button30 = styled.div`
width: 152px;
height: 37px;
background-color: rgba(255,255,255,1);
border-radius: 0px;
margin-top: 15px;
border: none;
`;

const IniHotelColumn = styled.div`
width: 375px;
flex-direction: column;
display: flex;
margin-left: 1px;
margin-bottom: 8px;
`;

const Image2Row = styled.div`
height: 94px;
flex-direction: row;
display: flex;
margin-top: 13px;
margin-left: 429px;
margin-right: 1024px;
`;

const Button22 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 47px;
border: none;
`;

const Button21 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 14px;
margin-left: 4px;
border: none;
`;

const Button20 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 18px;
border: none;
`;

const Button19 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 23px;
margin-left: 15px;
border: none;
`;

const Button22Column = styled.div`
width: 108px;
flex-direction: column;
display: flex;
margin-top: 85px;
margin-bottom: 1px;
`;

const Button23 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 14px;
margin-top: 42px;
border: none;
`;

const Button24 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 14px;
margin-top: 27px;
border: none;
`;

const Button25 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 14px;
border: none;
`;

const Button15 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 245px;
border: none;
`;

const Button25Column = styled.div`
width: 75px;
flex-direction: column;
display: flex;
margin-left: 2px;
margin-top: 18px;
`;

const Button26 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 15px;
margin-top: 10px;
border: none;
`;

const Button27 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 16px;
margin-top: 4px;
border: none;
`;

const Button28 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
border: none;
`;

const Button11 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 262px;
border: none;
`;

const Button28Column = styled.div`
width: 61px;
flex-direction: column;
display: flex;
margin-left: 17px;
margin-bottom: 1px;
`;

const Button29 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 1px;
border: none;
`;

const Button10 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 215px;
border: none;
`;

const Button29Column = styled.div`
width: 62px;
flex-direction: column;
display: flex;
margin-left: 17px;
margin-bottom: 48px;
`;

const Button = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 3px;
border: none;
`;

const Button9 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 200px;
border: none;
`;

const ButtonColumn = styled.div`
width: 64px;
flex-direction: column;
display: flex;
margin-left: 97px;
margin-top: 4px;
margin-bottom: 59px;
`;

const Button2 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 2px;
border: none;
`;

const Button8 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 182px;
border: none;
`;

const Button2Column = styled.div`
width: 63px;
flex-direction: column;
display: flex;
margin-left: 14px;
margin-top: 16px;
margin-bottom: 65px;
`;

const Button3 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 2px;
border: none;
`;

const Button7 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 149px;
border: none;
`;

const Button3Column = styled.div`
width: 63px;
flex-direction: column;
display: flex;
margin-left: 13px;
margin-top: 28px;
margin-bottom: 86px;
`;

const Button4 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 3px;
border: none;
`;

const Button5 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 14px;
margin-left: 44px;
border: none;
`;

const Button6 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-top: 15px;
border: none;
`;

const Button4Column = styled.div`
width: 105px;
flex-direction: column;
display: flex;
margin-left: 13px;
margin-top: 52px;
margin-bottom: 121px;
`;

const Button22ColumnRow = styled.div`
height: 385px;
flex-direction: row;
display: flex;
margin-top: 87px;
margin-left: 375px;
margin-right: 468px;
`;

const Button18 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
border: none;
`;

const Button17 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 23px;
margin-top: 23px;
border: none;
`;

const Button16 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 19px;
margin-top: 2px;
border: none;
`;

const Button14 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 20px;
margin-top: 2px;
border: none;
`;

const Button13 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 23px;
margin-top: 25px;
border: none;
`;

const Button12 = styled.div`
width: 61px;
height: 61px;
background-color: rgba(31,167,255,1);
border-radius: 4px;
margin-left: 28px;
margin-top: 4px;
border: none;
`;

const Button18Row = styled.div`
height: 86px;
flex-direction: row;
display: flex;
margin-top: 17px;
margin-left: 437px;
margin-right: 1004px;
`;
const Container = styled.div`
display: flex;
background-color: #fff5f0;
flex-direction: row;
width: 814px;
height: 290px;
position: relative;
`;

const Rect6 = styled.div`
flex: 0.5 1 0%;
background-color: rgba(255,245,240,1);
display: flex;
flex-direction: column;
`;

const Rect7 = styled.img`
flex: 0.5 1 0%;
background-color: rgba(213, 213, 213,1);
display: flex;
flex-direction: column;
`;

const LoremIpsum = styled.span`
font-family: Arial;
top: 106px;
left: 545px;
position: absolute;
font-style: normal;
font-weight: 700;
color: #121212;
font-size: 16px;
`;

const Rect3 = styled.div`
left: 35px;
width: 260px;
height: 58px;
position: absolute;
background-color: rgba(255,245,240,1);
top: 84px;
`;

const Rect2 = styled.div`
left: 35px;
width: 260px;
height: 58px;
position: absolute;
background-color: rgba(255,245,240,1);
top: 10px;
`;

const Rect1 = styled.div`
left: 35px;
width: 260px;
height: 58px;
position: absolute;
background-color: rgba(255,245,240,1);
top: 158px;
`;
const Rect5 = styled.div`
left: 35px;
width: 260px;
height: 58px;
position: absolute;
top: 240px;
`;