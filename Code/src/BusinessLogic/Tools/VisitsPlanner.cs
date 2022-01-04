using DataAccess.Entites.Farms;
using DataAccess.Entites.Visists;
using DataAccess.Entities;

namespace BusinessLogic.Tools
{
    internal class VisitsPlanner : IVisitsPlanner
    {
        public Visit CreateAdditionalVisit()
        {
            return new Visit();
        }

        public List<Visit> PlanVisits(int numOfVisits, VisitReason visitReason, DateTime? previousDate = null)
        {
            return new List<Visit>();
        }

        public void RemoveVisitsDueToNegativeNote(int farmerId)
        {
            return;
        }

        private int CalculateNumberOfVisitsToAdd(ProblemType problemType)
        {
            return 0;
        }

        private DateTime GetOptimalVisitDate(Farm farm)
        {
            return DateTime.Now;
        }

        private Visit CreateVisitOnTheMostQuietDayCloseToDate(DateTime dateTime, bool isCasualVisitRejected = false)
        {
            return new Visit();
        }
    }
}
