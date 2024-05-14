using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
	[Table("Documents")]
	public class DocumentModel
	{
		[Key]
		public int Id { get; set; }

		[MaxLength(50)]
		public string Name { get; set; }

		[MaxLength(50)]
		public string FileName { get; set; }

		[MaxLength(250)]
		public string FilePath { get; set; }

		public DateTime Created { get; set; }

		[ForeignKey("FolderId")]
		public int FolderId { get; set; }

		public FolderModel? Folder { get; set; }
	}
}
