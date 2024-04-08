using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Aids")]
    public class AidModel
    {
        public string? Id { get; set; }
        public string? Category { get; set; }
        public string? ProductName { get; set; }
        public bool Status { get; set; }
        public string? Location { get; set; }
        public DateTime Inspection { get; set; }
        public string? Comment { get; set; }
        public DateTime Registered { get; set; }
        public bool QrCode { get; set; }
        public int UnitId { get; set; }

        public UnitModel? UnitModel { get; set; }
    }
}
