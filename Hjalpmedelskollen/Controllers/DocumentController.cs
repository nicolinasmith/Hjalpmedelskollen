using Microsoft.AspNetCore.Mvc;

namespace Hjalpmedelskollen.Controllers
{
    public class DocumentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
