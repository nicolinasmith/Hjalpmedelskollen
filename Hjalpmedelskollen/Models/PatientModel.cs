using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Patients")]
    public class PatientModel
    {
        [Key]
        public string Id { get; set; }

        public int PatientNumber { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [ForeignKey ("SectionModel")]
        public int SectionId { get; set; }
    }
}
