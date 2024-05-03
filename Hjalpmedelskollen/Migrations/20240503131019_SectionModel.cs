using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Hjalpmedelskollen.Migrations
{
    /// <inheritdoc />
    public partial class SectionModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UnitId",
                table: "Patients",
                newName: "SectionId");

            migrationBuilder.RenameColumn(
                name: "UnitId",
                table: "Aids",
                newName: "SectionId");

            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Aids",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UnitId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sections_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Units_InstitutionId",
                table: "Units",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_SectionId",
                table: "Patients",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Noteboards_UnitId",
                table: "Noteboards",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Aids_PatientId",
                table: "Aids",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Aids_SectionId",
                table: "Aids",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_UnitId",
                table: "Sections",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Aids_Patients_PatientId",
                table: "Aids",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Aids_Sections_SectionId",
                table: "Aids",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Noteboards_Units_UnitId",
                table: "Noteboards",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Sections_SectionId",
                table: "Patients",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Institutions_InstitutionId",
                table: "Units",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aids_Patients_PatientId",
                table: "Aids");

            migrationBuilder.DropForeignKey(
                name: "FK_Aids_Sections_SectionId",
                table: "Aids");

            migrationBuilder.DropForeignKey(
                name: "FK_Noteboards_Units_UnitId",
                table: "Noteboards");

            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Sections_SectionId",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "FK_Units_Institutions_InstitutionId",
                table: "Units");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropIndex(
                name: "IX_Units_InstitutionId",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Patients_SectionId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Noteboards_UnitId",
                table: "Noteboards");

            migrationBuilder.DropIndex(
                name: "IX_Aids_PatientId",
                table: "Aids");

            migrationBuilder.DropIndex(
                name: "IX_Aids_SectionId",
                table: "Aids");

            migrationBuilder.RenameColumn(
                name: "SectionId",
                table: "Patients",
                newName: "UnitId");

            migrationBuilder.RenameColumn(
                name: "SectionId",
                table: "Aids",
                newName: "UnitId");

            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Aids",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");
        }
    }
}
