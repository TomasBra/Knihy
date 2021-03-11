using EknihyReact.Classes;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maturita.Classes
{
    public static class SqliteMethods
    {
        //tvoří spojení s sqlite databází
        public static SqliteConnection OpenConnectionToSqlite(string Source)
        {
            // Create a new database connection:
            SqliteConnection sqlite_conn = new SqliteConnection($"Data Source={Source};");
            // Open the connection:
            sqlite_conn.Open();
            return sqlite_conn;

        }

        public static string RemoveDiacritics(string text)
        {
            if (text != null)
            {
                var normalizedString = text.Normalize(NormalizationForm.FormD);
                var stringBuilder = new StringBuilder();

                foreach (var c in normalizedString)
                {
                    var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                    if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                    {
                        stringBuilder.Append(c);
                    }
                }

                return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
            }
            else
            {
                return "";
            }
        }

        //splní command na databázi a vrátí objekt obsahující list objektů kniha
        public static Task<List<Kniha>> GetKnihyFromSqlite(SqliteConnection SqliteConnection, string Command)
        {
            SqliteDataReader sqlite_datareader;
            SqliteCommand sqlite_cmd;
            sqlite_cmd = SqliteConnection.CreateCommand();
            sqlite_cmd.CommandText = Command;

            sqlite_datareader = sqlite_cmd.ExecuteReader();
            List<Kniha> knihy = new List<Kniha>();
            while (sqlite_datareader.Read())
            {
                Kniha kniha = new Kniha(sqlite_datareader.GetInt32(0), sqlite_datareader.GetString(1), sqlite_datareader.GetString(2), sqlite_datareader.GetString(3), sqlite_datareader.GetString(4), sqlite_datareader.GetString(5), sqlite_datareader.GetString(6), sqlite_datareader.GetString(7));
                knihy.Add(kniha);
            }
            return Task.FromResult(knihy);
        }
        public static Task<bool> InsertedKnihaIntoSqlite(SqliteConnection SqliteConnection, Kniha kniha)
        {
            SqliteCommand sqlite_cmd;
            sqlite_cmd = SqliteConnection.CreateCommand();
            Console.WriteLine(RemoveDiacritics(kniha.nazev).ToLower());
            Console.WriteLine(RemoveDiacritics(kniha.autor).ToLower());
            sqlite_cmd.CommandText = $"INSERT INTO Knihy(Název, Autor,Obsah,Období,Žánr,PDF,OBR,NazevBezDiakritiky, AutorBezDiakritiky) VALUES('{kniha.nazev}','{kniha.autor}','{kniha.obsah}','{kniha.obdobi}','{kniha.zanr}','{kniha.pdf}','{kniha.obr}','{RemoveDiacritics(kniha.nazev).ToLower()}','{RemoveDiacritics(kniha.autor).ToLower()}'); ";
            Console.WriteLine(sqlite_cmd.CommandText);
            sqlite_cmd.ExecuteNonQuery();
            return Task.FromResult(true);
        }
        public static Task<bool> DeleteOneKnihaSqlite(SqliteConnection SqliteConnection, string Command)
        {
            SqliteCommand sqlite_cmd;
            sqlite_cmd = SqliteConnection.CreateCommand();
            sqlite_cmd.CommandText = Command;
            sqlite_cmd.ExecuteNonQuery();
            return Task.FromResult(true);
        }
        public static Task<bool> UpdateKniha(SqliteConnection SqliteConnection, string Command)
        {
            SqliteCommand sqlite_cmd;
            sqlite_cmd = SqliteConnection.CreateCommand();
            sqlite_cmd.CommandText = Command;
            sqlite_cmd.ExecuteNonQuery();
            return Task.FromResult(true);
        }
        public static Task<SeznamNastaveni> GetOptions(SqliteConnection SqliteConnection, string Command)
        {
            SqliteDataReader sqlite_datareader;
            SqliteCommand sqlite_cmd;
            sqlite_cmd = SqliteConnection.CreateCommand();
            sqlite_cmd.CommandText = Command;
            sqlite_datareader = sqlite_cmd.ExecuteReader();
            while (sqlite_datareader.Read())
            {
                SeznamNastaveni nastaveni = new SeznamNastaveni(sqlite_datareader.GetInt32(0), sqlite_datareader.GetInt32(1), sqlite_datareader.GetInt32(2), sqlite_datareader.GetInt32(3), sqlite_datareader.GetInt32(4), sqlite_datareader.GetInt32(5), sqlite_datareader.GetInt32(6), sqlite_datareader.GetInt32(7), sqlite_datareader.GetInt32(8));
                return Task.FromResult(nastaveni);
            }
            return null;
        }
        public static Task<bool> UpdateSeznam(SqliteConnection SqliteConnection, string Command)
        {
            SqliteCommand sqlite_cmd;
            sqlite_cmd = SqliteConnection.CreateCommand();
            sqlite_cmd.CommandText = Command;
            sqlite_cmd.ExecuteNonQuery();
            return Task.FromResult(true);
        }
        public static Task<bool> DeleteVicKnih(SqliteConnection SqliteConnection, List<string> nazvy, List<string> autori)
        {
            SqliteCommand sqlite_cmd;
            sqlite_cmd = SqliteConnection.CreateCommand();
            for (int a = 0; a < nazvy.Count(); a++)
            {
                sqlite_cmd.CommandText = $"DELETE From Knihy WHERE Název='{nazvy[a]}' AND Autor='{autori[a]}'";
                sqlite_cmd.ExecuteNonQuery();
            }
            return Task.FromResult(true);
        }
        public static Task<User> CheckUser(SqliteConnection SqliteConnection, User user)
        {
            SqliteCommand sqlite_cmd;
            SqliteDataReader sqlite_datareader;
            sqlite_cmd = SqliteConnection.CreateCommand();
            User EncryptedUser=null;
            sqlite_cmd.CommandText = $"SELECT * FROM Users WHERE username='{user.username}' AND password='{user.password}'";
            sqlite_datareader = sqlite_cmd.ExecuteReader();
            //
            while (sqlite_datareader.Read())
            {
                EncryptedUser = new User(sqlite_datareader.GetInt32(0), sqlite_datareader.GetString(1), sqlite_datareader.GetString(2), true);
            }
            return Task.FromResult(EncryptedUser);
        }
        public static Task<bool> AddUser(SqliteConnection SqliteConnection, User user)
        {
            SqliteCommand sqlite_cmd;
            sqlite_cmd = SqliteConnection.CreateCommand();
            string EncryptedPassword = UsersCoding.EncryptData(user.password);
            sqlite_cmd.CommandText = $"INSERT INTO Users(username,password) VALUES('{user.username}','{EncryptedPassword}')";
            sqlite_cmd.ExecuteNonQuery();
            return Task.FromResult(true);
        }
    }
}
