sig Date in Int {} {this > 0}
let currentDate = 5

// Enums
enum Note {
    Positive,
    Neutral,
    Negative
}
enum VisitReason {
    NegativeNote,
    Casual,
    AgronomistDecision
}
enum WeatherType {
    Sunny,
    MostlyCloudy,
    Cloudy,
    Rainy,
    Lightning
}
enum VisitState {
    Planned,
    Confirmed,
    Rejected
}

// Signatures
sig ProblemType {}

abstract sig User {}
sig PolicyMaker extends User {}
sig Agronomist extends User {
    areaOfResponsibility: some Mandal,
    visits: disj set Visit
}
sig Farmer extends User {
    farm: disj one Farm,
    farmerNotes: disj set FarmerNote
}

sig FarmerNote {
    note: one Note,
    problemType: lone ProblemType,
    policyMaker: one PolicyMaker,
    owner: one Farmer,
    date: one Date
} {
    note != Negative => no problemType
    note = Negative => one problemType
}

sig Farm {
    mandal: one Mandal,
    sensorSystemResponses: disj set SensorSystemResponse,
    waterIrrigationSystemResponses: disj set WaterIrrigationSystemResponse,
    productions: disj set Production
}

sig Mandal {
    weatherSystemResponses: disj set WeatherSystemResponse
}

sig Production {
    productionType: one ProductionType
}

sig WaterIrrigationSystemResponse {}

sig SensorSystemResponse {}

sig WeatherSystemResponse {
    type: one WeatherType
}

sig ProductionType {}

sig HelpRequest {
    recipients: some (Agronomist + Farmer),
    author: one Farmer
} { author not in recipients } 

sig HelpResponse {
    author: one (Agronomist + Farmer),
    helpRequest: one HelpRequest
} { author in helpRequest.recipients }

sig Visit {
    reason: one VisitReason,
    state: one VisitState,
    farm: one Farm,
    date: one Date
}

sig ForumThread {
    author: one Farmer,
    comments: disj set ForumComment
}

sig ForumComment {
    author: one Farmer
}

sig Suggestion {
    productionTypes: some ProductionType,
    mandals: some Mandal
}

// FACTS, predicates, assertions
// FarmerNotes
fact {
    ~owner = farmerNotes
}

pred isLatestFarmerNote [farmerNote: one FarmerNote, farmerNotes: set FarmerNote] {
    no f: (farmerNotes - farmerNote) | f.date > farmerNote.date
}

pred latestFarmerNoteIsEq [f: Farmer, n: Note] {
	one farmerNote: farmerNotes[f] | 
		(isLatestFarmerNote[farmerNote, farmerNotes[f]] && farmerNote.note = n)
		||
		(n = Neutral && no farmerNotes[f])
}

fact OnlyAgronomistOrAFarmerWithPositiveNoteCanBeARecipientOfAHelpRequest{
	all h: HelpRequest | all r: h.recipients | (r in Agronomist) || (r in Farmer && latestFarmerNoteIsEq[r, Positive])
}

assert VerifyOnlyNegativeNoteHasAProblemType {
    all farmerNote: FarmerNote | farmerNote.note = Positive implies no farmerNote.problemType
    all farmerNote: FarmerNote | farmerNote.note = Neutral implies no farmerNote.problemType
    all farmerNote: FarmerNote | farmerNote.note = Negative implies one farmerNote.problemType
}
check VerifyOnlyNegativeNoteHasAProblemType

fact NoTwoNotesForTheSameDayAndFarmer {
    no disj n1, n2: FarmerNote | n1.date = n2.date && n1.owner = n2.owner
}

// Mandals
fact NoMandalWithoutAnAgronomist {
    all m: Mandal | one a: Agronomist | m in a.areaOfResponsibility
}
assert VerifyEachMandalIsInsideAgronomistAreaOfResponsibility {
    no m: Mandal | all a: Agronomist | m not in a.areaOfResponsibility
}
check VerifyEachMandalIsInsideAgronomistAreaOfResponsibility

// Farms
fact NoFarmWithoutFarmer {
    all f: Farm | one frm: Farmer | frm.farm = f
}
assert VerifyNoFarmWithoutFarmer {
    no f: Farm | all frm: Farmer | frm.farm != f
}
check VerifyNoFarmWithoutFarmer

