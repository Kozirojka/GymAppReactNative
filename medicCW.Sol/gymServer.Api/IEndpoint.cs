namespace gymServer.Api;

public interface IEndpoint
{
    void RegisterEndpoints(IEndpointRouteBuilder endpoints);
}