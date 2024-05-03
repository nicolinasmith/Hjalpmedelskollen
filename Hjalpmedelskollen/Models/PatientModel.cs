using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Patients")]
    public class PatientModel
    {
        [Key]
        public int Id { get; set; }

        public int PatientNumber { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [ForeignKey ("SectionId")]
        public SectionModel Section { get; set; }
    }
}
