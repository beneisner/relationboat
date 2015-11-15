//function Facebook(accessToken) {
//    this.fb = Meteor.require('fbgraph');
//    this.accessToken = accessToken;
//    this.fb.setAccessToken(this.accessToken);
//    this.options = {
//        timeout: 3000,
//        pool: {maxSockets: Infinity},
//        headers: {connection: "keep-alive"}
//    }
//    this.fb.setOptions(this.options);
//}

//Facebook.prototype.query = function(query, method) {
//    var self = this;
//    var method = (typeof method === 'undefined') ? 'get' : method;
//    var data = Meteor.sync(function(done) {
//        self.fb[method](query, function(err, res) {
//            done(null, res);
//        });
//    });
//    return data.result;
//}
//
//Facebook.prototype.getUserData = function() {
//    return this.query('me');
//}

Meteor.methods({
    getUserData: function() {
//        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
//        var data = fb.getUserData();
//        return data;
      
        return Meteor.user();
    },

    getPhotoEvals: function (friend) {
        var accessToken = Meteor.user().services.facebook.accessToken;
        var myName = Meteor.user().profile.name;
        console.log("myName: " + myName);
        console.log("accessToken: " + accessToken);


	    callback = function(error, response) {
            if (error != null) {
                console.log("Frank ERROR1:" + error)
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
                                            console.log("Frank ERROR2:" + error);
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
                                                            console.log("person.name: " + person.name);
                                                            friendX = person.x;
                                                            friendY = person.y;
                                                        }
                                                    }
                                                    if (myX != -1 && typeof myX !== 'undefined' && friendX != -1 && typeof friendX !== 'undefined') {
                                                        listOfPics.push({url: id2url[photoID], x1: myX, y1: myY, x2: friendX, y2: friendY}); 
                                                        console.log("FriendX: " + friendX);
                                                        console.log("FriendY: " + friendY);
                                                        countPhotosFound++;
                                                        console.log('Photos found: ' + countPhotosFound);
                                                        console.log("id2url: " + id2url[photoID]);
                                                    }
                                                }
                                                for (let pic of listOfPics) {
                                                    console.log("List of pics: " + pic.url);
                                                }
                                                var emotions = getEmotions(listOfPics);

                                                
                                                setTimeout(function(){ console.log("Emotions: " + emotions); }, 3000);

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
        var graphURL = 'https://graph.facebook.com/me?fields=photos.limit(5000).order(reverse_chronological){id, images}&access_token=' + accessToken;
//	    HTTP.get(graphURL, {fields: 'photos', access_token: accessToken}, asyncCallback=callback);
        HTTP.get(graphURL, asyncCallback=callback);
    }
  
  
});
