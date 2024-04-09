using Hjalpmedelskollen.Models;

namespace Hjalpmedelskollen.ViewModels
{
    public class AidsByUnitViewModel
    {
        public string DisplayedUnit { get; set; }

        public List<AidModel> Aids { get; set; }

        public List<Category> Categories { get; set; }

        public List<UnitModel> Units { get; set; }

        public AidsByUnitViewModel()
        {


        }

        public class Category
        {
            public string Name { get; set; }
        }



    }

}
