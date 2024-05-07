using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Noteboards")]
    public class NoteBoardModel
    {
        [Key]
        public int Id { get; set; }

        public DateTime Date { get; set; }

        [MaxLength(200)]
        public string Note { get; set; }

        [ForeignKey("UnitId")]
        public int UnitId { get; set; }

        public UnitModel? Unit { get; set; }
    }
}
