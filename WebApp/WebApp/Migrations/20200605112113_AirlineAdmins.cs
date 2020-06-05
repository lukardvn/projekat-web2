using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class AirlineAdmins : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_AirlineId",
                table: "Users",
                column: "AirlineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Airlines_AirlineId",
                table: "Users",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Airlines_AirlineId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_AirlineId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AirlineId",
                table: "Users");
        }
    }
}
