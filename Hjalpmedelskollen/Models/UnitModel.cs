﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hjalpmedelskollen.Models
{
    [Table("Units")]
    public class UnitModel
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string? Address { get; set; }

        [ForeignKey ("InstitutionModel")]
        public int InstitutionId { get; set; }

        public InstitutionModel InstitutionModel { get; set; }
    }
}