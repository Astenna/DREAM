using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FarmProductionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FarmProductionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Farms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AddressLine1 = table.Column<string>(type: "text", nullable: true),
                    AddressLine2 = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: true),
                    PostalCode = table.Column<string>(type: "text", nullable: true),
                    WaterIrrigationSystemId = table.Column<int>(type: "integer", nullable: false),
                    SensorSystemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Farms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProblemTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    NumberOfAdditionalVisits = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProblemTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Surname = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: true),
                    Salt = table.Column<byte[]>(type: "bytea", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FarmProductions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Amount = table.Column<float>(type: "real", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProductionTypeId = table.Column<int>(type: "integer", nullable: false),
                    FarmId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FarmProductions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FarmProductions_FarmProductionTypes_ProductionTypeId",
                        column: x => x.ProductionTypeId,
                        principalTable: "FarmProductionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FarmProductions_Farms_FarmId",
                        column: x => x.FarmId,
                        principalTable: "Farms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SensorSystemResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Humidity = table.Column<float>(type: "real", nullable: true),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FarmId = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SensorSystemResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SensorSystemResponses_Farms_FarmId",
                        column: x => x.FarmId,
                        principalTable: "Farms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WaterIrrigationSystemResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WaterUsed = table.Column<float>(type: "real", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FarmId = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WaterIrrigationSystemResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WaterIrrigationSystemResponses_Farms_FarmId",
                        column: x => x.FarmId,
                        principalTable: "Farms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Agronomists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agronomists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Agronomists_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Farmers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    FarmId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Farmers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Farmers_Farms_FarmId",
                        column: x => x.FarmId,
                        principalTable: "Farms",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Farmers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PolicyMakers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyMakers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PolicyMakers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Mandals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    AgronomistId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mandals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mandals_Agronomists_AgronomistId",
                        column: x => x.AgronomistId,
                        principalTable: "Agronomists",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Visits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Comment = table.Column<string>(type: "text", nullable: true),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    VisitState = table.Column<int>(type: "integer", nullable: false),
                    VisitReason = table.Column<int>(type: "integer", nullable: false),
                    FarmId = table.Column<int>(type: "integer", nullable: false),
                    AgronomistId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Visits_Agronomists_AgronomistId",
                        column: x => x.AgronomistId,
                        principalTable: "Agronomists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Visits_Farms_FarmId",
                        column: x => x.FarmId,
                        principalTable: "Farms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ForumThreads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Topic = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedById = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumThreads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ForumThreads_Farmers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Farmers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HelpRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Message = table.Column<string>(type: "text", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedById = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HelpRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HelpRequests_Farmers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Farmers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FarmerNotes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Note = table.Column<int>(type: "integer", nullable: false),
                    ProblemTypeId = table.Column<int>(type: "integer", nullable: true),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FarmerId = table.Column<int>(type: "integer", nullable: false),
                    PolicyMakerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FarmerNotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FarmerNotes_Farmers_FarmerId",
                        column: x => x.FarmerId,
                        principalTable: "Farmers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FarmerNotes_PolicyMakers_PolicyMakerId",
                        column: x => x.PolicyMakerId,
                        principalTable: "PolicyMakers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FarmerNotes_ProblemTypes_ProblemTypeId",
                        column: x => x.ProblemTypeId,
                        principalTable: "ProblemTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Suggestions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Text = table.Column<string>(type: "text", nullable: true),
                    MandalId = table.Column<int>(type: "integer", nullable: true),
                    ProductionTypeId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suggestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Suggestions_FarmProductionTypes_ProductionTypeId",
                        column: x => x.ProductionTypeId,
                        principalTable: "FarmProductionTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Suggestions_Mandals_MandalId",
                        column: x => x.MandalId,
                        principalTable: "Mandals",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WeatherForecastResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Degrees = table.Column<float>(type: "real", nullable: false),
                    Rainfall = table.Column<float>(type: "real", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    WeatherType = table.Column<int>(type: "integer", nullable: false),
                    MandalId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherForecastResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeatherForecastResponses_Mandals_MandalId",
                        column: x => x.MandalId,
                        principalTable: "Mandals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ForumComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Content = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedById = table.Column<int>(type: "integer", nullable: true),
                    ForumThreadId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ForumComments_Farmers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Farmers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ForumComments_ForumThreads_ForumThreadId",
                        column: x => x.ForumThreadId,
                        principalTable: "ForumThreads",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AgronomistHelpRequest",
                columns: table => new
                {
                    AgronomistsSentId = table.Column<int>(type: "integer", nullable: false),
                    ReceivedHelpRequestsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgronomistHelpRequest", x => new { x.AgronomistsSentId, x.ReceivedHelpRequestsId });
                    table.ForeignKey(
                        name: "FK_AgronomistHelpRequest_Agronomists_AgronomistsSentId",
                        column: x => x.AgronomistsSentId,
                        principalTable: "Agronomists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgronomistHelpRequest_HelpRequests_ReceivedHelpRequestsId",
                        column: x => x.ReceivedHelpRequestsId,
                        principalTable: "HelpRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FarmerHelpRequest",
                columns: table => new
                {
                    FarmersSentId = table.Column<int>(type: "integer", nullable: false),
                    ReceivedHelpRequestsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FarmerHelpRequest", x => new { x.FarmersSentId, x.ReceivedHelpRequestsId });
                    table.ForeignKey(
                        name: "FK_FarmerHelpRequest_Farmers_FarmersSentId",
                        column: x => x.FarmersSentId,
                        principalTable: "Farmers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FarmerHelpRequest_HelpRequests_ReceivedHelpRequestsId",
                        column: x => x.ReceivedHelpRequestsId,
                        principalTable: "HelpRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HelpResponses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Message = table.Column<string>(type: "text", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    HelpRequestId = table.Column<int>(type: "integer", nullable: false),
                    CreatedByAgronomistId = table.Column<int>(type: "integer", nullable: true),
                    CreatedByFarmerId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HelpResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HelpResponses_Agronomists_CreatedByAgronomistId",
                        column: x => x.CreatedByAgronomistId,
                        principalTable: "Agronomists",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_HelpResponses_Farmers_CreatedByFarmerId",
                        column: x => x.CreatedByFarmerId,
                        principalTable: "Farmers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HelpResponses_HelpRequests_HelpRequestId",
                        column: x => x.HelpRequestId,
                        principalTable: "HelpRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgronomistHelpRequest_ReceivedHelpRequestsId",
                table: "AgronomistHelpRequest",
                column: "ReceivedHelpRequestsId");

            migrationBuilder.CreateIndex(
                name: "IX_Agronomists_UserId",
                table: "Agronomists",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FarmerHelpRequest_ReceivedHelpRequestsId",
                table: "FarmerHelpRequest",
                column: "ReceivedHelpRequestsId");

            migrationBuilder.CreateIndex(
                name: "IX_FarmerNotes_FarmerId",
                table: "FarmerNotes",
                column: "FarmerId");

            migrationBuilder.CreateIndex(
                name: "IX_FarmerNotes_PolicyMakerId",
                table: "FarmerNotes",
                column: "PolicyMakerId");

            migrationBuilder.CreateIndex(
                name: "IX_FarmerNotes_ProblemTypeId",
                table: "FarmerNotes",
                column: "ProblemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Farmers_FarmId",
                table: "Farmers",
                column: "FarmId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Farmers_UserId",
                table: "Farmers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FarmProductions_FarmId",
                table: "FarmProductions",
                column: "FarmId");

            migrationBuilder.CreateIndex(
                name: "IX_FarmProductions_ProductionTypeId",
                table: "FarmProductions",
                column: "ProductionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumComments_CreatedById",
                table: "ForumComments",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ForumComments_ForumThreadId",
                table: "ForumComments",
                column: "ForumThreadId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_CreatedById",
                table: "ForumThreads",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_HelpRequests_CreatedById",
                table: "HelpRequests",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_HelpResponses_CreatedByAgronomistId",
                table: "HelpResponses",
                column: "CreatedByAgronomistId");

            migrationBuilder.CreateIndex(
                name: "IX_HelpResponses_CreatedByFarmerId",
                table: "HelpResponses",
                column: "CreatedByFarmerId");

            migrationBuilder.CreateIndex(
                name: "IX_HelpResponses_HelpRequestId",
                table: "HelpResponses",
                column: "HelpRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Mandals_AgronomistId",
                table: "Mandals",
                column: "AgronomistId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyMakers_UserId",
                table: "PolicyMakers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SensorSystemResponses_FarmId",
                table: "SensorSystemResponses",
                column: "FarmId");

            migrationBuilder.CreateIndex(
                name: "IX_Suggestions_MandalId",
                table: "Suggestions",
                column: "MandalId");

            migrationBuilder.CreateIndex(
                name: "IX_Suggestions_ProductionTypeId",
                table: "Suggestions",
                column: "ProductionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Visits_AgronomistId",
                table: "Visits",
                column: "AgronomistId");

            migrationBuilder.CreateIndex(
                name: "IX_Visits_FarmId",
                table: "Visits",
                column: "FarmId");

            migrationBuilder.CreateIndex(
                name: "IX_WaterIrrigationSystemResponses_FarmId",
                table: "WaterIrrigationSystemResponses",
                column: "FarmId");

            migrationBuilder.CreateIndex(
                name: "IX_WeatherForecastResponses_MandalId",
                table: "WeatherForecastResponses",
                column: "MandalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgronomistHelpRequest");

            migrationBuilder.DropTable(
                name: "FarmerHelpRequest");

            migrationBuilder.DropTable(
                name: "FarmerNotes");

            migrationBuilder.DropTable(
                name: "FarmProductions");

            migrationBuilder.DropTable(
                name: "ForumComments");

            migrationBuilder.DropTable(
                name: "HelpResponses");

            migrationBuilder.DropTable(
                name: "SensorSystemResponses");

            migrationBuilder.DropTable(
                name: "Suggestions");

            migrationBuilder.DropTable(
                name: "Visits");

            migrationBuilder.DropTable(
                name: "WaterIrrigationSystemResponses");

            migrationBuilder.DropTable(
                name: "WeatherForecastResponses");

            migrationBuilder.DropTable(
                name: "PolicyMakers");

            migrationBuilder.DropTable(
                name: "ProblemTypes");

            migrationBuilder.DropTable(
                name: "ForumThreads");

            migrationBuilder.DropTable(
                name: "HelpRequests");

            migrationBuilder.DropTable(
                name: "FarmProductionTypes");

            migrationBuilder.DropTable(
                name: "Mandals");

            migrationBuilder.DropTable(
                name: "Farmers");

            migrationBuilder.DropTable(
                name: "Agronomists");

            migrationBuilder.DropTable(
                name: "Farms");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
