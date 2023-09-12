import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts'
export default class CustomerList extends React.Component {
    constructor() {
        super()
        this.state = {
            namaProduk: "",
            status: "",
            isi: 0,
            wes: false,
            image : true,
            isiKelipatan: 0,
            pas: true,
            options: {
                chart: {
                  id: 'apexchart-example',
                  toolbar: {
                    tools: {
                      download: false,
                      selection: false,
                      zoom: false,
                      zoomin: false,
                      zoomout: false,
                      pan: false,
                      reset: false
                    }
                  }
                },
                xaxis: {
                  categories: [1, 2, 3, 4, 5]
                },
                zoom: {
                  enabled: false
                },
                dataLabels: {
                    enabled: false
                  },
              },
              series: [{
                name: 'series-1',
                data: [0, 0,0,0,0]
              }],
              legend: {
                horizontalAlign: 'right'
            }
        }
    }
    componentDidMount = () => {
        this.setState({
            namaProduk: this.props.name,
            isi: this.props.harga,
            isiKelipatan: this.props.kelipatan,
            options: {
                chart: {
                  id: 'apexchart-example'
                },
                xaxis: {
                  categories: [this.props.pemenang5, this.props.pemenang4, this.props.pemenang3, this.props.pemenang2, this.props.pemenang]
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return new Intl.NumberFormat('id-ID',
                            { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
                          ).format(value);
                        }
                    }
                },
              },
              series: [{
                name: 'series-1',
                data: [this.props.harga5, this.props.harga4, this.props.harga3, this.props.harga2, this.props.harga]
              }],
              legend: {
                horizontalAlign: 'left'
            }
        });

