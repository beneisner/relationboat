Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({requestPermissions: ['user_photos', 'user_friends']}, function(err){
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
          
            location.reload();
        })
    }
});


Meteor.subscribe('userData');


/************************************************************ 
                TIMELINE TEMPLATE 
************************************************************/
Template.timeline.events({
    'click #data': function (e) {
      Meteor.call('getMessages', "Devon Hartsough");
      Meteor.call('getPhotoEvals', "Tony Jin");
      Meteor.call('getUserData', function(err, data) {
        $('#result').text(JSON.stringify(data, undefined, 4));
      });
    },
});

Template.timeline.helpers({
  emotions: function() {
    return Session.get('emotions');
  }
})

Template.timeline.onRendered(function () {
  var data = Template.currentData()
  var chosenFriend = data.chosenFriend
  $('#chosen').text(chosenFriend);
  
  var arr = [];
  
  Meteor.call('getPhotoEvals', chosenFriend, false, function(err, data) {
    setTimeout(function() {
        Meteor.call('getPhotoEvals', chosenFriend, true, function(err2, data2) {
            console.log(data2);
            Session.set("emotions", data2);
        });
    }, 9000);
  });
  
  Meteor.call('getMessages', chosenFriend, function(err, data) {
    var value = (data * 100).toPrecision(4)
    $('#positivity').text("Message Positivity: " + value + "%");
  });
});



/************************************************************ 
                FRIENDLIST TEMPLATE 
************************************************************/
Template.friendlist.events({
  'click .friend': function(event) {
    console.log(this.name)
    Blaze.renderWithData(Template.timeline, {chosenFriend: this.name}, $('.container').get(0))
    $('.parentNode').addClass('hidden')
  }
});

Template.friendlist.helpers({
  
  // set up local reactive variables
  friends: [
    {
      name:"Ben Eisner",
      pic:"/img/beisner.jpg"
    },
    {
      name:"Maddie Clayton",
      pic:"/img/mec2.jpg"
    },
    {
      name:"Marsha Zhang",
      pic:"/img/mrzhang.jpg"
    },
    {
      name:"Frank Jiang",
      pic:"/img/ffjiang.jpg"
    },
    {
      name:"Joe Yates",
      pic:"/img/jhyates.jpg"
    },
    {
      name:"Hope Lorah",
      pic:"/img/hlorah.jpg"
    },
    {
      name:"James Almeida",
      pic:"/img/jamespa.jpg"
    },
    {
      name:"Victor Du",
      pic:"/img/vdu.jpg"
    },
    {
      name:"Christina Bob Hu",
      pic:"/img/cbhu.jpg"
    },
  ]
});

