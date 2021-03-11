import React from 'react'
import {Search} from './../HomepageComponents/Search'
export function AKnihy({DataKnihy, Edit, Delete}) {
    return (
        <div>
            <table className="table mt-4 table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Název</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Obsah</th>
                        <th scope="col">Období</th>
                        <th scope="col">Žánr</th>
                        <th scope="col">Pdf</th>
                        <th scope="col">Obr</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {DataKnihy.map(function (kniha) {
                        return(
                        <tr>
                            <th scope="col">{kniha.nazev}</th>
                            <th scope="col">{kniha.autor}</th>
                            <th scope="col">{kniha.obsah}</th>
                            <th scope="col">{kniha.obdobi}</th>
                            <th scope="col">{kniha.zanr}</th>
                            <th scope="col"><a href={kniha.pdf} target = "_blank">zde</a></th>
                            <th scope="col"><a href={kniha.obr} target = "_blank">zde</a></th>
                            <th scope="col"><button className="btn btn-primary" onClick={() => Edit(kniha.id)}>Editovat</button></th>
                            <th scope="col"><button className="btn btn-danger" onClick={() => Delete(kniha.id)}>Odstranit</button></th>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
    )
}
