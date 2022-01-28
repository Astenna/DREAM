namespace BusinessLogic.Dtos.Account
{
    public class RegisterFarmerDto : RegisterDto
    {
        public string? FarmName { get; set; }

        public string? FarmAddressLine1 { get; set; }

        public string? FarmAddressLine2 { get; set; }

        public string? FarmCity { get; set; }

        public string? FarmPostalCode { get; set; }

        public int WaterIrrigationSystemId { get; set; }

        public int SensorSystemId { get; set; }
    }
}
