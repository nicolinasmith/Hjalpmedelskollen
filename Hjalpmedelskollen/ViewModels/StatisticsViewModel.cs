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
	}
}
