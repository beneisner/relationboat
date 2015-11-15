Tasks = new Mongo.Collection("tasks");

 // This code only runs on the client
Meteor.subscribe("tasks");

Template.body.helpers({
  tasks: function() {
    if (Session.get("hideCompleted")) {
      return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    }
    else {
      // Otherwise, return all of the tasks
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  },
  hideCompleted : function () {
    return Session.get("hideCompleted");
  },
  incompleteCount: function () {
    return Tasks.find({checked: {$ne: true}}).count();
  }
});

Template.body.events({
  "submit .new-task" : function (event) {
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call("addTask", text);

    // Clear form
    event.target.text.value = "";
  },
  "change .hide-completed input" : function (event) {
    Session.set("hideCompleted", event.target.checked);
  }
});

Template.task.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Template.task.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "click .delete": function () {
    Meteor.call("deleteTask", this._id);
  },
  "click .toggle-private": function () {
    Meteor.call("setPrivate", this._id, ! this.private);
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});


