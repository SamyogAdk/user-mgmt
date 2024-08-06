using user_mgmt_assesment.Server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.ConfigureBuilderServices();

var app = builder.Build();

app.UseCors("AllowOrigin");

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();
// Configure the HTTP request pipeline.

//User minimal api endpoints
app.MapLoginApi(builder);
app.MapUserApi();

app.MapFallbackToFile("/index.html");

app.Run();

