Tasks = new Mongo.Collection("tasks");
var access_token = '';

// Only publish tasks that are public or belong to the current user
Meteor.publish("tasks", function () {
  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});

Meteor.methods({
    addTask: function (text) {
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
   
      Tasks.insert({
        text: text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    },
    deleteTask: function (taskId) {
      var task = Tasks.findOne(taskId);
      if (task.private && task.owner !== Meteor.userId()) {
        // If the task is private, make sure only the owner can delete it
        throw new Meteor.Error("not-authorized");
      }
      Tasks.remove(taskId);
    },
    setChecked: function (taskId, setChecked) {
      var task = Tasks.findOne(taskId);
      if (task.private && task.owner !== Meteor.userId()) {
        // If the task is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }
      Tasks.update(taskId, { $set: { checked: setChecked} });
    },
    setPrivate: function (taskId, setToPrivate) {
      var task = Tasks.findOne(taskId);
   
      // Make sure only the task owner can make a task private
      if (task.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
   
      Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
    getPhotoEvals: function (friend) {
        var accessToken = Meteor.user().services.facebook.accessToken;
        console.log(accessToken);
	    callback = function(error, response) {
            if (error != null) {
                console.log("ERROR:" + error)
            } else {
                contentString = response['content'];
                content = JSON.parse(contentString);
                if (content != null) {
                    for (let pic of content.photos.data) {
                        if (pic.images.length > 0) {
                            var url = pic.images[0].source;
                            console.log(url);
                            getEmotionFromURL(url);
                        }
                    }
                }
            }
        } 
	 	
        //var graphURL = 'https://graph.facebook.com/me';
        var graphURL = 'https://graph.facebook.com/me?fields=photos.limit(5000){id, images}&access_token=' + accessToken;
//	    HTTP.get(graphURL, {fields: 'photos', access_token: accessToken}, asyncCallback=callback);
        HTTP.get(graphURL, asyncCallback=callback);
    }
  });

