/*
**	mapping_router.js
**
**	classes to simplify delegation from RouterCore
**
**	Depends on RouterCore and QueryString
**
**	written by Spike Grobstein <spikegrobstein@mac.com>
**	(c) 2010 Spike Grobstein
*/

MappingRouter.prototype = new RouterCore();
MappingRouter.prototype.constructor = MappingRouter;

/*
**	controller_bundle: hash
**	root_controller: string
** 
**	controller_bundle is a hash which is key'd by controller name.
**	each controller can contain actions (default support for index and show)
**	special controller name 'root' can be used as root controller to handle empty requests (index action)
**
**	root_controller (optional) is the name of the controller that will handle empty requests
*/
function MappingRouter(controller_bundle, root_controller) {
	this.controller_bundle = controller_bundle;
	
	if (root_controller) {
		this.controller_bundle['root'] = root_controller;
	}
}

/*
**	takes the request, breaks it up into parts
**	/people : { controller: people, action: index }
**	/people/1 : { controller: people, action: show, id: 1 }
**	/people;new : { controller: people, action: new }
**	/people/1;edit : { controller: people, :action: edit, id: 1 }
**
**	supports query_strings appended to the URL and integrates it into the request
**	example:
**		#/users/5?verbose=1&lang=en : { controller: users, action: show, id: 5, verbose: 1, lang: en, query_string: 'verbose=1&lang=en' }
*/
MappingRouter.prototype.map = function(request) {
	var query_string = null;
	var raw_query_string = null;
	var action = null;
	var controller = null;
	var id = null;
	var params = null;			// leftover params (array)
	
	var m = null; // our match object
	
	// first, pull apart the entire request into the request and the query_string
	if (m = request.match(/^([^\?]*)\??(.*)/)) {
		raw_query_string = m[2];
		query_string = raw_query_string.read_querystring();
		request = m[1];
	}
	
	// let's pull the action off if it exists
	// action is a suffix after a ;
	// ie: /people/1;edit => action == 'edit'
	if (m = request.match(/^(.+?);(.*)$/)) {
		action = m[2];
		request = m[1];
	}
	
	request = this.request_to_array(request);
	
	// prime our vars
	controller = request.shift();
	id = request.shift();
	params = request; // any remaining items

	//console.log("map pre-process: controller: " + controller + ' | action: ' + action + ' | id: ' + id);

	// default controller is root
	if (!controller) {
		controller = 'root';
	}
	
	if (action == undefined && id == undefined) {
		// if no action and no id, then action is index
		action = 'index';
	} else if (action == undefined) {
		// if no action and an id is specified, action is show
		action = 'show';
	}
	
	// set request to everything that's been parsed so far...
	// next to update it with the query_string params
	request = { 
		controller: controller,
		action: action,
		id: id,
		params: params,
		query_string: raw_query_string
	};
	
	// update request with vars from query_string
	for (k in query_string) {
		if (!request[k]) {
			// only update keys that were not set already (prevents conflicts)
			request[k] = query_string[k];
		}
	}
	
	// return a hash
	return request;
}

/*
**	converts the request (as a string) to an array by splitting on '/' and removing empty elements
*/
MappingRouter.prototype.request_to_array = function(request) {
	// split the action on slashes
	var request_tmp = request.split('/');
	request = [];
	
	// iterate over request_tmp and remove any empty items
	var i;
	for (i in request_tmp) {
		i = request_tmp[i];
		if (i != '') { request.push(i); }
	}
	
	return request;
}

/*
**	takes the result of the map() function and calls the proper action in this.controller_bundle
*/
MappingRouter.prototype.route = function(request) {
	var params = this.map(request);
	var controller = this.controller_bundle[params['controller']];
	
	// make sure that the controller exists
	if (!controller) {
		throw "Invalid controller " + params['controller'];
	}
	
	var action = controller[params['action']];
	
	// make sure that the action exists
	if (!action) {
		throw "Invalid action (" + params['action'] + ") for controller " + params['controller'];
	}
		
	// call the action with params as an argument.
	action(params);
}
