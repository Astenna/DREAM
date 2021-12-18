sig Date {
    order: disj one Int
} {order > 0}
let currentDate = Date = 1

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
    farmerRel: one Farmer,
    date: disj one Date,
} {
    note != Negative => no problemType
    note = Negative => one problemType
}



pred isLatestFarmerNote [farmerNote: one FarmerNote, farmerNotes: set FarmerNote] {
    no f: (farmerNotes - farmerNote) | f.date.order > farmerNote.date.order
} 

fun latestFarmerNote [farmer1: Farmer]: lone FarmerNote {
	{farmerNote:  ~farmerRel[farmer1] | isLatestFarmerNote[farmerNote, ~farmerRel[farmer1]]}
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
    recipients: set (Agronomist + Farmer),
    author: one Farmer
} { author not in recipients } 

fact {
	all h: HelpRequest | all r: h.recipients | (r in Agronomist) || (r in Farmer && latestFarmerNote[r].note = Positive)
} 

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
    productionTypes: set ProductionType,
    mandals: set Mandal
}

//assert NoFarmerIsARecipientofHisHelpRequest {
//    no f:Farmer | f = HelpRequest.author && f in HelpRequest.recipients
//}

//check NoFarmerIsARecipientofHisHelpRequest

assert NoFarmerWithNotPositiveNoteIsARecipientOfAHelpRequest {
	no hp: HelpRequest | one r: hp.recipients | r in Farmer && latestFarmerNote[r].note != Positive
}

check NoFarmerWithNotPositiveNoteIsARecipientOfAHelpRequest

pred show {
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
    #Agronomist = 0

    #HelpRequest = 1
    #Farmer = 2
    #FarmerNote >= 5
    #PolicyMaker <=3
	#recipients >= 1
}

run show for 8 but 1 ProblemType