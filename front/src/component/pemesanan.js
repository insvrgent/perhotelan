import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts'
export default class CustomerList extends React.Component {
    constructor() {
        super()
        this.state = {
            gambar: "",
            kelas: ""
        }
    }
    componentDidMount = () => {
        {this.props.listtipe.map((item, index) => {
            if(item.tipe_id==this.props.tipe)this.setState({kelas: item.nama_tipe,gambar:item.foto})
        })}
    }
    handleChange = (e) => {
        this.props.onEdit(e.target.value)
    };
    
    render() {
        return(
            <div className="card">
                <div className="card-body row">
                    <table>
                        <td>
                        <div class="input-group mb-3">
                            
                            <div className="col-5">
                            <img src={this.state.gambar}  style={{ height: 100, width: 100 }} className="img" height="200"/>
                            </div>
                            
                            <div className="col-7" >
                                <table >
                                    <tr>
                                        <h5>{this.props.nama}</h5> 
                                        <h5>{this.props.status}</h5>
                                        <h5>pesan {this.props.tgl_pemesanan}</h5>
                                        <h5>masuk {this.props.tgl_check_in}</h5>
                                        <h5>keluar {this.props.tgl_check_out}</h5>
                                    </tr>
                                    <tr>
                                        <h5>{this.state.kelas}</h5>
                                        <h5>{this.props.harga}</h5>
                                        <Button onClick={this.props.onDrop} width= "100"  size="sm" variant="outline-secondary">Hapus</Button >
                                    </tr>
                                </table>
                            </div>
                        </div>
                        </td>
                    </table>
                </div>
            </div>
        )
    }
}