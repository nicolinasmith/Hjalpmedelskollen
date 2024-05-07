using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hjalpmedelskollen.Migrations
{
    /// <inheritdoc />
    public partial class AidModelNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "Aids",
            columns: table => new
            {
                Id = table.Column<string>(nullable: false),
                Category = table.Column<string>(maxLength: 50, nullable: true),
                ProductName = table.Column<string>(maxLength: 50, nullable: true),
                Inspection = table.Column<DateTime>(nullable: true),
                Comment = table.Column<string>(maxLength: 80, nullable: true),
                Registered = table.Column<DateTime>(nullable: false),
                SectionId = table.Column<int>(nullable: false),
                PatientId = table.Column<int>(nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Aids", x => x.Id);
                table.ForeignKey(
                    name: "FK_Aids_Sections_SectionId",
                    column: x => x.SectionId,
                    principalTable: "Sections",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);

                table.ForeignKey(
                    name: "FK_Aids_Patients_PatientId",
                    column: x => x.PatientId,
                    principalTable: "Patients",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Restrict);
            });

            migrationBuilder.CreateIndex(
                name: "IX_Aids_SectionId",
                table: "Aids",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Aids_PatientId",
                table: "Aids",
                column: "PatientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
