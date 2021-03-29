import React, { Component, useState, useEffect } from "react";
import { Button } from "bootstrap";
import {
  EpubView, // Underlaying epub-canvas (wrapper for epub.js iframe)
  EpubViewStyle, // Styles for EpubView, you can pass it to the instance as a style prop for customize it
  ReactReader, // A simple epub-reader with left/right button and chapter navigation
  ReactReaderStyle, // Styles for the epub-reader it you need to customize it
  FontSizeButton,
  Container,
  ReaderContainer,
} from "react-reader";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
export function ReaderComponent() {
  const [largeText, setlargeText] = useState(false);
  const [Rendetion, SetRendetion] = useState();
  const [Reader, SetReader] = useState();
  const [Location, SetLocation] = useState();
  const [DeleteMark, SetDeleteMark] = useState();
  const [Book, SetBook] = useState();
  const [Page, SetPage] = useState();
  let { id } = useParams();
  useEffect(() => {
    GetBookById();
  }, []);
  return (
    <div style={{ position: "relative", height: "80vh", width: "100%" }}>
          {Book ? (
        <ReactReader
          url={Book.pdf}
          title={Book.nazev}
          location={Location}
          locationChanged={(epubcifi) => {
              SetLocation(epubcifi);
              localStorage.setItem(Book.id,epubcifi);
          }}
          getRendition={getRendition}/>
      ) : (
        "načítání"
      )}
      <button className="btn btn-primary m-1" onClick={onToggleFontSize}>
        Přizpůsobit text
      </button>
      {DeleteMark}
    </div>
  );
  function getRendition(rendition) {
    // Set inital font-size, and add a pointer to rendition for later updates
    rendition.themes.fontSize(largeText ? "140%" : "100%");
    console.log(rendition);
    SetRendetion(rendition);
  }
  function onToggleFontSize() {
    Rendetion.themes.fontSize(!largeText ? "140%" : "100%");
    console.log(Rendetion);
    setlargeText(!largeText);
  }
  async function GetBookById() {
    const senddata = {
      id: parseInt(id),
    };
    const response = await fetch("/GetBookById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(senddata),
    });
    const data = await response.json();
    SetLocation(localStorage.getItem(data[0].id));    
    SetBook(data[0]);
    SetDeleteMark(
      <button
        className="btn btn-primary float-right m-1"
        onClick={() => {
          var r = window.confirm("Opravdu chcete smazat vaši záložku");
          if (r == true) {
              localStorage.removeItem(data[0].id);
            }
            console.log(Rendetion);
        }}
      >
        Smazat záložku
      </button>
    );
  }
}
