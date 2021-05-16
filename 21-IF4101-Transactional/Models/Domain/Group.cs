using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class Group
    {
        private int idGroup;
        private int numGroup;

        public Group(int idGroup, int numGroup)
        {
            this.idGroup = idGroup;
            this.numGroup = numGroup;
        }

        public Group()
        {
        }

        public int IdGroup { get => idGroup; set => idGroup = value; }
        public int NumGroup { get => numGroup; set => numGroup = value; }
    }
}
