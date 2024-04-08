using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Units")]
    public class UnitModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public int InstitutionId { get; set; }

        public InstitutionModel? InstitutionModel { get; set; }
    }
}
