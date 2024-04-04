using Microsoft.AspNetCore.Mvc;

namespace Hjalpmedelskollen.Controllers
{
    public class OverviewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
