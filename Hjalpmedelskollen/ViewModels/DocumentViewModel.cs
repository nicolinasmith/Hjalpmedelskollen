using Hjalpmedelskollen.Models;

namespace Hjalpmedelskollen.ViewModels
{
	public class DocumentViewModel
	{
		public IEnumerable<FolderModel> Folders { get; set; }

		public IEnumerable<DocumentModel> Documents { get; set; }
	}
}
