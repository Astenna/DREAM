﻿// <auto-generated />
using System;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    [DbContext(typeof(DreamDbContext))]
    [Migration("20220128111441_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AgronomistHelpRequest", b =>
                {
                    b.Property<int>("AgronomistsSentId")
                        .HasColumnType("integer");

                    b.Property<int>("ReceivedHelpRequestsId")
                        .HasColumnType("integer");

                    b.HasKey("AgronomistsSentId", "ReceivedHelpRequestsId");

                    b.HasIndex("ReceivedHelpRequestsId");

                    b.ToTable("AgronomistHelpRequest");
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.Agronomist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Agronomists");
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.Farmer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("FarmId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("FarmId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("Farmers");
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.PolicyMaker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("PolicyMakers");
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<byte[]>("Salt")
                        .HasColumnType("bytea");

                    b.Property<string>("Surname")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DataAccess.Entites.DiscussionForum.ForumComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<int?>("CreatedById")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("ForumThreadId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("ForumThreadId");

                    b.ToTable("ForumComments");
                });

            modelBuilder.Entity("DataAccess.Entites.DiscussionForum.ForumThread", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("CreatedById")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Topic")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.ToTable("ForumThreads");
                });

            modelBuilder.Entity("DataAccess.Entites.Farms.Farm", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AddressLine1")
                        .HasColumnType("text");

                    b.Property<string>("AddressLine2")
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PostalCode")
                        .HasColumnType("text");

                    b.Property<int>("SensorSystemId")
                        .HasColumnType("integer");

                    b.Property<int>("WaterIrrigationSystemId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Farms");
                });

            modelBuilder.Entity("DataAccess.Entites.Farms.FarmProduction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("FarmId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductionTypeId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("FarmId");

                    b.HasIndex("ProductionTypeId");

                    b.ToTable("FarmProductions");
                });

            modelBuilder.Entity("DataAccess.Entites.Farms.SensorSystemResponse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("FarmId")
                        .HasColumnType("integer");

                    b.Property<float?>("Humidity")
                        .HasColumnType("real");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("FarmId");

                    b.ToTable("SensorSystemResponses");
                });

            modelBuilder.Entity("DataAccess.Entites.Farms.WaterIrrigationSystemResponse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("FarmId")
                        .HasColumnType("integer");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.Property<float>("WaterUsed")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("FarmId");

                    b.ToTable("WaterIrrigationSystemResponses");
                });

            modelBuilder.Entity("DataAccess.Entites.Visists.Visit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AgronomistId")
                        .HasColumnType("integer");

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("FarmId")
                        .HasColumnType("integer");

                    b.Property<int>("VisitReason")
                        .HasColumnType("integer");

                    b.Property<int>("VisitState")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AgronomistId");

                    b.HasIndex("FarmId");

                    b.ToTable("Visits");
                });

            modelBuilder.Entity("DataAccess.Entities.FarmerNote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("FarmerId")
                        .HasColumnType("integer");

                    b.Property<int>("Note")
                        .HasColumnType("integer");

                    b.Property<int>("PolicyMakerId")
                        .HasColumnType("integer");

                    b.Property<int?>("ProblemTypeId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("FarmerId");

                    b.HasIndex("PolicyMakerId");

                    b.HasIndex("ProblemTypeId");

                    b.ToTable("FarmerNotes");
                });

            modelBuilder.Entity("DataAccess.Entities.Farms.FarmProductionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("FarmProductionTypes");
                });

            modelBuilder.Entity("DataAccess.Entities.Farms.WeatherForecastResponse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<float>("Degrees")
                        .HasColumnType("real");

                    b.Property<int>("MandalId")
                        .HasColumnType("integer");

                    b.Property<float>("Rainfall")
                        .HasColumnType("real");

                    b.Property<int>("WeatherType")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("MandalId");

                    b.ToTable("WeatherForecastResponses");
                });

            modelBuilder.Entity("DataAccess.Entities.HelpRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CreatedById")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Message")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.ToTable("HelpRequests");
                });

            modelBuilder.Entity("DataAccess.Entities.HelpResponse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("CreatedByAgronomistId")
                        .HasColumnType("integer");

                    b.Property<int?>("CreatedByFarmerId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("HelpRequestId")
                        .HasColumnType("integer");

                    b.Property<string>("Message")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CreatedByAgronomistId");

                    b.HasIndex("CreatedByFarmerId");

                    b.HasIndex("HelpRequestId");

                    b.ToTable("HelpResponses");
                });

            modelBuilder.Entity("DataAccess.Entities.Mandal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("AgronomistId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AgronomistId");

                    b.ToTable("Mandals");
                });

            modelBuilder.Entity("DataAccess.Entities.ProblemType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("NumberOfAdditionalVisits")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("ProblemTypes");
                });

            modelBuilder.Entity("DataAccess.Entities.Suggestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("MandalId")
                        .HasColumnType("integer");

                    b.Property<int?>("ProductionTypeId")
                        .HasColumnType("integer");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MandalId");

                    b.HasIndex("ProductionTypeId");

                    b.ToTable("Suggestions");
                });

            modelBuilder.Entity("FarmerHelpRequest", b =>
                {
                    b.Property<int>("FarmersSentId")
                        .HasColumnType("integer");

                    b.Property<int>("ReceivedHelpRequestsId")
                        .HasColumnType("integer");

                    b.HasKey("FarmersSentId", "ReceivedHelpRequestsId");

                    b.HasIndex("ReceivedHelpRequestsId");

                    b.ToTable("FarmerHelpRequest");
                });

            modelBuilder.Entity("AgronomistHelpRequest", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Agronomist", null)
                        .WithMany()
                        .HasForeignKey("AgronomistsSentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.Entities.HelpRequest", null)
                        .WithMany()
                        .HasForeignKey("ReceivedHelpRequestsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.Agronomist", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.Farmer", b =>
                {
                    b.HasOne("DataAccess.Entites.Farms.Farm", "Farm")
                        .WithOne("Farmer")
                        .HasForeignKey("DataAccess.Entites.Actors.Farmer", "FarmId");

                    b.HasOne("DataAccess.Entites.Actors.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Farm");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.PolicyMaker", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DataAccess.Entites.DiscussionForum.ForumComment", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Farmer", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("DataAccess.Entites.DiscussionForum.ForumThread", "ForumThread")
                        .WithMany("Comments")
                        .HasForeignKey("ForumThreadId");

                    b.Navigation("CreatedBy");

                    b.Navigation("ForumThread");
                });

            modelBuilder.Entity("DataAccess.Entites.DiscussionForum.ForumThread", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Farmer", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("DataAccess.Entites.Farms.FarmProduction", b =>
                {
                    b.HasOne("DataAccess.Entites.Farms.Farm", "Farm")
                        .WithMany("Production")
                        .HasForeignKey("FarmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.Entities.Farms.FarmProductionType", "ProductionType")
                        .WithMany()
                        .HasForeignKey("ProductionTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Farm");

                    b.Navigation("ProductionType");
                });

            modelBuilder.Entity("DataAccess.Entites.Farms.SensorSystemResponse", b =>
                {
                    b.HasOne("DataAccess.Entites.Farms.Farm", "Farm")
                        .WithMany("SensorSystemResponses")
                        .HasForeignKey("FarmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Farm");
                });

            modelBuilder.Entity("DataAccess.Entites.Farms.WaterIrrigationSystemResponse", b =>
                {
                    b.HasOne("DataAccess.Entites.Farms.Farm", "Farm")
                        .WithMany("WaterIrrigationSystemResponses")
                        .HasForeignKey("FarmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Farm");
                });

            modelBuilder.Entity("DataAccess.Entites.Visists.Visit", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Agronomist", "Agronomist")
                        .WithMany("Visits")
                        .HasForeignKey("AgronomistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.Entites.Farms.Farm", "Farm")
                        .WithMany("Visits")
                        .HasForeignKey("FarmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Agronomist");

                    b.Navigation("Farm");
                });

            modelBuilder.Entity("DataAccess.Entities.FarmerNote", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Farmer", "Farmer")
                        .WithMany("Note")
                        .HasForeignKey("FarmerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.Entites.Actors.PolicyMaker", "PolicyMaker")
                        .WithMany()
                        .HasForeignKey("PolicyMakerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.Entities.ProblemType", "ProblemType")
                        .WithMany()
                        .HasForeignKey("ProblemTypeId");

                    b.Navigation("Farmer");

                    b.Navigation("PolicyMaker");

                    b.Navigation("ProblemType");
                });

            modelBuilder.Entity("DataAccess.Entities.Farms.WeatherForecastResponse", b =>
                {
                    b.HasOne("DataAccess.Entities.Mandal", "Mandal")
                        .WithMany("WeatherForecastResponses")
                        .HasForeignKey("MandalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mandal");
                });

            modelBuilder.Entity("DataAccess.Entities.HelpRequest", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Farmer", "CreatedBy")
                        .WithMany("CreatedHelpRequests")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("DataAccess.Entities.HelpResponse", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Agronomist", "CreatedByAgronomist")
                        .WithMany("CreatedHelpReponses")
                        .HasForeignKey("CreatedByAgronomistId");

                    b.HasOne("DataAccess.Entites.Actors.Farmer", "CreatedByFarmer")
                        .WithMany("CreatedHelpReponses")
                        .HasForeignKey("CreatedByFarmerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DataAccess.Entities.HelpRequest", "HelpRequest")
                        .WithMany("HelpResponses")
                        .HasForeignKey("HelpRequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedByAgronomist");

                    b.Navigation("CreatedByFarmer");

                    b.Navigation("HelpRequest");
                });

            modelBuilder.Entity("DataAccess.Entities.Mandal", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Agronomist", null)
                        .WithMany("Mandals")
                        .HasForeignKey("AgronomistId");
                });

            modelBuilder.Entity("DataAccess.Entities.Suggestion", b =>
                {
                    b.HasOne("DataAccess.Entities.Mandal", "Mandal")
                        .WithMany()
                        .HasForeignKey("MandalId");

                    b.HasOne("DataAccess.Entities.Farms.FarmProductionType", "ProductionType")
                        .WithMany()
                        .HasForeignKey("ProductionTypeId");

                    b.Navigation("Mandal");

                    b.Navigation("ProductionType");
                });

            modelBuilder.Entity("FarmerHelpRequest", b =>
                {
                    b.HasOne("DataAccess.Entites.Actors.Farmer", null)
                        .WithMany()
                        .HasForeignKey("FarmersSentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DataAccess.Entities.HelpRequest", null)
                        .WithMany()
                        .HasForeignKey("ReceivedHelpRequestsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.Agronomist", b =>
                {
                    b.Navigation("CreatedHelpReponses");

                    b.Navigation("Mandals");

                    b.Navigation("Visits");
                });

            modelBuilder.Entity("DataAccess.Entites.Actors.Farmer", b =>
                {
                    b.Navigation("CreatedHelpReponses");

                    b.Navigation("CreatedHelpRequests");

                    b.Navigation("Note");
                });

            modelBuilder.Entity("DataAccess.Entites.DiscussionForum.ForumThread", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("DataAccess.Entites.Farms.Farm", b =>
                {
                    b.Navigation("Farmer");

                    b.Navigation("Production");

                    b.Navigation("SensorSystemResponses");

                    b.Navigation("Visits");

                    b.Navigation("WaterIrrigationSystemResponses");
                });

            modelBuilder.Entity("DataAccess.Entities.HelpRequest", b =>
                {
                    b.Navigation("HelpResponses");
                });

            modelBuilder.Entity("DataAccess.Entities.Mandal", b =>
                {
                    b.Navigation("WeatherForecastResponses");
                });
#pragma warning restore 612, 618
        }
    }
}