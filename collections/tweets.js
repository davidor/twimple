Tweets = new Meteor.Collection('tweets');

Meteor.methods({
    resetTweetsDb: function() {
        Tweets.remove({});
    },

    markUserTweetsAsFiltered: function(userScreenName) {
        Tweets.update(
            {"screenName": userScreenName}, 
            {$set: {"filtered":true}}, 
            {multi: true}
        );
    },

    markUserTweetsAsNotFiltered: function(userScreenName) {
        Tweets.update(
            {"screenName": userScreenName}, 
            {$set: {"filtered":false}}, 
            {multi: true}
        );
    }
});

removeAllTweets = function() {
    Tweets.remove({});
};

streamNewTweets = function(Twit) {
    Twit.stream('user').on('tweet', Meteor.bindEnvironment(function(tweet) {
        insertTweetInDb(tweet);
    }));
};

getLatestTweets = function(Twit) {
    if (!LastTweetRead || (LastTweetRead.find().count() === 0)) {
        query = {count: 150};
    }
    else if (LastTweetRead && (LastTweetRead.find().count() !== 0)) {
        query = {since_id: LastTweetRead.findOne().id_str, count: 150};
    }
    Twit.get('statuses/home_timeline', query, Meteor.bindEnvironment(function(err, data) {
        data.forEach(function(tweet) {
            insertTweetInDb(tweet);
        });
    }));
};

function insertTweetInDb(tweet) {
    Tweets.insert({
        "id_str": tweet.id_str,
        "name": tweet.user.name, 
        "screenName": tweet.user.screen_name, 
        "text": getTweetText(tweet), 
        "createdAt": tweet.created_at, 
        "profileImageUrl": tweet.user.profile_image_url, 
        "retweeted": tweet.retweeted_status != null,
        "filtered": isFilteredUser(tweet.user.screen_name)
    });
}

function isRetweet(tweet) {
    return tweet.retweeted_status != null;
}

function getTweetText(tweet) {
    return isRetweet(tweet) ? tweet.retweeted_status.text : tweet.text;
}