import React, { Component, useState, useEffect } from "react";
import { Button } from "bootstrap";
import { Redirect } from "react-router-dom";

export function EditKniha({ id, CancelEdit, Edited }) {
  useEffect(() => {
    GetKnihyById(id);
  }, []);

  const [Kniha, SetKniha] = useState({
    Nazev: "",
    Autor: "",
    Obsah: "",
    Obdobi: "literatura do konce 18. století",
    Zanr: "poezie",
    BezAutora: false,
    OBR: "",
    PDF: "",
  });
  const [Puvodni, SetPuvodni] = useState(true);
  const [Validated, SetValidated] = useState(false);

  async function GetKnihyById(id) {
    const senddata = {
      id: id,
    };
    const response = await fetch("/GetBookById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(senddata),
    });
    const data = await response.json();
    SetKniha({
      Nazev: data[0].nazev,
      Autor: data[0].autor,
      Obsah: data[0].obsah,
      Obdobi: data[0].obdobi,
      Zanr: data[0].zanr,
    });
  }

  function Validate(text) {
    if (text.replace(/\s/g, "").length == 0 || text.length == 0) {
      SetValidated(false);
      return false;
    }
    if (text.replace(/\s/g, "").length > 0 && text.length != 0) {
      SetValidated(true);
      return true;
    }
  }

  async function EditBook() {
    if (Validate(Kniha.Nazev) && Validate(Kniha.Obsah)) {
      const data = {
        id: id,
        nazev: Kniha.Nazev,
        autor: Kniha.Autor,
        obsah: Kniha.Obsah,
        obdobi: Kniha.Obdobi,
        zanr: Kniha.Zanr,
        obr: Kniha.OBR,
        pdf: Kniha.PDF,
      };
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("nazev", data.nazev);
      formData.append("autor", data.autor);
      formData.append("obsah", data.obsah);
      formData.append("obdobi", data.obdobi);
      formData.append("zanr", data.zanr);
      if (data.obr != null) {
        formData.append("obr", data.obr);
      }
      if (data.pdf != null) {
        formData.append("pdf", data.pdf);
      }
      //odeslání + odpověď
      const response = await fetch("/EditKniha", {
        method: "POST",
        body: formData,
      });
      SetKniha({
        Nazev: "",
        Autor: "",
        Obsah: "",
        Obdobi: "literatura do konce 18. století",
        Zanr: "poezie",
        BezAutora: false,
        OBR: null,
        PDF: null,
      });
      document.getElementById("pdf").value = "";
      document.getElementById("obr").value = "";
      const Sdata = await response.json();
      Edited(Sdata);
    }
  }

  function NazevHandle(e) {
    SetKniha({
      Nazev: e.target.value,
      Autor: Kniha.Autor,
      Obsah: Kniha.Obsah,
      Obdobi: Kniha.Obdobi,
      Zanr: Kniha.Zanr,
      BezAutora: Kniha.BezAutora,
      OBR: Kniha.OBR,
      PDF: Kniha.PDF,
    });
  }
  function AutorHandle(e) {
    SetKniha({
      Nazev: Kniha.Nazev,
      Autor: e.target.value,
      Obsah: Kniha.Obsah,
      Obdobi: Kniha.Obdobi,
      Zanr: Kniha.Zanr,
      BezAutora: Kniha.BezAutora,
      OBR: Kniha.OBR,
      PDF: Kniha.PDF,
    });
  }
  function ObsahHandle(e) {
    SetKniha({
      Nazev: Kniha.Nazev,
      Autor: Kniha.Autor,
      Obsah: e.target.value,
      Obdobi: Kniha.Obdobi,
      Zanr: Kniha.Zanr,
      BezAutora: Kniha.BezAutora,
      OBR: Kniha.OBR,
      PDF: Kniha.PDF,
    });
  }
  function ObdobiHandle(e) {
    SetKniha({
      Nazev: Kniha.Nazev,
      Autor: Kniha.Autor,
      Obsah: Kniha.Obsah,
      Obdobi: e.target.value,
      Zanr: Kniha.Zanr,
      BezAutora: Kniha.BezAutora,
      OBR: Kniha.OBR,
      PDF: Kniha.PDF,
    });
  }
  function ZanrHandle(e) {
    SetKniha({
      Nazev: Kniha.Nazev,
      Autor: Kniha.Autor,
      Obsah: Kniha.Obsah,
      Obdobi: Kniha.Obdobi,
      Zanr: e.target.value,
      BezAutora: Kniha.BezAutora,
      OBR: Kniha.OBR,
      PDF: Kniha.PDF,
    });
  }
  function OBRHandle(e) {
    SetKniha({
      Nazev: Kniha.Nazev,
      Autor: Kniha.Autor,
      Obsah: Kniha.Obsah,
      Obdobi: Kniha.Obdobi,
      Zanr: Kniha.Zanr,
      BezAutora: Kniha.BezAutora,
      OBR: e.target.files[0],
      PDF: Kniha.PDF,
    });
  }
  function PDFHandle(e) {
    SetKniha({
      Nazev: Kniha.Nazev,
      Autor: Kniha.Autor,
      Obsah: Kniha.Obsah,
      Obdobi: Kniha.Obdobi,
      Zanr: Kniha.Zanr,
      BezAutora: Kniha.BezAutora,
      OBR: Kniha.OBR,
      PDF: e.target.files[0],
    });
  }
  function BezAutora(e) {
    SetKniha({
      Nazev: Kniha.Nazev,
      Autor: Kniha.Autor,
      Obsah: Kniha.Obsah,
      Obdobi: Kniha.Obdobi,
      Zanr: Kniha.Zanr,
      BezAutora: e.target.checked,
      OBR: Kniha.OBR,
      PDF: Kniha.PDF,
    });
    if (e.target.checked) {
      SetKniha({
        Nazev: Kniha.Nazev,
        Autor: "",
        Obsah: Kniha.Obsah,
        Obdobi: Kniha.Obdobi,
        Zanr: Kniha.Zanr,
        BezAutora: e.target.checked,
        OBR: Kniha.OBR,
        PDF: Kniha.PDF,
      });
    }
  }

  function LogData() {
    console.log(Kniha.Nazev);
    console.log(Kniha.OBR);
    console.log(Kniha.PDF);
    console.log(Kniha.Autor);
    console.log(Kniha.Obsah);
    console.log(Kniha.Kategorie);
    console.log(Kniha.Zanr);
    console.log(Kniha.BezAutora);
  }

  let autorInput;
  let Info;
  if (Kniha.BezAutora) {
    autorInput = null;
  } else {
    autorInput = (
      <div>
        <label className="mt-2 d-block">Autor</label>
        <input
          type="text"
          className="form-control mt-2 d-block"
          value={Kniha.Autor}
          onChange={AutorHandle}
          placeholder="Autor"
        />
      </div>
    );
  }
  if (Puvodni) {
    Info = <label className="mt-3 d-block">Původní soubor</label>;
  } else {
    Info = null;
  }
  return (
    <div>
      <div className="">
        <label className="pt-4 d-block">Název</label>
        <input
          type="text"
          require
          className="form-control mt-2 d-block"
          value={Kniha.Nazev}
          onChange={NazevHandle}
          placeholder="Název"
        />

        {autorInput}

        <label className="mt-2">Bez Autora</label>
        <input
          type="checkbox"
          className=" mt-2 Remember"
          checked={Kniha.BezAutora}
          onChange={BezAutora}
        />

        <label className="mt-2 d-block">Obsah</label>
        <textarea
          type="textarea"
          className="form-control mt-2 d-block"
          value={Kniha.Obsah}
          onChange={ObsahHandle}
          placeholder="Obsah"
        />

        {Info}
        <label className="mt-2 d-block">Epub</label>
        <input
          type="file"
          className="mt-2 d-block"
          id="pdf"
          onChange={PDFHandle}
          accept=".epub"
        />

        {Info}
        <label className="mt-2 d-block">OBR</label>
        <input
          type="file"
          className="mt-2 d-block"
          id="obr"
          onChange={OBRHandle}
          accept="image/x-png,image/gif,image/jpeg"
        />

        <label className="mt-2 d-block">Období:</label>
        <select
          className="form-control"
          value={Kniha.Obdobi}
          onChange={ObdobiHandle}
        >
          <option value="literatura do konce 18. století">
            literatura do konce 18. století
          </option>
          <option value="literatura do konce 19. století">
            literatura do konce 19. století
          </option>
          <option value="světová literatura 20. a 21. století">
            světová literatura 20. a 21. století
          </option>
          <option value="česká literatura 20. a 21. století">
            česká literatura 20. a 21. století
          </option>
        </select>

        <label className="mt-2 d-block">Žánr:</label>
        <select
          className="form-control"
          value={Kniha.Zanr}
          onChange={ZanrHandle}
        >
          <option value="poezie">poezie</option>
          <option value="próza">próza</option>
          <option value="drama">drama</option>
        </select>

        <input
          type="button"
          className="btn btn-primary mt-2"
          onClick={EditBook}
          value="Uložit"
        />
        <input
          type="button"
          className="btn btn-primary mt-2 ml-2"
          onClick={CancelEdit}
          value="Zrušit"
        />
      </div>
    </div>
  );
}
