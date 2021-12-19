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
sig ProblemType {}

// Users
abstract sig User {}
sig PolicyMaker extends User {}
sig Agronomist extends User {
    areaOfResponsibility: some Mandal,
    visits: disj set Visit
}
sig Farmer extends User {
    farm: disj one Farm
}

sig FarmerNote {
    note: one Note,
    problemType: lone ProblemType,
    policyMaker: one PolicyMaker,
    farmer: one Farmer,
    date: one Date
} {
    note != Negative => no problemType
    note = Negative => one problemType
}

pred isLatestFarmerNote [farmerNote: one FarmerNote, farmerNotes: set FarmerNote] {
    no f: (farmerNotes - farmerNote) | f.date > farmerNote.date
}

pred latestFarmerNoteIsEq [f: Farmer, n: Note] {
	one farmerNote: ~farmer[f] | 
		(isLatestFarmerNote[farmerNote, ~farmer[f]] && farmerNote.note = n)
		||
		(n = Neutral && no ~farmer[f])
}

fact {
	all h: HelpRequest | all r: h.recipients | (r in Agronomist) || (r in Farmer && latestFarmerNoteIsEq[r, Positive])
}

assert VerifyOnlyNegativeNoteHasAProblemType {
    all farmerNote: FarmerNote | farmerNote.note = Positive implies no farmerNote.problemType
    all farmerNote: FarmerNote | farmerNote.note = Neutral implies no farmerNote.problemType
    all farmerNote: FarmerNote | farmerNote.note = Negative implies one farmerNote.problemType
}
check VerifyOnlyNegativeNoteHasAProblemType


sig Farm {
    mandal: one Mandal,
    sensorSystemResponses: disj set SensorSystemResponse,
    waterIrrigationSystemResponses: disj set WaterIrrigationSystemResponse,
    productions: disj set Production
}


sig Mandal {
    weatherSystemResponses: disj set WeatherSystemResponse
}

fact NoMandalWithoutAnAgronomist {
    all m: Mandal | one a: Agronomist | m in a.areaOfResponsibility
}
assert NoMandalWithoutAnAgronomist {
    no m: Mandal | all a: Agronomist | m not in a.areaOfResponsibility
}
check NoMandalWithoutAnAgronomist


sig Production {
    productionType: one ProductionType
}

fact NoWaterIrrigationSystemResponseWithoutAFarm {
    all p: Production | one f: Farm | p in f.productions
}

assert NoProductionWithoutAFarm {
    no p: Production | all f: Farm | p not in f.productions
}
check NoProductionWithoutAFarm


sig WaterIrrigationSystemResponse {}
fact NoWaterIrrigationSystemResponseWithoutAFarm {
    all res: WaterIrrigationSystemResponse | one f: Farm | res in f.waterIrrigationSystemResponses
}

assert VerifyNoWaterIrrigationSystemResponseWithoutAFarm {
    no res: WaterIrrigationSystemResponse | all f: Farm | res not in f.waterIrrigationSystemResponses
}
check VerifyNoWaterIrrigationSystemResponseWithoutAFarm


sig SensorSystemResponse {}

fact NoSensorSystemResponseWithoutAFarm {
    all res: SensorSystemResponse | one f: Farm | res in f.sensorSystemResponses
}

assert VerifyNoSensorSystemResponseWithoutAFarm {
    no res: SensorSystemResponse | all f: Farm | res not in f.sensorSystemResponses
}
check VerifyNoSensorSystemResponseWithoutAFarm


sig WeatherSystemResponse {
    type: one WeatherType
}

fact NoWeatherSystemResponseWithoutAMandal {
    all res: WeatherSystemResponse | one m: Mandal | res in m.weatherSystemResponses
}

assert VerifyNoWeatherSystemResponseWithoutAMandal {
    no res: WeatherSystemResponse | all m: Mandal | res not in m.weatherSystemResponses
}
check VerifyNoWeatherSystemResponseWithoutAMandal


sig ProductionType {}


sig HelpRequest {
    recipients: some (Agronomist + Farmer),
    author: one Farmer
} { author not in recipients } 

sig HelpResponse {
    author: one (Agronomist + Farmer),
    helpRequest: one HelpRequest
} { author in helpRequest.recipients }

