import React, { Component, useState, useEffect } from "react";

export function Kniha({ kniha, AddToSeznam }) {
  var font_size_nazev = 33 - kniha.nazev.length * 0.4;
  var font_size_autor = 33 - kniha.autor.length * 0.4;
  const styleObj = {
    fontSize: font_size_nazev + "px",
  };
  const styleObj_Autor = {
    fontSize: font_size_autor + "px",
  };
  return (
    <div className="card text-center kniha mx-auto  m-1 m-sm-1">
      <div className="show">
        <div className="card-body p-lg-2">
          <h3 className="card-title title" style={styleObj}>
            {kniha.nazev}
          </h3>
        </div>
        <img class="card-img-bottom obr" src={kniha.obr} alt="Card image cap" />
        <div className="card-body p-lg-2">
          <button
            onClick={() => AddToSeznam(kniha.id)}
            className="btn btn-primary"
          >
            Přidat do seznamu
          </button>
        </div>
      </div>
      <div className="hide">
        <div className="card-body p-lg-2">
          <h2 className="card-title title" style={styleObj_Autor}>
            {kniha.autor}
          </h2>
          <p class="card-text popis font-weight-normal">{kniha.obsah}</p>
        </div>
        <div className="card-body p-lg-2">
          <button
            onClick={() => AddToSeznam(kniha.id)}
            className="btn btn-primary"
          >
            Přidat do seznamu
          </button>
        </div>
      </div>
    </div>
  );
}
