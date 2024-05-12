using Hjalpmedelskollen.DAL;
using Hjalpmedelskollen.Data;
using Hjalpmedelskollen.Models;
using Hjalpmedelskollen.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;
using System.Linq;

namespace Hjalpmedelskollen.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IDbRepository _dbRepository;
        private UnitModel _selectedUnit;
        private SectionModel _selectedSection;

        public HomeController(ILogger<HomeController> logger, IDbRepository dbRepository)
        {
            _logger = logger;
            _dbRepository = dbRepository;
        }

        public async Task<IActionResult> Index(int? unitId)
        {
            int defaultUnitId = unitId ?? 1;
            _selectedUnit = await _dbRepository.GetUnit(defaultUnitId);
            var viewModel = await GetAidsByUnitViewModel(defaultUnitId);
            return View(viewModel);
        }

        private async Task<AidsByUnitViewModel> GetAidsByUnitViewModel(int unitId)
        {
            var selectedUnit = _selectedUnit;
            var units = await _dbRepository.GetUnits();
            var noteBoards = await _dbRepository.GetNotes(unitId);
            var sections = await _dbRepository.GetSections(unitId);

            var sectionIds = sections.Select(s => s.Id).ToList();

            var categories = await _dbRepository.GetCategories();
            var aidsByUnit = await _dbRepository.GetAidsByUnit(unitId);
            var patients = await _dbRepository.GetPatients(unitId);


            var viewModel = new AidsByUnitViewModel()
            {
                SelectedUnit = selectedUnit,
                Aids = aidsByUnit,
                Categories = categories,
                Units = units,
                NoteBoards = noteBoards,
                Sections = sections,
                Patients = patients
            };

            return viewModel;
        }

        [HttpPost]
        public async Task<IActionResult> DisplayAidsByUnit(int unitId)
        {
            _selectedUnit = await _dbRepository.GetUnit(unitId);
            var viewModel = await GetAidsByUnitViewModel(unitId);
            return View("Index", viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddAidToDatabase(AidModel aid)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string inspection = Request.Form["Inspection"].ToString();
                    int? selectedMonth = null;

                    if (!string.IsNullOrEmpty(inspection))
                    {
                        string[] parts = inspection.Split('-');
                        int parsedMonth;

                        if (parts.Length > 1 && int.TryParse(parts[1], out parsedMonth))
                        {
                            selectedMonth = parsedMonth;
                        }
                    }

                    await _dbRepository.AddAid(aid, selectedMonth);
                    var response = new { success = true };
                    return Json(response);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel lades till i databasen.");
                    return Json(new { success = false, error = $"Ett fel inträffade när ett hjälpmedel lades till i databasen: {ex.Message}" });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateAidToDatabase(AidModel aid, string formAction)
        {
            if (formAction == "update")
            {
                if (ModelState.IsValid)
                {
                    try
                    {
                        await _dbRepository.UpdateAid(aid);
                        var response = new { success = true };
                        return Json(response);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel uppdaterades i databasen.");
                        return Json(new { success = false, error = $"Ett fel inträffade när ett hjälpmedel uppdaterades i databasen: {ex.Message}." });
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            else if (formAction == "delete")
            {
                try
                {
                    await _dbRepository.DeleteAid(aid);
                    var response = new { success = true };
                    return Json(response);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel togs bort från databasen.");
                    return BadRequest(new { success = false, error = $"Ett fel inträffade när ett hjälpmedel togs bort från databasen: {ex.Message}." });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAidFromDatabase(string aidId)
        {
            try
            {
                var aid = await _dbRepository.GetAid(aidId);
                return Json(aid);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel skulle visas.");
                return BadRequest($"Ett fel inträffade när ett hjälpmedel skulle visas: {ex.Message}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddNoteToDatabase(NoteBoardModel newNote)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _dbRepository.AddNote(newNote);
                    var response = new { success = true };
                    return Json(response);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när en anteckning lades till i databasen.");
                    return Json(new { success = false, error = $"Ett fel inträffade när en anteckning lades till i databasen: {ex.Message}" });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        public async Task<IActionResult> DeleteNoteFromDatabase(int noteId)
        {
            try
            {
                await _dbRepository.DeleteNote(noteId);
                var response = new { success = true };
                return Json(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ett fel inträffade när en anteckning togs bort från databasen.");
                return Json(new { success = false, error = $"Ett fel inträffade när en anteckning togs bortill i databasen: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddPatientToDatabase(PatientModel patient)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _dbRepository.AddPatient(patient);
                    var response = new { success = true };
                    return Json(response);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när en patient lades till i databasen.");
                    return Json(new { success = false, error = $"Ett fel inträffade när en patien lades till i databasen: {ex.Message}" });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdatePatientToDatabase(PatientModel patient)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _dbRepository.UpdatePatient(patient);
                    var response = new { success = true };
                    return Json(response);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när en patient uppdaterades i databasen.");
                    return Json(new { success = false, error = $"Ett fel inträffade när en patient skulle uppdateras i databasen: {ex.Message}" });
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
