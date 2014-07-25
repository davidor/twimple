Meteor.publish("tweets", function () {
    return Tweets.find({"filtered": false});
});

Meteor.publish("lastTweetRead", function() {
    return LastTweetRead.find();
});

Meteor.publish("friends", function() {
    return Friends.find();
});