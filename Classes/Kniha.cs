using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Maturita.Classes
{
    public class Kniha
    {
        public int id { get; set; }
        public string nazev { get; set; }
        public string autor { get; set; }
        public string obsah { get; set; }
        public string obdobi { get; set; }
        public string zanr { get; set; }
        public string obr { get; set; }
        public string pdf { get; set; }

        public Kniha(int Id, string Nazev, string Autor, string Obsah, string Obdobi, string Zanr, string Pdf, string Obr)
        {
            id = Id;
            nazev = Nazev;
            autor = Autor;
            obsah = Obsah;
            obdobi = Obdobi;
            zanr = Zanr;
            obr = Obr;
            pdf = Pdf;
        }
    }
}
