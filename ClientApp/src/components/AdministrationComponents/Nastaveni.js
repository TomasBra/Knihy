import React, { Component, useState, useEffect } from 'react';
import {Welcome} from './Welcome';

export function Nastaveni({SetKnihy, SetActual}) {

    const [Nastaveni,SetNastaveni] = useState({
        MaxKnih:0,
        MinDramat:0,
        MinPoezie:0,
        MinProza:0,
        MaxStejnyAutor:0,
        Min18stol:0,
        Min19stol:0,
        MinSV2021:0,
        MinCZ2021:0,
    });

    useEffect(() =>{
        GetNastaveni();
      },[])

    async function GetNastaveni() {
        const response = await fetch('GetSeznam');
        const data = await response.json();
        SetNastaveni(data);
    }

    async function SetSeznam(){
        const senddata = { 
            MaxKnih:parseInt(Nastaveni.MaxKnih),
            MinDramat:parseInt(Nastaveni.MinDramat),
            MinPoezie:parseInt(Nastaveni.MinPoezie),
            MinProza:parseInt(Nastaveni.MinProza),
            MaxStejnyAutor:parseInt(Nastaveni.MaxStejnyAutor),
            Min18stol:parseInt(Nastaveni.Min18stol),
            Min19stol:parseInt(Nastaveni.Min19stol),
            MinSV2021:parseInt(Nastaveni.MinSV2021),
            MinCZ2021:parseInt(Nastaveni.MinCZ2021),
        };
        const response = await fetch('/SetSeznam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(senddata),
        });
        SetActual(<Welcome />)
    } 



    return (
        <div className="mt-5">
            <div className="row align-self-center ">
                <input type="number" value={Nastaveni.MaxKnih} onChange={HandleMaxKnih} placeholder="Maximální počet knih" className="ml-2 form-control w-25 mt-2"/>
                <input type="number" value={Nastaveni.MinDramat} onChange={HandleMinDramat} placeholder="Minimální počet dramat" className="ml-2 form-control w-25 mt-2"/>
                <input type="number" value={Nastaveni.MinPoezie} onChange={HandleMinPoezie} placeholder="MinimMinimální počet poezie" className="ml-2 form-control w-25 mt-2"/>
                <input type="number" value={Nastaveni.MinProza} onChange={HandleMinProza} placeholder="Minimální počet prózy" className="ml-2 form-control w-25 mt-2"/>
                <input type="number" value={Nastaveni.MaxStejnyAutor} onChange={HandleMaxStejnyAutor} placeholder="Maximální počet stejného autora" className="ml-2 form-control w-25 mt-2"/>
                <input type="number" value={Nastaveni.Min18stol} onChange={HandleMin18stol} placeholder="Minimální počet knih do 18. století" className="ml-2 form-control w-25 mt-2"/>
                <input type="number" value={Nastaveni.Min19stol} onChange={HandleMin19stol} placeholder="Minimální počet knih do 19. století" className="ml-2 form-control w-25 mt-2"/>
                <input type="number" value={Nastaveni.MinSV2021} onChange={HandleMinSV2021} placeholder="Minimální počet světových knih 20. a 21. století" className="ml-2 form-control w-25 mt-2"/>
                <input type="number" value={Nastaveni.MinCZ2021} onChange={HandleMinCZ2021} placeholder="Minimální počet českých knih 20. a 21. století" className="ml-2 form-control w-25 mt-2"/>
                <input type="button" className="btn btn-primary ml-2 d-block mt-2" onClick={SetSeznam} value="Uložit"/>
            </div>
        </div>
    );

    function HandleMaxKnih(e){
        SetNastaveni({
            MaxKnih:e.target.value,
            MinDramat:Nastaveni.MinDramat,
            MinPoezie:Nastaveni.MinPoezie,
            MinProza:Nastaveni.MinProza,
            MaxStejnyAutor:Nastaveni.MaxStejnyAutor,
            Min18stol:Nastaveni.Min18stol,
            Min19stol:Nastaveni.Min19stol,
            MinSV2021:Nastaveni.MinSV2021,
            MinCZ2021:Nastaveni.MinCZ2021,
        });
    }
    function HandleMinDramat(e){
        SetNastaveni({
            MaxKnih:Nastaveni.MaxKnih,
            MinDramat:e.target.value,
            MinPoezie:Nastaveni.MinPoezie,
            MinProza:Nastaveni.MinProza,
            MaxStejnyAutor:Nastaveni.MaxStejnyAutor,
            Min18stol:Nastaveni.Min18stol,
            Min19stol:Nastaveni.Min19stol,
            MinSV2021:Nastaveni.MinSV2021,
            MinCZ2021:Nastaveni.MinCZ2021,
        });
    }
    function HandleMinPoezie(e){
        SetNastaveni({
            MaxKnih:Nastaveni.MaxKnih,
            MinDramat:Nastaveni.MinDramat,
            MinPoezie:e.target.value,
            MinProza:Nastaveni.MinProza,
            MaxStejnyAutor:Nastaveni.MaxStejnyAutor,
            Min18stol:Nastaveni.Min18stol,
            Min19stol:Nastaveni.Min19stol,
            MinSV2021:Nastaveni.MinSV2021,
            MinCZ2021:Nastaveni.MinCZ2021,
        });
    }
    function HandleMinProza(e){
        SetNastaveni({
            MaxKnih:Nastaveni.MaxKnih,
            MinDramat:Nastaveni.MinDramat,
            MinPoezie:Nastaveni.MinPoezie,
            MinProza:e.target.value,
            MaxStejnyAutor:Nastaveni.MaxStejnyAutor,
            Min18stol:Nastaveni.Min18stol,
            Min19stol:Nastaveni.Min19stol,
            MinSV2021:Nastaveni.MinSV2021,
            MinCZ2021:Nastaveni.MinCZ2021,
        });
    }
    function HandleMaxStejnyAutor(e){
        SetNastaveni({
            MaxKnih:Nastaveni.MaxKnih,
            MinDramat:Nastaveni.MinDramat,
            MinPoezie:Nastaveni.MinPoezie,
            MinProza:Nastaveni.MinProza,
            MaxStejnyAutor:e.target.value,
            Min18stol:Nastaveni.Min18stol,
            Min19stol:Nastaveni.Min19stol,
            MinSV2021:Nastaveni.MinSV2021,
            MinCZ2021:Nastaveni.MinCZ2021,
        });
    }
    function HandleMin18stol(e){
        SetNastaveni({
            MaxKnih:Nastaveni.MaxKnih,
            MinDramat:Nastaveni.MinDramat,
            MinPoezie:Nastaveni.MinPoezie,
            MinProza:Nastaveni.MinProza,
            MaxStejnyAutor:Nastaveni.MaxStejnyAutor,
            Min18stol:e.target.value,
            Min19stol:Nastaveni.Min19stol,
            MinSV2021:Nastaveni.MinSV2021,
            MinCZ2021:Nastaveni.MinCZ2021,
        });
    }
    function HandleMin19stol(e){
        SetNastaveni({
            MaxKnih:Nastaveni.MaxKnih,
            MinDramat:Nastaveni.MinDramat,
            MinPoezie:Nastaveni.MinPoezie,
            MinProza:Nastaveni.MinProza,
            MaxStejnyAutor:Nastaveni.MaxStejnyAutor,
            Min18stol:Nastaveni.Min18stol,
            Min19stol:e.target.value,
            MinSV2021:Nastaveni.MinSV2021,
            MinCZ2021:Nastaveni.MinCZ2021,
        });
    }
    function HandleMinSV2021(e){
        SetNastaveni({
            MaxKnih:Nastaveni.MaxKnih,
            MinDramat:Nastaveni.MinDramat,
            MinPoezie:Nastaveni.MinPoezie,
            MinProza:Nastaveni.MinProza,
            MaxStejnyAutor:Nastaveni.MaxStejnyAutor,
            Min18stol:Nastaveni.Min18stol,
            Min19stol:Nastaveni.Min19stol,
            MinSV2021:e.target.value,
            MinCZ2021:Nastaveni.MinCZ2021,
        });
    }
    function HandleMinCZ2021(e){
        SetNastaveni({
            MaxKnih:Nastaveni.MaxKnih,
            MinDramat:Nastaveni.MinDramat,
            MinPoezie:Nastaveni.MinPoezie,
            MinProza:Nastaveni.MinProza,
            MaxStejnyAutor:Nastaveni.MaxStejnyAutor,
            Min18stol:Nastaveni.Min18stol,
            Min19stol:Nastaveni.Min19stol,
            MinSV2021:Nastaveni.MinSV2021,
            MinCZ2021:e.target.value,
        });
    }



}
