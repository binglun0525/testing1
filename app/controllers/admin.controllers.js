exports.bingluntesting = async (req, res) => {
  var mongoose = require('mongoose');
  const Testing = require('../models/Testing.models.js');
  const pipeline = [{
      $project: {
        _id: 1,
        TotalTeam: 1,
        TournamentName: 1,
        Status: 1,
        Match: 1,
      }
    },
    {
      $unwind: "$Match"
    },
    {
      $group: {
        "_id": "$Match.Stage",
        "TotalTeam": {
          "$first": "$TotalTeam"
        },
        "TournamentName": {
          "$first": "$TournamentName"
        },
        "Status": {
          "$first": "$Status"
        },
        "Match": {
          "$push": "$Match"
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    },
  ]
  var result = await Testing.aggregate(pipeline).exec()
  var returnItem = [];

  if (result != null && result.length > 0) {
    for (const itemObj of result) {
      var returnMatch = []
      for (const itemObj2 of itemObj.Match) {
        //search team1 winning how many match
        var winMatchTeamOne = itemObj2.Result.filter(function(item) {
          return item.WinningTeamId.toString() == itemObj2.TeamOneId.toString();
        });
        //search team2 winning how many match
        var winMatchTeamTwo = itemObj2.Result.filter(function(item2) {
          return item2.WinningTeamId.toString() == itemObj2.TeamTwoId.toString();
        });
        var teamOneDetails = itemObj.TotalTeam.filter(function(item3) {
          return item3.TeamId.toString() == itemObj2.TeamOneId.toString();
        });
        var teamTwoDetails = itemObj.TotalTeam.filter(function(item4) {
          return item4.TeamId.toString() == itemObj2.TeamTwoId.toString();
        });
        var returnList = {
          _id: itemObj2._id,
          TeamOneId: itemObj2.TeamOneId,
          TeamTwoId: itemObj2.TeamTwoId,
          TeamOneName: teamOneDetails[0].TeamName,
          TeamTwoName: teamTwoDetails[0].TeamName,
          TeamOneImage: teamOneDetails[0].Image,
          TeamTwoImage: teamTwoDetails[0].Image,
          WinMatchTeamOne: winMatchTeamOne.length,
          WinMatchTeamTwo: winMatchTeamTwo.length
        }
        returnMatch.push(returnList)
      }
      var returnListObj = {
        Stage: itemObj._id,
        Match: returnMatch,
      }
      returnItem.push(returnListObj)
    }
  }

  res.status(200).send({
    ReturnCode: 200,
    ReturnDesc: "OK",
    Data: returnItem
  });
}
