using employee_management_assesment;
using employee_management_assesment.Schemas;
using Microsoft.EntityFrameworkCore;

namespace user_mgmt_assesment.Server;

/// <summary>
/// Minimal Api
/// </summary>
public static class UserApi
{
    public static WebApplication MapUserApi(this WebApplication app)
    {

        /*
         Get list of all users
         */
        app.MapGet("/user/getall", async (UserDbContext dbContext) => await dbContext.Users.ToListAsync())
            .RequireAuthorization();

        /*
         Create new user.
         */
        app.MapPost("/user/create", async (User user, UserDbContext dbContext) =>
        {
            dbContext.Add(user);
            await dbContext.SaveChangesAsync();
            return Results.Ok();
        }).RequireAuthorization();

        return app;
    }
}
