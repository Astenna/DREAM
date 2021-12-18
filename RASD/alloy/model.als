sig Date {
    order: Int
} {order > 0}
let currentDate = Date.order = 1

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

abstract sig User {}
sig PolicyMaker extends User {}
sig Agronomist extends User {
    mandals: some Mandal,
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
    date: one Date // why disj?
} {
    note != Negative => no problemType
    note = Negative => one problemType
}

assert VerifyOnlyNegativeNoteHasAProblemType {
    all farmerNote: FarmerNote | farmerNote.note = Positive implies no farmerNote.problemType
    all farmerNote: FarmerNote | farmerNote.note = Neutral implies no farmerNote.problemType
    all farmerNote: FarmerNote | farmerNote.note = Negative implies one farmerNote.problemType
}
check VerifyOnlyNegativeNoteHasAProblemType

pred isLatestFarmerNote [farmerNote: one FarmerNote, farmerNotes: set FarmerNote] {
    no f: (farmerNotes - farmerNote) | f.date.order > farmerNote.date.order
}

pred latestFarmerNoteIsEq [farmer1: Farmer, note1: Note] {
	one farmerNote:  ~farmer[farmer1] | 
		(isLatestFarmerNote[farmerNote, ~farmer[farmer1]] && farmerNote.note = note1)
		||
		(note1 = Neutral && no ~farmer[farmer1])
}

fact {
	all h: HelpRequest | all r: h.recipients | (r in Agronomist) || (r in Farmer && latestFarmerNoteIsEq[r, Positive])
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

fact NoWaterIrrigationSystemResponseWithoutAFarm {
    all p : Production | one f : Farm | p in f.productions
}

assert NoProductionWithoutAFarm {
    no p : Production | all f : Farm | p not in f.productions
}
check NoProductionWithoutAFarm

sig WaterIrrigationSystemResponse {}
fact NoWaterIrrigationSystemResponseWithoutAFarm {
    all res : WaterIrrigationSystemResponse | one f : Farm | res in f.waterIrrigationSystemResponses
}

assert VerifyNoWaterIrrigationSystemResponseWithoutAFarm {
    no res : WaterIrrigationSystemResponse | all f:Farm | res not in f.waterIrrigationSystemResponses
}
check VerifyNoWaterIrrigationSystemResponseWithoutAFarm

sig SensorSystemResponse {}

fact NoSensorSystemResponseWithoutAFarm {
    all res : SensorSystemResponse | one f : Farm | res in f.sensorSystemResponses
}

assert VerifyNoSensorSystemResponseWithoutAFarm {
    no res : SensorSystemResponse | all f:Farm | res not in f.sensorSystemResponses
}
check VerifyNoSensorSystemResponseWithoutAFarm

sig WeatherSystemResponse {
    type: one WeatherType
}

fact NoWeatherSystemResponseWithoutAMandal {
    all res : WeatherSystemResponse | one m : Mandal | res in m.weatherSystemResponses
}

assert VerifyNoWeatherSystemResponseWithoutAMandal {
    no res : WeatherSystemResponse | all m : Mandal | res not in m.weatherSystemResponses
}
check VerifyNoWeatherSystemResponseWithoutAMandal

sig ProductionType {}
sig HelpRequest {
    recipients: some (Agronomist + Farmer), //M: changed to some since each mandal has to be governed by at least one agronomist
    author: one Farmer
} { author not in recipients } 

sig HelpResponse {
    author: one (Agronomist + Farmer),
    helpRequest: one HelpRequest
} { author in helpRequest.recipients }

assert NoFarmerIsARecipientofHisHelpRequest {
    no f : Farmer | f = HelpRequest.author && f in HelpRequest.recipients
}
check NoFarmerIsARecipientofHisHelpRequest

fact NoFarmerWithNotPositiveNoteIsARecipientOfAHelpRequest {
    no h: HelpRequest | one r: h.recipients | r in Farmer && (latestFarmerNoteIsEq[r, Neutral] || latestFarmerNoteIsEq[r, Negative])
}

assert VerifyNoFarmerWithNotPositiveNoteIsARecipientOfAHelpRequest {
	no h: HelpRequest | one r: h.recipients | r in Farmer && (latestFarmerNoteIsEq[r, Neutral] || latestFarmerNoteIsEq[r, Negative])
}
check VerifyNoFarmerWithNotPositiveNoteIsARecipientOfAHelpRequest

assert VerifyFarmerWithPositiveNoteCanBeARecipientOfAHelpRequest {
    all h : HelpRequest | lone r : h.recipients | r in Farmer && latestFarmerNoteIsEq[r, Positive]
}
check VerifyFarmerWithPositiveNoteCanBeARecipientOfAHelpRequest

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

fact NoForumCommentWithoutAForumThread {
    all fc : ForumComment | one ft : ForumThread | fc in ft.comments
}

assert VerifyNoForumCommentWithoutAForumThread {
    no fc : ForumComment | all ft : ForumThread | fc not in ft.comments
}
check VerifyNoForumCommentWithoutAForumThread

sig Suggestion {
    productionTypes: some ProductionType, // M: changed to some
    mandals: some Mandal // M: changed to some
}

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