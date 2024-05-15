using Hjalpmedelskollen.Models;

namespace Hjalpmedelskollen.DAL
{
    public interface IDbRepository
    {
        Task<IEnumerable<AidModel>> GetAidsByUnit(int? unitId);
        Task<IEnumerable<AidModel>> GetAllAids();
        Task<AidModel> GetAid (string aidId);
        Task<IEnumerable<AidModel>> GetAidsBySearch(string searchInput, string searchType, string unitId);
        Task AddAid(AidModel aid, int? selectedMonth);
        Task UpdateAid(AidModel aid);
        Task DeleteAid(AidModel aid);

        Task<List<string>> GetCategories();

        Task<IEnumerable<UnitModel>> GetUnits();
        Task<UnitModel> GetUnit(int unitId);

        Task<IEnumerable<SectionModel>> GetSections(int unitId);
        Task<IEnumerable<SectionModel>> GetAllSections();

        Task<IEnumerable<PatientModel>> GetPatients(int unitId);
        Task<IEnumerable<PatientModel>> GetAllPatients();
        Task AddPatient(PatientModel patient);
        Task UpdatePatient(PatientModel patient);
        Task DeletePatient(int patientId);


        Task<List<NoteBoardModel>> GetNotes(int unitId);
        Task AddNote(NoteBoardModel note);
        Task DeleteNote(int noteId);

        Task<IEnumerable<FolderModel>> GetFolders();
        Task<IEnumerable<DocumentModel>> GetDocuments();
        Task<IEnumerable<DocumentModel>> GetDocument(int documentId);
        Task AddDocument(DocumentModel document);
        Task DeleteDocument(int documentId);

        Task<InstitutionModel> GetInstitution();

    }
}
