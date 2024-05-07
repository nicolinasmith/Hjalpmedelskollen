using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Aids")]
    public class AidModel
    {
        [Key]
        public string Id { get; set; }

        [MaxLength(50)]
        public string Category { get; set; }

        [MaxLength(50)]
        public string ProductName { get; set; }

        public bool Status { get; set; }

        public DateTime? Inspection { get; set; }

        [MaxLength(80)]
        public string? Comment { get; set; }

        public DateTime Registered { get; set; }

        [ForeignKey("SectionId")]
        public SectionModel Section { get; set; }

        [ForeignKey("PatientId")]
        public PatientModel? Patient { get; set; }

    }
}
