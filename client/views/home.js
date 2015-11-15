Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({requestPermissions: ['user_posts, user_photos']}, function(err){
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

Meteor.subscribe('userData');

Template.timeline.events({
    'click #data': function (e) {
      Meteor.call('getUserData', function(err, data) {
        $('#result').text(JSON.stringify(data, undefined, 4));
      });
    },
});

Template.friendlist.events({
  'click .friend': function(event) {
    console.log("clicked here")
    
    Blaze.renderWithData(Template.timeline, {user: "someName"}, $('.container').get(0))
    $('.parentNode').addClass('hidden')
//    var friendView = Blaze.getView($('.friend').get(0))
//    console.log(friendView)
//    Blaze.remove(friendView);
  }
});

Template.login.helpers({
  chosenFriend: null
});


Template.friendlist.helpers({
  
  // set up local reactive variables
  friends: [
    {
      name:"Ben Eisner",
      pic:"/img/beisner.jpg"
    },
    {
      name:"Frank Jiang",
      pic:"/img/beisner.jpg"
    },
    {
      name:"James Almeida",
      pic:"/img/beisner.jpg"
    },
  ]
});

