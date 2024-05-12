using Hjalpmedelskollen.Models;

namespace Hjalpmedelskollen.ViewModels
{
    public class AidsByUnitViewModel
    {
        public IEnumerable<AidModel> Aids { get; set; }

        public List<string> Categories { get; set; }

        public IEnumerable<UnitModel> Units { get; set; }

        public IEnumerable<PatientModel> Patients { get; set; }

        public IEnumerable<SectionModel> Sections { get; set; }

        public UnitModel SelectedUnit { get; set; }

        public SectionModel SelectedSection { get; set; }

        public List<NoteBoardModel> NoteBoards { get; set; }

        public AidsByUnitViewModel()
        {

        }
    }

}
