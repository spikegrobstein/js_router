function RouterCore(route_callback) {
	if (route_callback) {
		this.route = route_callback;
	}
}

/*
**	start up the router. set up all <a> tags to
**	be powered by this object if their href attribute
**	starts with a #
*/
RouterCore.prototype.boot = function() {
	var router = this;
	
	// any link that gets clicked should do this...
	$('a').live('click', function() {
		// if a non-anchor link is clicked, don't handle it.
		if (!$(this).attr('href').match(/^#/)) {
			return true;
		}

		// handle the click
		router.route(router.strip_hash($(this).attr('href')));
	});

	// if a section was requested as part of the page-load, let's get it.
	router.route(this.strip_hash(window.location.hash));
}

/*
**	this gets overridden by you to handle routing
*/
RouterCore.prototype.route = function(request) {
	throw "You need to override the Request.route() function, dude.";
}

/*
**	strips the leading # off the request
*/
RouterCore.prototype.strip_hash = function(request) {
	var m = request.match(/^#(.*$)/);
	
	if (m) {
		return m[1];
	}
	
	return request;
}
/*
Router.prototype.parse = function(request) {
	if (!request) {
		// if href is not specified, pull it from the page URL
		request= window.location.hash;
	}

	var m = request.match(/^\/?#\/?(.+?)$/);

	if (!m) {
		return '';	
	}
	
	return m[1];
}


var Router = {
	boot: function() {

	},
	
	route: function(request) {
	},

	parse: function(href) {

	
	},
	
	clean: function(request) {
		var new_request = [];
			
		$(request).each(function(i, request_item) {
			if (request_item != '') {
				console.log('adding: ' + request_item);
				new_request.push(request_item);
			}
		});
				
		return new_request;
	},
	
	map: function(href, map) {
		var request = Request.clean(href.split('/'));
		console.log(request);
		
		var mapping = {};
		var map_elements = map.split('/');
		
		$(map_elements).each(function(i, map_element) {
			if (map_element == '*') {
				mapping['PARAMS'] = request;
			} else {
				mapping[map_element] = request.shift();
			}
		});
	},
	
	hide_sections: function(except_element) {
		$('.section').each(function() {
			if ($(this) != except_element) {
				$(this).hide();
			}
		});
	}
}

*/
