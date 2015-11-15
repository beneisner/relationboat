if (Meteor.isClient) {
  
  
  // counter starts at 0
//  Session.setDefault('counter', 0);
//
//  Template.hello.helpers({
//    counter: function () {
//      return Session.get('counter');
//    }
//  });
//
//  Template.hello.events({
//    'click button': function () {
//      // increment the counter when button is clicked
//      Session.set('counter', Session.get('counter') + 1);
//    }
//  });
}

var http = Npm.require('http');


function getEmotionsFromURL(url) {
	//The url we want is `www.nodejitsu.com:1337/`

}

if (Meteor.isServer) {
  Meteor.startup(function () {
  	var options = {
	  host: 'api.projectoxford.ai',
	  path: '/emotion/v1.0/recognize',
	  //since we are listening on a custom port, we need to specify it by hand
	  //port: '1337',
	  //This is what changes the request to a POST request
	  method: 'POST',
	  headers: {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': 'd56bfdd4b1fc4fb4989908e4fa7d8a87'}
	};

	callback = function(response) {
	  var str = '';
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  response.on('end', function () {
	    console.log(str);
	  });
	};

	var req = http.request(options, callback);
	//This is the data we are posting, it needs to be a string or a buffer
	req.write('"url": "http://globe-views.com/dcim/dreams/face/face-02.jpg"');
	req.end();
  });
}
