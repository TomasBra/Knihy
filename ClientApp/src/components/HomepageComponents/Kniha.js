import React, { Component, useState, useEffect } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
export function Kniha({ kniha, readfc }) {
  var font_size_nazev = 33 - kniha.nazev.length * 0.4;
  var font_size_autor = 33 - kniha.autor.length * 0.4;
  const src = "book/" + kniha.id;
  var cist;
  const styleObj = {
    fontSize: font_size_nazev + "px",
  };
  const styleObj_Autor = {
    fontSize: font_size_autor + "px",
  };

  // true for mobile device
  return (
    <div className="card text-center kniha mx-auto  m-2 m-sm-2">
      <div className="show">
        <div className="card-body p-lg-2">
          <h3 className="card-title title" style={styleObj}>
            {kniha.nazev}
          </h3>
        </div>
        <img class="card-img-bottom obr" src={kniha.obr} alt="Card image cap" />
        <div className="card-body p-lg-2">
          <NavLink tag={Link} className="text-dark" to={src}>
            <button className="btn btn-primary">Začít číst</button>
          </NavLink>
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
          <NavLink tag={Link} className="text-dark" to={src}>
            <button className="btn btn-primary">Začít číst</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
