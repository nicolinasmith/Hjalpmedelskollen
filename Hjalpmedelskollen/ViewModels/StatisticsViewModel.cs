using Hjalpmedelskollen.Models;

namespace Hjalpmedelskollen.ViewModels
{
	public class StatisticsViewModel
	{
		public InstitutionModel Institution { get; set; }

		public IEnumerable<UnitModel> Units { get; set; }

		public IEnumerable<SectionModel> Sections { get; set; }

		public IEnumerable<AidModel> Aids { get; set; }

		public List<string> Categories { get; set; }

		public int TotalAidsCount { get; set; }

		public int AidsWithPatientId { get; set; }

		public List<AidsByUnit> CountAidsByUnit { get; set; }

		public class AidsByUnit
		{
			public string Name { get; set; }

			public int Count { get; set; }
		}

        public StatisticsViewModel()
        {
            CountAidsByUnit = new List<AidsByUnit>();
        }

    }
}
