using Hjalpmedelskollen.DAL;
using Hjalpmedelskollen.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Hjalpmedelskollen.Controllers
{
	public class SearchController : Controller
	{
		private readonly IDbRepository _dbRepository;

		public SearchController(IDbRepository dbRepository)
		{
			_dbRepository = dbRepository;
		}

		public async Task <IActionResult> Index()
		{
			var viewModel = new SearchViewModel()
			{
                Units = await _dbRepository.GetUnits(),
				Sections = await _dbRepository.GetAllSections(),
				Categories = await _dbRepository.GetCategories(),
				Patients = await _dbRepository.GetAllPatients()
            };
			return View(viewModel);
		}

		[HttpGet]
		public async Task<IActionResult> SearchAidInDatabase(string searchInput, string searchType, string unitId)
		{
			try
			{
				var aids = await _dbRepository.GetAidsBySearch(searchInput, searchType, unitId);
				return Json(aids);
			}
			catch (Exception ex)
			{
				return Json(new { error = ex.Message });
			}
		}

	}
}
