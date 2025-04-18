using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gymServer.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class additionalChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contributions_AspNetUsers_UserId1",
                table: "Contributions");

            migrationBuilder.DropIndex(
                name: "IX_StudentProfiles_UserId",
                table: "StudentProfiles");

            migrationBuilder.DropIndex(
                name: "IX_Contributions_UserId1",
                table: "Contributions");

            migrationBuilder.DropIndex(
                name: "IX_CoachProfiles_UserId",
                table: "CoachProfiles");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Contributions");

            migrationBuilder.CreateIndex(
                name: "IX_StudentProfiles_UserId",
                table: "StudentProfiles",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CoachProfiles_UserId",
                table: "CoachProfiles",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StudentProfiles_UserId",
                table: "StudentProfiles");

            migrationBuilder.DropIndex(
                name: "IX_CoachProfiles_UserId",
                table: "CoachProfiles");

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Contributions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_StudentProfiles_UserId",
                table: "StudentProfiles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Contributions_UserId1",
                table: "Contributions",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_CoachProfiles_UserId",
                table: "CoachProfiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contributions_AspNetUsers_UserId1",
                table: "Contributions",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
