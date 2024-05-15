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

		[HttpPost]
		public async Task<IActionResult> UploadDocumentToDatabase(IFormFile file, string name, int folderId)
		{
			if (file != null && file.Length > 0)
			{
				var originalFileName = Path.GetFileName(file.FileName);
				var fileName = originalFileName.ToLower().Replace(" ", "");
				var filePath = Path.Combine("wwwroot/pdf", fileName);
				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await file.CopyToAsync(stream);
				}

				var document = new DocumentModel
				{
					Name = name,
					FileName = fileName,
					FilePath = "/pdf/" + fileName,
					Created = DateTime.UtcNow,
					FolderId = folderId
				};

				try
				{
					await _dbRepository.AddDocument(document);
					return RedirectToAction("Index");
				}
				catch (Exception ex)
				{
					return Json(new { success = false, error = $"Ett fel inträffade när ett dokument lades till i databasen: {ex.Message}" });
				}
			}

			return View("Index");
		}

		[HttpPost]
		public async Task<IActionResult> DeleteDocumentFromDatabase(int documentId, string documentPath)
		{
			try
			{
				var serverFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", documentPath.TrimStart('/'));
				if (System.IO.File.Exists(serverFilePath))
				{
					System.IO.File.Delete(serverFilePath);
					await _dbRepository.DeleteDocument(documentId);
					return RedirectToAction("Index");
				}
				else
				{
					return Json(new { success = false, error = "Kunde inte hitta filen som ska tas bort." });
				}
			}
			catch (Exception ex)
			{
				return Json(new { success = false, error = $"Ett fel inträffade när ett dokument togs bort från databasen: {ex.Message}" });
			}
		}
	}
}
