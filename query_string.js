/*
	query_string.js
	
	library for parsing and building querystrings using QueryString object.
	"name=spike&age=29" <=> { name: 'spike', age: '29' }
	
	supports url encoding/decoding when necessary.
	
	also extends String class with 3 new methods
	
	written by Spike Grobstein <spikegrobstein@mac.com>
	©2010 Spike Grobstein
*/

/*
**	parse a query string into a hash
*/
String.prototype.read_querystring = function() {
	return QueryString.parse(this);
};

/*
**	encode given string for use in URL
*/
String.prototype.url_encode = function() {
	return encodeURIComponent(this);
}

/*
**	decode given string from a URL
*/
String.prototype.url_decode = function() {
	return decodeURIComponent(this);
}

/*
**	QueryString object
*/
var QueryString = {
	/*
	**	parse from string to hash
	*/
	parse: function(str) {
		var qs = {};
		var pairs = str.split('&'); // the pairs of values

		for (pair in pairs) {
			pair = pairs[pair];

			// now split this pair on the =
			var m = pair.split('=', 2);

			if (m.length != 2) {
				continue;
			}

			qs[m[0].url_decode()] = m[1].url_decode();
		}

		return qs;
	},
	
	/*
	**	create string from hash
	*/
	build: function(hash) {
		var qs = '';
		
		for(k in hash) {
			if (qs.length > 0) { qs += '&'; }
			
			qs += k.url_encode() + '=' + hash[k].url_encode();
		}
		
		return qs;
	}
}
