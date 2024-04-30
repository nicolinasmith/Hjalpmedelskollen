using Azure.Core;
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
            var aids = await _context.Aids
                .Where(a => a.UnitId == unitId)
                .ToListAsync();

            return aids.OrderBy(a => a.Category, StringComparer.OrdinalIgnoreCase);
        }

        public Task<UnitModel> GetUnit(int unitId)
        {
            return _context.Units.FirstOrDefaultAsync(u => u.Id == unitId);
        }

        public async Task<IEnumerable<UnitModel>> GetUnits()
        {
            return await _context.Units.ToListAsync();
        }

        public async Task<List<NoteBoardModel>> GetNotes(int unitId)
        {
            var notes = await _context.NoteBoards
                        .Where(n => n.UnitId == unitId)
                        .ToListAsync();
            return notes.OrderByDescending(n => n.Date).ToList();
        }

        public async Task AddAid(AidModel aid, int? selectedMonth)
        {
            aid.Registered = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);

            if (selectedMonth.HasValue)
            {
                DateTime inspectionDate = new DateTime(DateTime.Now.Year, selectedMonth.Value, 1);
                aid.Inspection = DateTime.SpecifyKind(inspectionDate, DateTimeKind.Utc);
            }

            _context.Aids.Add(aid);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAid(AidModel aid)
        {
            if (aid.Inspection.HasValue)
            {
                aid.Inspection = aid.Inspection.Value.ToUniversalTime();
            }
            if (aid.Registered != DateTime.MinValue)
            {
                aid.Registered = aid.Registered.ToUniversalTime();
            }

            _context.Aids.Update(aid);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAid(AidModel aid)
        {
            _context.Aids.Remove(aid);
            await _context.SaveChangesAsync();
        }

        public async Task<AidModel?> GetAid(string aidId)
        {
            var aid = await _context.Aids.FirstOrDefaultAsync(a => a.Id == aidId);
            return aid;
        }

        public async Task AddNote(NoteBoardModel note)
        {
            note.Date = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            _context.NoteBoards.Add(note);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteNote(int noteId)
        {
            var note = await _context.NoteBoards.FirstOrDefaultAsync(n => n.Id == noteId);
            _context.NoteBoards.Remove(note);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<PatientModel>> GetPatients(int unitId)
        {
            return await _context.Patients
                .Where(p => p.UnitId == unitId)
                .ToListAsync();
        }
    }
}
