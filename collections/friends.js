Friends = new Meteor.Collection('friends');

Meteor.methods({
    markFriendAsFiltered: function(screenName) {
        Friends.update(
            {"screenName": screenName}, 
            {$set: {"filtered": true}}
        );
    },

    markFriendAsNotFiltered: function(screenName) {
        Friends.update(
            {"screenName": screenName}, 
            {$set: {"filtered": false}}
        );
    }
});

updateFriends = function(Twit, userName) {
    Twit.get('friends/list', {screen_name: userName, count: 500}, Meteor.bindEnvironment(function(err, data) {
        var currentFriendsScreenNames = [];
        data.users.forEach(function(friend) {
            if (!Friends.findOne({"screenName": friend.screen_name})) { // detect new friend
                insertFriendInDb(friend);
            }
            currentFriendsScreenNames.push(friend.screen_name);
        });
        getScreenNamesOfAllFriendsInDb().forEach(function(screenName) {
            if (currentFriendsScreenNames.indexOf(screenName) === -1) { // detect deleted friend
                deleteFriendFromDb(screenName);
            }
        });
    }));
};

isFilteredUser = function(screenName) {
    return (Friends.findOne({"screenName": screenName}) != null)
            && (Friends.findOne({"screenName": screenName}).filtered);
}

function insertFriendInDb(friend) {
    Friends.insert({
        "screenName": friend.screen_name,
        "profileImageUrl": friend.profile_image_url,
        "filtered": false
    });
}

function deleteFriendFromDb(screenName) {
    Friends.remove({"screenName": screenName});
}

function getScreenNamesOfAllFriendsInDb () {
    return Friends.find().map(function (friend) {
        return friend.screenName;
    });
}