void Farmer::planVisits(int n_visits, VisitReason reason, previousDate = nullptr) {
    if (reason == VisitReason.CASUAL) {
        for (int i = 0; i < n_visits; i++) {
            // we look for the date of a CASUAL visit planned most in the future
            // getDateTimeOfMostFutureVisit should querry the database

            DateTime dateTime;
            Visit newVisit;

            if (previousDate != nullptr) {
                dateTime = previousDate + DateTime(days=MAX_REPLANNED_CASUAL_VISIT_DATE_SHIFT);
                newVisit = createVisitOnTheMostQuietDayCloseToDate(dateTime, True);
            } else {
                DateTime mostFuture = getDateTimeOfMostFutureVisit(VisitReason.CASUAL);
                // we create a visit approximately 6 months after that date
                dateTime = mostFuture + DateTime(months=6);
                newVisit = createVisitOnTheMostQuietDayCloseToDate(dateTime);
            }
            
            newVisit.reason = reason;
            VisitDataAccess.createVisit(newVisit);
        }
    } else if (reason == VisitReason.NEGATIVE_NOTE) {
        for (int i = 0; i < n_visits; i++) {
            Visit visit = createAdditionalVisit();
            visit.reason = reason;
            VisitDataAccess.createVisit(visit);
        }
    }
}