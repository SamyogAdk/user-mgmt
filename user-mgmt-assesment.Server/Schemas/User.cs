using System.ComponentModel.DataAnnotations;

namespace employee_management_assesment.Schemas;

public class User
{
    /// <summary>
    /// Key/Identifier
    /// </summary>
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// User's Name
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// User's Age
    /// </summary>
    public int Age { get; set; }
    /// <summary>
    /// User's Phone Number
    /// </summary>
    public string Phone { get; set; }
    /// <summary>
    /// User's status. <see cref="UserStatus"/>
    /// </summary>
    public UserStatus Status { get; set; }
    /// <summary>
    /// User's Designation
    /// </summary>
    public string Designation { get; set; }
}

/// <summary>
/// User's status
/// </summary>
public enum UserStatus
{
    Open = 0,
    Closed
}