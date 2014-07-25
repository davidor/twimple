var conf = getConfigurationFile();
var Twit = getTwitInstance();
removeAllTweets();
getLatestTweets(Twit);
updateFriends(Twit, conf.username);
streamNewTweets(Twit);

function getConfigurationFile() {
    return JSON.parse(Assets.getText('twitter_credentials.json'));
}

function getTwitInstance() {
    return new TwitMaker({
        consumer_key: conf.consumer_key,
        consumer_secret: conf.consumer_secret,
        access_token: conf.access_token,
        access_token_secret: conf.access_token_secret
    });
}
