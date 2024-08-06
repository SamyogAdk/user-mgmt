using employee_management_assesment.Schemas;
using Microsoft.EntityFrameworkCore;

namespace employee_management_assesment;

public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options)
{
    /// <summary>
    /// Users DbSet
    /// </summary>
    public DbSet<User> Users { get; set; }
}
