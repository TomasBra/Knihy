import React, { Component, useState, useEffect } from 'react';

export function SeznamTable({Nastaveni,PNastaveni}) {
    return (
        <div>
            <table class="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <th scope="col"><h4>Knihy {PNastaveni.MaxKnih}/{Nastaveni.MaxKnih}</h4></th>
                        <th scope="col"><h4>Dramata {PNastaveni.MinDramat}/{Nastaveni.MinDramat}</h4></th>
                        <th scope="col"><h4>Poezie {PNastaveni.MinPoezie}/{Nastaveni.MinPoezie}</h4></th>
                        <th scope="col"><h4>Próza {PNastaveni.MinProza}/{Nastaveni.MinProza}</h4></th>
                    </tr>
                    <tr>
                        <th scope="col"><h5>Literatura do 18. století {PNastaveni.Min18stol}/{Nastaveni.Min18stol}</h5></th>
                        <th scope="col"><h5>Literatura do 19. století {PNastaveni.Min19stol}/{Nastaveni.Min19stol}</h5></th>
                        <th scope="col"><h5>Světová literatura 20. a 21. století {PNastaveni.MinSV2021}/{Nastaveni.MinSV2021}</h5></th>
                        <th scope="col"><h5>Česká literatura 20. a 21. století {PNastaveni.MinCZ2021}/{Nastaveni.MinCZ2021}</h5></th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}
