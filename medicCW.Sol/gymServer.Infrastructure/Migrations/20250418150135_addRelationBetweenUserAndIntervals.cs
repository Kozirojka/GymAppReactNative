using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gymServer.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addRelationBetweenUserAndIntervals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Specializations",
                table: "CoachProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Specializations",
                table: "CoachProfiles");
        }
    }
}
