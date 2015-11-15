

Meteor.methods({
    getUserData: function() {
        return Meteor.user();
    },

    getPhotoEvals: function (friend) {
        var accessToken = Meteor.user().services.facebook.accessToken;
        var myName = Meteor.user().profile.name;
        console.log(myName);
        console.log(accessToken);


	    callback = function(error, response) {
            if (error != null) {
                console.log("ERROR:" + error)
            } else {
                var contentString = response['content'];
                var content = JSON.parse(contentString);
                if (content != null) {
                    listOfPics = [];
                    var countPhotosFound = 0;
                    var finished = false;
                    var photoIDs = '';
                    var id2url = {};
                    var counter = 0;
                    console.log('Number of photos: ' + content.photos.data.length);
                    for (let pic of content.photos.data) {
                        if (pic.images.length > 0) {
                            var url = pic.images[0].source;
                            var photoID = pic.id;
                            id2url[photoID] = url;
                            photoIDs += photoID + ',';
                            counter++;
                            if (counter >= 50) {

                                var tagURL = 'https://graph.facebook.com/tags?ids=' + photoIDs.slice(0, -1) + '&access_token=' + accessToken;
                                HTTP.get(tagURL, asyncCallback=
                                    function(error, response) {
                                        if (error != null) {
                                            console.log("ERROR:" + error);
                                        } else {
                                            var contentString = response['content'];
                                            var content = JSON.parse(contentString);
                                            if (content != null) {
                                                for (var photoID in content) {
                                                    var myX = -1;
                                                    var myY = -1;
                                                    var friendX = -1;
                                                    var friendY = -1;

                                                    for (let person of content[photoID].data) {
                                                        if (person.name === myName) {
                                                            myX = person.x;
                                                            myY = person.y;
                                                        } else if (person.name === friend) {
                                                            console.log(person.name);
                                                            friendX = person.x;
                                                            friendY = person.y;
                                                        }
                                                    }
                                                    if (myX != -1 && typeof myX !== 'undefined' && friendX != -1 && typeof friendX !== 'undefined') {
                                                        listOfPics.push({url: id2url[photoID], x1: myX, y1: myY, x2: friendX, y2: friendY}); 
                                                        console.log(friendX);
                                                        console.log(friendY);
                                                        countPhotosFound++;
                                                        console.log('Photos found: ' + countPhotosFound);
                                                        console.log(id2url[photoID]);
                                                    }
                                                }
                                                console.log("List of pics: " + listOfPics);
                                                getEmotions(listOfPics);
                                            }
                                        }
                                });
                                photoIDs = '';
                                counter = 0;
                            }
                        }
                    }
                }
            }
        } 
	 	
        //var graphURL = 'https://graph.facebook.com/me';
        var graphURL = 'https://graph.facebook.com/me?fields=photos.limit(500).order(reverse_chronological){id, images}&access_token=' + accessToken;
//	    HTTP.get(graphURL, {fields: 'photos', access_token: accessToken}, asyncCallback=callback);
        HTTP.get(graphURL, asyncCallback=callback);
    },
  
  
  getMessages: function(friend) {
    var msg_query_url = 'https://graph.facebook.com/me?fields=inbox.limit(15)&access_token=CAACEdEose0cBAFOegG79FhiKzZCsj7UvNsFhEf3ZBbd5Lp7laX1l7vo3vjADrfzuWyk5a9VwQ9ObJBIdBhJnZAmrsCGoqwQ3iIE7MZAH4JRwYdyD3WAOLaV52E0xRWGZB8SmlmoZA2P6kUF8k3N0KQFdVpyJziNqgklWSsp9wfg3AZBOrLI366L1o6qZAit0ZBRZAVJuvhxQ4J3zZBE12PHh3ZBZB';
    
    
    
    try {
      // get messages from FB
      console.log("Starting HTTP Request")
      var res = HTTP.get(msg_query_url);
      
      var content = JSON.parse(res.content);
        var threads = content.inbox.data;
        
        var selectedConv = null;
        
        // get thread between user and selected friend
        console.log("Checking Threads")
        for (let thread of threads) {
          var participants = thread.to.data
          if (participants.length == 2 &&
              (participants[0].name == friend || participants[1].name == friend )) {
            selectedConv = thread;
            break;
          }
        }
        
        // build string for indico
        console.log(selectedConv)
        var bigstring = '';
        for (let msg of selectedConv.comments.data) {
          bigstring = bigstring + ' ' + msg.message;
        }
        
        console.log("BIG STRING" + bigstring);
        
        console.log("Getting Sentiments")
        var positivity = getSentimentFromText(bigstring);
      
        console.log("Positiviyt " + positivity)
        return positivity;
      
    } catch (e) {
      return -1
    }
    
    
  }
  
  
});
