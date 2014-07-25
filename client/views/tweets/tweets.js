Template.tweets.tweets = function() {
    return Tweets.find({}, { sort: {'id_str': -1} });
};

Template.tweets.areThereNewTweets = function() {
    return Tweets.find().count() != 0;
};

Template.tweets.events ({
    'click .everythingReadButton': function() {
        Meteor.call("updateLastTweetRead");
        Meteor.call("resetTweetsDb");
    },
    
    'click .filterButton': function() {
        $('.sidebar').sidebar('toggle');
    }
});