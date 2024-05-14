using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{

	[Table("Folders")]
	public class FolderModel
	{
		[Key]
		public int Id { get; set; }

		public DateTime Created { get; set; }

		public DateTime Updated { get; set; }

		[ForeignKey("InsitutionId")]
		public int InstitutionId { get; set; }

		public InstitutionModel? Institution { get; set; }

	}
}
