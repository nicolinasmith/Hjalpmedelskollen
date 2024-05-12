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

		/*
		public async Task<SearchViewModel> GetSearchViewModel()
		{
			var units = await _dbRepository.GetUnits();
			var viewModel = new SearchViewModel()
			{
				Units = units
			};

			return viewModel;
		}


	}
}
