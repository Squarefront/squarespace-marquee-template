
/**
 * Sets up a template-customized instance of MutationObserver, a DOM API that allows you to react to changes in the DOM.
 */

(function() {

  /**
   * @constructor
   * @param  {Object} config   Configuration object containing the settings for an instance of templateMutationObserver.
   */
  var templateMutationObserver = function(config) {

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    if (!MutationObserver) {
      return;
    }

    // The nodes on which to observe DOM mutations
    this.targets = config.targets || [
      document.body.querySelector('.sqs-block-form'),
      document.body.querySelector('.sqs-block-tourdates'),
      document.body.querySelector('.sqs-block-code')
    ];

    // Specifies which DOM mutations should be reported
    this.options = {
      childList: true,
      subtree: true
    }

    this.callback = config.callback;
    this.args = config.args || {};

    this.observer = this.createObserver(MutationObserver);
    this.observeTargets();
    
  };

  templateMutationObserver.prototype = {

    createObserver: function(MutationObserver) {
      var self = this;
      return new MutationObserver(function(mutations){
        self.evaluateMutations(mutations, self);
      });
    },

    observeTargets: function() {
      var len = this.targets.length;
      for (var i = 0; i < len; i++) {
        var target = this.targets[i];
        if (target) {
          this.observer.observe(target, this.options);
        }
      }
    },

    bind: function() {
      window.addEventListener("beforeunload", function (event) {
        this.destruct();
      });
    },

    destruct: function() {
      this.observer.disconnect();
      this.observer = null;
    },

    /**
     * Evaluate the mutations that are observed. If nodes are dynamically loaded/removed into/from the DOM, run the callback.
     *
     * @method evaluateMutations
     * @param  {Array}              mutations   An array of MutationRecord objects
     */
    evaluateMutations: function(mutations, self) {
      if (!mutations) {
        return;
      }

      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].type === 'childList') {
          if(document.readyState === "complete") {
            self.reactToMutations();
          }
          else {
            document.addEventListener("DOMContentLoaded", function () {
              self.reactToMutations();
            }, false);
          }
          break;
        }
      }
    },

    /**
     * What to do when pertinent changes to the DOM take place.
     *
     * @method reactToMutations
     */
    reactToMutations: function() {
      if (this.timer) {
        clearTimeout(this._timer);
      }
      var self = this;
      this.timer = setTimeout(function(){
        self.callback.apply(window || {}, this.args);
      }, 150);
    }

  };


  window.templateMutationObserver = templateMutationObserver;

}());