fact NoWaterIrrigationSystemResponseWithoutAFarm {
    all p: Production | one f: Farm | p in f.productions
}
assert VerifyNoProductionWithoutAFarm {
    no p: Production | all f: Farm | p not in f.productions
}
check VerifyNoProductionWithoutAFarm

fact NoWaterIrrigationSystemResponseWithoutAFarm {
    all res: WaterIrrigationSystemResponse | one f: Farm | res in f.waterIrrigationSystemResponses
}
assert VerifyNoWaterIrrigationSystemResponseWithoutAFarm {
    no res: WaterIrrigationSystemResponse | all f: Farm | res not in f.waterIrrigationSystemResponses
}
check VerifyNoWaterIrrigationSystemResponseWithoutAFarm

// HelpRequests
fact NoFarmerWithoutPositiveNoteIsARecipientOfAHelpRequest {
    no h: HelpRequest | one r: h.recipients | r in Farmer && (latestFarmerNoteIsEq[r, Neutral] || latestFarmerNoteIsEq[r, Negative])
}

assert VerifyAuthorOfHelpReponseMustBeInsideRequestRecipients {
    all hr: HelpResponse | one rec: hr.helpRequest.recipients | hr.author in rec
}
check VerifyAuthorOfHelpReponseMustBeInsideRequestRecipients

fact AgronomistIsARecipientOfAHelpRequestBasedOnAreaOfResponsibility {
    all h: HelpRequest | some r: h.recipients | 
        r in Agronomist && h.author.farm.mandal in r.areaOfResponsibility
}

// SensorSystem
fact NoSensorSystemResponseWithoutAFarm {
    all res: SensorSystemResponse | one f: Farm | res in f.sensorSystemResponses
}

assert VerifyNoSensorSystemResponseWithoutAFarm {
    no res: SensorSystemResponse | all f: Farm | res not in f.sensorSystemResponses
}
check VerifyNoSensorSystemResponseWithoutAFarm

// WeatherSystem
fact NoWeatherSystemResponseWithoutAMandal {
    all res: WeatherSystemResponse | one m: Mandal | res in m.weatherSystemResponses
}

assert VerifyNoWeatherSystemResponseWithoutAMandal {
    no res: WeatherSystemResponse | all m: Mandal | res not in m.weatherSystemResponses
}
check VerifyNoWeatherSystemResponseWithoutAMandal

// Visits
fact NoVisitsWithoutAgronomist {
    all v: Visit | one a: Agronomist | v in a.visits
}

fact CasualVisitMustBePlannedIfItWasRejectedOrConfirmed {
    all disj v1, v2: Visit | (v1.state = Rejected || v1.state = Confirmed) && v1.reason = Casual 
        implies v2.reason = Casual && v1.date < v2.date && v2.state = Planned
}

fact NoVisitIsConfirmedBeforeItsDate {
    no v : Visit | v.state = Confirmed && v.date > currentDate
}

fact NoVisitIsPlannedAfterItsDate {
    no v : Visit | v.state = Planned && v.date <= currentDate
}

fact NoPlannedVisitCausedByNegativeNoteIfFarmerNoteIsNotNegative {
    all v: Visit | v.reason = NegativeNote && v.state = Planned  
        implies latestFarmerNoteIsEq[~farm[v.farm], Negative]
}
assert VerifyNoPlannedVisitCausedByNegativeNoteIfFarmerNoteIsNotNegative {
    no v: Visit | v.reason = NegativeNote && v.state = Planned 
        && not latestFarmerNoteIsEq[~farm[v.farm], Negative]
}
check VerifyNoPlannedVisitCausedByNegativeNoteIfFarmerNoteIsNotNegative

fact NoVisitDueToNegativeNoteIsPlannedBeforeTheDateOfTheLastNegativeNote {
    all v: Visit | v.reason = NegativeNote && v.state = Planned 
        implies (one fn: farmerNotes[~farm[v.farm]] | 
            isLatestFarmerNote[fn, farmerNotes[~farm[v.farm]]] 
                && fn.note = Negative && fn.date <= v.date )
}

