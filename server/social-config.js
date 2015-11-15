ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1647488272167372',
    secret: '7a2c3117f8f54dbfcadcaea44b00ed85'
});

Meteor.publish('userData', function () {
	return Meteor.users.find({_id: this.userId},
		{fields: {'services': 1 }
	});
});