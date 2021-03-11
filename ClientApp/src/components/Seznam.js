import React, { Component, useState, useEffect, useRef } from 'react';
import {Kniha} from './SeznamComponents/Kniha';
import {Search} from './SeznamComponents/Search';
import {SeznamTable} from './SeznamComponents/SeznamTable';
import {SeznamKnihTable} from './SeznamComponents/SeznamKnihTable';

export function Seznam() {
   
    const [Knihy,SetKnihy] = useLocalStorage("knihy",[]);
    const [ShowBooks,SetShowBooks] = useState("ShowObject");
    const [ShowSeznam,SetShowSeznam] = useState("HideObject");
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
    const [PNastaveni, SetPNastaveni] = useLocalStorage("Nastaveni",{
        MaxKnih:0,
        MinDramat:0,
        MinPoezie:0,
        MinProza:0,
        Min18stol:0,
        Min19stol:0,
        MinSV2021:0,
        MinCZ2021:0,
    });
    const [PKnihy,SetPKnihy] = useLocalStorage("Pknihy",[]);

    useEffect(() =>{
        GetKnihy();
        GetNastaveni();
      },[])
    async function GetNastaveni() {
        const response = await fetch('GetSeznam');
        const data = await response.json();
        SetNastaveni(data);
    }
   
    
   
   
    return (
        <div className="container">
                    <main role="main" className="pb-3">
                        <button className="btn btn-primary float-right m-1">Vytisknout</button>
                        <button className="btn btn-primary float-right m-1" onClick={()=>{
                            if(ShowBooks=="ShowObject"){
                                SetShowBooks("HideObject");
                                SetShowSeznam("ShowObject");
                            }
                            else{
                                SetShowBooks("ShowObject");
                                SetShowSeznam("HideObject");
                            }
                        }}>Zobrazit seznam četby</button>
                        <button className="btn btn-primary float-right m-1" onClick={()=>{
                           if(window.confirm("Opravdu chcete vymazat paměť seznamu?")){
                            window.localStorage.removeItem("knihy");
                            window.localStorage.removeItem("Pknihy");
                            window.localStorage.removeItem("Nastaveni");
                            }
                        }}>Vyčistit pamět seznamu</button>
                        <div className={ShowBooks}>
                            <SeznamTable  Nastaveni={Nastaveni} PNastaveni={PNastaveni} />
                            <Search SetKnihy={SetKnihy} Knihy={Knihy} PKnihy={PKnihy}/>
                            <div id="knihy" className="mt-5">
                                <div className="row">
                                {Knihy.map(function (kniha) {
                                    return(
                                      <Kniha kniha={kniha} AddToSeznam={AddToSeznam}></Kniha>
                                    );
                                })}

                                </div>
                            </div>
                        </div>
                        <div className={ShowSeznam}>
                            <SeznamKnihTable Knihy={PKnihy} Delete={Delete}/>  
                        </div>
                    </main>
                </div>
    );


    async function GetKnihy() {
        const response = await fetch('GetKnihy');
        const data = await response.json();
        //    
        var res = data.filter(item1 => 
            !PKnihy.some(item2 => (item2.id === item1.id)));
        SetKnihy(res);
    }

    function AddToSeznam(id){
        var kniha = Knihy.find(kniha=>kniha.id==id);
        var VNastaveni = PNastaveni;
        var count;
        if(kniha.autor!=""){
            count = PKnihy.filter(k=>k.autor==kniha.autor);
        }
        else{
            count=[];
        }
        if(count.length<Nastaveni.MaxStejnyAutor){
            VNastaveni.MaxKnih+=1;
            if(kniha.zanr=="drama"){    
                VNastaveni.MinDramat+=1;
            }
            else if(kniha.zanr=="poezie"){
                VNastaveni.MinPoezie+=1;
            }
            else if(kniha.zanr=="próza"){
                VNastaveni.MinProza+=1;
            }
            //
            if(kniha.obdobi=="česká literatura 20. a 21. století")
            {
                VNastaveni.MinCZ2021+=1;
            }
            else if(kniha.obdobi=="světová literatura 20. a 21. století"){
                VNastaveni.MinSV2021+=1;
            }
            else if(kniha.obdobi=="literatura do konce 18. století"){
                VNastaveni.Min18stol+=1;
            }
            else if(kniha.obdobi=="literatura do konce 19. století"){
                VNastaveni.Min19stol+=1;
            }
            //
            SetPNastaveni(VNastaveni);
            SetPKnihy(array=> [...array,  kniha]);
            SetKnihy(Knihy.filter(k=>k.id!=kniha.id));
        }
        else{
            alert("Tohoto Autora jste již přidal/a.")
        }
    }
    function Delete(id){
        //
        var Dkniha= PKnihy.find(k=>k.id==id);
        var VNastaveni = PNastaveni;
        //odstranění hodnoty z info tablu
        VNastaveni.MaxKnih-=1;
        if(Dkniha.zanr=="drama"){    
            VNastaveni.MinDramat-=1;
        }
        else if(Dkniha.zanr=="poezie"){
            VNastaveni.MinPoezie-=1;
        }
        else if(Dkniha.zanr=="próza"){
            VNastaveni.MinProza-=1;
        }
        //
        if(Dkniha.obdobi=="česká literatura 20. a 21. století")
        {
            VNastaveni.MinCZ2021-=1;
        }
        else if(Dkniha.obdobi=="světová literatura 20. a 21. století"){
            VNastaveni.MinSV2021-=1;
        }
        else if(Dkniha.obdobi=="literatura do konce 18. století"){
            VNastaveni.Min18stol-=1;
        }
        else if(Dkniha.obdobi=="literatura do konce 19. století"){
            VNastaveni.Min19stol-=1;
        }
        SetPNastaveni(VNastaveni);
        SetKnihy(array=> [...array,  Dkniha]);
        //odstranění z tablu
        SetPKnihy(PKnihy.filter(kniha=>kniha.id!=id));
    }
    function useLocalStorage(key, initialValue) {
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = useState(() => {
          try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
          } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
          }
        });
      
        // Return a wrapped version of useState's setter function that ...
        // ... persists the new value to localStorage.
        const setValue = value => {
          try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
              value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
          }
        };
      
        return [storedValue, setValue];
      }











}

