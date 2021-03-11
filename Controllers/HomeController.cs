using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Xml;
using System.Data;
using Microsoft.Data.Sqlite;
using Maturita.Classes;
using Newtonsoft.Json;
using EknihyReact.Classes;

namespace Maturita.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        [Route("/GetKnihy")]
        [HttpGet]
        public async Task<string> Home()
        {
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Knihy.db");
            List<Kniha> knihy = await SqliteMethods.GetKnihyFromSqlite(connection, "SELECT * FROM Knihy Order by název ASC");
            connection.Close();
            string json = JsonConvert.SerializeObject(knihy);
            return await Task.FromResult(json);
        }
        
        [Route("/LoginUser")]
        [HttpPost]
        public async Task<string> login([FromBody]User user)
        {
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Users.db");
            user.password = UsersCoding.EncryptData(user.password);
            User userBack = await SqliteMethods.CheckUser(connection, user);
            if(userBack!=null&&userBack.authenticated){
                user.authenticated=true;
            }
            else{
                user.username="nepřihlášen";
                user.password="nepřihlášen";
            }
            string json = JsonConvert.SerializeObject(user);
            connection.Close();
            return await Task.FromResult(json);
        }

        [Route("/CheckUser")]
        [HttpPost]
        public async Task<string> CheckUser([FromBody]User user)
        {
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Users.db");
            User userBack = await (SqliteMethods.CheckUser(connection, user));
            if(userBack!=null&&userBack.authenticated){
                user.authenticated=true;
            }
            else{
                user.username="nepřihlášen";
                user.password="nepřihlášen";
            }
            string json = JsonConvert.SerializeObject(user);
            connection.Close();
            return await Task.FromResult(json);
        }

        [Route("/AddUser")]
        [HttpPost]
        public async Task<string> AddUser([FromBody]User user)
        {
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Users.db");
            await SqliteMethods.AddUser(connection, user);
            string json = JsonConvert.SerializeObject(user);
            connection.Close();
            return await Task.FromResult(json);
        }

        [Route("/GetBookById")]
        [HttpPost]
        public async Task<string> GetBookById([FromBody] Kniha kniha)
        {
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Knihy.db");
            List<Kniha> knihy = await SqliteMethods.GetKnihyFromSqlite(connection, $"SELECT * FROM Knihy WHERE Id='{kniha.id}' Order by název ASC");
            connection.Close();
            string json = JsonConvert.SerializeObject(knihy);
            return await Task.FromResult(json);
        }

        [Route("/AddKniha")]
        [HttpPost]
        public async Task<string> NewKniha([FromForm]AddKniha kniha)
        {
            Console.WriteLine(kniha.pdf.FileName);
            kniha.SaveImage();
            kniha.SavePdf();
            Kniha SqlKniha = new Kniha(0, kniha.nazev, kniha.autor, kniha.obsah, kniha.obdobi, kniha.zanr, kniha.pdfPath, kniha.obrPath);
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Knihy.db");
            await SqliteMethods.InsertedKnihaIntoSqlite(connection, SqlKniha);
            List<Kniha> knihy = await SqliteMethods.GetKnihyFromSqlite(connection, "SELECT * FROM Knihy Order by název ASC");
            connection.Close();
            string json = JsonConvert.SerializeObject(knihy);
            return await Task.FromResult(json);
        }

        [Route("/Delete")]
        [HttpPost]
        public async Task<string> DeleteKniha([FromBody]Kniha kniha)
        {
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Knihy.db");
            await SqliteMethods.DeleteOneKnihaSqlite(connection,$"DELETE FROM Knihy WHERE Id='{kniha.id}'");
            List<Kniha> knihy = await SqliteMethods.GetKnihyFromSqlite(connection, "SELECT * FROM Knihy Order by název ASC");
            connection.Close();
            string json = JsonConvert.SerializeObject(knihy);
            return await Task.FromResult(json);
        }

        [Route("/EditKniha")]
        [HttpPost]
        public async Task<string> EditKniha([FromForm]AddKniha kniha)
        {   
            bool pdf = kniha.SavePdf();
            bool image = kniha.SaveImage();
            
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Knihy.db");
            //
            if (pdf&&image)
            {
                await SqliteMethods.UpdateKniha(connection, $"UPDATE Knihy SET Název='{kniha.nazev}', Autor='{kniha.autor}', Obsah='{kniha.obsah}', Období='{kniha.obdobi}', Žánr='{kniha.zanr}', PDF='{kniha.pdfPath}', OBR='{kniha.obrPath}'  WHERE Id='{kniha.id}'");
            }
            else if(pdf)
            {

                await SqliteMethods.UpdateKniha(connection, $"UPDATE Knihy SET Název='{kniha.nazev}', Autor='{kniha.autor}', Obsah='{kniha.obsah}', Období='{kniha.obdobi}', Žánr='{kniha.zanr}', PDF='{kniha.pdfPath}'  WHERE Id='{kniha.id}'");
            }
            else if(image)
            {
                await SqliteMethods.UpdateKniha(connection, $"UPDATE Knihy SET Název='{kniha.nazev}', Autor='{kniha.autor}', Obsah='{kniha.obsah}', Období='{kniha.obdobi}', Žánr='{kniha.zanr}', OBR='{kniha.obrPath}'  WHERE Id='{kniha.id}'");
            }
            else
            {
                await SqliteMethods.UpdateKniha(connection, $"UPDATE Knihy SET Název='{kniha.nazev}', Autor='{kniha.autor}', Obsah='{kniha.obsah}', Období='{kniha.obdobi}', Žánr='{kniha.zanr}'  WHERE Id='{kniha.id}'");
            }
            List<Kniha> knihy = await SqliteMethods.GetKnihyFromSqlite(connection, "SELECT * FROM Knihy Order by název ASC");
            connection.Close();
            string json = JsonConvert.SerializeObject(knihy);
            return await Task.FromResult(json);
        }

        [Route("/FindBooks")]
        [HttpPost]
        public async Task<string> FindBooks([FromBody]Search kniha)
        {   
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Knihy.db");
            if(kniha.obdobi=="období:")
            {
                kniha.obdobi = "";
            }
            if(kniha.zanr =="žánr:")
            {
                kniha.zanr = "";
            }
            Console.WriteLine(kniha.hledanyVyraz);
            Console.WriteLine(kniha.zanr);
            Console.WriteLine(kniha.obdobi);
            List<Kniha> knihy = await SqliteMethods.GetKnihyFromSqlite(connection, $"SELECT * FROM Knihy WHERE NazevBezDiakritiky LIKE '%{SqliteMethods.RemoveDiacritics(kniha.hledanyVyraz).ToLower()}%' AND Období LIKE '%{kniha.obdobi}%' AND Žánr LIKE '%{kniha.zanr}%' OR AutorBezDiakritiky LIKE '%{SqliteMethods.RemoveDiacritics(kniha.hledanyVyraz).ToLower()}%' AND Období LIKE '%{kniha.obdobi}%' AND Žánr LIKE '%{kniha.zanr}%'  Order by název ASC");
            connection.Close();
            string json = JsonConvert.SerializeObject(knihy);
            return await Task.FromResult(json);
        }


        [Route("/GetSeznam")]
        [HttpGet]
        public async Task<string> GetSeznam()
        {   
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Knihy.db");
            SeznamNastaveni nastaveni = await SqliteMethods.GetOptions(connection,"SELECT * FROM SeznamNastaveni");
            connection.Close();
            string json = JsonConvert.SerializeObject(nastaveni);
            return await Task.FromResult(json);
        }

        [Route("/SetSeznam")]
        [HttpPost]
        public async Task<string> SetSeznam([FromBody]SeznamNastaveni nastaveni)
        {   
            SqliteConnection connection = SqliteMethods.OpenConnectionToSqlite("Knihy.db");
            await SqliteMethods.UpdateSeznam(connection,$"UPDATE SeznamNastaveni SET Maxknih='{nastaveni.MaxKnih}', MinDramat='{nastaveni.MinDramat}', MinPoezie='{nastaveni.MinPoezie}', MinPróza='{nastaveni.MinProza}', MaxStejnýAutor='{nastaveni.MaxStejnyAutor}', Min18='{nastaveni.Min18stol}', Min19='{nastaveni.Min19stol}', MinSV2021='{nastaveni.MinSV2021}', MinCZ2021='{nastaveni.MinCZ2021}'  ");
            SeznamNastaveni Rnastaveni = await SqliteMethods.GetOptions(connection,"SELECT * FROM SeznamNastaveni");
            connection.Close();
            string json = JsonConvert.SerializeObject(Rnastaveni);
            return await Task.FromResult(json);
        }
    }
}