fact NoFarmerWithNotPositiveNoteIsARecipientOfAHelpRequest {
    no h: HelpRequest | one r: h.recipients | r in Farmer && (latestFarmerNoteIsEq[r, Neutral] || latestFarmerNoteIsEq[r, Negative])
}

assert NoFarmerIsARecipientofHisHelpRequest {
    no f: Farmer | f = HelpRequest.author && f in HelpRequest.recipients
}
check NoFarmerIsARecipientofHisHelpRequest

assert VerifyNoFarmerWithNotPositiveNoteIsARecipientOfAHelpRequest {
	no h: HelpRequest | one r: h.recipients | r in Farmer && (latestFarmerNoteIsEq[r, Neutral] || latestFarmerNoteIsEq[r, Negative])
}
check VerifyNoFarmerWithNotPositiveNoteIsARecipientOfAHelpRequest


sig Visit {
    reason: one VisitReason,
    state: one VisitState,
    farm: one Farm,
    date: one Date
}

fact CasualVisitMustBePlannedIfItWasRejectedOrConfirmed {
    all v1, v2: Visit | (v1.state = Rejected || v1.state = Confirmed) && v1.reason = Casual 
        implies v2.reason = Casual && v1.date < v2.date && v2.state = Planned
}

fact NoVisitIsConfirmedBeforeItsDate {
    no v : Visit | v.state = Confirmed && v.date < currentDate
}

fact NoVisitIsPlannedAfterItsDate {
    no v : Visit | v.state = Planned && v.date >= currentDate
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
        implies (one fn: ~farmer[~farm[v.farm]] | 
            isLatestFarmerNote[fn, ~farmer[~farm[v.farm]]] 
                && fn.note = Negative && fn.date <= v.date )
}


sig ForumThread {
    author: one Farmer,
    comments: disj set ForumComment
}


sig ForumComment {
    author: one Farmer
}

fact NoForumCommentWithoutAForumThread {
    all fc: ForumComment | one ft: ForumThread | fc in ft.comments
}

assert VerifyNoForumCommentWithoutAForumThread {
    no fc: ForumComment | all ft: ForumThread | fc not in ft.comments
}
check VerifyNoForumCommentWithoutAForumThread


sig Suggestion {
    productionTypes: some ProductionType,
    mandals: some Mandal
}


// World for testing correctness of help requests. 
// There should be a farmer recipient, with multiple notes, being a recipient.
// His latest note should be positive.
pred showForHelpRequests {
    #WaterIrrigationSystemResponse = 0
    #SensorSystemResponse = 0
    #WeatherSystemResponse = 0
    #ForumThread = 0
    #ForumComment = 0
	#ProductionType = 0
    #Visit = 0
    #HelpResponse = 0
	#Suggestion = 0
	#Production = 0

    #Agronomist = 1
    #Farmer = 2
	all a: Agronomist | no ~recipients[a]
	some f: Farmer | some ~recipients[f] && #~farmer[f] >= 5

    #HelpRequest = 1
    #FarmerNote >= 5
    #PolicyMaker <=3
	#recipients >= 1
}

run showForHelpRequests for 8

pred showWorldWithoutVisitsDueToAgronomistDecision {
    #ForumThread = 0
    #ForumComment = 0
    #HelpResponse = 0
    #WaterIrrigationSystemResponse = 0
    #SensorSystemResponse = 0
    #WeatherSystemResponse = 0
    
    #HelpRequest = 2
    #Visit = 2
    #Farmer = 1
    #PolicyMaker <= 1
    #Agronomist <= 1
    #FarmerNote >= 2
    all v: Visit | v.reason = NegativeNote && v.state = Planned
}

run showWorldWithoutVisitsDueToAgronomistDecision for 20

pred show {
    #WaterIrrigationSystemResponse = 1
    #SensorSystemResponse = 1
    #WeatherSystemResponse = 1
    #ForumThread = 2
    #ForumComment = 5
    #HelpRequest = 2
    #HelpResponse >= 4
    #Visit = 2
    #Farmer >= 2
    #PolicyMaker <= 3
    #Agronomist <= 3
    #FarmerNote <= 2
}

run show for 5 but 1 FarmerNote