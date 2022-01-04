using DataAccess.Entites.Visists;

namespace BusinessLogic.Tools
{
    internal interface IVisitsPlanner
    {
        Visit CreateAdditionalVisit();
        List<Visit> PlanVisits(int numOfVisits, VisitReason visitReason, DateTime? previousDate = null);
        void RemoveVisitsDueToNegativeNote(int farmerId);
    }
}