        this.set()
    }
    set = () => {
        
        if(this.props.status=="gong") {
            this.setState({
                status: "Buka Lelang",
                wes: true
            })
            window.sessionStorage.setItem("status", "wes")
        }
        else if(this.props.status=="wes"){
            this.setState({
                status: "Tutup Lelang",
                wes: false
            })
            window.sessionStorage.setItem("status", "gong")
        }
    }
    getNama = () => {
        let url = "http://localhost:8080/store/admin/"

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
    handleTutup = () => {
        if(this.props.pemenang==0){
            window.sessionStorage.setItem("name", this.state.namaProduk);
            window.sessionStorage.setItem("isi", this.state.isi);
            window.sessionStorage.setItem("isi2",this.state.isi);
            window.sessionStorage.setItem("isi3",this.state.isi);
            window.sessionStorage.setItem("isi4",this.state.isi);
            window.sessionStorage.setItem("isi5",this.state.isi);
            window.sessionStorage.setItem("kelipatan", this.state.isiKelipatan);
            window.sessionStorage.setItem("pemenang", 0);
            window.sessionStorage.setItem("pemenang2",0);
            window.sessionStorage.setItem("pemenang3",0);
            window.sessionStorage.setItem("pemenang4",0);
            window.sessionStorage.setItem("pemenang5",0);
        }
        else{
            window.sessionStorage.setItem("name", this.state.namaProduk);
            window.sessionStorage.setItem("isi", this.state.isi);
            window.sessionStorage.setItem("isi2",this.props.harga);
            window.sessionStorage.setItem("isi3",this.props.harga2);
            window.sessionStorage.setItem("isi4",this.props.harga3);
            window.sessionStorage.setItem("isi5",this.props.harga4);
            window.sessionStorage.setItem("kelipatan", this.state.isiKelipatan);
            window.sessionStorage.setItem("pemenang", localStorage.getItem("id"));
            window.sessionStorage.setItem("pemenang2",this.props.pemenang);
            window.sessionStorage.setItem("pemenang3",this.props.pemenang2);
            window.sessionStorage.setItem("pemenang4",this.props.pemenang3);
            window.sessionStorage.setItem("pemenang5",this.props.pemenang4);
        }

        let form = new FormData()
        form.append("image",this.state.image)
        
        let url = "http://localhost:8080/store/product/"+ this.props.id
        axios.put(url, form)
        .then(res => {
            console.log(this.state.image)
        })
        .catch (err => {
            console.log(err.message)
        })
        this.props.onEdit()
        this.setState({pas: true})
        
        if(this.props.milik) this.updateCharts()
        this.setState({
            options: {
                xaxis: {
                    categories: [this.props.pemenang4, this.props.pemenang3, this.props.pemenang2, this.props.pemenang, localStorage.getItem("id")]
                }
            }
        })
        this.updateCharts()
    };
    handleBukaTutup = () => {
        if(this.props.status=="gong") {
            this.setState({
                status: "Tutup Lelang",
                wes: false
            })
            window.sessionStorage.setItem("status", "wes")
        }
        else if(this.props.status=="wes"){
            this.setState({
                status: "Buka Lelang",
                wes: true
            })
            window.sessionStorage.setItem("status", "gong")
        }
        this.props.onSwitch()
    };
    tambah = () => {
        this.setState({
            isi: this.state.isi + this.props.kelipatan,
            pas: false
        });
    };
    kurang = () => {
        if(this.state.isi != this.props.harga){
            this.setState({
                isi: this.state.isi - this.props.kelipatan
            });
        }
        setTimeout(function() {
            this.cek()
        }.bind(this), 1) //1ms
    };
    cek = () => {
        if(this.state.isi == this.props.harga){
            this.setState({pas: true})
        }
    };
    updateCharts() {
        const last = null
        if(this.props.pemenang==0){
            last = [this.state.isi,this.state.isi,this.state.isi,this.state.isi,this.state.isi];
        }
        else last = [this.props.harga4,this.props.harga3,this.props.harga2,this.props.harga,this.state.isi];
        const newSeries = [];
    
        this.state.series.map((s) => {
            const data = s.data.map((ss,sss) => {
              return last[sss]
            })
            newSeries.push({ data})
          })
          
          this.setState({
            series: newSeries
          })
    }
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
    
    handleFile = (e) =>{
        this.setState({
            image: e.target.files[0]
        })
    }
    render() {
        return(
        //     <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        <table>
                            <td>
                            <div class="input-group mb-3">
                                
                                <div className="col-5">
                                <img src={"http://localhost:8080/image/product/" + this.props.image} className="img" height="200" onError={(e)=>{e.target.onerror = null; e.target.src="http://localhost:8080/image/no.jpg"}}/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                
                                <div className="col-5" >
                                    <table width="500">
                                        <table >
                                        <tr>
                                            <td rowSpan={2} ><h1 hidden={!this.props.milik}>{this.props.name}</h1></td>
                                            <td hidden={this.props.milik}><input  type="text" name="namaProduk" size = "lg"className="form-control" onChange={this.handleChange} defaultValue={this.state.namaProduk} /></td>
                                            <td style={{color: '#ffd700'}} hidden={!this.props.milik}>{formatRupiah(this.props.kelipatan)}</td>
                                            <td><input hidden={this.props.milik} type="text" name="isiKelipatan" size = "lg"className="form-control" onChange={this.handleChange} value={this.state.isiKelipatan} /></td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;&nbsp;</td>
                                        </tr>
                                        </table>
                                        <table>
                                        <tr>
                                            <td rowSpan={2} hidden={!this.props.milik}><h1 >{formatRupiah(this.state.isi)}</h1></td>
                                            <td hidden={this.props.milik} ><input type="text" name="isi" size = "lg" className="form-control" onChange={this.handleChange} value={this.state.isi} /></td>
                                            <td hidden={this.props.milik} ><Form.Control name="image" type="file" accept=".png, .jpg" size = "sm"className="form-input" onChange={(e)=>this.handleFile(e)} /></td>
                                            <td><Button  hidden={!this.props.milik} disabled= {this.state.wes} size="sm" variant="outline" onClick={() => this.tambah()}>▲</Button ></td>
                                        </tr>
                                        <tr>
                                            <td><Button  hidden={!this.props.milik} disabled= {this.state.pas} size="sm" variant="outline" onClick={() => this.kurang()}>▼</Button ></td>
                                        </tr>
                                        <h1><Button width= "100" hidden= {!this.props.milik} disabled= {this.state.pas}  size="sm" variant="outline-secondary" onClick={(e) => this.handleTutup(13)}>tawar barang</Button ></h1>
                                        <h1 hidden= {this.props.milik}><Button width= "100" size="sm" variant="outline-secondary" onClick={this.handleTutup}>simpan perubahan</Button >&nbsp;
                                            <Button width= "100"  size="sm" variant="outline-secondary" onClick={this.props.onDrop}>Hapus</Button >&nbsp;
                                            
                                            <Button width= "100"  size="sm" variant="outline-secondary" onClick={this.handleBukaTutup}>{this.state.status}</Button >
                                            
                                        </h1>
                                        </table>
                                    </table >
                                </div>
                            </div>
                            </td>
                            <td >
                            <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200}  width={500}/>
    
                                
                            </td>
                            
                        </table>
                    </div>
                </div>
            // </div>
        )
    }
}
const formatRupiah = (money) => {
   return new Intl.NumberFormat('id-ID',
     { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
   ).format(money);
}