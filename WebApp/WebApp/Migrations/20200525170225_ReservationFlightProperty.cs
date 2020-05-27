using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class ReservationFlightProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepartId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "ReturnId",
                table: "Reservations");

            migrationBuilder.AddColumn<int>(
                name: "DepartingFlightId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReturningFlightId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_DepartingFlightId",
                table: "Reservations",
                column: "DepartingFlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ReturningFlightId",
                table: "Reservations",
                column: "ReturningFlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Flights_DepartingFlightId",
                table: "Reservations",
                column: "DepartingFlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Flights_ReturningFlightId",
                table: "Reservations",
                column: "ReturningFlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Flights_DepartingFlightId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Flights_ReturningFlightId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_DepartingFlightId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_ReturningFlightId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "DepartingFlightId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "ReturningFlightId",
                table: "Reservations");

            migrationBuilder.AddColumn<int>(
                name: "DepartId",
                table: "Reservations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReturnId",
                table: "Reservations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
