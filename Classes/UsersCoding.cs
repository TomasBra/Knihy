using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace EknihyReact.Classes
{
    public static class UsersCoding
    {
        public static string EncryptData(string data)
        {
            byte[] Bytes = Encoding.ASCII.GetBytes(data);
            var md5 = new MD5CryptoServiceProvider();
            var md5data = md5.ComputeHash(Bytes);
            string hashedPassword = Encoding.ASCII.GetString(md5data);
            return hashedPassword;
        }
    }
}
