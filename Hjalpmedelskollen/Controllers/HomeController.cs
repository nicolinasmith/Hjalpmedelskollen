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
            var aidsByUnit = await _dbRepository.GetAidsByUnit(unitId);
            var viewModel = GetAidsByUnitViewModel(unitId.Value, aidsByUnit);

            return View(viewModel);
        }
    
        /*
        [HttpPost]
        public IActionResult AidsByUnit(int unitId)
        { 
            var viewModel = GetAidsByUnitViewModel(unitId);
            return View("Index", viewModel);
        }*/

        private AidsByUnitViewModel GetAidsByUnitViewModel(int unitId, IEnumerable<AidModel> aidsByUnit)
        {
            /*var aidsByUnit = _context.Aids
                                    .Where(a => a.UnitId == unitId)
                                    .ToList()
                                    .OrderBy(a => a.Category, StringComparer.OrdinalIgnoreCase)
                                    .ToList();*/

            //var unit = _context.Units.FirstOrDefault(u => u.Id == unitId);

            //var units = _context.Units.ToList();

            /*var noteBoards = _context.NoteBoards
                                    .Where(n => n.UnitId == unitId)
                                    .OrderByDescending(n => n.Date)
                                    .ToList();*/
            /*
            var categories = aidsByUnit
                .Select(a => a.Category)
                .Distinct()
                .OrderBy(c => c, StringComparer.OrdinalIgnoreCase)
                .Select(c => new AidsByUnitViewModel.Category()
                {
                    Name = c
                })
                .ToList();*/

            var viewModel = new AidsByUnitViewModel()
            {
                //SelectedUnit = unit,
                Aids = aidsByUnit,
                //Categories = categories,
                //Units = units
                //NoteBoards = noteBoards
            };

            return viewModel;
        }

        /*
        [HttpPost]
        public IActionResult AddAidToDatabase(AidModel aid, int unitId)
        {
            aid.Registered = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);

            if (aid.Inspection.HasValue)
            {
                string[] parts = Request.Form["Inspection"].ToString().Split('-');
                int selectedMonth = int.Parse(parts[1]);
                DateTime inspectionDate = new DateTime(DateTime.Now.Year, selectedMonth, 1);
                aid.Inspection = DateTime.SpecifyKind(inspectionDate, DateTimeKind.Utc);
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Aids.Add(aid);
                    _context.SaveChanges();
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
        public IActionResult UpdateAidToDatabase(AidModel aid, string formAction)
        {
            if (formAction == "update")
            {
                if (ModelState.IsValid)
                {
                    try
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
                        _context.SaveChanges();
                        return RedirectToAction("Index", new { unitId = aid.UnitId });
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel uppdaterades i databasen.");
                        return BadRequest("Ett fel inträffade när ett hjälpmedel uppdaterades i databasen.");
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
                    _context.Aids.Remove(aid);
                    _context.SaveChanges();
                    return RedirectToAction("Index", new { unitId = aid.UnitId });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Ett fel inträffade när ett hjälpmedel togs bort från databasen.");
                    return BadRequest("Ett fel inträffade när ett hjälpmedel togs bort från databasen.");
                }
            }
            else
            {
                return BadRequest("Ett fel inträffade.");
            }

        }

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
