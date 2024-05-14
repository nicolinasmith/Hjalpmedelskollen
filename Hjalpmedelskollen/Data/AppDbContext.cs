﻿using Hjalpmedelskollen.Models;
using Microsoft.EntityFrameworkCore;

namespace Hjalpmedelskollen.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<InstitutionModel> Institutions { get; set; }
        public DbSet<UnitModel> Units { get; set; }
        public DbSet<SectionModel> Sections { get; set; }
        public DbSet<AidModel> Aids { get; set; }
        public DbSet<PatientModel> Patients { get; set; }
        public DbSet<NoteBoardModel> NoteBoards { get; set; }
        public DbSet<FolderModel> Folders { get; set; }
        public DbSet<DocumentModel> Documents { get; set; }
    }
}

