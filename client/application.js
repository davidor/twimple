Deps.autorun(function(){
    Meteor.subscribe("tweets");
    Meteor.subscribe("lastTweetRead");
    Meteor.subscribe("friends");
});