using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hjalpmedelskollen.Migrations
{
    /// <inheritdoc />
    public partial class PatientNullableFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aids_Patients_PatientId",
                table: "Aids");

            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Aids",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Aids_Patients_PatientId",
                table: "Aids",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aids_Patients_PatientId",
                table: "Aids");

            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Aids",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Aids_Patients_PatientId",
                table: "Aids",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
