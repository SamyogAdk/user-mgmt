namespace user_mgmt_assesment.Server.Schemas;

/// <summary>
/// Login User
/// </summary>
/// <param name="Username"></param>
/// <param name="Password"></param>
public record LoginUserRequest(string Username, string Password);
