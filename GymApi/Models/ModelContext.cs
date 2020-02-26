using Microsoft.EntityFrameworkCore;

namespace GymApi.Models
{
    public class ModelContext : DbContext
    {
        public ModelContext(DbContextOptions<ModelContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }


}