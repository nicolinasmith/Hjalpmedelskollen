using Hjalpmedelskollen.Models;
using Microsoft.EntityFrameworkCore;

namespace Hjalpmedelskollen.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<InstitutionModel> Institutions { get; set; }
        public DbSet<UnitModel> Units { get; set; }
        public DbSet<AidModel> Aids { get; set; }
        public DbSet<NoteBoardModel> NoteBoards { get; set; }
    }
}

