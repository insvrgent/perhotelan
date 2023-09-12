import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts'
export default class CustomerList extends React.Component {
    constructor() {
        super()
        this.state = {
            namaProduk: "",
            edit: false,
            lupa: false,
            username: "",
            password: "",
        }
    }
    componentDidMount = () => {
        this.setState({
            namaProduk: this.props.name,
        });
    }
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
    
    
    handleSimpan = (e) => {
            if (e.keyCode === 13||e===13) {
                let isinamaa = false;
                if(this.state.username!="") isinamaa = true;
                else if(this.state.password!="") isinamaa = false;
                else {
                    this.setState({edit: false, lupa: false, username: "", password: ""})
                    return
                };
                let data = {
                    username : this.state.username,
                    password : this.state.password,
                    isinama: isinamaa
                }
                
                let url = "http://localhost:8080/store/admin/" + this.props.id
                axios.put(url, data)
                .then(res => {
                    this.props.onEdit()
                })
                .catch (err => {
                    console.log(err.message)
                })
                
            }
            this.setState({edit: false, lupa: false, username: "", password: ""})
    }
    render() {
        return(
        //     <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        <table>
                            <td>
                            <div class="input-group mb-1">
                                <div className="col-5" >
                                    <table width="1100">
                                        <table >
                                            <td hidden={!this.state.edit||this.state.lupa}><input  type="text" name="username" size = "lg"className="form-control" onChange={this.handleChange} defaultValue={this.state.namaProduk} /></td>
                                            <td hidden={this.state.edit||!this.state.lupa}><input  type="text" name="password" size = "lg"className="form-control" onChange={this.handleChange} defaultValue={""} /></td>
                                            <td hidden={this.state.edit||this.state.lupa}> <h1  size="lg">{this.props.name}</h1></td>
                                            
                                            <tr>&nbsp;</tr>
                                            <tr>
                                            <Button hidden={!this.state.edit&&!this.state.lupa} width= "100"  size="sm" variant="outline-secondary" onClick={(e) => this.handleSimpan(13)}>Simpan</Button >
                                            <Button hidden={this.state.edit||this.state.lupa} width= "100"  size="sm" variant="outline-secondary" onClick={() => this.setState({edit: true})}>Set Nama</Button > &nbsp;

                                            <Button hidden={this.state.edit||this.state.lupa} width= "100"  size="sm" variant="outline-secondary" onClick={() => this.setState({lupa: true})}>Set Password</Button > &nbsp;
                                            <Button hidden={this.state.edit||this.state.lupa} width= "100"  size="sm" variant="outline-secondary" onClick={this.props.onDrop}>Hapus</Button >
                                            </tr>
                                        </table>
                                    </table >
                                </div>
                            </div>
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