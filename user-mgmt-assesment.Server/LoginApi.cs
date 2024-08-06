using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using user_mgmt_assesment.Server.Schemas;

namespace user_mgmt_assesment.Server
{
    public static class LoginApi
    {
        public static WebApplication MapLoginApi(this WebApplication app, WebApplicationBuilder builder)
        {
            //Mock login api, that checks the user in the request itself
            _ = app.MapPost("/login", (LoginUserRequest credentials) =>
            {
                if (credentials.Username == "username@example.com" && credentials.Password == "fakePassword")
                {
                    //if the user is valid, add claims to the token
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, credentials.Username),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim("Admin", "true")
                    };

                    //encrypt with a security key
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    //build a token
                    var token = new JwtSecurityToken(
                        issuer: builder.Configuration["Jwt:Issuer"],
                        audience: builder.Configuration["Jwt:Audience"],
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: creds);

                    return Results.Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
                }
                return Results.Unauthorized();
            });

            return app;
        }
    }
}
