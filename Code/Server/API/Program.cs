using BusinessLogic.Mapper;
using BusinessLogic.ServiceCollectionExtensions;
using BusinessLogic.Services;
using BusinessLogic.Tools;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var con = builder.Configuration.GetValue<string>("ConnectionString").ToString();

builder.Services.AddControllers();
builder.Services.AddDbContext<DreamDbContext>(o =>
                o.UseNpgsql(con, x => x.MigrationsAssembly("DataAccess")
                    .EnableRetryOnFailure()))
                .AddAutomigrations<DreamDbContext>(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DREAM API", Version = "v1" });
});

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddTransient<IAccountService, AccountService>();
builder.Services.AddTransient<ITokenProvider, TokenProvider>();

builder.Services.Configure<AuthOptions>(o => builder.Configuration.GetSection(nameof(AuthOptions)).Bind(o));

var app = builder.Build();

app.UseCors(builder => builder
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "DREAM API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseAutoMigration();

app.Run();
