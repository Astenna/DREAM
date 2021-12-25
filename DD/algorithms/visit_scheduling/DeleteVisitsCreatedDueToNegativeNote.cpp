void deleteVisitsCreatedDueToNegativeNote() {
    visits.erase(remove_if(
        visits.begin(), visits.end(),
        [](const Visit &visit) { 
            return visit.reason == VisitReason.NEGATIVE_NOTE;
        }), visits.end());
}