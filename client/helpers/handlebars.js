Handlebars.registerHelper('formatTime', function(date) {
    return moment(date).fromNow();  
});

Handlebars.registerHelper('linkify', function(text) {
    var result = linkifyUrls(text);
    result = linkifyHashtags(result);
    return linkifyUserNames(result);
});

function linkifyUrls(inputText) {
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim; // www. sans http:// or https://
    result = inputText.replace(urlPattern, '<a href="$&">$&</a>');
    return result.replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>');
}

function linkifyHashtags(inputText) {
    return inputText.replace(/[#]+[A-Za-z0-9-_]+/g, function(hash) {
        txt = hash.replace("#", "");
        return hash.link("http://twitter.com/search/%23" + txt);
    });
}

function linkifyUserNames(inputText) {
    return inputText.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        var username = u.replace("@","")
        return u.link("http://twitter.com/" + username);
    });
}