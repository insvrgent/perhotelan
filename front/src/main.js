import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './pages/home'
import Toko from './pages/toko'
import Login from './pages/login'
import Admin from './pages/admin'
import Resepsionis from './pages/resepsionis'

export default class Main extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/darkroom' component={Login}/>
                <Route exact path='/darkroom/admin' component={Admin}/>
                <Route exact path='/darkroom/resepsionis' component={Resepsionis}/>
                <Route exact path='/darkroom/saya' component={Toko}/>
            </Switch>
        )
    }
}