MeteorCandy.client = {
	
	// display visual shortcut in bottom left corner
	showWidget: true,

	// hide these fields when showing the user profile
	hiddenProfilesFields: ["_id", "_displayName", "_avatar"],

	// default tab for opening
	// options: Main, Search, Recents
	defaultTab: "Recents",

	// default tab for account stats
	// it must mirror stats[].name as in server.js
	defaultMainTab: "Total Accounts",

	// open sesame
	// for keycodes, see: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	keyCode: 68,

	// This function must return true for Meteor Candy to run in production
	permission: function () {
		return false;
	}

}