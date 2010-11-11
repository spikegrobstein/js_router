$(document).ready(function() {
	
	Router.boot();
	
});

var RouterConfig = {
	users: {
		// /users/1  /users/1/edit
		_route: '/:user_id/',
		index: function(params) {
			alert('processing index action on users');
		},
		show: function(params) {
			alert('processing show action on users');
		},
		edit: function(params) {
			alert('processing edit action on users!');
		},
		'new': function(params) {
			alert('new user!');
		}
	}
};

Router.route = function(request) {
	if (!request.length) { return; }
	
	// request does not have leading slash or hash mark
	
	request = request.split('/'); // break the request into elements based on / (ie: /downloads/my_app => [ 'downloads', 'my_app' ])
	
	var controller = request.shift();
	
	console.log("controller: " + controller);
	
	if (!RouterConfig[controller]) {
		// the controller does not exist
		throw "Unknown controller: " + controller;
	}
	
	var id = request.shift();
	console.log("id: " + id);
	
	if (id && id != 'new') {
		var action = request.shift();
		console.log("action: " + action);
		if (!action) {
			action = 'show';
		}
		
		RouterConfig[controller][action]();
	} else if (id == 'new') {
		RouterConfig[controller]['new']();
	} else {
		RouterConfig[controller]['index']();
	}
	/*
	var element = $('#' + request[0] + '.section'); // find the base element

	// if an element was found, then
	// hide other sections and show the selected one.
	if (element) {

		Router.hide_sections(element);
		element.show();
	}
	*/
	//console.log(request);
};