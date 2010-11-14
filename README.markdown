# JS Router

## Summary

The purpose of this project is to provide a simplified interface for handling requests in your Javascript application. The methods implemented in this library involve attaching the router to handle every `<a>` tag on the page using jquery's `$.live()` function. `<a>` tags that have the href attribute set to a value starting with '#' will have the href run through the router.

The library includes 2 classes:
 * `RouterCore` -- a very simple class which allows you to attach a handler for the request.
 * `MappingRouter` -- a more advanced class that provides an interface for more complex delegation of requests.

a link like this:
  `<a href="/about_us">About</a>`
will function like normal

a link like this:
  `<a href="#/about_us">About</a>`
will be processed by the router. the request argument will come through as "/about_us"

## Examples and Documentation:

### RouterCore

    var r = new RouterCore(function(request) {
      // this is the handler for the request
      // request is the string following the # in the URL
      alert('You have requested: ' + request);
    });

RouterCore's main purpose is to be sub-classed to create more complex handlers of requests. MappingRouter is a simple example of what can be accomplished by a subclass.

### MappingRouter

    var r = new MappingRouter({
      people: {
        index: function(request) {
          console.log(request);
        },
        show: function(request) {
          console.log(request);
        }
      },
      about: {
        index: function(request) {
          console.log(request);
        }
      },
      home: {
        index: function(request) {
          console.log(request);
        }
      }
    }, 'home');

The above only spits log messages to the console for each request for illustrative purposes. The `controller_bundle` (the first param in the `MappingRouter` constructor) is a hash that's key'd by the controller name. Each item of the hash should contain a hash of functions keyed by action name.

The second, optional, parameter to the constructor is the name of the controller that should be used in the event that nothing is provided in the URL for the router. Rather than providing this parameter, you can name a controller 'root'. advantage of using the parameter is that both an empty request and '/home' would route the same way.

The following are examples of how requests are routed to the controllers:

 * empty request -- the default controller's index action (provided as a second
      param to the constructor)
 * /people -- { controller: people, action: index }
 * /people/10 -- { controller: people, action: show, id: 10 }
 * /people/10;edit -- { controller: people, action: edit, id: 10 }
 * /people/10;validate -- { controller: people, action: validate, id: 10 }
 * /people;new -- { controller: people, action: new }

as can be seen above, the request is parsed in the following way:

 * controller: first path element
 * id: second path element
 * action: trailing string after a semicolon (;)

anything after the id in the path element is returned as an array in the request keyed as 'params'. For example:

 * /people/10/comments/20;blarge => { controller: people, action: blarge, id: 10, params: [ 'comments', '20' ] }