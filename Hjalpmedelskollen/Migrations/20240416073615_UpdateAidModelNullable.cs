using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hjalpmedelskollen.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAidModelNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "Location",
                table: "Aids",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Inspection",
                table: "Aids",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Aids",
                type: "character varying(80)",
                maxLength: 80,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(80)",
                oldMaxLength: 80);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Aids",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Inspection",
                table: "Aids",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Comment",
                table: "Aids",
                type: "character varying(80)",
                maxLength: 80,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(80)",
                oldMaxLength: 80,
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
    }
}
