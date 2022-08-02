import React, { Component } from "react";
import Login from "../auth/login";
import loginImg from "../../../static/assets/images/auth/login.jpg"


export default class Auth extends Component{

    constructor(props) {
        super(props);

        this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
        this.handleUnsuccesfulAuth = this.handleUnsuccesfulAuth.bind(this);
    }

    handleSuccesfulAuth() {
        this.props.handleSuccessfulLogin();
        this.props.history.push("/");
    }

    handleUnsuccesfulAuth(){
        this.props.handleUnsuccessfulLogin();
    }

    render() {
        return (
            <div className="auth-page-wrapper">
                <div className="left-column"
                style={{
                    backgroundImage: `url(${loginImg})`
                }}
            />


                    <div className="right-column">
                      <Login 
                      handleSuccesfulAuth={this.handleSuccesfulAuth}
                      handleUnsuccesfulAuth={this.handleUnuccesfulAuth}
                      />

                    </div>
                 </div>
        );
    }
}