import React, { Component } from 'react';
import { Button } from 'bootstrap';
import { Redirect } from 'react-router-dom';
import { isEmptyObject } from 'jquery';

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);
        this.state = {
            User: [],
            UserInput: '',
            ReaderDisplay: 'none',
            ReaderSource: "",
            Sending: false,
            fetched: false,
            Username: "",
            Password: "",
            Logged: false,
            Validated: null,
            WrongData: false,
        };
        this.CheckUser = this.CheckUser.bind(this);
        this.HandleUsername = this.HandleUsername.bind(this);
        this.HandlePassword = this.HandlePassword.bind(this);
        this.Validate = this.Validate.bind(this);
    }
    async CheckUser() {
        if (this.Validate(this.state.Username) && this.Validate(this.state.Password)){
            //Píše checking user...
            this.setState({ Sending: true });
            //data k odeslání
            const data = { id: 1, username: this.state.Username, password: this.state.Password, authenticated: false };
            //odeslání + odpověď 
            const response = await fetch('/LoginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            //odpověď
            var rdata = await response.json();
            if(rdata.authenticated){
                await sessionStorage.setItem("user", JSON.stringify(rdata));
                this.props.history.push('/Administration');
            }
            else {
                this.setState({ Sending: false, fetched: false, Validated: null, WrongData: true, Username: "", Password:"", });
            }
        }
    }

    HandleUsername(event) {
        this.setState({ Username: event.target.value });
    }
    HandlePassword(event) {
        this.setState({ Password: event.target.value });
    }

    Validate(text)
    {
        console.log(text.replace(/\s/g, '').length);
        console.log(text.length);
        if (text.replace(/\s/g, '').length == 0 || text.length == 0) {
            this.setState({ Validated: false });
            return false;
        }
        if (text.replace(/\s/g, '').length > 0 && text.length != 0)
        {
            this.setState({ Validated: true });
            return true;
        }
    }

    render() {
        let warn = null;
        let wrong = null;
        if (this.state.Validated == false) {
            warn = "Nevyplnil jste správně údaje."
        }
        if (this.state.WrongData) {
            wrong = <h3>Uživatel není v databázi.</h3>
        }
        if (this.state.Sending == false && this.state.fetched == false) {
            return (
                <div className="container">
                    <main role="main" className="pb-3">
                        <div className="text-center py-auto pb-md-5">
                            <h3 className="display-4">Přihlašovací systém k Administraci</h3>
                        </div>
                        <div className="pt-5">
                            {wrong}
                            <label className="d-block">Uživatelské jméno:</label>
                            {warn}
                            <input required className="form-control" type="text" onChange={this.HandleUsername} />
                            <label className="d-block pt-1">Heslo:</label>
                            {warn}
                            <input required className="form-control" onChange={this.HandlePassword} type="password" />
                            <input  type="button" onClick={this.CheckUser} className="mt-2 btn btn-primary d-block" value="Přihlásit se" />
                        </div>
                    </main>
                </div>
            );
        }
        if (this.state.Sending == true && this.state.fetched == false) {
            return (
                <div className="container">
                    <h3>Checking user...</h3>
                </div>
            );
        }
    }










}