fact NoMultipleVisitsDueToNegativeNoteOnTheSameDayToTheSameFarm {
    no disj v1, v2: Visit | 
        v1.reason = NegativeNote
        && v1.state = Planned
        && v2.reason = NegativeNote
        && v2.state = Planned
        && v1.date = v2.date
        && v1.farm = v2.farm
}

fact NoMultipleCasualVisitsOnTheSameDayToTheSameFarm {
    no disj v1, v2: Visit | 
        v1.reason = Casual
        && v1.state = Planned
        && v2.reason = Casual
        && v2.state = Planned
        && v1.date = v2.date
        && v1.farm = v2.farm
}

// ForumComment
fact NoForumCommentWithoutAForumThread {
    all fc: ForumComment | one ft: ForumThread | fc in ft.comments
}
assert VerifyNoForumCommentWithoutAForumThread {
    no fc: ForumComment | all ft: ForumThread | fc not in ft.comments
}
check VerifyNoForumCommentWithoutAForumThread

// Worlds

// World for testing correctness of help requests. 
// There should be a farmer recipient, with multiple notes, being a recipient.
// His latest note should be positive.
pred showHelpRequestsForFarmersWithPositiveNote {
    #WaterIrrigationSystemResponse = 0
    #SensorSystemResponse = 0
    #WeatherSystemResponse = 0
    #ForumThread = 0
    #ForumComment = 0
	#ProductionType = 0
    #Visit = 0
    #HelpResponse > 2
	#Suggestion = 0
	#Production = 0
    #Mandal = 1
    
    #Agronomist = 1
    #Farmer = 2
    #HelpRequest > 1
    #PolicyMaker <=3
	#recipients >= 1

	some f: Farmer | some ~recipients[f] && #farmerNotes[f] = 3
}
run showHelpRequestsForFarmersWithPositiveNote for 8

pred showWorldWithPlannedVisitDueToNegativeNote {
    #ForumThread = 0
    #ForumComment = 0
    #HelpResponse = 0
    #WaterIrrigationSystemResponse = 0
    #SensorSystemResponse = 0
    #WeatherSystemResponse = 0
    #Production = 0
    #Suggestion = 0
    #HelpRequest = 0

    #Mandal <= 3
    #Visit >= 3
    #Farmer >= 1
    #PolicyMaker <= 1
    #Agronomist = 1
    #FarmerNote >= 2
    
	some v: Visit | v.state = Confirmed
	some v: Visit | v.state = Planned && v.reason = NegativeNote
}
run showWorldWithPlannedVisitDueToNegativeNote for 8

pred showWorldWithRejectedCasualVisit {
    #ForumThread = 0
    #ForumComment = 0
    #HelpResponse = 0
    #WaterIrrigationSystemResponse = 0
    #SensorSystemResponse = 0
    #WeatherSystemResponse = 0
    #Production = 0
    #Suggestion = 0
    #HelpRequest = 0

    #Mandal <= 3
    #Visit >= 3
    #Farmer >= 1
    #PolicyMaker <= 1
    #Agronomist = 1
    #FarmerNote >= 2
    
	some v: Visit | v.state = Rejected && v.reason = Casual
}
run showWorldWithRejectedCasualVisit for 8

pred showWorldFocusedOnForum {
    #ForumThread >= 2
    #ForumComment >= 5
    #HelpResponse = 0
    #WaterIrrigationSystemResponse = 0
    #SensorSystemResponse = 0
    #WeatherSystemResponse = 0
    #Production = 0
    #Suggestion = 0
    #HelpRequest = 0

    #Mandal <= 3
    #Visit <= 2
    #Farmer >= 5
    #PolicyMaker <= 1
    #Agronomist = 1
    #FarmerNote <= 2
}
run showWorldFocusedOnForum for 8

pred show {
    #WaterIrrigationSystemResponse = 1
    #SensorSystemResponse = 1
    #WeatherSystemResponse = 1
    #ForumThread = 2
    #ForumComment = 5
    #HelpRequest >= 0
    #HelpResponse >= 0
    #Visit >= 0
    #Farmer >= 2
    #PolicyMaker <= 3
    #Agronomist <= 3
    #FarmerNote <= 2
}

run show for 8