# Planning a visit

When planning a visit it is necessary to take the following factors into consideration:

- dates and number of already planned visits to the farm,
- number of visits planned for an agronomist on a given day,
- type of the problem the farmer is facing.

## General approach

1. Verify if the number of already planned visits is not greater than 2 + the number of additional recommended visits in case of a given problem.
   1. There is a need of having a mapping of possible problems to the number of additional visits.

        ```cpp
        enum ProblemType { // to be specified better
            DROUGHT,
            FLOOD,
            HEAT,
            COLD
        };

        map<ProblemType, int> { // Problem type : number of additional visits
            {ProblemType.DROUGHT, 3},
            {ProblemType.FLOOD, 4},
            {ProblemType.HEAT, 2},
            {ProblemType.COLD, 2}
        };
        ```

   2. If it is greater or equal, then no additional visits are necessary.

        ```cpp
        static const int DEFAULT_NUM_OF_CASUAL_VISITS = 2;

        if (visits.length >= DEFAULT_NUM_OF_CASUAL_VISITS + ADDITIONAL_VISITS[problemType]) {
            return;
        }
        ```

2. Add a new attribute ***reason*** (*enum* presented below) to the *Visit* to enable handling the case of having leftover visits created due to previously obtaining a negative note.

     ```cpp
     enum VisitReason {
         NEGATIVE_NOTE,
         CASUAL, // there are 2 casual visits per year
         AGRONOMIST_DECISION // Limitless
     };
     ```

3. Calculate the number of necessary visits by subtracting the number of visits created because of *AGRONOMIST_DECISION* from the number of visits specified for a given problem.

    ```cpp
    int calculateVisitsToAdd(ProblemType problemType) {
        int agr_dec_visits = 0;
        vector<Visit> visits = getFutureVisitsOnFarm(farmer.farm);

        for (const auto &visit : visits) {
            if (visit.reason == VisitReason.AGRONOMIST_DECISION) {
                agr_dec_visits++;
            }
        }
        int neg_note_visits = ADDITIONAL_VISITS[problemType];
        int nVisitsToAdd = neg_note_visits - agr_dec_visits;

        return nVisitsToAdd;
    }
    ```

4. Pick the optimal date between already planned visits.

    ```cpp
    DateTime getOptimalDateTime(Farm &farm) {
        // Make sure that the visits are in ascending ordered
        vector<Visit> visits = getFutureVisitsOnFarm(farm);
        // Recursively find two consecutive visits that are the furthest from each other
        // and insert a new visit in the middle. Consider also a timeslot in exactly 1 year from now.
        DateTime greatestGap = 0;
        DateTime optimalDateTime;

        for (int i = 0; i < visits.length - 1; i++) {
            if ((visits[i + 1].date - visits[i].date) > greatestGap) {
                greatestGap = visits[i + 1].date - visits[i].date;
                optimalDateTime = visits[i].date + greatestGap / 2;
            }
        }

        if ((DateTime.now() + DateTime(year=1) - visits[visits.length - 1].date) > greatestGap) {
            greatestGap = DateTime.now() + DateTime(year=1) - visits[visits.length - 1].date;
            optimalDateTime = visits[visits.length - 1].date + greatestGap / 2;
        }

        return optimalDateTime;
    }
    
    ```

5. Plan additional visits.

    ```cpp
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

    Visit getAdditionalVisit() {
        Visit newVisit;
        DateTime optimalDateTime = getOptimalDateTime(farmer.farm);
        newVisit = createVisitOnTheMostQuietDayCloseToDate(optimalDateTime);

        return newVisit;
    }

    // This function does not have to be a method of the Farmer's class
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
                Visit visit = getAdditionalVisit();
                visit.reason = reason;
                VisitDataAccess.createVisit(visit);
            }
        }
    }
    ```

**Above constraints do not hold when an agronomist wants to create an additional visit on his own.**

## Examples

### Farmer registration

```cpp
Farmer createFarmer(string name) {
    Farmer farmer(name);
    farmer.planVisits(DEFAULT_NUM_OF_CASUAL_VISITS, VisitReason.CASUAL);

    return farmer;
}
    
```

### Daily plan submission

```cpp
enum VisitState {
    PLANNED,
    CONFIRMED,
    REJECTED
};

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
}

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
```

### Obtaining a negative note

```cpp
enum Note {
    POSITIVE,
    NEGATIVE,
    NEUTRAL
};

void deleteVisitsCreatedDueToNegativeNote() {
    visits.erase(remove_if(
        visits.begin(), visits.end(),
        [](const Visit &visit) { 
            return visit.reason == VisitReason.NEGATIVE_NOTE;
        }), visits.end());
}

void Farmer::setNote(Note note, ProblemType problemType = nullptr) {
    if (this.note != Note.NEGATIVE && note == Note.NEGATIVE) {
        this.note = note;

        int nVisitsToAdd = calculateVisitsToAdd(problemType);
        planVisits(nVisitsToAdd, VisitReason.NEGATIVE_NOTE);
    } else {
        if (this.note == Note.NEGATIVE) {
            // If farmer's note improves, then no extra visits are necessary
            deleteVisitsCreatedDueToNegativeNote();
        }
        this.note = note;
    }
}
```
