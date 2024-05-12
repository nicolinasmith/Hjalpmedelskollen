using Azure.Core;
using Hjalpmedelskollen.Data;
using Hjalpmedelskollen.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using static System.Collections.Specialized.BitVector32;

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
                .Where(a => a.Section.Unit.Id == unitId)
                .OrderByDescending(a => a.Registered)
                .ToListAsync();

            return aids;
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
                        .Where(n => n.Unit.Id == unitId)
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
            var patients = await _context.Patients
                .Where(p => p.Section.UnitId == unitId)
                .OrderBy(p => p.PatientNumber)
                .ToListAsync();

            return patients;
        }

        public async Task<IEnumerable<PatientModel>> GetAllPatients()
        {
			return await _context.Patients
				.OrderBy(p => p.SectionId)
				.ToListAsync();
		}

        public async Task AddPatient (PatientModel patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePatient(PatientModel patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<SectionModel>> GetSections(int unitId)
        {
            return await _context.Sections
                .Where(s => s.Unit.Id == unitId)
                .ToListAsync();
        }

        public async Task<IEnumerable<SectionModel>> GetAllSections()
        {
			return await _context.Sections.ToListAsync();
		}

        public async Task<List<string>> GetCategories()
        {
			return await _context.Aids
				.Select(a => a.Category)
				.Distinct()
				.ToListAsync();
		}


        public async Task<IEnumerable<AidModel>> GetAidsBySearch(string searchInput, string searchType, string unitId)
        {
			List<AidModel> aids = new List<AidModel>();

			if (unitId.Contains("all"))
			{
				aids = await _context.Aids
					.Include(a => a.Section)
					.ThenInclude(s => s.Unit)
                    .Include(a => a.Patient)
					.ToListAsync();
			}
			else
			{
				aids = await _context.Aids
					.Include(a => a.Section)
					.ThenInclude(s => s.Unit)
                    .Include(a => a.Patient)
                    .Where(a => a.Section.Unit.Id.ToString() == unitId)
					.ToListAsync();
			}

			if (!string.IsNullOrEmpty(searchInput))
            {
                switch (searchType)
                {
					case "id":
						aids = aids.Where(a => a.Id.ToLower().Contains(searchInput.ToLower())).ToList();
						break;
					case "category":
						aids = aids.Where(a => a.Category.ToLower().Contains(searchInput.ToLower())).ToList();
						break;
                    case "productName":
						aids = aids.Where(a => a.ProductName.ToLower().Contains(searchInput.ToLower())).ToList();
						break;
				}
            }

            return aids;
        }
    }
}
