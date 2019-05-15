var friends = require("../data/friends.js");

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friends);
    })
    app.post("/api/friends", function(req, res){
        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var score2 = userScores.map(function(item){
            return parseInt(item, 10);
        })
        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: score2
        }

        var sum = score2.reduce((score1, score2) => score1 + score2, 0)

        for(var i = 0; i < friends.length; i++){
            totalDifference = 0;
            var score2FriendScore = friends[i].scores.reduce((score1, score2) => score1 + score2, 0);
            totalDifference += Math.abs(sum - score2FriendScore);

            if(totalDifference <= bestMatch.friendDifference){
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
        friends.push(userData)
        res.json(bestMatch)
    })
}