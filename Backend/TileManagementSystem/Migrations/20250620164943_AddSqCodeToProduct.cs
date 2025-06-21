using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TileManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddSqCodeToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SqCode",
                table: "Products",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SqCode",
                table: "Products");
        }
    }
}
