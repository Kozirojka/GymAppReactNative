using System.Reflection;
using GymApp.Api.Extenstions;
using GymApp.Domain;
using GymApp.Domain.IOptionConfiguration;
using GymApp.Infrastrucure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSwagger();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(o =>
{
    o.UseNpgsql(builder.Configuration.GetConnectionString("DbPostgres"));
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()  
            .AllowAnyMethod()   
            .AllowAnyHeader(); 
    });
});


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

builder.Services.Configure<JwtOptions>(
    builder.Configuration.GetSection(JwtOptions.JwtOptionsKey));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Readtime board API V1");
        options.RoutePrefix = "";
    });
}

app.UseCors("AllowAll");


app.UseAuthentication();
app.UseAuthorization();

app.RegisterAllEndpoints();
app.UseHttpsRedirection();

app.Run();

