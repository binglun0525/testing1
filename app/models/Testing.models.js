const mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const TestingSchema = new Schema({
  TournamentId: ObjectId,
  TotalTeam: [{
    TeamId: ObjectId,
    TeamName: String,
    Image: String
  }],
  TournamentName: String,
  StartDate: Date,
  EndDate: Date,
  Price: Number,
  Status: String,
  Match: [{
    _id: ObjectId,
    TeamOneId: ObjectId,
    TeamTwoId: ObjectId,
    Stage: Number, //start is 1, Winner go round 2, and keep add on
    Result: [{
      WinningStatus: Number, // 1: win, 2: draw or 3
      WinningTeamId: ObjectId, //if no match draw, it is simple just using winning
      StartDate: Date,
      EndDate: Date,
      Round: Number, //round 1 ,2 ,3 ,4 ,5
    }],
    StartDate: Date,
    EndDate: Date,
    Status: String
  }]
});
module.exports = mongoose.model('Testing', TestingSchema, 'Testing');
