static const int MAX_VISIT_DATE_SHIFT = 30; // days
static const int MAX_REPLANNED_CASUAL_VISIT_DATE_SHIFT = 5; // days
static const int MAX_DAILY_VISITS_PER_AGRONOMIST = 5; //days

Visit createVisitOnTheMostQuietDayCloseToDate(DateTime dateTime, bool isCasualVisitRejected = False) {
    Visit newVisit;
    int leastNumOfVisits = agronomists[0].getVisits(dateTime).length;
    newVisit.agronomist = agronomists[0];
    newVisit.date = dateTime;

    if (leastNumOfVisits <= MAX_DAILY_VISITS_PER_AGRONOMIST) {
        return newVisit;
    }

    int date_shift = isCasualVisitRejected ? MAX_REPLANNED_CASUAL_VISIT_DATE_SHIFT 
                    : MAX_VISIT_DATE_SHIFT;

    for (const auto &agronomist : agronomists) {
        for (int i = 1; i < MAX_VISIT_DATE_SHIFT; i++) {
            // Subtraction ensures that the new visit will not be later than specified dateTime
            DateTime proposedDateTime = dateTime - DateTime(days=i);
            vector<Visit> visits = agronomist.getVisits(proposedDateTime);

            if (visits.length < leastNumOfVisits) {
                leastNumOfVisits = visits.length;
                newVisit.agronomist = agronomist;
                newVisit.date = proposedDateTime;
            }

            if (leastNumOfVisits <= MAX_DAILY_VISITS_PER_AGRONOMIST) {
                return newVisit;
            }
        }
    }

    // It is possible to have a greater number of visits than MAX_DAILY_VISITS_PER_AGRONOMIST
    // This function ensures, however, that in such case, the visit will be scheduled for the
    // agronomist with the least visits.
    return newVisit;
}