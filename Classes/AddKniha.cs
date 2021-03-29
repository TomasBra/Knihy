using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Buffers.Binary;
using System.IO;
using System.Xml;
using System.Data;

namespace Maturita.Classes
{
    public class AddKniha
    {
        public int id { get; set; }
        public string nazev { get; set; }
        public string autor { get; set; }
        public string obsah { get; set; }
        public string obdobi { get; set; }
        public string zanr { get; set; }
        public string obrPath { get; set; }
        public string pdfPath { get; set; }
        public IFormFile obr { get; set; }
        public IFormFile pdf { get; set; }

        public bool SaveImage()
        {
            if (obr != null)
            {
                //pozor!!! slo�ka public se po sestaven� m�n� na slo�ku build!!!
                var dir = Directory.GetFiles("ClientApp\\build\\Images").Length;
                Random random = new Random();
                string nknihy = obr.FileName.Split(".")[0].ToString() + "_" + dir.ToString() + random.Next().ToString() + "." + obr.FileName.Split(".")[1];
                var file = Path.Combine("ClientApp\\build\\Images", nknihy);
                var stream = new FileStream(file, FileMode.Create);
                obr.CopyTo(stream);
                obrPath = "Images\\" + nknihy;
                Console.WriteLine(obrPath);
                return true;
            }
            return false;
        }
        public bool SavePdf()
        {
            if (pdf != null)
            {
                //pozor!!! slo�ka public se po sestaven� m�n� na slo�ku build!!!
                var dir = Directory.GetFiles("ClientApp\\build\\pdf").Length;
                Random random = new Random();
                string nknihy = pdf.FileName.Split(".")[0].ToString() + "_" + dir.ToString() + random.Next().ToString() + "." + pdf.FileName.Split(".")[1];
                var file2 = Path.Combine("ClientApp\\public\\pdf", nknihy);
                var stream = new FileStream(file2, FileMode.Create);
                pdf.CopyTo(stream);
                pdfPath = "pdf\\" + nknihy;
                Console.WriteLine(pdfPath);
                return true;
            }
            return false;
        }
    }
}