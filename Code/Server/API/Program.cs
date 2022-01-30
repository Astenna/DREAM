using BusinessLogic.Mapper;
using BusinessLogic.ServiceCollectionExtensions;
using BusinessLogic.Services;
using BusinessLogic.Tools;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using FluentValidation.AspNetCore;
using BusinessLogic.Dtos.Account;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var con = builder.Configuration.GetValue<string>("ConnectionString").ToString();

builder.Services.AddControllers().AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<RegisterDto>());

builder.Services.AddDbContext<DreamDbContext>(o =>
                o.UseNpgsql(con, x => x.MigrationsAssembly("DataAccess")
                    .EnableRetryOnFailure()))
                .AddAutomigrations<DreamDbContext>(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DREAM API", Version = "v1" }); 
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
            },
            new string[] { }
        }
    });
});

var authEnabled = builder.Configuration.GetSection("AuthOptions")
                                 .GetValue<bool>("Enalbed");
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false, // TODO: validate audience & issuer
                ValidateIssuerSigningKey = authEnabled,
                ValidateLifetime = authEnabled,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AuthOptions")
                                 .GetValue<string>("Key"))
                    ),
            };
        });

builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddTransient<IAccountService, AccountService>();
builder.Services.AddTransient<IForumService, ForumService>();
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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseAutoMigration();

app.Run();
