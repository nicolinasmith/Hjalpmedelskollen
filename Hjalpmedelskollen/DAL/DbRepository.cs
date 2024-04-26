using Hjalpmedelskollen.Data;
using Hjalpmedelskollen.Models;
using Microsoft.EntityFrameworkCore;

namespace Hjalpmedelskollen.DAL
{
    public class DbRepository : IDbRepository
    {
        private readonly AppDbContext _context;

        public DbRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AidModel>> GetAidsByUnit(int? unitId)
        {
            int defaultUnitId = unitId ?? 1;

            var aids = await _context.Aids
                .Where(a => a.UnitId == defaultUnitId)
                .ToListAsync();

            return aids.OrderBy(a => a.Category, StringComparer.OrdinalIgnoreCase);
        }

        public async Task<UnitModel> GetUnit(int unitId)
        {
            return await _context.Units
                .Where(u => u.Id == unitId)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UnitModel>> GetUnits()
        {
            return await _context.Units.ToListAsync();
        }

    }
}
