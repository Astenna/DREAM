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
using BusinessLogic.Queries;
using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

var con = builder.Configuration.GetValue<string>("ConnectionString").ToString();

builder.Services.AddMvc();
builder.Services.AddControllers()
    .AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<RegisterDto>());

builder.Services.AddDbContext<DreamDbContext>(o =>
                o.UseNpgsql(con, x => x.MigrationsAssembly("DataAccess")
                    .EnableRetryOnFailure()))
                .AddAutomigrations<DreamDbContext>(builder.Configuration)
                .AddSeeder<DreamDbContext>(builder.Configuration);
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
            Array.Empty<string>()
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
builder.Services.AddTransient<IFarmService, FarmService>();
builder.Services.AddTransient<IFarmerService, FarmerService>();
builder.Services.AddTransient<IRequestService, RequestService>();
builder.Services.AddTransient<IMandalService, MandalService>();
builder.Services.AddTransient<IProblemTypeService, ProblemTypeService>();
builder.Services.AddTransient<IRequestRecipientsProvider, RequestRecipientsProvider>();
builder.Services.AddScoped<IRequestsQueryBuilder, RequestsQueryBuilder>();

builder.Services.Configure<AuthOptions>(
    o => builder.Configuration.GetSection(nameof(AuthOptions))
                                .Bind(o));

var app = builder.Build();

// TODO: investigate why it is not working
// app.UseGlobalExceptionMiddleware();

app.UseCors(builder => builder
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "DREAM API V1");
    c.RoutePrefix = string.Empty;
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseHttpsRedirection();

app.UseAutoMigration();
app.UseSeeder();

app.Run();
