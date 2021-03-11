import React, { Component, useState, useEffect } from 'react';

export  function Search({SetKnihy, Knihy, PKnihy}) {

    const [HledanyVyraz,SetHledanyVyraz] = useState("");
    const [HledanyZanr,SetHledanyZanr] = useState("žánr:");
    const [HledanyObdobi,SetHledanyObdobi] = useState("období:");



    return (
        <div>
                            <div className="row ">
                                <div className="col-12">
                                    <input type="text" className="form-control" onChange={OnTextChange} placeholder="vyhledat" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mt-2">
                                        <select className="form-control" onChange={OnObdobiChange} id="obdobi" name="obdobi">
                                            <option>období:</option>
                                            <option>literatura do konce 18. století</option>
                                            <option>literatura do konce 19. století</option>
                                            <option>světová literatura 20. a 21. století</option>
                                            <option>česká literatura 20. a 21. století</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mt-2">
                                        <select className="form-control" onChange={OnZanrChange} id="zanr" name="zanr">
                                            <option>žánr:</option>
                                            <option>poezie</option>
                                            <option>próza</option>
                                            <option>drama</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mt-2">
                                            <input type="button" id="BtnSubmit" onClick={SearchFce} value="vyhledat" className="btn btn-primary" />
                                    </div>
                            </div>
        </div>
    );
    function OnTextChange(e){
        console.log(e.target.value);
        SetHledanyVyraz(e.target.value);
    }
    function OnZanrChange(e){
        SetHledanyZanr(e.target.value);
    }
    function OnObdobiChange(e){
        SetHledanyObdobi(e.target.value);
    }
    
    async function SearchFce(){
        const senddata = { 
            hledanyVyraz:HledanyVyraz,
            zanr:HledanyZanr,
            obdobi:HledanyObdobi,
        };
        const response = await fetch('/FindBooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(senddata),
        });
        const data = await response.json();
        var res = data.filter(item1 => 
            !PKnihy.some(item2 => (item2.id === item1.id)));
        SetKnihy(res);
    }


}
