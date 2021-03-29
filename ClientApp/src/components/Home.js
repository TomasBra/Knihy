import React, { Component, useState, useEffect } from "react";
import { Button } from "bootstrap";
import { Kniha } from "./HomepageComponents/Kniha";
import { Search } from "./HomepageComponents/Search";
import {
  EpubView, // Underlaying epub-canvas (wrapper for epub.js iframe)
  EpubViewStyle, // Styles for EpubView, you can pass it to the instance as a style prop for customize it
  ReactReader, // A simple epub-reader with left/right button and chapter navigation
  ReactReaderStyle, // Styles for the epub-reader it you need to customize it
  FontSizeButton,
  Container,
  ReaderContainer,
} from "react-reader";

export function Home(props) {
  const [Knihy, SetKnihy] = useState([]);
  const [UserInput, SetUserInput] = useState("");
  //
  const [ReaderSource, SetReaderSource] = useState("");
  const [ShowReader, SetShowReader] = useState("HideObject");
  const [ShowBooks, SetShowBooks] = useState("ShowObject");
  const [Reader, setReader] = useState();
  const [largeText, setlargeText] = useState(false);
  const [Rendetion, SetRendetion] = useState();

  useEffect(() => {
    GetKnihy();
  }, []);

  return (
    <div className="container">
      <main role="main" className="pb-3">
        <div className={ShowBooks}>
          <div className="text-center">
            <h1 className="display-4">Vítejte v e-knihovně</h1>
          </div>
          <Search SetKnihy={SetKnihy} />
        </div>
        <div className={ShowReader}>
          <div className="row" style={{ height: "85vh" }}>
            {/*
                                <div className="mx-auto p-2">
                                    <input type="button" className="p-2 btn btn-primary" value="Zavřít" onClick={HideReader} />
                                    <a href={ReaderSource} target="_blank" className="pl-2">
                                        <input type="button" className="p-2 btn btn-primary" value="Otevřít v nové záložce" />
                                    </a>
                                </div>
                                */}
            <div
              style={{
                position: "relative",
                height: "85vh",
                width: "100%",
              }}
            ></div>
            {/*
                                <div className="d-flex align-items-center justify-content-center w-100 h-100 p-2">
                                    <embed className="reader" src={ReaderSource} type="application/pdf" />
                                </div>
                                */}
          </div>
        </div>
        <div className={ShowBooks}>
          <div id="knihy" className="mt-5">
            <div className="row">
              {Knihy.length != 0 ? (
                Knihy.map(function (kniha) {
                  return <Kniha kniha={kniha} readfc={readfc}></Kniha>;
                })
              ) : (
                <p>načítání...</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  async function GetKnihy() {
    const response = await fetch("GetKnihy");
    console.log(Knihy);
    const data = await response.json();
    SetKnihy(data);
  }

  function readfc(src) {
    SetShowReader("ShowObject");
    SetShowBooks("HideObject");
  }

  function HideReader() {
    SetShowReader("HideObject");
    SetShowBooks("ShowObject");
  }
}
