Template.friends.friends = function() {
    return Friends.find({});
};

Template.friends.events ({
    'click .enabledImage': function() {
        Meteor.call("markFriendAsFiltered", this.screenName);
        Meteor.call("markUserTweetsAsFiltered", this.screenName);
    },
    
    'click .disabledImage': function() {
        Meteor.call("markFriendAsNotFiltered", this.screenName);
        Meteor.call("markUserTweetsAsNotFiltered", this.screenName);
    }
});