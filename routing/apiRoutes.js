var friends = require("../data/friends.js");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    var userInput = req.body;
    var userScore = userInput.scores.reduce((a, b) => a + b, 0);
    var bestFriend = {};
    var bestFriendScore = Infinity;

    for (i = 0; i < friends.length; i++) {
      var friendScore = friends[i].scores.reduce((a, b) => a + b, 0);
      if (userScore > friendScore) {
        var comparison = userScore - friendScore;
        if (comparison < bestFriendScore) {
          bestFriendScore = comparison;
          bestFriend = friends[i];
        }
      } else {
        var comparison = friendScore - userScore;
        if (comparison < bestFriendScore) {
          bestFriendScore = comparison;
          bestFriend = friends[i];
        }
      }
    }
    friends.push(userInput);
    res.json(bestFriend);
  });

};
