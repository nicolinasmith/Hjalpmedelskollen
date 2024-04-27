using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hjalpmedelskollen.Migrations
{
    /// <inheritdoc />
    public partial class PatientModelDbSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "Aids",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Aids");
        }
    }
}
