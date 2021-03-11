using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Maturita.Classes
{
    public class SeznamNastaveni
    {
        public int MaxKnih{get;set;}
        public int MinDramat{get;set;}
        public int MinPoezie{get;set;}
        public int MinProza{get;set;}
        public int MaxStejnyAutor{get;set;}
        public int Min18stol{get;set;}
        public int Min19stol{get;set;}
        public int MinSV2021{get;set;}
        public int MinCZ2021{get;set;}

        public SeznamNastaveni(int maxKnih, int minDramat, int minPoezie,int minProza, int maxstejnyAutor, int min18Stol,int min19Stol, int minSV2021, int minCZ2021)
        {
            MaxKnih = maxKnih;
            MinDramat = minDramat;
            MinPoezie = minPoezie;
            MinProza = minProza;
            MaxStejnyAutor = maxstejnyAutor;
            Min18stol = min18Stol;
            Min19stol = min19Stol;
            MinSV2021 = minSV2021;
            MinCZ2021 = minCZ2021;
        }

    }
}
