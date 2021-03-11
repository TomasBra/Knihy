import React, { Component, useState, useEffect } from 'react';
import { Button } from 'bootstrap';
import { Redirect } from "react-router-dom";
import { NewBook } from './AdministrationComponents/NewBook';
import {AKnihy} from './AdministrationComponents/AKnihy';
import {Welcome} from './AdministrationComponents/Welcome';
import {EditKniha} from './AdministrationComponents/EditKniha';
import {Nastaveni} from './AdministrationComponents/Nastaveni';

export function Administration(props) {

    const [Username, SetUsername] = useState("");
    const [Password, SetPassword] = useState("");
    const [Knihy, SetKnihy] = useState([]);
    const [Actual, SetActual] = useState(<Welcome />);

    useEffect(() =>{
        if (JSON.parse(sessionStorage.getItem("user")) != null) {
            SetUsername(JSON.parse(sessionStorage.getItem("user")).username);
            SetPassword(JSON.parse(sessionStorage.getItem("user")).password);
        }
        CheckUser();
        GetKnihy();
      },[])

    async function CheckUser() {
        if (JSON.parse(sessionStorage.getItem("user"))) {
            const data = { id: 1, username: JSON.parse(sessionStorage.getItem("user")).username, password: JSON.parse(sessionStorage.getItem("user")).password, authenticated: false };
            const response = await fetch('/CheckUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            var rdata = await response.json();
            if(rdata.authenticated==false){
                //nepřihlášen
                props.history.push('/login');
            }
        }
        else {
            props.history.push('/login');
        }
    }

    async function LogOut(){
        sessionStorage.removeItem('user');
        props.history.push('/login');
    }

    async function GetKnihy() {
        const response = await fetch('GetKnihy');
        const data = await response.json();
        SetKnihy(data);
    }

    function ChangeActual(par){
        SetActual(par);
    } 
    
    function Edit(id){
        console.log("Editovat knihu podle id:"+id);
        SetActual(<EditKniha id={id} CancelEdit={CancelEdit} Edited={Edited}/>);
    }
    
    function Edited(data){
        console.log("Editace proběhla úspěšně");
        SetKnihy(data);
        SetActual(<AKnihy DataKnihy={data} Edit={Edit} Delete={Delete} />);
    }

    function CancelEdit(){
        console.log("Editace ukončena");
        SetActual(<AKnihy DataKnihy={Knihy} Edit={Edit} Delete={Delete} />);
    }

    async function Delete(id){
        const senddata = { 
            id:id,
        };
        const response = await fetch('/Delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(senddata),
        });
        const data = await response.json();
        SetKnihy(data);
        SetActual(<AKnihy DataKnihy={data} Edit={Edit} Delete={Delete} />)
    }


            return (
                <div>
                    <div className="float-right d-block">
                        <input type="button" className="btn btn-primary d-block" onClick={LogOut} value="Odhlásit se"/>
                    </div>
                    <div className="d-block">
                        <input type="button" className="btn btn-primary mr-2" onClick={() => ChangeActual(<AKnihy DataKnihy={Knihy} Edit={Edit} Delete={Delete} />)} value="Knihy" />
                        <input type="button" className="btn btn-primary mr-2"  value="Nastavení" onClick={() => ChangeActual(<Nastaveni SetActual={SetActual} SetKnihy={SetKnihy}/>)}/>
                        <input type="button" className="btn btn-outline-success mr-2" onClick={() => ChangeActual(<NewBook SetKnihy={SetKnihy}/>)} value="Přidat knihu" />
                    </div>
                    {Actual}   
                </div>   
            );

}