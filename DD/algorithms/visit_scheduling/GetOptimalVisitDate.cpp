DateTime getOptimalVisitDate(Farm &farm) {
    // Make sure that the visits are in ascending ordered
    vector<Visit> visits = getFutureVisitsOnFarm(farm);
    DateTime greatestGap = 0;
    DateTime optimalVisitDate;

    for (int i = 0; i < visits.length - 1; i++) {
        if ((visits[i + 1].date - visits[i].date) > greatestGap) {
            greatestGap = visits[i + 1].date - visits[i].date;
            optimalVisitDate = visits[i].date + greatestGap / 2;
        }
    }

    if ((DateTime.now() + DateTime(year=1) - visits[visits.length - 1].date) > greatestGap) {
        greatestGap = DateTime.now() + DateTime(year=1) - visits[visits.length - 1].date;
        optimalVisitDate = visits[visits.length - 1].date + greatestGap / 2;
    }

    return optimalVisitDate;
}