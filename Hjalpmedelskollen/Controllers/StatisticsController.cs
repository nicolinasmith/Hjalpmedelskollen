using Hjalpmedelskollen.DAL;
using Hjalpmedelskollen.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Hjalpmedelskollen.Controllers
{
	public class StatisticsController : Controller
	{
		private readonly IDbRepository _dbRepository;

        public StatisticsController(IDbRepository dbRespository)
        {
			_dbRepository = dbRespository;
        }


        public async Task <IActionResult> Index()
		{
			var institution = await _dbRepository.GetInstitution();
			var categories = await _dbRepository.GetCategories();
			var units = await _dbRepository.GetUnits();
			var sections = await _dbRepository.GetAllSections();
			var aids = await _dbRepository.GetAllAids();

			var viewModel = new StatisticsViewModel
			{
				Institution = institution,
				Categories = categories,
				Units = units,
				Sections = sections,
				Aids = aids
			};

			return View(viewModel);
		}
	}
}
