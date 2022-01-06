void Farmer::setNote(Note note, ProblemType problemType = nullptr) {
    if (this.note != Note.NEGATIVE && note == Note.NEGATIVE) {
        this.note = note;

        int nVisitsToAdd = calculateVisitsToAdd(problemType);
        planVisits(nVisitsToAdd, VisitReason.NEGATIVE_NOTE);
    } else {
        if (this.note == Note.NEGATIVE) {
            deleteVisitsCreatedDueToNegativeNote();
        }
        this.note = note;
    }
}