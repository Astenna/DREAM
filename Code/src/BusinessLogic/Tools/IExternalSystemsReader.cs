namespace BusinessLogic.Tools
{
    internal interface IExternalSystemsReader
    {
        void StoreNewIrrigationSystemsData();
        void StoreNewSensorSystemsData();
        void StoreNewWeatherForecasts();
    }
}