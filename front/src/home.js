import React from 'react';
import logo from './logo.svg';
import './App.css';
export default class Home extends React.Component{
    render(){
        return(
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h3>projek react pertama</h3>
                <p>
                belajar react itu susah dan tidak menyenangkan
                </p>
            </header>
            </div>
        )
    }
}