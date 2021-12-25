void updateVisit(Visit &originalVisit, Visit &newVisit) {
    if (newVisit.date >= DateTime.now()) {
        return;
    }

    if (newVisit.reason == VisitReason.CASUAL) {
        if ((newVisit.date - originalVisit.date) > MAX_REPLANNED_CASUAL_VISIT_DATE_SHIFT) {
            throw Warning;
        }
        newVisit.farm.farmer.planVisits(1, newVisit.reason);
    }

    newVisit.farm.farmer.planVisits(1, newVisit.reason);
}