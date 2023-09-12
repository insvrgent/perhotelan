import React from 'react';
import axios from 'axios';
import CustomerList from '../component/customerList'
import Navbar from '../component/navbar'
import { Button, Form } from 'react-bootstrap';

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
            username: "",
            password: "",
            action: "",
            isi: "",
            pengguna: 0,
            search: "",
            filteredProduk: []
        }
        this.state.filteredProduk = this.state.produk;
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    } 
    handleSave = (e) => {
        if(this.state.name!=="")
            if (e.keyCode === 13||e===13) {
                let form = new FormData()
                form.append('name', this.state.name)
                form.append('status', "gong")
                form.append('wes', false)

                
                let url = "http://localhost:8080/store/product"
                axios.post(url, form)
                .then(res => {
                    this.getProduk()
                    this.handleClose()
                })
                .catch (err => {
                    console.log(err.message)
                })
                
            }
    }
    handleTambah = () => {
        if(localStorage.getItem("token") === null||localStorage.getItem("token") == ""){
            window.location = '/login'
        }
        else{
            let data = {
                milik : localStorage.getItem("id")
            }
            
            let url = "http://localhost:8080/store/product/"
            axios.post(url, data)
            .then(res => {
                this.getProduk()
                this.handleClose()
            })
            .catch (err => {
                console.log(err.message)
            })
        }
    }
    handleEdit = (product_id) => {
        if(localStorage.getItem("token") === null||localStorage.getItem("token") == ""){
            window.location = '/login'
        }
        else{
            let data = {
                name : window.sessionStorage.getItem("name"),
                harga : window.sessionStorage.getItem("isi"),
                harga2 : window.sessionStorage.getItem("isi2"),
                harga3 : window.sessionStorage.getItem("isi3"),
                harga4 : window.sessionStorage.getItem("isi4"),
                harga5 : window.sessionStorage.getItem("isi5"),
                pemenang : window.sessionStorage.getItem("pemenang"),
                pemenang2 : window.sessionStorage.getItem("pemenang2"),
                pemenang3 : window.sessionStorage.getItem("pemenang3"),
                pemenang4 : window.sessionStorage.getItem("pemenang4"),
                pemenang5 : window.sessionStorage.getItem("pemenang5")
            }
            
            let url = "http://localhost:8080/store/product/"+ product_id
            axios.put(url, data)
            .then(res => {
                this.getProduk()
                this.handleClose()
            })
            .catch (err => {
                console.log(err.message)
            })

            let isi = {
                admin_id : localStorage.getItem("id"),
                product_id : product_id,
                harga : window.sessionStorage.getItem("isi")
            }

            let link = "http://localhost:8080/store/customer/"
            axios.post(link, isi)
            .then(res => {
                this.getProduk()
                this.handleClose()
            })
            .catch (err => {
                console.log(err.message)
            })
        }
    }
    handleSwitch = (product_id) => {
        if(localStorage.getItem("token") === null||localStorage.getItem("token") == ""){
            window.location = '/login'
        }
        else{
            let data = {
                status : window.sessionStorage.getItem("status"),
            }
            
            let url = "http://localhost:8080/store/product/"+ product_id
            axios.put(url, data)
            .then(res => {
                this.getProduk()
                this.handleClose()
            })
            .catch (err => {
                console.log(err.message)
            })
        }
    }
    handleDelete = (product_id) => {
        let url = "http://localhost:8080/store/product/" + product_id
        if(window.confirm("hapus?")){
            axios.delete(url)
            .then(res => {
                this.getProduk()
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
        let url = "http://localhost:8080/store/product/"

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
    
    headerConfig=() =>{
        let header = {
            headers: {Authorization: 'Bearer ${this.state.token}'}
        }
        return header
    }
    componentDidMount = () => {
        if(localStorage.getItem("token") === null||localStorage.getItem("token") == ""){
            window.location = '/login'
        }
        this.getProduk()
    }
    handleChange = (e) => {
        let result = this.state.produk.filter((item) => {
            return item.name.toLowerCase().includes(e.target.value)
        });
        this.setState({
            filteredProduk: result,
        });
    }
    handleFile = (e) =>{
        this.setState({
            image: e.target.files[0]
        })
    }
    render() {
        return (
            <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                            <input type="text" name="search" size = "lg"className="form-control" placeholder="Search" onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.search(e)} />
                            
                            &nbsp;
                        {this.state.filteredProduk.map((item, index) => {
                          if(item.milik==localStorage.getItem("id"))
                            return(
                            <CustomerList 
                                id={item.product_id}
                                milik={item.milik!=localStorage.getItem("id")}
                                ada={item.image!=null}
                                key={index}
                                image={item.image}
                                name={item.name}
                                harga={item.harga}
                                harga2={item.harga2}
                                harga3={item.harga3}
                                harga4={item.harga4}
                                harga5={item.harga5}
                                pemenang={item.pemenang}
                                pemenang2={item.pemenang2}
                                pemenang3={item.pemenang3}
                                pemenang4={item.pemenang4}
                                pemenang5={item.pemenang5}
                                kelipatan={item.kelipatan}
                                status={item.status}
                                onWes={() => this.handleUpdateWes(item.product_id)}
                                onGg={() => this.handleUpdateGg(item.product_id)}
                                onSwitch={() => this.handleSwitch(item.product_id)}
                                onEdit={() => this.handleEdit(item.product_id)}
                                onDrop={() => this.handleDelete(item.product_id)}
                            />
                            )
                        })}&nbsp;
                        <Button width= "100" hidden= {this.props.milik}   size="sm" variant="success" onClick={this.handleTambah}>tambah</Button >
                </div>
                &nbsp;
            </div>
            </div>
        )
    }
}