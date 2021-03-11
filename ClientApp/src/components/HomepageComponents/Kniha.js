import React, { Component, useState, useEffect } from 'react'



export function Kniha({kniha,readfc}) {
        var font_size_nazev=33-kniha.nazev.length*0.4;
        var font_size_autor=33-kniha.autor.length*0.4;
        var cist;
        const styleObj = {
            fontSize: font_size_nazev+"px",
        }
        const styleObj_Autor ={
            fontSize: font_size_autor+"px",
        }
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            // true for mobile device
            cist= <a href={kniha.pdf}  target="_blank"><button className="btn btn-primary">Začít číst</button></a>;
          }else{
            // false for not mobile device
            cist=<button onClick={()=> readfc(kniha.pdf)} className="btn btn-primary">Začít číst</button>;
          }
        return (
            <div className="card text-center kniha mx-auto  m-1 m-sm-1">
                <div className="show">
                    <div className="card-body p-lg-2" >
                        <h3 className="card-title title" style={styleObj} >{kniha.nazev}</h3>
                    </div>
                    <img class="card-img-bottom obr" src={kniha.obr} alt="Card image cap" />
                    <div className="card-body p-lg-2">
                        {cist}
                    </div>
                </div>
                <div className="hide">
                    <div className="card-body p-lg-2">
                        <h2 className="card-title title" style={styleObj_Autor}>{kniha.autor}</h2>
                        <p class="card-text popis font-weight-normal">{kniha.obsah}</p>
                    </div>
                    <div className="card-body p-lg-2">
                        {cist}
                    </div>
                </div>
            </div>);
}
