$(document).ready(function() {
	
	var router = new MappingRouter({
		root: {
			index: function(params) {
				console.log(params);
			}
		},
		
		people: {
			index: function(params) {
				console.log(params);
			},
			show: function(params) {
				console.log(params);
			},
			'new': function(params) {
				console.log(params);
			},
			edit: function(params) {
				console.log(params);
			},
		},
		
		events: {
			index: function(params) {
				console.log(params);
			},
			show: function(params) {
				console.log(params);
			},
			'new': function(params) {
				console.log(params);
			},
			edit: function(params) {
				console.log(params);
			},
		},
		
		home: {
			index: function(params) {
				console.log(params);
			}
		},
		
		about: {
			index: function(params) {
				console.log(params);
			}
		}
	});
	
	router.boot();
	
});
