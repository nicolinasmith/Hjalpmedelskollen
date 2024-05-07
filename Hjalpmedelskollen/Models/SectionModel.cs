using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Sections")]
    public class SectionModel
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [ForeignKey("UnitId")]
        public int UnitId { get; set; }

        public UnitModel? Unit { get; set; }
    }
}
