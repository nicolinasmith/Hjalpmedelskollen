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
			var viewModel = await GetSearchViewModel();
			return View(viewModel);
			//return View();
		}
		
		public async Task<SearchViewModel> GetSearchViewModel()
		{
			var units = await _dbRepository.GetUnits();
			var viewModel = new SearchViewModel()
			{
				Units = units
			};

			return viewModel;
		}

		[HttpGet]
		public async Task<IActionResult> SearchAidInDatabase(string searchInput, string searchType, List<int> unitIds)
		{
			try
			{
				var aids = await _dbRepository.GetAidsBySearch(searchInput, searchType, unitIds);
				var units = await _dbRepository.GetUnits();

				var categories = aids
					.Select(a => a.Category)
					.Distinct()
					.OrderBy(c => c, StringComparer.OrdinalIgnoreCase)
					.Select(c => new SearchViewModel.Category()
					{
						Name = c
					})
					.ToList();

				var viewModel = new SearchViewModel()
				{
					Aids = aids,
					Units = units,
					Categories = categories
				};

				return View("Index", viewModel);
			}
			catch (Exception ex)
			{
				// Logga fel eller gör annan hantering här
				return View("Error"); // Om det uppstår ett fel, returnera en felvy
			}
		}



	}
}
