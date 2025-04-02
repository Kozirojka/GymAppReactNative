namespace GymApp.Api.Extenstions;

public static class EndpointRegistrationExtensions
{
    //extension for regisx`tration of all endpoints that inherif IEndpoint
    public static void RegisterAllEndpoints(this IEndpointRouteBuilder app)
    {
        var endpointDefinitions = AppDomain
            .CurrentDomain
            .GetAssemblies()
            .SelectMany(assembly => assembly.GetTypes())
            .Where(type => typeof(IEndpoint).IsAssignableFrom(type)
                           && !type.IsInterface && !type.IsInterface)
            .Select(Activator.CreateInstance)
            .Cast<IEndpoint>();
    

        foreach (var endpoint in endpointDefinitions)
        {
            endpoint.RegisterEndpoints(app);
        }
    }
}