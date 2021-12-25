Visit createAdditionalVisit() {
    Visit newVisit;
    DateTime optimalVisitDate = getOptimalVisitDate(farmer.farm);
    newVisit = createVisitOnTheMostQuietDayCloseToDate(optimalVisitDate);

    return newVisit;
}