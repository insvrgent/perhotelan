import React from 'react'
import {Link} from 'react-router-dom'
import logo from './;D.jpg';

export default class Navbar extends React.Component{
    
    logout = (e) => {
        window.localStorage.clear();
        window.location = '/login'
    }
    render(){
        return(
            <div className='container'>
                <nav className="navbar navbar-expand-lg navbar-white bg-white">
                    <img src={logo} className="App-logo" alt=";D" href="/" height = "30" />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link Active" aria-current='/page' to="/">Home</Link>
                        </li>
                        </ul>
                    </div>
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link Active" aria-current='/saya' to="/saya">Saya</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={this.logout}></button>
                        </li>
                        </ul>
                    </nav>
            </div>
        )
    }
}