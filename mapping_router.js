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
*/
MappingRouter.prototype.map = function(request) {
	var action = null;
	var controller = null;
	var id = null;
	var params = null;
	
	var m = null;
	
	// first, let's pull the action off if it exists
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
	
	// return a hash
	return { controller: controller, action: action, id: id, params: params };	
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
**
*/
MappingRouter.prototype.route = function(request) {
	var params = this.map(request);
	var controller = this.controller_bundle[params['controller']];
	
	if (!controller) {
		throw "Invalid controller " + params['controller'];
	}
	
	var action = controller[params['action']];
	
	if (!action) {
		throw "Invalid action (" + params['action'] + ") for controller " + params['controller'];
	}
	
	//console.warn(params);
	
	
	action(params);
}
