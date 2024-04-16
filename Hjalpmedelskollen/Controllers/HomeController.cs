using Hjalpmedelskollen.Data;
using Hjalpmedelskollen.Models;
using Hjalpmedelskollen.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Linq;

namespace Hjalpmedelskollen.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppDbContext _context;

        public HomeController(ILogger<HomeController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        //TODO: Sortera kod, se vart databasanropen ska ske och hur data lagras tillfälligt

        public IActionResult Index(int? unitId)
        {
            int defaultUnitId = 1;

            if (!unitId.HasValue)
            {
                unitId = defaultUnitId;
            }

            var viewModel = GetAidsByUnitViewModel(unitId.Value);
            return View(viewModel);

        }

        [HttpPost]
        public IActionResult AidsByUnit(int unitId)
        { 
            var viewModel = GetAidsByUnitViewModel(unitId);
            return View("Index", viewModel);
        }

        private AidsByUnitViewModel GetAidsByUnitViewModel(int unitId)
        {
            var aidsByUnit = _context.Aids
                                    .Where(a => a.UnitId == unitId)
                                    .ToList()
                                    .OrderBy(a => a.Category, StringComparer.OrdinalIgnoreCase)
                                    .ToList();

            var unit = _context.Units.FirstOrDefault(u => u.Id == unitId);

            var units = _context.Units.ToList();

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
                SelectedUnit = unit,
                Aids = aidsByUnit,
                Categories = categories,
                Units = units
            };

            return viewModel;
        }

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
                    return RedirectToAction("Index", new { unitId = unitId });
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


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
