Reaction
========

A simple reactor hub for nodejs.

Usage
-----

    var reactor = require('reaction').createReactor();

    reactor.on('sayHello', function(name) {
        console.log("Hello, ", name);
    });

    reactor.trigger('sayHello', "John Doe");
