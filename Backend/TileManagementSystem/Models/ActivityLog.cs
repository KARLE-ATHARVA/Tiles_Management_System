using System;

namespace TileManagementSystem.Models
{
    public class ActivityLog
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public string PerformedBy { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
