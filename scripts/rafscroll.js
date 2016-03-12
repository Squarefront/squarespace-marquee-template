/*!
 * @license
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 */

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                                  window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;

        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
}());

/*!
 * @license
 * rafscroll 0.1
 *
 * Copyright 2015, Kevin Foley - http://github.com/foleyatwork
 * Released under the WTFPL license - http://www.wtfpl.net/txt/copying/
 */
 (function() {
  if (!window.requestAnimationFrame) {
    console.info(
      'Your browser does not support requestAnimationFrame. There is a nice polyfill you can use here.',
      'https://gist.github.com/paulirish/1579671'
    );
    return;
  }

  /** @constant {Number} */
  var SCROLL_TIMEOUT_VALUE = 100;

  /**
   * @class rafscroll
   * @access public
   */
  function rafscroll(callback, args) {
    if (!callback) {
      console.warn('rafScroll: No callback supplied, not initiating.');
      return;
    }

    if (typeof callback != 'function') {
      console.warn('rafScroll: Invalid callback type.');
      return;
    }

    /** @var {Boolean} */
    this._scrolling = false;

    /** @var {Function} */
    this._callback = callback;

    /** @var {Array} */
    this._args = args || [];

    this.subscribe();
  }

  /** @lends rafscroll */
  rafscroll.prototype = {
    /**
     * @method subscribe
     * @access public
     * @memberof rafscroll
     */
    subscribe: function() {
      addEventListener('scroll', scrollCallback.bind(this), false);
    },

    /**
     * @access public
     * @memberof rafscroll
     * @example
     */
    unsubscribe: function() {
      removeEventListener('scroll', scrollCallback.bind(this), false);
    }
  };

  /**
   * @callback scrollCallback
   * @access private
   */
  function scrollCallback(e) {
    this._mostRecentScrollEvent = e;

    if (this._scrolling === false) {
      this._scrolling = true;
      rafscrollCallback.call(this);
    }

    if (this._scrollTimeout) {
      clearTimeout(this._scrollTimeout);
    }

    var self = this;
    this._scrollTimeout = setTimeout(function() {
      self._scrolling = false;
    }, SCROLL_TIMEOUT_VALUE);
  }

  /**
   * @method rafscrollCallback
   * @access private
   */
  function rafscrollCallback() {
    // Add the event to the arguments array.
    this._args.unshift(this._mostRecentScrollEvent);

    // Invoke the callback.
    this._callback.apply(window || {}, this._args);

    // Remove the event from the arguments array so it doesn't get passed in the
    // next callback instance.
    this._args.shift();

    // Invoke the function again if we're still scrolling.
    if (this._scrolling === true) {
      requestAnimationFrame(rafscrollCallback.bind(this));
    }
  }

  // Export an amd module, commonJS module, or create a namespace.
  if (typeof define === 'function' && define.amd) {
    define('rafscroll', rafscroll);
  } else if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    module.exports = { rafscroll: rafscroll };
  } else {
    window.rafscroll = rafscroll;
  }
}());
