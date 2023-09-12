import React, { } from "react";
import axios from 'axios';

import styled, { css } from "styled-components";
// import KamarTerpilih from '../component/kamarterpilih'

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Modal, Form} from 'react-bootstrap';
import "./style.css";
document.body.style.overflow = "hidden"
export default class login extends React.Component {
  constructor() {
    super();
    this.state = {
        username: "",
        password: "",
        role: "resepsionis",
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.username)
    console.log(this.state.password)
  };
  
  handleLogin = (e) => {
    if(this.state.username!==""&&this.state.password!=="")
        if (e.keyCode === 13||e===13) {
          let data = {
              username : this.state.username,
              password : this.state.password
          }
            
            let url = "http://localhost:8080/store/admin/auth"
            axios.post(url, data)
            .then(res => {
              if (res.data.logged){
                localStorage.setItem("id", res.data.data.admin_id)
                localStorage.setItem("username", res.data.data.username)
                localStorage.setItem("role", JSON.stringify(res.data.data.role))
                localStorage.setItem("user", JSON.stringify(res.data.data))
                localStorage.setItem("token", res.data.token)
                if(res.data.data.role == "admin") window.location = '/darkroom/admin'
                else window.location = '/darkroom/resepsionis'
              }
            })
            .catch (err => {
                console.log(err.message)
            })
            
        }
  }
  handleClose = () => {
    window.location = '/'
  } 
  

  componentDidMount = () => {
    if(localStorage.getItem("token") === null) return;
    if(localStorage.getItem("token") != null||localStorage.getItem("token") != ""){
        if(localStorage.getItem("role").includes("admin")) window.location = '/darkroom/admin'
        if(localStorage.getItem("role").includes("resepsionis")) window.location = '/darkroom/resepsionis'
    }
  }

  render(){
    return (
        <div>
          <meta name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>

        <Modal
        show={true}
        onHide={this.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <div>
                <Container>
                  <Rect6></Rect6>
                  <Rect7 src={require("./1UZ1I6_UnkcnFtIBs66fxBA.png")}></Rect7>
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
                    <button onClick={(e) => this.handleLogin(13)} type="button" class="btn btn-secondary col-12">login</button>
                    </Rect5>
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
height: 240px;
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
