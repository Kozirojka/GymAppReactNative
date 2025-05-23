namespace gymServer.Api.Extensions;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;


public static class SwaggerExtensions
 {
     public static IServiceCollection AddSwaggerWithJwtSupport(this IServiceCollection services)
     {
         services.AddEndpointsApiExplorer();
 
         services.AddSwaggerGen(options =>
         {
             options.SwaggerDoc("v1", new OpenApiInfo 
             { 
                 Title = "Medical Visits API", 
                 Version = "v1" 
             });
 
             options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
             {
                 Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                 Name = "Authorization",
                 In = ParameterLocation.Header,
                 Type = SecuritySchemeType.ApiKey,
                 Scheme = "Bearer"
             });
 
             options.AddSecurityRequirement(new OpenApiSecurityRequirement()
             {
                 {
                     new OpenApiSecurityScheme
                     {
                         Reference = new OpenApiReference 
                         { 
                             Type = ReferenceType.SecurityScheme, 
                             Id = "Bearer" 
                         },
                         Scheme = "oauth2",
                         Name = "Bearer",
                         In = ParameterLocation.Header,
                     },
                     new List<string>()
                 }
             });
         });
 
         return services;
     }
 }