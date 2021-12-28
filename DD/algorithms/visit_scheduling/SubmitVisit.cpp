void submitVisit(Visit &visit) {
    // visit contains data obtained from the UI
    if (visit.date < DateTime.now()) {
        return;
    }

    if (visit.state == VisitState.CONFIRMED) {
        if (visit.reason == VisitReason.CASUAL) {
            VisitDataAccess.updateVisitData(visit); // update record inside the database
            // just an example of retrieving the farmer from the visit
            visit.farm.farmer.planVisits(1, VisitReason.CASUAL); 
        }
    } else if (visit.state == VisitState.REJECTED) {
        VisitDataAccess.updateVisitData(visit);

        if (visit.reason == VisitReason.CASUAL) {
            visit.farm.farmer.planVisits(1, visit.reason, visit.date);
        } else {
            visit.farm.farmer.planVisits(1, visit.reason);
        }
    } 
    // else { // visit.state == VisitState.PLANNED
        // Cannot update a visit after its date
    // }
}