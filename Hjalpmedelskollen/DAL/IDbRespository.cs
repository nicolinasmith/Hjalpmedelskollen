using Hjalpmedelskollen.Models;

namespace Hjalpmedelskollen.DAL
{
    public interface IDbRepository
    {
        Task<IEnumerable<AidModel>> GetAidsByUnit(int? unitId);
        Task<IEnumerable<UnitModel>> GetUnits();
        Task<UnitModel> GetUnit(int unitId);
        Task<List<NoteBoardModel>> GetNotes(int unitId);
        Task AddAid(AidModel aid, int? selectedMonth);
        Task UpdateAid(AidModel aid);
        Task DeleteAid(AidModel aid);
        Task<AidModel> GetAid (string aidId);
        Task AddNote(NoteBoardModel note);
        Task DeleteNote(int noteId);
    }
}
