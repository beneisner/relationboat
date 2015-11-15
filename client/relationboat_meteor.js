
Template.login.events({
    'click #facebook-login': function(event) {
//        Accounts.ui.config({requestPermissions: { facebook: ['user_photos'] }
 //       });
        Meteor.loginWithFacebook({requestPermissions: ['user_photos']}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
            Meteor.call('getPhotoEvals');
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
