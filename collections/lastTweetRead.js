LastTweetRead = new Meteor.Collection('lastTweetRead');

Meteor.methods({
    updateLastTweetRead: function() {
        LastTweetRead.remove({});
        LastTweetRead.insert({
            "id_str": Tweets.findOne({}, {sort: {"id_str": -1}, limit: 1}).id_str
        });
    }
});