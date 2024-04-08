using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hjalpmedelskollen.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aids_Units_UnitModelId",
                table: "Aids");

            migrationBuilder.DropForeignKey(
                name: "FK_Units_Institutions_InstitutionModelId",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Units_InstitutionModelId",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Aids_UnitModelId",
                table: "Aids");

            migrationBuilder.DropColumn(
                name: "InstitutionModelId",
                table: "Units");

            migrationBuilder.DropColumn(
                name: "UnitModelId",
                table: "Aids");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Units",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Units",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Institutions",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProductName",
                table: "Aids",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Aids",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Aids",
                type: "character varying(80)",
                maxLength: 80,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Aids",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Units_InstitutionId",
                table: "Units",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Aids_UnitId",
                table: "Aids",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Aids_Units_UnitId",
                table: "Aids",
                column: "UnitId",
                principalTable: "Units",
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
                name: "FK_Aids_Units_UnitId",
                table: "Aids");

            migrationBuilder.DropForeignKey(
                name: "FK_Units_Institutions_InstitutionId",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Units_InstitutionId",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Aids_UnitId",
                table: "Aids");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Units",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Units",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InstitutionModelId",
                table: "Units",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Institutions",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "ProductName",
                table: "Aids",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Aids",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Aids",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(80)",
                oldMaxLength: 80,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Aids",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<int>(
                name: "UnitModelId",
                table: "Aids",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Units_InstitutionModelId",
                table: "Units",
                column: "InstitutionModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Aids_UnitModelId",
                table: "Aids",
                column: "UnitModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Aids_Units_UnitModelId",
                table: "Aids",
                column: "UnitModelId",
                principalTable: "Units",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Institutions_InstitutionModelId",
                table: "Units",
                column: "InstitutionModelId",
                principalTable: "Institutions",
                principalColumn: "Id");
        }
    }
}
