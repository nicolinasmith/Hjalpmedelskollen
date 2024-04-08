using Hjalpmedelskollen.Models;
using Microsoft.EntityFrameworkCore;

namespace Hjalpmedelskollen.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }
        public DbSet<InstitutionModel> Institutions { get; set; }
        public DbSet<UnitModel> Units { get; set; }
        public DbSet<AidModel> Aids { get; set; }
    }
}

