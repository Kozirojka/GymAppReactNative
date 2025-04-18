using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gymServer.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addChangesWIthSpecialization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Specializations",
                table: "CoachProfiles");

            migrationBuilder.CreateTable(
                name: "Specializations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specializations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CoachSpecializations",
                columns: table => new
                {
                    CoachesId = table.Column<int>(type: "integer", nullable: false),
                    SpecializationsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoachSpecializations", x => new { x.CoachesId, x.SpecializationsId });
                    table.ForeignKey(
                        name: "FK_CoachSpecializations_CoachProfiles_CoachesId",
                        column: x => x.CoachesId,
                        principalTable: "CoachProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CoachSpecializations_Specializations_SpecializationsId",
                        column: x => x.SpecializationsId,
                        principalTable: "Specializations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CoachSpecializations_SpecializationsId",
                table: "CoachSpecializations",
                column: "SpecializationsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CoachSpecializations");

            migrationBuilder.DropTable(
                name: "Specializations");

            migrationBuilder.AddColumn<string>(
                name: "Specializations",
                table: "CoachProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
