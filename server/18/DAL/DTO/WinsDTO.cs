using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace DTO
{
    public class WinsDTO: IComparer<decimal>
    {
        public string namePlan { get; set; }
        public string nameSong { get; set; }
        public int idSong { get; set; }
        public string nameSinger { get; set; }
        public decimal percentage { get; set; }

        public int Compare([AllowNull] decimal x, [AllowNull] decimal y)
        {
            return y.CompareTo(x);
        }
    }  
}
