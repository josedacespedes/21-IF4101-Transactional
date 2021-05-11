using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class Course
    {

        private int id;
        private string code;
        private string name;
        private int credits;
        private int state;
        private List<int> numGroup;

        public Course(int id, string code, string name, int credits, int state, List<int> numGroup)
        {
            Id = id;
            Code = code;
            Name = name;
            Credits = credits;
            State = state;
            this.numGroup = numGroup;
        }

        public Course()
        {

        }

        public int Id { get => id; set => id = value; }
        public string Code { get => code; set => code = value; }
        public string Name { get => name; set => name = value; }
        public int Credits { get => credits; set => credits = value; }
        public int State { get => state; set => state = value; }
        public List<int> NumGroup { get => numGroup; set => numGroup = value; }
    }
}
