using Hjalpmedelskollen.DAL;
using Hjalpmedelskollen.Data;
using Hjalpmedelskollen.Models;
using Hjalpmedelskollen.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Hjalpmedelskollen.Controllers
{
    public class DocumentController : Controller
    {
		private readonly IDbRepository _dbRepository;

		public DocumentController(IDbRepository dbRepository)
        {
			_dbRepository = dbRepository;
		}

		public async Task <IActionResult> Index()
        {
			var folders = await _dbRepository.GetFolders();
            var documents = await _dbRepository.GetDocuments();
            var viewModel = new DocumentViewModel()
            {
                Folders = folders,
                Documents = documents
            };
            return View(viewModel);
        }
    }
}
