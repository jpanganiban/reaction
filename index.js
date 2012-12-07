var Reactor = require('./lib/reactor');

var reaction = {

  /**
   *
   * Creates a new reactor instance
   * @param {String} name: Name of the reactor instance
   */
  createReactor: function(name) {
    return new Reactor(name);
  },

  /**
   *
   * Proxy to the Reactor class
   */
  Reactor: Reactor
};


module.exports = exports = reaction;
