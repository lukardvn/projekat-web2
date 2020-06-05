using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<AirlineDestination> AirlineDestinations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*modelBuilder.Entity<Friendship>() OVO AKO JE OK DA IMAM 2 LISTE PRIJATELJA U SVAKOM KORISNIKU
                .HasKey(fs => new { fs.UserId1, fs.UserId2 });
            modelBuilder.Entity<Friendship>()
                .HasOne(fs => fs.User1)
                .WithMany(u => u.FriendsWith)
                .HasForeignKey(fs => fs.UserId1)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Friendship>()
                .HasOne(fs => fs.User2)
                .WithMany(u => u.FriendsOf)
                .HasForeignKey(fs => fs.UserId2);
            Note that in both cases you have to turn the delete cascade off for at least one of the 
            relationships and manually delete the related join entities before deleting the main 
            entity, because self referencing relationships always introduce possible cycles or 
            multiple cascade path issue, preventing the usage of cascade delete.*/
            modelBuilder.Entity<Friendship>()
                .HasKey(fs => new { fs.UserId1, fs.UserId2 });
            modelBuilder.Entity<Friendship>()
                .HasOne(fs => fs.User2)
                .WithMany() //friendship.User1 unidirectional association 
                .HasForeignKey(fs => fs.UserId2)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Friendship>()
                .HasOne(fs => fs.User1)
                .WithMany(u => u.Friendships)
                .HasForeignKey(fs => fs.UserId1);

            modelBuilder.Entity<AirlineDestination>()
                .HasKey(cs => new { cs.AirlineId, cs.DestinationId });

        }

    }
}
