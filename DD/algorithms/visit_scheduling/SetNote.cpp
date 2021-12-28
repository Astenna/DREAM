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