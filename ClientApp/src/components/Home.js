import React, { Component, useState, useEffect } from 'react';
import { Button } from 'bootstrap';
import {Kniha} from './HomepageComponents/Kniha';
import {Search} from './HomepageComponents/Search';

export function Home (props){
    

    const [Knihy,SetKnihy] = useState([]);
    const [UserInput, SetUserInput] = useState("");
    //
    const [ReaderSource,SetReaderSource] = useState("");
    const [ShowReader, SetShowReader] = useState("HideObject");
    const [ShowBooks, SetShowBooks] = useState("ShowObject")


    useEffect(() =>{
        GetKnihy();
      },[])


            return (
                <div className="container">
                    <main role="main" className="pb-3">
                        <div className={ShowBooks}>
                            <div className="text-center">
                                <h1 className="display-4">Vítejte v e-knihovně</h1>
                            </div>
                            <Search SetKnihy={SetKnihy}/>
                        </div>
                        <div className={ShowReader}>
                            <div className="row">
                                <div className="mx-auto p-2">
                                    <input type="button" className="p-2 btn btn-primary" value="Zavřít" onClick={HideReader} />
                                    <a href={ReaderSource} target="_blank" className="pl-2">
                                        <input type="button" className="p-2 btn btn-primary" value="Otevřít v nové záložce" />
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center w-100 h-100 p-2">
                                    <embed className="reader" src={ReaderSource} type="application/pdf" />
                            </div>
                        </div>
                        <div className={ShowBooks}>
                            <div id="knihy" className="mt-5">
                                <div className="row">
                                {Knihy.map(function (kniha) {
                                    return(
                                      <Kniha kniha={kniha} readfc={readfc}></Kniha>
                                    );
                                })}

                                </div>
                            </div>
                        </div>
                    </main>
                </div>




            );

    async function GetKnihy() {
        const response = await fetch('GetKnihy');
        const data = await response.json();
        SetKnihy(data);
    }

    function readfc(src){
        SetReaderSource(src);
        SetShowReader("ShowObject");
        SetShowBooks("HideObject");
    }

    function HideReader(){
        SetReaderSource("");
        SetShowReader("HideObject");
        SetShowBooks("ShowObject");
    }

}
