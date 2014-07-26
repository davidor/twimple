Twimple
=======

Twimple is a simple twitter client that I developed to try to make the time that I spend on Twitter more productive. Twimple has been developed using [Meteor](https://www.meteor.com/), [Twit](https://github.com/ttezel/twit), and is based on this [tutorial](http://g00glen00b.be/meteor-twitter-streaming).

This is what Twimple does:

1. It can filter tweets by user.
2. It allows you to mark all the tweets as read, so you do not read them again when you come back to the application.
3. It has a simple and clean interface. Twimple shows just the tweets, without distractions.
4. Thanks to meteor real-time capabilities, new tweets appear directly in the application without having to reload the page.

These are the instructions to install Twimple:

1. You need Meteor, Meteorite, and Node.js.
2. Change the file **private/twitter_credentials.json** with your Twitter API keys. You can get them [here](https://apps.twitter.com/app/new).
3. To install the dependencies simply type ``mrt install``
4. To start running the server type ``mrt``
