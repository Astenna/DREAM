Farmer createFarmer(string name) {
    Farmer farmer(name);
    farmer.planVisits(DEFAULT_NUM_OF_CASUAL_VISITS, VisitReason.CASUAL);

    return farmer;
}