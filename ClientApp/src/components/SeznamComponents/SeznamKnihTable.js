import React, { Component, useState, useEffect, useRef } from 'react';

export function SeznamKnihTable({Knihy,Delete}) {
    return (
        <div>
            <div class="table-responsive">
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col"><h4>Název</h4></th>
                        <th scope="col"><h4>Autor</h4></th>
                        <th scope="col"><h4>Období</h4></th>
                        <th scope="col"><h4>Žánr</h4></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {Knihy.map(function (kniha) {
                return(
                    <tr>
                        <th scope="row">{kniha.nazev}</th>
                        <td>{kniha.autor}</td>
                        <td>{kniha.obdobi}</td>
                        <td>{kniha.zanr}</td>
                        <td scope="col"><button class="btn btn-danger" onClick={()=>Delete(kniha.id)}>Odstranit</button></td>
                    </tr>
                );})}
                </tbody>
                </table>
            </div>
        </div>
    )
}
