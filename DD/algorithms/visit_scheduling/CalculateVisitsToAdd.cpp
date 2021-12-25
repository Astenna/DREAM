static const int DEFAULT_NUM_OF_CASUAL_VISITS = 2;

int calculateVisitsToAdd(ProblemType problemType) {
    int agr_dec_visits = 0;
    vector<Visit> visits = getFutureVisitsOnFarm(farmer.farm);

    if (visits.length >= DEFAULT_NUM_OF_CASUAL_VISITS + problemType.nAdditionalVisits) {
        return 0;
    }

    for (const auto &visit : visits) {
        if (visit.reason == VisitReason.AGRONOMIST_DECISION) {
            agr_dec_visits++;
        }
    }
    int nVisitsToAdd = problemType.nAdditionalVisits - agr_dec_visits;

    return nVisitsToAdd;
}