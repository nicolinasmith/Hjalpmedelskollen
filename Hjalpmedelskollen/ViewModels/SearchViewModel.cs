using Hjalpmedelskollen.Models;

namespace Hjalpmedelskollen.ViewModels
{
	public class SearchViewModel
	{
		public IEnumerable<UnitModel> Units { get; set; }

        public IEnumerable<AidModel> Aids { get; set; }

        public List<string> Categories { get; set; }

        public IEnumerable<PatientModel> AllPatients { get; set; }

        public IEnumerable<SectionModel> AllSections { get; set; }

        public SearchViewModel()
        {
            
        }

        public class Category
        {
			public string Name { get; set; }
		}

    }
}
