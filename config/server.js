MeteorCandy.server = {
	// the maximum amount of accounts that Meteor Candy can return per query
	resultLimit: 25,

	// This function must return true for Meteor Candy to run in production
	validation: function () {
		return false;
	},

	// DDP Rate limiting
	requestLimit: 10,
	requestLimitForSearch: 50,
    requestTimeout: 5000,

	// For stats, the name and value key's are placed on the left menu bar
	// When opened, they will display whatever is in the data key
	// The data key must contain an array of objects that have "name" and "value" in them  
	
	// midnight is a date object from the client, consisting of
	// when their day started in their local timezone
	// that way, you can display stats for today instead of past 24 hours
	
	stats: [{
		name: "Total Accounts",
		value: function () {
			return MeteorCandy.accountStats.getCount();
		}, 
		content: function () {
			return MeteorCandy.accountStats.getContent();
		} 
	}, {
		name: "Past 30 Days",
		value: function () {
			return MeteorCandy.accountStats.getCount(30);
		}, 
		content: function () {
			return MeteorCandy.accountStats.getContent(30);
		} 
	}, {
		name: "Past 7 Days",
		value: function () {
			return MeteorCandy.accountStats.getCount(7);
		}, 
		content: function () {
			return MeteorCandy.accountStats.getContent(7);
		} 
	}, {
		name: "Today",
		value: function (dayStart) {
			return MeteorCandy.accountStats.getCount(1, dayStart);
		}, 
		content: function (dayStart) {
			return MeteorCandy.accountStats.getContent(1, dayStart);
		} 
	}],

	// Meteor Candy will check for each field specified below
	// If it exists, it'll content it to your specification
	// and display on the client with the name
	// Fields prefixed with _ are required

	profile: [{
		name: "_id",
		field: "_id",
		content: function (data) {
			return data;
		} 
	}, {
		name: "_displayName",
		field: null,
		content: function (data) {
			return MeteorCandy.generator.profile.fields.displayName(data);
		} 
	}, {
		name: "_avatar",
		field: null,
		content: function (data) {
			return MeteorCandy.generator.profile.fields.avatar(data);
		} 
	}, {
		name: "Emails",
		field: "emails",
		content: function (data) {
			emailString = "";
			number = 0;

			data.forEach(function (email) {
				
				if (number) {
					emailString = emailString + ", ";
				}

				number = number++;
				emailString = emailString + email.address;
			});

			return emailString;
		}
	}, {
		name: "Facebook Email",
		field: "services.facebook.email"
	}, {
		name: "Username",
		field: "username",
		content: function (data) {
			if (data) {
				return data;
			}
		}
	}, {
		name: "Join Date",
		field: "createdAt",
		content: function (data) {
			return  moment(data).format('dddd, MMMM D, YYYY');
		}
	}, {
		name: "Join Time",
		field: "createdAt",
		content: function (data) {
			return  moment(data).format('h:mm A Z');
		}
	}, {
		name: "Login Sessions",
		field: "services.resume.loginTokens",
		content: function (data) {
			return data.length || "0";
		}
	}]
}