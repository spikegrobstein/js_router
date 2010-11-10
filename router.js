var Router = {
	boot: function() {
		// any link that gets clicked shoudl do this...
		$('a').live('click', function() {
			// if a non-anchor link is clicked, don't handle it.
			if (!$(this).attr('href').match(/^#/)) {
				return true;
			}

			// handle the click
			Router.route(Router.parse($(this).attr('href')));
		});

		// if a section was requested as part of the page-load, let's get it.
		Router.route(Router.parse());
	},
	
	route: function(request) {
		if (!request.length) { return; }
		request = request.split('/'); // break the request into elements based on / (ie: /downloads/my_app => [ 'downloads', 'my_app' ])
		var element = $('#' + request[0] + '.section'); // find the base element

		// if an element was found, then
		// hide other sections and show the selected one.
		if (element) {

			Router.hide_sections(element);
			element.show();
		}
		
		//console.log(request);
	},

	parse: function(href) {
		if (!href) {
			// if href is not specified, pull it from the page URL
			href= window.location.hash;
		}

		var m = href.match(/^\/?#\/?(.+?)$/);

		if (!m) {
			return '';	
		}
		
		return m[1];
	
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


