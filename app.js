$(document).ready(function() {
	
	var router = new RouterCore(function(request) {
		alert(request);
	});
	
	router.boot();
	
});
