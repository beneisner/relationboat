if (Meteor.isClient) {
  
}

var http = Npm.require('http');


function getEmotionsFromURL(url) {
	//The url we want is `www.nodejitsu.com:1337/`

}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// getEmotionFromURL('https://scontent-iad3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11902360_10204809163811037_8085263968138789270_n.jpg?oh=d341f098ffbf8e817aee8e606cf52713&oe=56ADE898')
		// getSentimentFromText("love happiness")
  });
}
