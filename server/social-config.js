ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '546709008820920',
    secret: 'fe9783949adb29de693cd000343f11a1'
});

Meteor.publish('userData', function () {
	return Meteor.users.find({_id: this.userId},
		{fields: {'services': 1 }
	});
});
