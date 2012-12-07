var _ = require('underscore');


/**
 *
 * @class Reactor
 */
var Reactor = function(name) {
  this.name = name || 'reaction';
};

/**
 *
 * Binds an event to the reactor instance
 * @param {String} eventName
 * @param {Function} callback
 */
var on = function(eventName, callback) {
  if (!this.handlers.hasOwnProperty(eventName)) {
    this.handlers[eventName] = [];
  }
  if (!_.isFunction(callback)) throw new Error('Callback is not a function');
  if (!_.contains(this.handlers[eventName], callback)) {
    this.handlers[eventName].push(callback);
  }
  // Allow chaining
  return this;
};

/**
 *
 * Unbinds an event to the reactor instance
 * @param {String} eventName
 * @param {Function} callback
 */
var off = function(eventName, callback) {
  if (this.handlers.hasOwnProperty(eventName)) {
    var reactor = this;
    // Get all indexes of the callbacks.
    var cbIndexes = _.map(this.handlers[eventName], function(val, key) {
      if (val === callback) {
        return key;
      }
    });
    // Remove all instances of the callback.
    _.each(cbIndexes, function(key) {
      if (key !== undefined) {
        reactor.handlers[eventName].splice(key, 1);
      }
    });
  }
  // Allow chaining
  return this;
};

/**
 *
 * Triggers an event
 * @param {String} eventName
 * *params {*} arguments: Will be passed to the callback.
 */
var trigger = function(eventName) {
  if (this.handlers.hasOwnProperty(eventName)) {
    var args = _.rest(arguments, 1);
    _.each(this.handlers[eventName], function(callback) {
      callback.apply(callback, args);
    });
  }
  // Allow chaining
  return this;
};


_.extend(Reactor.prototype, {

  // Event handlers
  handlers: {},

  on: on,
  // Proxy on to subscribe
  subscribe: on,

  off: off,
  // Proxy off to unsubscribe
  unsubscribe: off,

  trigger: trigger,
  // Proxy trigger to publish
  publish: trigger,
  // Proxy trigger to emit
  emit: trigger

});


module.exports = exports = Reactor;
