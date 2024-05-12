using Hjalpmedelskollen.DAL;
using Hjalpmedelskollen.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddScoped<IDbRepository, DbRepository>();

var connectionString = "Host=nism.postgres.database.azure.com;Port=5432;Database=postgres;Username=nismadmin;Password=Hjalpmedelskollen!;";
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");
	//pattern: "{controller=Search}/{action=Index}");

app.Run();
