using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class President
    {
        int id;

        public President(int id)
        {
            this.id = id;
        }

        public President()
        {
        }

        public int Id { get => id; set => id = value; }

    }
}
