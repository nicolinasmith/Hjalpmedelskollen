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


        public IActionResult Index()
        {
            var viewModel = GetAidsByUnitViewModel(1);

            return View(viewModel);
        }

        private AidsByUnitViewModel GetAidsByUnitViewModel(int unitId)
        {
            var aidsByUnit = _context.Aids
                                    .Where(a => a.UnitId == unitId)
                                    .Include(a => a.UnitModel)
                                    .ToList();

            var unit = _context.Units.FirstOrDefault(u => u.Id == unitId);

            var categories = aidsByUnit
                .Select(a => a.Category)
                .Distinct()
                .Select(c => new AidsByUnitViewModel.Category()
                {
                    Name = c
                })
                .ToList();


            var viewModel = new AidsByUnitViewModel()
            {
                DisplayedUnit = unit.Name,
                Aids = aidsByUnit,
                Categories = categories
            };

            return viewModel;
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
