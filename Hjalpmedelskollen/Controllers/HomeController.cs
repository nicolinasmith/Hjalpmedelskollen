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

        public HomeController(ILogger<HomeController> logger, IDbRepository dbRepository)
        {
            _logger = logger;
            _dbRepository = dbRepository;
        }

        public async Task<IActionResult> Index(int? unitId)
        {
            int defaultUnitId = unitId ?? 1;
            var viewModel = await GetAidsByUnitViewModel(defaultUnitId);
            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> AidsByUnit(int unitId)
        {
            var viewModel = await GetAidsByUnitViewModel(unitId);
            return View("Index", viewModel);
        }

        private async Task<AidsByUnitViewModel> GetAidsByUnitViewModel(int unitId)
        {
            var aidsByUnit = await _dbRepository.GetAidsByUnit(unitId);
            var selectedUnit = await _dbRepository.GetUnit(unitId);
            var units = await _dbRepository.GetUnits();
            var noteBoards = await _dbRepository.GetNotes(unitId);

            var categories = aidsByUnit
                .Select(a => a.Category)
                .Distinct()
                .OrderBy(c => c, StringComparer.OrdinalIgnoreCase)
                .Select(c => new AidsByUnitViewModel.Category()
                {
                    Name = c
                })
                .ToList();

            var viewModel = new AidsByUnitViewModel()
            {
                SelectedUnit = selectedUnit,
                Aids = aidsByUnit,
                Categories = categories,
                Units = units,
                NoteBoards = noteBoards
            };

            return viewModel;
        }

        
        [HttpPost]
        public async Task<IActionResult> AddAidToDatabaseAsync(AidModel aid, int unitId)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string inspection = Request.Form["Inspection"].ToString();
                    int? selectedMonth = null; // Använd en nullable int för att möjliggöra null-värde för månaden

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
                    return RedirectToAction("Index", new { unitId });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel lades till i databasen.");
                    return BadRequest("Ett fel inträffade när ett hjälpmedel lades till i databasen.");
                }
            }
            else
            {
                return View("Index", aid);
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
                        return RedirectToAction("Index", new { unitId = aid.UnitId });
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel uppdaterades i databasen.");
                        return BadRequest($"Ett fel inträffade när ett hjälpmedel uppdaterades i databasen: {ex.Message}.");
                    }
                }
                else
                {
                    return View("Index", aid);
                }
            }
            else if (formAction == "delete")
            {
                try
                {
                    await _dbRepository.DeleteAid(aid);
                    return RedirectToAction("Index", new { unitId = aid.UnitId });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel togs bort från databasen.");
                    return BadRequest($"Ett fel inträffade när ett hjälpmedel togs bort från databasen: {ex.Message}.");
                }
            }
            else
            {
                return BadRequest("Ett fel inträffade.");
            }
        }

        /*
        [HttpGet]
        public IActionResult GetAid (string aidId)
        {
            var aid = _context.Aids.FirstOrDefault(a => a.Id == aidId);
            if (aid == null)
            {
                return NotFound();
            }

            return Json(aid);
        }

        [HttpPost]
        public IActionResult AddNoteToDatabase(NoteBoardModel newNote)
        {
            newNote.Date = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);

            if (ModelState.IsValid)
            {
                try
                {
                    _context.NoteBoards.Add(newNote);
                    _context.SaveChanges();
                    return RedirectToAction("Index", new { unitId = newNote.UnitId });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när en anteckning lades till i databasen.");
                    return BadRequest("Ett fel inträffade när en anteckning lades till i databasen.");
                }
            }
            else
            {
                return View("Index", newNote);
            }
        }

        [HttpPost]
        public IActionResult DeleteNoteFromDatabase(int noteId, int unitId)
        {
            var note = _context.NoteBoards.FirstOrDefault(n => n.Id == noteId);
            if (note == null)
            {
                return NotFound();
            }

            try
            {
                _context.NoteBoards.Remove(note);
                _context.SaveChanges();
                return RedirectToAction("Index", new { unitId = unitId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ett fel inträffade när en anteckning togs bort från databasen.");
                return BadRequest("Ett fel inträffade när en anteckning togs bort från databasen.");
            }
        }*/

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
