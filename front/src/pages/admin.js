import React from 'react';
import axios from 'axios';
import Produk from '../component/produk'
import AdminList from '../component/adminList'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
            name: "",
            phone: "",
            address: "",
            image : true,
            admin: [],
            username: "",
            password: "",
            lantai: 1,
            nomor: 0,
            action: "",
            isi: "",
            pengguna: 0,
            search: "",
            filteredProduk: [],
            showdate: false,
            showTipe: false,
            showkamar: true,
            sekarang: new Date(),
            checkin: new Date(),
            setcheckin: false,
            checkout: new Date(),
            setcheckout: false,
            nama_tipe: "",
            harga: 0
        }
        this.state.filteredProduk = this.state.produk;
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
    // handleSave = (e) => {
    //     if(this.state.name!=="")
    //         if (e.keyCode === 13||e===13) {
    //             let form = new FormData()
    //             form.append('lantai', this.state.lantai),
    //             form.append('nomor', this.state.nomor),
    //             form.append('tipe', "triplek")

                
    //             let url = "http://localhost:8080/store/product"
    //             axios.post(url, form)
    //             .then(res => {
    //                 this.getProduk()
    //                 this.handleClose()
    //             })
    //             .catch (err => {
    //                 console.log(err.message)
    //             })
                
    //         }
    // }
    
    imageClick = (e) => {
        let data = {
            lantai : this.state.lantai,
            nomor : e.target.parentNode.id,
            tipe : 1,
        }
        
        let url = "http://localhost:8080/store/product"
        axios.post(url, data)
        .then(res => {
            this.getProduk()
            this.handleClose()
        })
        .catch (err => {
            console.log(err.message)
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
            this.setState({filteredProduk: []})
            this.getProduk()
        })
        .catch (err => {
            console.log(err.message)
        })
    }
    handleDelete = (product_id) => {
        let url = "http://localhost:8080/store/product/" + product_id
        console.log(product_id)
        if(window.confirm("hapus?")){
            axios.delete(url)
            .then(res => {
                var list = document.getElementsByClassName("example");
                for(var item of list ){
                    item.style = "background: rgb(31, 167, 255);";
                    item.firstElementChild.disabled= false;
                    item.firstElementChild.innerHTML= "+";
                }
                this.getProduk()
            })
            .catch (err => {
                console.log(err.message)
            })
        }
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
    handleUpdateWes = (customer_id) => {
        let form = new FormData()
        form.append('status', "wes")
        form.append('wes', true)

        
        let url = "http://localhost:8080/store/customer/"+ customer_id
        axios.put(url, form)
        .then(res => {
            this.getCustomer()
            this.handleClose()
        })
        .catch (err => {
            console.log(err.message)
        })
    }
    tambahtipe = () => {
        let data = {
            nama_tipe : this.state.nama_tipe,
            harga : this.state.harga,
        }
        
        let url = "http://localhost:8080/store/tipe/"
        axios.post(url, data)
        .then(res => {
            this.getProduk()
            this.getTipe()
        })
        .catch (err => {
            console.log(err.message)
        })
    }
    handleUpdateGg = (customer_id) => {
        let form = new FormData()
        form.append('status', "gong")
        form.append('wes', false)

        
        let url = "http://localhost:8080/store/product/"+ customer_id
        axios.put(url, form)
        .then(res => {
            this.getProduk()
            this.handleClose()
        })
        .catch (err => {
            console.log(err.message)
        })
    }
    getProduk = () => {
        let url = "http://localhost:8080/store/product/"+ this.state.lantai+"/0"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    produk: res.data.product.sort((a, b) => a - b).reverse(),
                    filteredProduk : res.data.product.sort((a, b) => a - b).reverse()
                })
            })
            .catch(err => {
                console.log(err.message)
            })
            
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
        if(localStorage.getItem("token") === null||localStorage.getItem("token") == ""){
            window.location = '/darkroom/'
        }
        if(localStorage.getItem("role").includes("resepsionis")){
            window.location = '/darkroom/resepsionis'
        }
        this.getTipe()
        this.getProduk()
        this.getAdmin()
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
            item.firstElementChild.disabled= true;
            item.firstElementChild.innerHTML= e;
            item.style = "background: gray;";
        }
    }
  }
  
    getTipe = () => {
        let url = "http://localhost:8080/store/tipe/"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    tipe: res.data.tipe_kamar
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        
    }
    
    rupiah = (e) => {
        return "Rp " + e.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    gantitipe = () => {
        if(!this.state.showTipe) this.setState({showTipe: true})
        else this.setState({showTipe: false})
    }
    render(){
      return (
          <div>
            <meta name="viewport" 
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
          <Image>
          <Image2Row>
              <Image2 onClick={() => this.keluar()} className="keluar"></Image2>
              <IniHotelColumn>
                <IniHotel>perhotelan</IniHotel>
                <Button31Row>
                    <Button31 onClick={() => this.setState({ showdate: true,showkamar: false })}>
                    <ButtonOverlay>resepsionis</ButtonOverlay>
                    </Button31>
                    <Button30 onClick={() => this.setState({ showdate: false,showkamar: true })}>
                    <ButtonOverlay>kamar</ButtonOverlay>
                    </Button30>
                </Button31Row>
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
                    {this.setKamar(item.nomor)}
                        return(
                        <Produk 
                            id={item.product_id}
                            role="admin"
                            nomor={item.nomor}
                            lantai={item.lantai}
                            tipe={item.tipe}
                            harga={this.rupiah(this.state.tipe[item.tipe-1].harga) + "/ malam"}
                            listtipe={this.state.tipe}
                            onEdit={(e) => this.handleEdit(e,item.product_id)}
                            onDrop={() => this.handleDelete(item.product_id)}
                        />
                        )})
                    }
  
                  </Form.Group>
              </Offcanvas.Body>
          </Offcanvas>
  
          <Modal
          show={this.state.showdate}
          onHide={() => this.setState({ showdate: false})}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              >
                  <div>
                  <Container>
                    <Rect6></Rect6>
                    <Rect7>
                    <Modal.Body className="show-grid">
                        <Container>
                        <Row>
                            <Col xs={12} md={8}>
                            </Col>
                            <Col xs={6} md={4}>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>
                            </Col>
                            <Col xs={6} md={4}><Form.Group className="mb-3">
                           
                           {this.state.admin.map((item, index) => {
                                       return(
                                       <AdminList 
                                           id={item.admin_id}
                                           name={item.username}
                                           onEdit={() => this.getAdmin()}
                                           onDrop={() => this.handleDeleteResepsionis(item.admin_id)}
                                       />
                                       )
                                   })}
           
                           </Form.Group>
                            </Col>
                            <Col xs={6} md={4}>
                      <button onClick={() => this.gantitipe()} type="button" class="btn btn-secondary col-12">buat</button>
                            </Col>
                        </Row>
                        </Container>
                    </Modal.Body>
                    </Rect7>
                    <div hidden={this.state.showTipe}>
                    <Rect2>
                        <h5>username</h5>
                        <Form.Control
                        onChange={(e) => this.handleChange(e)} 
                        type="text"
                        name="username"
                        />
                        </Rect2>
                    <Rect3>
                        <h5>password</h5>
                        <Form.Control
                        onChange={(e) => this.handleChange(e)} 
                        type="password"
                        name="password"
                        aria-describedby="passwordHelpBlock"
                        />
                    </Rect3>
                      <Rect5>
                      <button onClick={(e) => this.handleBuatResepsionis(13)} type="button" class="btn btn-secondary col-12">buat</button>
                      </Rect5>
                      </div>
                    <div hidden={!this.state.showTipe}>
                    <Rect2>
                        <h5>nama tipe</h5>
                        <Form.Control
                        onChange={(e) => this.handleChange(e)} 
                        type="text"
                        name="nama_tipe"
                        />
                        </Rect2>
                    <Rect3>
                        <h5>harga</h5>
                        <Form.Control
                        onChange={(e) => this.handleChange(e)} 
                        type="number"
                        name="harga"
                        aria-describedby="passwordHelpBlock"
                        />
                    </Rect3>
                      <Rect5>
                      <button onClick={(e) => this.tambahtipe(13)} type="button" class="btn btn-secondary col-12">buat</button>
                      </Rect5>
                      </div>
                  </Container>
                  </div>
          </Modal>
          </div>
      )
    }
  }
  
  
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
    width: 60px;
    height: 37px;
    background-color: rgba(255,255,255,1);
    border-radius: 4px;
    margin-left: 3px;
    border: none;
    `;
  const Button31 = styled.div`
    width: 100px;
    height: 37px;
    background-color: rgba(255,255,255,1);
    border-radius: 4px;
    border: none;
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
  
    const Button31Row = styled.div`
    height: 37px;
    flex-direction: row;
    display: flex;
    margin-top: 15px;
    margin-right: 171px;
    `;

    const IniHotelColumn = styled.div`
    width: 375px;
    flex-direction: column;
    display: flex;
    margin-left: 1px;
    margin-bottom: 8px;
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
  height: 240px;
  position: relative;
  `;
  
  const Rect6 = styled.div`
  flex: 0.5 1 0%;
  background-color: rgba(255,245,240,1);
  display: flex;
  flex-direction: column;
  `;
  
  const Rect7 = styled.div`
  display: flex;
  background-color: #fff5f0;
  flex-direction: row;
  width: 814px;
  height: 240px;
  position: relative;
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
  left: 74px;
  width: 260px;
  height: 58px;
  position: absolute;
  background-color: rgba(255,245,240,1);
  top: 96px;
  `;
  
  const Rect2 = styled.div`
  left: 74px;
  width: 260px;
  height: 58px;
  position: absolute;
  background-color: rgba(255,245,240,1);
  top: 22px;
  `;
  
  const Rect5 = styled.div`
  left: 74px;
  width: 260px;
  height: 58px;
  position: absolute;
  background-color: rgba(255,245,240,1);
  top: 180px;
  `;
  const Rect55 = styled.div`
  left: 74px;
  width: 30px;
  height: 58px;
  position: absolute;
  background-color: rgba(255,245,240,1);
  top: 180px;
  `;