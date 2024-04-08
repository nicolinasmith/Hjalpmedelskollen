using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Institutions")]
    public class InstitutionModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
    }
}
