using Hjalpmedelskollen.Models;

namespace Hjalpmedelskollen.DAL
{
    public interface IDbRepository
    {
        Task<IEnumerable<AidModel>> GetAidsByUnit(int? unitId);

        Task<IEnumerable<UnitModel>> GetUnits();
        Task<UnitModel> GetUnit(int unitId);
        Task<IEnumerable<SectionModel>> GetSections(int unitId);

        Task AddPatient(PatientModel patient);
        Task UpdatePatient(PatientModel patient);

        Task<AidModel> GetAid (string aidId);
        Task<IEnumerable<AidModel>> GetAidsBySearch(string searchInput, string searchType, string unitIds);
        Task AddAid(AidModel aid, int? selectedMonth);
        Task UpdateAid(AidModel aid);
        Task DeleteAid(AidModel aid);

        Task<List<NoteBoardModel>> GetNotes(int unitId);
        Task AddNote(NoteBoardModel note);
        Task DeleteNote(int noteId);

        Task<IEnumerable<PatientModel>> GetPatients(int unitId);
    }
}
