using Microsoft.AspNetCore.Mvc;

namespace Hjalpmedelskollen.Controllers
{
	public class StatiticsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
