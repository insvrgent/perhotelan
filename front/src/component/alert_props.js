import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
export default class AlertProps extends React.Component{
    render(){
        return(
            <div className={'text-center alert alert-' + this.props.type}>
                <h3>{this.props.title}</h3>
                <p>{this.props.children}</p>
            </div>
        )
    }
}