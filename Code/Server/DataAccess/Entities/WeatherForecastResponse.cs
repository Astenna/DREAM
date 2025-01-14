﻿namespace DataAccess.Entities.Farms
{
    public class WeatherForecastResponse
    {
        public int Id { get; set; }

        public float Degrees { get; set; }

        public float Rainfall { get; set; }

        public DateTime Date { get; set; }

        public WeatherType WeatherType { get; set; }

        public int MandalId { get; set; }

        public Mandal Mandal { get; set; }
    }
}
