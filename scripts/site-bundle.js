/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	  window.rafscroll = rafscroll;
	  // module.exports = rafscroll;
	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

	
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var DEBUG = false;
	var VideoBackgroundRenderer = __webpack_require__(4).VideoBackground;
	var GetVideoProps = __webpack_require__(4).getVideoProps;
	
	Y.use([
	  'node',
	  'squarespace-ui-base',
	  'yui-throttle',
	  'squarespace-gallery-ng'
	], function(Y) {
	
	  window.Site = Singleton.create({
	    PARALLAX_FACTOR: 0.8, // eg: 80% of actual scroll
	    SCROLL_SPEED: 0.6, // in seconds
	    IMAGE_VIEWPORT: null, // exposed as tweak
	    INITIAL_WINDOW_HEIGHT: Y.config.win.innerHeight,
	    AUTHENTICATED: document.documentElement.classList.contains('authenticated-account'),
	
	    pageOffsets: {}, // cache pages' document position
	
	    docHeight: 0,
	
	    ready: function() {
	      if (DEBUG) {
	        this._readyTime = Date.now();
	      }
	
	      document.addEventListener('DOMContentLoaded', this.guardedInitialize.bind(this));
	      Y.on('domready', this.guardedInitialize, this);
	
	    },
	
	    /**
	     * A guarded initialize that will only ensure invoking the guarded function once.
	     *
	     * @method guardedInitialize
	     */
	    guardedInitialize: function() {
	
	      if (this._guardedInitializeAlreadyRan === true) {
	        if (DEBUG) {
	          console.log('guarding invocation of initialize!');
	        }
	
	        this.syncUI();
	        this.positionImages();
	
	        return;
	      }
	
	      if (DEBUG) {
	        console.log(Date.now() - this._readyTime + 'ms between ready and initialize.');
	      }
	
	      this._guardedInitializeAlreadyRan = true;
	      this.initialize();
	
	    },
	
	    initialize: function() {
	      this.parallaxImages = Y.all('#parallax-images .image-container');
	      this.parallaxPages = Y.all('.parallax-item');
	      this.scrollEl = Y.one(document.scrollingElement || (Y.UA.gecko || Y.UA.ie || !!navigator.userAgent.match(/Trident.*rv.11\./) ? 'html' : 'body'));
	      this.viewportH = Y.one('body').get('winHeight');
	      this.isMobile = !Y.Lang.isUndefined(window.orientation) || (Y.UA.ie > 0 && Y.UA.ie <= 9);
	
	      this.bindUI();
	      this.syncUI();
	
	      this.textShrink('.page-title','.page-title-wrapper');
	      this.textShrink('.page-desc p > strong','.page-desc p');
	      this.textShrink('.collection-type-events.view-list .entry-title-wrapper h1.entry-title','.collection-type-events.view-list .entry-title-wrapper');
	      this.textShrink('.collection-type-blog.view-list.blog-layout-columns .entry-title-wrapper h1.entry-title','.collection-type-blog.view-list.blog-layout-columns .entry-title-wrapper');
	
	      if (Y.one('body.collection-type-index')) {
	        this.handleIndex();
	      }
	
	      this.listenTweaks();
	      if (this.AUTHENTICATED) {
	        this.bindUIForStackedItems();
	      }
	
	
	      Y.one('body').addClass('loaded');
	
	      // Handle
	      if (Y.UA.ie) {
	        Y.one('html').addClass('ie' + Y.UA.ie);
	      }
	
	      // Handle Win 8
	      if (!this.isMobile) {
	        Y.one('html').removeClass('touch');
	      }
	
	      var videoBackgroundNodes = Array.prototype.slice.call(document.body.querySelectorAll('div.sqs-video-background'));
	      var videoBackgrounds = videoBackgroundNodes.map(function(item) {
	        new VideoBackgroundRenderer(GetVideoProps(item))
	      });
	
	      // [TMP-3972]
	      // Unfortunate solution to long-standing issue with gallery blocks and summary blocks interfering with
	      // parallax point calculation.
	      if (!Y.one('.sqs-edit-mode-active') &&
	          (Y.one('.sqs-block-gallery') || Y.one('.sqs-block-summary-v2'))) {
	        var self = this;
	        var imagesLoadedInterval = setInterval(function() {
	          if (!Y.one('img.loading')) {
	            self.syncUI();
	            if (Y.one('body.collection-type-index')) {
	              self.handleIndex();
	            }
	            clearInterval(imagesLoadedInterval);
	          }
	        }, 100);
	
	        setTimeout(function(){
	          clearInterval(imagesLoadedInterval);
	        }, 60000);
	      }
	    },
	
	    handleIndex: function() {
	      // jump to hash url
	      if (Y.config.win.location.hash) {
	        this.onHashChange({
	          newHash: window.location.hash.replace('#', ''),
	          quick: true
	        });
	      } else {
	        this.updateActivePage();
	      }
	
	      this.positionImages();
	    },
	
	    // all event handlers go here
	    bindUI: function() {
	      if (Y.one('body.collection-type-index')) {
	        var scrollArrow = Y.one('.scroll-arrow');
	        if (scrollArrow) {
	          scrollArrow.on('click', function() {
	            var nextItem = scrollArrow.ancestor('.title-desc-wrapper').next('.content');
	            if (nextItem) {
	
	              var nextItemY = nextItem.getY();
	
	              if (Y.one('body.fixed-header')) {
	                nextItemY = nextItemY - Y.one('#header').get('offsetHeight');
	              }
	
	              var scrollAnimation = new Y.Anim({
	                node: Y.one(Y.UA.gecko || Y.UA.ie || !!navigator.userAgent.match(/Trident.*rv.11\./) ? 'html' : 'body'),
	                to: {
	                  scrollTop : nextItemY
	                },
	                duration: 0.5,
	                easing: 'easeOut'
	              });
	              scrollAnimation.run();
	              scrollAnimation.on('end', function () {
	                scrollAnimation.destroy();
	              });
	            }
	          });
	        }
	
	        // Chaining scroll events to requestAnimationFrame. This seems to make
	        // things smoother.
	        var rafParallax = new rafscroll(Y.bind(function() {
	          this.positionImages();
	          if (Y.one('#parallax-nav')) {
	            this.updateActivePage();
	          }
	        }, this));
	
	        var resizeEvent = Y.UA.mobile ? 'orientationchange' : 'resize';
	        Y.one(Y.config.win).on('resize', Y.throttle(Y.bind(function() {
	          this.syncUI();
	          this.positionImages();
	        },this), 50), this);
	
	        Y.on('hashchange', Y.bind(this.onHashChange,this), Y.config.win);
	
	        Y.all('#parallax-nav a').each(function(link) {
	          link.on('click', function() {
	            if (link.getAttribute('href') === window.location.hash) {
	              // force hash update
	              this.onHashChange({
	                newHash: link.getAttribute('href').replace('#', '')
	              });
	            }
	          }, this);
	        }, this);
	
	        Y.one('.back-to-top-link a').on('click', function(e) {
	          e.halt();
	          this.onHashChange({
	            newHash: Y.one('[data-url-id]').getAttribute('data-url-id')
	          });
	        }, this);
	
	        Y.all('#desktopNav .external-link a[href*="#"]').each(function(link) {
	          link.on('click', function(e) {
	            var target = Y.one(link.getAttribute('href'));
	            if (target) {
	              var targetY = target.getXY()[1];
	              e.preventDefault();
	
	              this.autoScrolling = true;
	              this.scrollEl.anim({}, {
	                to: { scroll: [0, targetY ] },
	                duration: this.SCROLL_SPEED,
	                easing: Y.Easing.easeBoth
	              }).run().on('end', function() {
	                if(this.scrollEl.get('scrollTop') !== targetY) {
	                  this.scrollEl.set('scrollTop', targetY);
	                }
	                this.autoScrolling = false;
	                this.updateActivePage();
	              }, this);
	            }
	          }, this);
	        }, this);
	
	        var mutationObserver = new templateMutationObserver({
	          callback: Y.bind(function(){
	            this.syncUI();
	            this.positionImages();
	          }, this)
	        });
	
	      } else {
	
	        Y.one(Y.config.win).on('scroll', Y.bind(function() {
	          this.positionBackgroundImage();
	        },this), this);
	
	        var resizeEvent = Y.UA.mobile ? 'orientationchange' : 'resize';
	        Y.one(Y.config.win).on(resizeEvent, Y.throttle(Y.bind(function() {
	          this.syncUI();
	          this.positionBackgroundImage();
	        },this), 50), this);
	
	      }
	
	      this.setupMobileNav();
	      this.setScrollArrowColor();
	
	    },
	
	    bindUIForStackedItems: function() {
	      // Listen to DOM reorders to keep items not in flow upto date
	      window.addEventListener('sqs-stacked-items-dom-reorder', function(e){
	        // Reorder the image DOM nodes to match the new section order
	        var parallaxImageForMovedItem = this.parallaxImages.item(e.detail.oldIndex).getDOMNode();
	        var parallaxImageGroupContainer = parallaxImageForMovedItem.parentNode;
	        var insertBeforeIndex = e.detail.oldIndex < e.detail.newIndex ? e.detail.newIndex + 1 : e.detail.newIndex;
	
	        if (insertBeforeIndex >= parallaxImageGroupContainer.children.length) {
	          parallaxImageGroupContainer.appendChild(parallaxImageForMovedItem);
	        } else {
	          parallaxImageGroupContainer.insertBefore(
	            parallaxImageForMovedItem,
	            this.parallaxImages.item(insertBeforeIndex).getDOMNode()
	          );
	        }
	
	        // Re cache our pages and images - for use in parallax
	        this.parallaxPages = Y.all('.parallax-item');
	        this.parallaxImages = Y.all('#parallax-images .image-container');
	
	        // Call syncUI to keep parallax images in order
	        this.syncUI();
	      }.bind(this));
	
	      // Listen to drag and syncUI accordingly
	      [
	        'sqs-stacked-items-drag',
	        'sqs-stacked-items-after-drag-end'
	      ].forEach(function(eventName) {
	        window.addEventListener(eventName, function(e){
	          // Call syncUI to keep parallax images in sync with dragged item
	          this.syncUI();
	        }.bind(this));
	      }.bind(this));
	
	      // Listen to drag start and beforeEnd and toggle class to paired image
	      [
	        'sqs-stacked-items-drag-start',
	        'sqs-stacked-items-before-drag-end'
	      ].forEach(function(eventName){
	        window.addEventListener(eventName, function(e){
	          // Call syncUI to keep parallax images in sync with dragged item
	          this.syncUI();
	
	          var inflightItem = Y.one('.sqs-in-flight');
	          var inflightItemUrlId = inflightItem.getAttribute('data-url-id');
	          var inflightItemParallaxImage = Y.one('.image-container[data-url-id="'+inflightItemUrlId+'"]');
	          if (!inflightItemParallaxImage) { return; }
	
	          if ( eventName === 'sqs-stacked-items-drag-start') {
	            inflightItemParallaxImage.addClass('sqs-in-flight-item-parallax-image');
	            return;
	          }
	
	          inflightItemParallaxImage.removeClass('sqs-in-flight-item-parallax-image');
	        }.bind(this));
	      }.bind(this));
	    },
	
	    // put things you'd like to happen on init and window resize here
	    syncUI: function() {
	
	      var $body = Y.one('body');
	      var headerHeight = Y.one('#header').get('clientHeight');
	      var titlePadding = 80; // wish there was an easier way to get this
	      var bFixedHeader = $body.hasClass('fixed-header');
	      var bTitleOverImage = $body.hasClass('title--description-position-over-image');
	
	      this.parallaxOff = Y.Squarespace.Template.getTweakValue('parallax-scrolling') == 'false';
	
	      this.viewportH = $body.get('winHeight');
	      this.docHeight = $body.get('docHeight');
	
	      if (Y.one('body.collection-type-index')) {
	
	        if (this.isMobile) {
	          this.setupMobileLayout();
	          Y.one('#header').setStyle('position', 'absolute');
	
	          Y.one('.sqs-cart-dropzone').setStyle('marginTop', headerHeight);
	          if (Y.one('.parallax-images > .image-container:nth-child(1) > img')) {
	            Y.one('.title-desc-wrapper').setStyle('minHeight', '600px');
	          }
	
	          if(Y.UA.ie > 0 && Y.UA.ie <= 9) {
	            Y.one('.title-desc-wrapper').setStyle('paddingTop', bTitleOverImage ? titlePadding + headerHeight : headerHeight);
	          } else {
	            Y.one('.title-desc-wrapper').setStyle('paddingTop', headerHeight);
	          }
	
	        } else {
	          Y.one('#content-wrapper').setStyle('marginTop', bFixedHeader ? headerHeight : null);
	          // add extra padding to all items
	          Y.all('.title-desc-wrapper.has-main-image').setStyle('paddingTop', bFixedHeader && bTitleOverImage ? titlePadding + headerHeight : null);
	          // remove extra padding from first
	          Y.one('.title-desc-wrapper.has-main-image') && Y.one('.title-desc-wrapper.has-main-image').setStyle('paddingTop', null);
	        }
	
	        var imageHeightTweak = Y.Squarespace.Template.getTweakValue('index-image-height');
	        if (imageHeightTweak == 'Fullscreen') {
	          this.IMAGE_VIEWPORT = 1;
	        } else if (imageHeightTweak == 'Half') {
	          this.IMAGE_VIEWPORT = 0.5;
	        } else {
	          this.IMAGE_VIEWPORT = 0.66;
	        }
	
	        // First image same height as others, or fullscreen
	        this.firstImageHeight = Y.Squarespace.Template.getTweakValue('first-index-image-fullscreen') === 'true' ? this.viewportH : parseInt(this.viewportH * this.IMAGE_VIEWPORT);
	        this.restImageHeight = parseInt(this.viewportH * this.IMAGE_VIEWPORT);
	
	        var imgs = new Y.NodeList();
	        this.parallaxPages.each(function(page,i) {
	
	          if (!this.isMobile) {
	
	            var isReorderingStackedItems = $body.hasClass('sqs-items-reordering');
	
	            // Set image foreground equal to viewport
	            if (!this.AUTHENTICATED || !isReorderingStackedItems) {
	              var imageH = i === 0 ? this.firstImageHeight - Y.one('#header').get('clientHeight') : this.restImageHeight;
	            }
	
	            // handle short viewports
	            if (bTitleOverImage) {
	              var effectivePadding = bFixedHeader ? headerHeight + titlePadding*2 : titlePadding*2;
	              imageH = Math.max(imageH, page.one('.title-desc-inner').height() + effectivePadding);
	
	              // make image container tall enough to account for title-desc-wrapper height
	              var imageContainerH = i === 0 ? imageH + headerHeight : imageH;
	              this.parallaxImages.item(i).setStyle('height', Math.max(this.viewportH, imageContainerH) + 'px');
	            }
	
	            var img = this.parallaxImages.item(i).one('img');
	            if (img) {
	              page.one('.title-desc-wrapper').setStyle('height', imageH + 'px');
	              imgs.push(img.removeAttribute('data-load'));
	            }
	          }
	
	          // Update cache
	          if (!this.AUTHENTICATED || !isReorderingStackedItems) {
	            // Leave top item fixed
	            this.pageOffsets[page.getAttribute('data-url-id')] = i === 0 ? 0 : Math.round(page.getXY()[1]);
	          } else {
	            // Sync position of all items
	            this.pageOffsets[page.getAttribute('data-url-id')] = Math.round(page.getXY()[1]);
	          }
	        }, this);
	        Y.Squarespace.GalleryManager.addImageQueue(imgs);
	
	        // refresh image state
	        this.parallaxImages.each(function(imgWrapper, i) {
	          var img = imgWrapper.one('img');
	          if(!img) { return; }
	
	          if (img.getAttribute('src')) {
	            ImageLoader.load(img);
	          }
	        }, this);
	
	        this.stickyCart();
	
	      } else {
	        var img = Y.one('.banner-image img');
	        img && ImageLoader.load(img);
	        Y.one('.sqs-cart-dropzone').setStyle('marginTop', headerHeight);
	        this.stickyCart();
	
	        if (!this.isMobile) {
	          Y.one('#header-wrapper').setStyle('paddingTop', bFixedHeader ? headerHeight : null);
	        }
	      }
	
	      // center collection title
	      if ( !this.isMobile /*&& !(Y.UA.ie > 0 && Y.UA.ie <= 9)*/ ) {
	        if (Y.one('.collection-type-index.title--description-alignment-center.title--description-position-over-image')) {
	          Y.all('.title-desc-wrapper.has-main-image').each( function(n) {
	            n.one('.title-desc-inner').setStyles({
	              top: '50%',
	              left: '50%',
	              transform: 'translatex(-50%) translatey(-50%)'
	            });
	          });
	        }
	
	        // sets collection title/desc under header in top left position
	        if (Y.one('.collection-type-index.title--description-alignment-left')) {
	          Y.all('.title-desc-wrapper.over-image.has-main-image .title-desc-inner').setStyles({
	            top: null,
	            left: null,
	            transform: 'translatex(0) translatey(0)'
	          });
	        }
	
	        if (Y.one('#parallax-nav')) {
	          var parallaxNavHeight = Y.one('#parallax-nav').get('offsetHeight');
	          Y.one('#parallax-nav').setStyle('marginTop', (-1 * (parallaxNavHeight / 2)));
	        }
	      }
	
	      // check for emtpy footer
	      if (!Y.one('.footer-wrapper .sqs-block')) {
	        Y.one('.footer-wrapper').addClass('empty');
	      }
	
	      // check for nav, hide menu icon if none
	      if (Y.one('.nav-wrapper')) {
	        $body.addClass('has-nav');
	      }
	
	      this.headerBgOnScroll();
	
	    },
	
	    // shrink on blog and event titles in list view
	    textShrink: function(element, ancestor) {
	      if(Y.one(element) && Y.one(element).ancestor(ancestor)){
	        Y.all(element).each(function(item){
	          item.plug(Y.Squarespace.TextShrink, {
	            parentEl: item.ancestor(ancestor)
	          });
	        });
	      }
	    },
	
	    setupMobileLayout: function () {
	      /* Calculate the imageHeight. */
	      var viewportHeight = Y.config.win.innerHeight > Y.config.win.innerWidth ? screen.height : screen.width;
	      var imageHeightTweak = Y.Squarespace.Template.getTweakValue('index-image-height');
	      var headerHeight = Y.one('#header').get('clientHeight');
	      var imageHeight;
	
	      switch(true) {
	        case imageHeightTweak == 'Two Thirds':
	          imageHeight = viewportHeight * 0.66666;
	          break;
	        case imageHeightTweak == 'Fullscreen':
	          imageHeight = viewportHeight * 1;
	          break;
	        default:
	          imageHeight = viewportHeight * 0.5;
	      }
	
	      var mobileStylesDisabled = Y.one(Y.config.doc.body).hasClass('mobile-styles-disabled');
	
	      Y.all('.parallax-item').each(function (item, i) {
	        var wrapper = item.one('.title-desc-wrapper');
	        var inner = item.one('.title-desc-inner');
	        var image = item.one('.title-desc-image');
	
	        if (wrapper.hasClass('has-main-image')) {
	          var titleDescHeight;
	          if (i === 0 && !mobileStylesDisabled) {
	            imageHeight = imageHeight - 118;
	            titleDescHeight = this.INITIAL_WINDOW_HEIGHT - headerHeight;
	          } else {
	            titleDescHeight = imageHeight;
	          }
	
	          var innerHeight = inner.get('clientHeight');
	          if (innerHeight > titleDescHeight) {
	            imageHeight = innerHeight;
	            titleDescHeight = innerHeight;
	          }
	
	          wrapper.setStyles({
	            height: titleDescHeight,
	            overflow: 'hidden'
	          }, this);
	
	          image.setStyles({
	            height: imageHeight
	          });
	        } else {
	          wrapper.setStyle({
	            paddingTop: headerHeight
	          });
	        }
	
	        if (Y.one('.title--description-alignment-center') && wrapper.hasClass('has-main-image')) {
	          if (inner.get('clientHeight') < wrapper.get('clientHeight') && i !== 0) {
	            inner.setStyles({
	              position: 'absolute',
	              top: '50%',
	              left: '50%',
	              transform: 'translate3d(-50%, -50%, 0)'
	            });
	          } else {
	            inner.setStyles({
	              position: 'relative'
	            });
	          }
	
	          if (i === 0) {
	            item.one('.scroll-arrow').setStyles({
	              marginTop: '-78px'
	            });
	
	            if (inner.get('clientHeight') + 78 < wrapper.get('clientHeight') - Y.one('#header').height()) {
	              inner.setStyles({
	                position: 'absolute',
	                top: '50%',
	                left: '50%',
	                transform: 'translate3d(-50%, -50%, 0)'
	              });
	            } else {
	              inner.setStyles({
	                position: 'relative',
	                marginBottom: '78px'
	              });
	            }
	          }
	        }
	
	      }, this);
	
	
	      if (!Y.one('.parallax-scrolling') || (Y.UA.ie > 0 && Y.UA.ie <= 9)) {
	
	        if (Y.UA.ie > 0 && Y.UA.ie <= 9) {
	          Y.one('body').addClass('crappy-ie-no-parallax');
	        } else {
	          Y.one('body').addClass('mobile-no-parallax');
	        }
	
	        Y.all('.title-desc-image').each(function (image, i) {
	          if (i === 0) {
	            image.setStyles({
	              minHeight: image.ancestor('.title-desc-wrapper').get('clientHeight') + Y.one('#header').get('clientHeight')
	            });
	          }
	
	          var imageElement = image.one('img');
	          if (imageElement) {
	            imageElement.removeAttribute('data-load');
	            ImageLoader.load(imageElement, {
	              mode: 'fill'
	            });
	          }
	        });
	
	      } else {
	
	        Y.one('body').addClass('mobile-parallax');
	
	        Y.all('.title-desc-image').each(function (image, i) {
	          image.setStyle('height', viewportHeight);
	          var imageElement = image.one('img');
	          if (imageElement) {
	            imageElement.removeAttribute('data-load');
	            ImageLoader.load(imageElement, {
	              mode: 'fill'
	            });
	          }
	        });
	
	      }
	
	    },
	
	    setupMobileNav: function() {
	      // Open/close mobile nav
	      Y.one('#mobileMenu').on('click', function() {
	        setMobileNav(!Y.one('body').hasClass('mobile-nav-open'));
	      });
	
	      var setMobileNav = function(enable) {
	        if (enable) {
	          Y.one('body').addClass('mobile-nav-open');
	        } else {
	          Y.one('body').removeClass('mobile-nav-open');
	        }
	      };
	
	      // folders in mobile
	      Y.all('li.folder').each(function(elem) {
	        elem.on('click', function() {
	          toggleFolder(elem.siblings('li.folder.dropdown-open').item(0));
	          toggleFolder(elem);
	        });
	      });
	      var toggleFolder = function(elem) {
	        if (elem) {
	          elem.toggleClass('dropdown-open');
	        }
	      };
	    },
	
	
	    // position background image for non-index pages
	    positionBackgroundImage: function(e) {
	      var elementContainer = Y.one('.banner-image');
	      if (!elementContainer) {
	        return false;
	      }
	      var scrollTop = this.scrollEl.get('scrollTop');
	      var viewportRegion = Y.one(Y.config.win).get('region');
	      var element = !!elementContainer.one('div.sqs-video-background') ? elementContainer.one('div.sqs-video-background') : elementContainer.one('img');
	
	      if (this.parallaxOff || this.isMobile || !element || scrollTop > viewportRegion.height) {
	        return;
	      }
	
	      element.setStyle('transform', 'translate3d(0,' + parseInt(scrollTop * this.PARALLAX_FACTOR, 10) + 'px,0)');
	    },
	
	
	    /**************** Index Page Handling below **************/
	
	    // Index collection navigation
	    onHashChange: function(e) {
	      if (Y.one('.mobile-nav-open')) {
	        Y.one('body').removeClass('mobile-nav-open');
	      }
	
	      var hashTarget = Y.one('.parallax-item[data-url-id="'+e.newHash+'"]');
	
	      if(hashTarget) {
	        var targetY = this.pageOffsets[e.newHash];
	        if (e.quick) {
	          this.scrollEl.set('scrollTop', targetY);
	          this.updateActivePage();
	        } else {
	          this.autoScrolling = true;
	
	          this.scrollEl.anim({}, {
	            to: { scroll: [0, targetY ] },
	            duration: this.SCROLL_SPEED,
	            easing: Y.Easing.easeBoth
	          }).run().on('end', function() {
	            if(this.scrollEl.get('scrollTop') !== targetY) {
	              this.scrollEl.set('scrollTop', targetY);
	            }
	            this.autoScrolling = false;
	            this.updateActivePage();
	          }, this);
	        }
	      }
	    },
	
	    getPageFromOffset: function(posY) {
	
	      if (this.parallaxPages.item(0)) {
	        var pageName = this.parallaxPages.item(0).getAttribute('data-url-id');
	
	        for(var name in this.pageOffsets) {
	          if (posY >= this.pageOffsets[name] &&
	              this.pageOffsets[name] > this.pageOffsets[pageName]) {
	            pageName = name;
	          }
	        }
	
	        return pageName;
	      }
	    },
	
	    setScrollArrowColor: function () {
	      var scrollArrow = Y.one('.scroll-arrow');
	      var colorDetectNode = Y.one('.parallax-item .title-desc-wrapper');
	
	      if (!colorDetectNode) {
	        return;
	      }
	
	      var colorDetect = colorDetectNode.getAttribute('data-color-suggested');
	
	      if (Y.Lang.isValue(scrollArrow) && Y.Lang.isValue(colorDetect)) {
	        var colorWeightClass = 'color-weight-' + this._getLightness(colorDetect);
	        if (!scrollArrow.hasClass(colorWeightClass)) {
	          scrollArrow
	            .removeClass('color-weight-dark')
	            .removeClass('color-weight-light')
	            .addClass(colorWeightClass);
	        }
	      }
	    },
	
	    // update active page on index collection
	    updateActivePage: function() {
	      if (this.autoScrolling) {
	        return;
	      }
	
	      var scrollTop = this.scrollEl.get('scrollTop');
	      var activePage = this.getPageFromOffset(scrollTop);
	      var activeNavItem = Y.one('#parallax-nav-item-' + activePage);
	
	      if (activeNavItem && !activeNavItem.hasClass('active')) {
	        Y.all('#parallax-nav li').removeClass('active');
	        activeNavItem.addClass('active');
	      }
	
	      if (window.location.hash.replace('#', '') != activePage) {
	        window.history && window.history.replaceState && window.history.replaceState({}, '', '#' + activePage);
	      }
	
	      var img;
	      if (this.isMobile) {
	        img = Y.one('.parallax-item[data-url-id="'+activePage+'"] .title-desc-wrapper img');
	      } else {
	        img = Y.one('#parallax-images .image-container[data-url-id="'+activePage+'"] img');
	      }
	      Y.Squarespace.GalleryManager.promoteImageQueue(new Y.NodeList(img));
	
	      if (!Y.one('body.hide-parallax-nav')) {
	        // Set suggested foreground color
	        var pageComingUp = this.getPageFromOffset(scrollTop + this.viewportH/2),
	            contentOffset = this.pageOffsets[pageComingUp] === 0 ? this.firstImageHeight : this.viewportH * this.IMAGE_VIEWPORT,
	            color;
	
	        // Use image color detection if image is half-way up the viewport
	        if (scrollTop + this.viewportH/2 <= this.pageOffsets[pageComingUp] + contentOffset) {
	          color = Y.one('.parallax-item[data-url-id="'+pageComingUp+'"] .title-desc-wrapper').getAttribute('data-color-suggested');
	        }
	
	        if (!color || color === '#') { // else use background color
	          color = Y.Squarespace.Template.getTweakValue('contentBgColor');
	          var rgba = color.match(new RegExp('rgba\\((\\d+),(\\d+),(\\d+),(\\d+)'));
	          if (rgba) {
	            color = this._rgb2hex(rgba[1],rgba[2],rgba[3]);
	          }
	        }
	
	        if (Y.one('#parallax-nav')) {
	          var colorWeightClass = 'color-weight-' + this._getLightness(color);
	          if (!Y.one('#parallax-nav').hasClass(colorWeightClass)) {
	            Y.one('#parallax-nav')
	              .removeClass('color-weight-dark')
	              .removeClass('color-weight-light')
	              .addClass(colorWeightClass);
	          }
	        }
	      }
	
	    },
	
	    _rgb2hex: function(r, g, b) {
	      var parts = [r,g,b];
	
	      for (var i = 0; i <= 2; ++i) {
	        parts[i] = parseInt(parts[i], 10).toString(16);
	
	        if (parts[i].length == 1)
	          parts[i] = '0' + parts[i];
	      }
	
	      return '#'+parts.join('');
	    },
	
	    _getLightness: function(hexcolor) {
	      if (hexcolor && hexcolor.length > 0 && hexcolor.length <= 7) {
	        hexcolor = hexcolor.replace('#', '');
	        return ((parseInt(hexcolor, 16) > 0xffffff/2) ? 'light' : 'dark');
	      } else {
	        return '';
	      }
	    },
	
	    // Position images on index collection
	    positionImages: function(e) {
	      if (this.isMobile) return;
	
	      var scrollTop = this.scrollEl.get('scrollTop');
	      var viewportRegion = Y.one(Y.config.win).get('region');
	
	      this.parallaxPages.each(function(page, i) {
	        var elementContainer = this.parallaxImages.item(i);
	
	        if (page.inRegion(viewportRegion)) {
	          var pageYDoc = this.pageOffsets[page.getAttribute('data-url-id')];
	          var pageYViewport = pageYDoc - scrollTop;
	          var factor = this.parallaxOff ? 0 : this.PARALLAX_FACTOR;
	          var elementY = -1 * parseFloat(pageYViewport * factor);
	          var element = !!elementContainer.one('div.sqs-video-background') ? elementContainer.one('div.sqs-video-background') : elementContainer.one('img');
	
	          elementContainer.setStyles({
	            transform: 'translate3d(0, ' + pageYViewport + 'px, 0)'
	          });
	          element && element.setStyle('transform', 'translatey(' + elementY + 'px) translatez(0)');
	        } else {
	          elementContainer.setStyle('transform', 'translate3d(0, -100%, 0)');
	        }
	
	      }, this);
	    },
	
	    listenTweaks: function() {
	      if (Y.Global) {
	        Y.Global.on('tweak:change', function(f){
	          if (f.getName().match(/image|parallax|title--description-alignment|fixed-header/i)) {
	            this.syncUI();
	          }
	        },this);
	
	        Y.Global.on('tweak:change', function(f) {
	          var name = f.getName();
	          if(name == 'transparent-header' && Y.one('.fixed-header')){
	            Y.one('#header').setStyle('backgroundColor', null);
	          }
	        });
	
	        Y.Global.on(['tweak:reset', 'tweak:close'], function(f){
	          Y.later(500, this, this.syncUI);
	        },this);
	
	      }
	    },
	
	    headerBgOnScroll: function() {
	      var fixedTransparentHeader = Y.one('.fixed-header.transparent-header');
	      var header = Y.one('#header');
	      var headerHeight = header.get('clientHeight');
	      var headerBgColor = Y.Squarespace.Template.getTweakValue('headerBgColor');
	
	      if (fixedTransparentHeader) {
	        Y.one(window).on('scroll', function() {
	          if (Y.one('.transparent-header')) {
	            Y.later(500, this, fadeInHeaderBg);
	          }
	        });
	
	        var fadeInHeaderBg = function() {
	          if (Y.config.win.pageYOffset > headerHeight) {
	            Y.one('#header').setStyle('backgroundColor', headerBgColor);
	          } else {
	            header.setStyle('backgroundColor', 'transparent');
	          }
	        }
	      }
	    },
	
	    stickyCart: function () {
	      if (this.isMobile) {
	        return false;
	      }
	
	      var cart = Y.one('.sqs-cart-dropzone');
	      var headerHeight = Y.one('#header').get('clientHeight');
	      var offsetY;
	
	      if (cart && cart.one('.yui3-widget')) {
	        offsetY = cart.one('.yui3-widget').getY();
	
	        Y.one(window).on('resize', function () {
	          offsetY = cart.getY();
	        });
	
	        if (Y.one('body.fixed-header')) {
	          cart.addClass('fixed-cart').setStyles({
	            top: Y.one('#header').get('clientHeight') + 10
	          });
	        } else {
	          var rafFixedCast = new rafscroll(function () {
	            cart.toggleClass('fixed-cart', Y.config.win.pageYOffset >= offsetY);
	          });
	        }
	      }
	    }
	
	  });
	
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var VideoBackground = __webpack_require__(5).VideoBackground;
	var getVideoProps = __webpack_require__(103);
	
	module.exports = {
	  'VideoBackground': VideoBackground,
	  'getVideoProps': getVideoProps
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var VideoBackground = __webpack_require__(6);
	var VideoFilterPropertyValues = __webpack_require__(98).filterProperties;
	
	module.exports = {
	  VideoBackground: VideoBackground,
	  VideoFilterPropertyValues: VideoFilterPropertyValues
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringify = __webpack_require__(7);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _assign = __webpack_require__(10);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _typeof2 = __webpack_require__(46);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _classCallCheck2 = __webpack_require__(81);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(82);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var custEvent = __webpack_require__(86);
	var parseUrl = __webpack_require__(87);
	var xhr = __webpack_require__(91);
	
	var DEBUG = false;
	
	var DEFAULT_PROPERTY_VALUES = {
	  'container': '.background-wrapper',
	  'url': 'https://youtu.be/xkEmYQvJ_68',
	  'fitMode': 'fill',
	  'maxLoops': '',
	  'scaleFactor': 1,
	  'playbackSpeed': 1,
	  'filter': 1,
	  'filterStrength': 50,
	  'timeCode': { 'start': 0, 'end': null },
	  'useCustomFallbackImage': false
	};
	
	var FILTER_OPTIONS = __webpack_require__(98).filterOptions;
	var FILTER_PROPERTIES = __webpack_require__(98).filterProperties;
	
	var YOUTUBE_REGEX = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
	var VIMEO_REGEX = /^.*(vimeo\.com\/)([0-9]{7,}(#t\=.*s)?)/;
	
	/**
	 * A class which uses the YouTube API to initialize an IFRAME with a YouTube video.
	 * Additional display options and functionality are configured through a set of properties,
	 * superceding default properties.
	 */
	
	var VideoBackground = function () {
	  /**
	   * @param {Object} props - An optional object with configuation.
	   * @param {Object} windowContext - The parent window object (due to .sqs-site-frame).
	   */
	
	  function VideoBackground(props) {
	    var _this = this;
	
	    var windowContext = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];
	    (0, _classCallCheck3["default"])(this, VideoBackground);
	
	    this.windowContext = windowContext;
	    this.events = [];
	
	    this.initializeProperties(props);
	    this.setDisplayEffects();
	    this.setFallbackImage();
	    this.callVideoAPI();
	    this.bindUI();
	
	    if (DEBUG === true) {
	      window.vdbg = this;
	      this.debugInterval = setInterval(function () {
	        if (_this.player.getCurrentTime) {
	          _this.logger((_this.player.getCurrentTime() / _this.player.getDuration()).toFixed(2));
	        }
	      }, 900);
	    }
	  }
	
	  (0, _createClass3["default"])(VideoBackground, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.events) {
	        this.events.forEach(function (evt) {
	          return evt.target.removeEventListener(evt.type, evt.handler, true);
	        });
	      }
	      this.events = null;
	
	      if (this.player && (0, _typeof3["default"])(this.player) === 'object') {
	        try {
	          this.player.iframe.classList.remove('ready');
	          this.player.destroy();
	          this.player = {};
	        } catch (err) {
	          console.error(err);
	        }
	      }
	
	      if (typeof this.timer === 'number') {
	        clearTimeout(this.timer);
	        this.timer = null;
	      }
	
	      if (typeof this.debugInterval === 'number') {
	        clearInterval(this.debugInterval);
	        this.debugInterval = null;
	      }
	    }
	  }, {
	    key: 'bindUI',
	    value: function bindUI() {
	      var _this2 = this;
	
	      var resizeEvent = typeof window.orientation === 'undefined' ? 'resize' : 'orientationchange';
	      var resizeHandler = function resizeHandler() {
	        if (resizeEvent === 'resize') {
	          _this2.windowContext.requestAnimationFrame(function () {
	            _this2.scaleVideo();
	          });
	        } else if (_this2.useCustomFallbackImage && _this2.windowContext.ImageLoader) {
	          var customFallbackImage = _this2.container.querySelector('img[data-src]');
	          _this2.windowContext.ImageLoader.load(customFallbackImage, true);
	        }
	      };
	      this.events.push({
	        'target': this.windowContext,
	        'type': 'resize',
	        'handler': resizeHandler
	      });
	      this.windowContext.addEventListener(resizeEvent, resizeHandler, true);
	    }
	
	    /**
	     * Merge configuration properties with defaults with minimal validation.
	     */
	
	  }, {
	    key: 'initializeProperties',
	    value: function initializeProperties() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      props = (0, _assign2["default"])({}, DEFAULT_PROPERTY_VALUES, props);
	      if (props.container.nodeType === 1) {
	        this.container = props.container;
	      } else if (typeof props.container === 'string') {
	        this.container = document.querySelector(props.container);
	      } else {
	        console.error('Container ' + props.container + ' not found');
	        return false;
	      }
	      this.videoId = this.getVideoID(props.url);
	      this.filter = props.filter;
	      this.filterStrength = props.filterStrength;
	      this.useCustomFallbackImage = props.useCustomFallbackImage;
	      this.fitMode = props.fitMode;
	      this.maxLoops = parseInt(props.maxLoops, 10) || null;
	      this.scaleFactor = props.scaleFactor;
	      this.playbackSpeed = parseFloat(props.playbackSpeed) === 0.0 ? 1 : parseFloat(props.playbackSpeed);
	      this.timeCode = {
	        start: this._getStartTime(props.url) || props.timeCode.start,
	        end: props.timeCode.end
	      };
	
	      var ua = window.navigator.userAgent;
	      this.isMobileBrowser = ua.indexOf('AppleWebKit') !== -1 && ua.indexOf('Mobile') !== -1;
	      if (this.isMobileBrowser) {
	        this.container.classList.add('mobile');
	      }
	      this.player = {};
	      this.currentLoop = 0;
	    }
	
	    /**
	     * The ID is the only unique property need to use in the YouTube and Vimeo APIs.
	     */
	
	  }, {
	    key: 'getVideoID',
	    value: function getVideoID(value) {
	      if (!value) {
	        value = DEFAULT_PROPERTY_VALUES.url;
	      }
	
	      var match = value.match(YOUTUBE_REGEX);
	      if (match && match[2].length) {
	        this.videoSource = 'youtube';
	        return match[2];
	      }
	
	      match = value.match(VIMEO_REGEX);
	      if (match && match[2].length) {
	        this.videoSource = 'vimeo';
	        return match[2];
	      }
	
	      return '';
	    }
	
	    /**
	     * A default fallback image element will be create from the YouTube API unless the
	     * custom fallback image exists.
	     */
	
	  }, {
	    key: 'setFallbackImage',
	    value: function setFallbackImage() {
	      var _this3 = this;
	
	      if (this.useCustomFallbackImage) {
	        (function () {
	          var customFallbackImage = _this3.container.querySelector('.custom-fallback-image');
	          var tempImage = document.createElement('img');
	          tempImage.src = customFallbackImage.src;
	          tempImage.addEventListener('load', function () {
	            customFallbackImage.classList.add('loaded');
	          });
	        })();
	      }
	
	      var fallback = this.container.querySelector('.default-fallback-image');
	      if (fallback) {
	        fallback.parentNode.removeChild(fallback);
	      }
	
	      if (this.isMobileBrowser) {
	        return;
	      }
	
	      var getBestQuality = function getBestQuality(evt) {
	        // Prefer the HD-quality image if present. If not, load the default thumbnail.
	        var defaultFallbackImage = evt.currentTarget;
	        if (_this3.videoSource === 'youtube' && defaultFallbackImage.width < 480 && defaultFallbackImage.src.indexOf('0.jpg') === -1) {
	          defaultFallbackImage.src = 'https://img.youtube.com/vi/' + _this3.videoId + '/0.jpg';
	          return;
	        }
	        // Only display a real thumbnail image, not the small YouTube gray box.
	        if (defaultFallbackImage.width >= 480 && !_this3.player.ready) {
	          _this3.container.insertBefore(defaultFallbackImage, _this3.container.querySelector('#player'));
	          defaultFallbackImage.classList.add('loaded');
	        }
	        _this3.setDisplayEffects();
	        defaultFallbackImage.removeEventListener('load', getBestQuality);
	      };
	
	      var createFallbackImage = function createFallbackImage(imageURL) {
	        var defaultFallbackImage = document.createElement('img');
	        defaultFallbackImage.src = _this3.fallbackImageURL || imageURL;
	        defaultFallbackImage.classList.add('default-fallback-image');
	        defaultFallbackImage.classList.add('buffering');
	        defaultFallbackImage.addEventListener('load', getBestQuality);
	      };
	
	      if (this.videoSource === 'youtube') {
	        createFallbackImage('https://img.youtube.com/vi/' + this.videoId + '/maxresdefault.jpg');
	      } else if (this.videoSource === 'vimeo') {
	        var protocol = this.container.ownerDocument.location.protocol;
	        xhr({
	          url: protocol + '//vimeo.com/api/v2/video/' + parseInt(this.videoId, 10) + '.json'
	        }, function (err, resp, body) {
	          if (resp.statusCode === 200) {
	            body = JSON.parse(body)[0];
	            createFallbackImage(body.thumbnail_large);
	          }
	        });
	      }
	    }
	
	    /**
	     * Determine which API to use
	     */
	
	  }, {
	    key: 'callVideoAPI',
	    value: function callVideoAPI() {
	      if (this.videoSource === 'youtube') {
	        this.initializeYouTubeAPI();
	      }
	
	      if (this.videoSource === 'vimeo') {
	        this.initializeVimeoAPI();
	      }
	    }
	
	    /**
	     * Call YouTube API per their guidelines.
	     */
	
	  }, {
	    key: 'initializeYouTubeAPI',
	    value: function initializeYouTubeAPI() {
	      var _this4 = this;
	
	      if (this.isMobileBrowser) {
	        return;
	      }
	
	      if (this.windowContext.document.documentElement.querySelector('script[src*="www.youtube.com/iframe_api"].loaded')) {
	        this.setVideoPlayer();
	        return;
	      }
	
	      this.player.ready = false;
	      var tag = this.windowContext.document.createElement('script');
	      tag.src = 'https://www.youtube.com/iframe_api';
	      var firstScriptTag = this.windowContext.document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	      tag.addEventListener('load', function (evt) {
	        evt.currentTarget.classList.add('loaded');
	        _this4.setVideoPlayer();
	      }, true);
	    }
	
	    /**
	     * Call the Vimeo API per their guidelines.
	     */
	
	  }, {
	    key: 'initializeVimeoAPI',
	    value: function initializeVimeoAPI() {
	      // No external API call is necessary; preserved for parity with YouTube and
	      // potential additional integrations.
	      this.setVideoPlayer();
	    }
	
	    /**
	     * If the source is YouTube initialize the video player and register its callbacks.
	     * If the source is Vimeo construct and append the player node and register handlers.
	     */
	
	  }, {
	    key: 'setVideoPlayer',
	    value: function setVideoPlayer() {
	      if (this.player.ready) {
	        try {
	          this.player.destroy();
	          this.player.ready = false;
	        } catch (e) {
	          // nothing to destroy
	        }
	      }
	
	      if (this.videoSource === 'youtube') {
	        this.initializeYouTubePlayer();
	      } else if (this.videoSource === 'vimeo') {
	        this.initializeVimeoPlayer();
	      }
	    }
	
	    /**
	     * Initialize the player and bind player events.
	     */
	
	  }, {
	    key: 'initializeYouTubePlayer',
	    value: function initializeYouTubePlayer() {
	      var _this5 = this;
	
	      // Poll until the API is ready.
	      if (this.windowContext.YT.loaded !== 1) {
	        setTimeout(this.setVideoPlayer.bind(this), 100);
	        return false;
	      }
	
	      /**
	       * YouTube event handler. Add the proper class to the player element, and set
	       * player properties.
	       */
	      var onYouTubePlayerReady = function onYouTubePlayerReady(event) {
	        _this5.player.iframe = _this5.player.getIframe();
	        _this5.player.iframe.classList.add('background-video');
	        _this5.syncPlayer();
	        _this5.player.mute();
	        if (typeof window.CustomEvent !== 'function') {
	          custEvent();
	        }
	        var readyEvent = new CustomEvent('ready');
	        _this5.container.dispatchEvent(readyEvent);
	        document.body.classList.add('ready');
	        _this5.player.ready = true;
	        if (_this5.isMobileBrowser) {
	          return;
	        }
	        _this5.player.seekTo(_this5.timeCode.start);
	        _this5.player.playVideo();
	      };
	
	      /**
	       * YouTube event handler. Determine whether or not to loop the video.
	       */
	      var onYouTubePlayerStateChange = function onYouTubePlayerStateChange(event) {
	        var player = _this5.player;
	        var playerIframe = player.getIframe();
	        var defaultImage = _this5.container.querySelector('.default-fallback-image');
	        var duration = (player.getDuration() - _this5.timeCode.start) / _this5.playbackSpeed;
	
	        var doLoop = function doLoop() {
	          if (player.getCurrentTime() === _this5.timeCode.start) {
	            clearTimeout(_this5.timer);
	
	            if (_this5.maxLoops) {
	              _this5.currentLoop++;
	              if (_this5.currentLoop > _this5.maxLoops) {
	                player.pauseVideo();
	                _this5.currentLoop = 0;
	                return;
	              }
	            }
	
	            _this5.timer = setTimeout(function () {
	              player.pauseVideo();
	              player.seekTo(_this5.timeCode.start);
	            }, duration * 1000 - 100);
	          }
	        };
	
	        if (event.data === _this5.windowContext.YT.PlayerState.BUFFERING && player.getVideoLoadedFraction() !== 1 && (player.getCurrentTime() === 0 || player.getCurrentTime() > duration - -0.1)) {
	          _this5.logger('BUFFERING');
	          if (defaultImage) {
	            defaultImage.classList.add('buffering');
	          }
	        } else if (event.data === _this5.windowContext.YT.PlayerState.PLAYING) {
	          _this5.logger('PLAYING');
	          playerIframe.classList.add('ready');
	          if (defaultImage) {
	            defaultImage.classList.remove('buffering');
	          }
	          doLoop();
	        } else {
	          _this5.logger('PAUSED/ENDED: ' + event.data);
	          player.playVideo();
	        }
	      };
	
	      this.player = new this.windowContext.YT.Player(this.container.querySelector('#player'), {
	        height: '315',
	        width: '560',
	        videoId: this.videoId,
	        playerVars: {
	          'autohide': 1,
	          'autoplay': 0,
	          'controls': 0,
	          'enablejsapi': 1,
	          'iv_load_policy': 3,
	          'loop': 0,
	          'modestbranding': 1,
	          'playsinline': 1,
	          'rel': 0,
	          'showinfo': 0,
	          'wmode': 'opaque'
	        },
	        events: {
	          'onReady': function onReady(event) {
	            onYouTubePlayerReady(event);
	          },
	          'onStateChange': function onStateChange(event) {
	            onYouTubePlayerStateChange(event);
	          }
	        }
	      });
	    }
	
	    /**
	     * Initialize the player and bind player events with a postMessage handler.
	     */
	
	  }, {
	    key: 'initializeVimeoPlayer',
	    value: function initializeVimeoPlayer() {
	      var _this6 = this;
	
	      var playerIframe = this.windowContext.document.createElement('iframe');
	      playerIframe.id = 'vimeoplayer';
	      playerIframe.classList.add('background-video');
	      var playerConfig = '&background=1';
	      playerIframe.src = '//player.vimeo.com/video/' + this.videoId + '?api=1' + playerConfig;
	      this.container.appendChild(playerIframe);
	      this.player.iframe = playerIframe;
	
	      /**
	       * Creates cross frame postMessage handlers, gets proper dimensions of player,
	       * and sets ready state for the player and container.
	       *
	       */
	      var player = this.player;
	      var playerOrigin = '*';
	
	      var postMessageManager = function postMessageManager(action, value) {
	        var data = {
	          method: action
	        };
	
	        if (value) {
	          data.value = value;
	        }
	
	        var message = (0, _stringify2["default"])(data);
	        _this6.windowContext.eval('(function(ctx){ ctx.player.iframe.contentWindow.postMessage(' + message + ', ' + (0, _stringify2["default"])(playerOrigin) + '); })')(_this6);
	      };
	      player.postMessageManager = postMessageManager;
	
	      var syncAndSetReady = function syncAndSetReady() {
	        if (!player.dimensions.width || !player.dimensions.height) {
	          return;
	        }
	        _this6.syncPlayer();
	        if (typeof window.CustomEvent !== 'function') {
	          custEvent();
	        }
	        var readyEvent = new CustomEvent('ready');
	        _this6.container.dispatchEvent(readyEvent);
	        document.body.classList.add('ready');
	        player.ready = true;
	        player.iframe.classList.add('ready');
	
	        // Only required for Vimeo Basic videos, or video URLs with a start time hash.
	        // Plus and Pro utilize `background=1` URL parameter.
	        // See https://vimeo.com/forums/topic:278001
	        postMessageManager('setVolume', '0');
	        postMessageManager('setLoop', 'true');
	        postMessageManager('play');
	        if (_this6.timeCode.start > 0) {
	          postMessageManager('addEventListener', 'playProgress');
	        }
	      };
	
	      var onReady = function onReady() {
	        var defaultImage = _this6.container.querySelector('.default-fallback-image');
	        if (defaultImage) {
	          defaultImage.classList.remove('buffering');
	        }
	        player.dimensions = {};
	        postMessageManager('getVideoHeight');
	        postMessageManager('getVideoWidth');
	      };
	
	      var onMessageReceived = function onMessageReceived(event) {
	        if (!/^https?:\/\/player.vimeo.com/.test(event.origin)) {
	          return false;
	        }
	
	        playerOrigin = event.origin;
	
	        var data = event.data;
	        if (typeof data === 'string') {
	          data = JSON.parse(data);
	        }
	        _this6.logger(data);
	
	        switch (data.event) {
	          case 'ready':
	            onReady();
	            break;
	
	          case 'timeupdate':
	            if (data.data.percent >= 0.98) {
	              postMessageManager('seekTo', _this6.timeCode.start);
	            }
	            break;
	        }
	
	        switch (data.method) {
	          case 'getVideoHeight':
	            player.dimensions.height = data.value;
	            syncAndSetReady();
	            break;
	          case 'getVideoWidth':
	            player.dimensions.width = data.value;
	            syncAndSetReady();
	            break;
	        }
	      };
	
	      var messageHandler = function messageHandler(e) {
	        onMessageReceived(e);
	      };
	
	      this.windowContext.addEventListener('message', messageHandler, false);
	
	      player.destroy = function () {
	        _this6.windowContext.removeEventListener('message', messageHandler);
	        player.iframe.remove();
	      };
	    }
	
	    /**
	     * The IFRAME will be the entire width and height of its container but the video
	     * may be a completely different size and ratio. Scale up the IFRAME so the inner video
	     * behaves in the proper `fitMode` with optional additional scaling to zoom in.
	     */
	
	  }, {
	    key: 'scaleVideo',
	    value: function scaleVideo(scaleValue) {
	      var scale = scaleValue || this.scaleFactor;
	      var playerIframe = this.player.iframe;
	      var videoDimensions = this._findPlayerDimensions();
	      var fallbackImg = null;
	      if (!this.useCustomFallbackImage) {
	        fallbackImg = this.container.querySelector('.default-fallback-image');
	      }
	
	      if (this.fitMode !== 'fill') {
	        playerIframe.style.width = '';
	        playerIframe.style.height = '';
	        if (fallbackImg) {
	          fallbackImg.style.width = '';
	          fallbackImg.style.minHeight = '';
	        }
	        return false;
	      }
	
	      var containerWidth = playerIframe.parentNode.clientWidth;
	      var containerHeight = playerIframe.parentNode.clientHeight;
	      var containerRatio = containerWidth / containerHeight;
	      var videoRatio = videoDimensions.width / videoDimensions.height;
	      var pWidth = 0;
	      var pHeight = 0;
	      if (containerRatio > videoRatio) {
	        // at the same width, the video is taller than the window
	        pWidth = containerWidth * scale;
	        pHeight = containerWidth * scale / videoRatio;
	        playerIframe.style.width = pWidth + 'px';
	        playerIframe.style.height = pHeight + 'px';
	      } else if (videoRatio > containerRatio) {
	        // at the same width, the video is shorter than the window
	        pWidth = containerHeight * scale * videoRatio;
	        pHeight = containerHeight * scale;
	        playerIframe.style.width = pWidth + 'px';
	        playerIframe.style.height = pHeight + 'px';
	      } else {
	        // the window and video ratios match
	        pWidth = containerWidth * scale;
	        pHeight = containerHeight * scale;
	        playerIframe.style.width = pWidth + 'px';
	        playerIframe.style.height = pHeight + 'px';
	      }
	      playerIframe.style.left = 0 - (pWidth - containerWidth) / 2 + 'px';
	      playerIframe.style.top = 0 - (pHeight - containerHeight) / 2 + 'px';
	
	      if (fallbackImg) {
	        fallbackImg.style.width = pWidth + 'px';
	        fallbackImg.style.height = pHeight + 'px';
	      }
	    }
	
	    /**
	     * Play back speed options based on the YouTube API options.
	     */
	
	  }, {
	    key: 'setSpeed',
	    value: function setSpeed(speedValue) {
	      this.playbackSpeed = parseFloat(this.playbackSpeed);
	      this.player.setPlaybackRate(this.playbackSpeed);
	    }
	
	    /**
	     * All diplay related effects should be applied prior to the video loading to
	     * ensure the effects are visible on the fallback image while loading.
	     */
	
	  }, {
	    key: 'setDisplayEffects',
	    value: function setDisplayEffects() {
	      this.setFilter();
	    }
	
	    /**
	     * Apply filter with values based on filterStrength.
	     */
	
	  }, {
	    key: 'setFilter',
	    value: function setFilter() {
	      var containerStyle = this.container.style;
	      var filter = FILTER_OPTIONS[this.filter - 1];
	      var filterStyle = '';
	      if (filter !== 'none') {
	        filterStyle = this.getFilterStyle(filter, this.filterStrength);
	      }
	
	      // To prevent the blur effect from displaying the background at the edges as
	      // part of the blur, the filer needs to be applied to the player and fallback image,
	      // and those elements need to be scaled slightly.
	      // No other combination of filter target and scaling seems to work.
	      if (filter === 'blur') {
	        containerStyle.webkitFilter = '';
	        containerStyle.filter = '';
	        this.container.classList.add('filter-blur');
	
	        Array.prototype.slice.call(this.container.children).forEach(function (el) {
	          el.style.webkitFilter = filterStyle;
	          el.style.filter = filterStyle;
	        });
	      } else {
	        containerStyle.webkitFilter = filterStyle;
	        containerStyle.filter = filterStyle;
	        this.container.classList.remove('filter-blur');
	
	        Array.prototype.slice.call(this.container.children).forEach(function (el) {
	          el.style.webkitFilter = '';
	          el.style.filter = '';
	        });
	      }
	    }
	
	    /**
	     * Construct the style based on the filter strength and `FILTER_PROPERTIES`.
	     */
	
	  }, {
	    key: 'getFilterStyle',
	    value: function getFilterStyle(filter, strength) {
	      return filter + '(' + (FILTER_PROPERTIES[filter].modifier(strength) + FILTER_PROPERTIES[filter].unit) + ')';
	    }
	
	    /**
	     * The YouTube API seemingly does not expose the actual width and height dimensions
	     * of the video itself. The video's dimensions and ratio may be completely different
	     * than the IFRAME's. This hack finds those values inside some private objects.
	     * Since this is not part of the pbulic API the dimensions will fall back to the
	     * container width and height in case YouTube changes the internals unexpectedly.
	     */
	
	  }, {
	    key: '_findPlayerDimensions',
	    value: function _findPlayerDimensions() {
	      var _this7 = this;
	
	      var w = void 0;
	      var h = void 0;
	      if (this.videoSource === 'youtube') {
	        (function () {
	          w = _this7.container.clientWidth;
	          h = _this7.container.clientHeight;
	          var hasDimensions = false;
	          var playerObjs = [];
	          var player = _this7.player;
	          for (var o in player) {
	            if ((0, _typeof3["default"])(player[o]) === 'object') {
	              playerObjs.push(player[o]);
	            }
	          }
	          playerObjs.forEach(function (obj) {
	            for (var p in obj) {
	              if (hasDimensions) {
	                break;
	              }
	              try {
	                if ((0, _typeof3["default"])(obj[p]) === 'object' && !!obj[p].host) {
	                  if (obj[p].width && obj[p].height) {
	                    w = obj[p].width;
	                    h = obj[p].height;
	                    hasDimensions = true;
	                  }
	                }
	              } catch (err) {
	                // console.error(err);
	              }
	            }
	          });
	        })();
	      } else if (this.videoSource === 'vimeo') {
	        if (!this.player.dimensions) {
	          w = this.player.iframe.clientWidth;
	          h = this.player.iframe.clientHeight;
	        } else {
	          w = this.player.dimensions.width;
	          h = this.player.dimensions.height;
	        }
	      }
	      return {
	        'width': w,
	        'height': h
	      };
	    }
	
	    /**
	     * Get the start time base on the URL formats of YouTube and Vimeo.
	     */
	
	  }, {
	    key: '_getStartTime',
	    value: function _getStartTime(url) {
	      var parsedUrl = new parseUrl(url, true);
	
	      if (this.videoSource === 'youtube' && (!parsedUrl.query || !parsedUrl.query.t) || this.videoSource === 'vimeo' && !parsedUrl.hash) {
	        return false;
	      }
	
	      var timeParam = void 0;
	      switch (this.videoSource) {
	        case 'youtube':
	          timeParam = parsedUrl.query.t;
	          break;
	
	        case 'vimeo':
	          timeParam = parsedUrl.hash;
	          break;
	      }
	      var m = (timeParam.match(/\d+(?=m)/g) ? timeParam.match(/\d+(?=m)/g)[0] : 0) * 60;
	      var s = timeParam.match(/\d+(?=s)/g) ? timeParam.match(/\d+(?=s)/g)[0] : timeParam;
	      return parseInt(m, 10) + parseInt(s, 10);
	    }
	
	    /**
	      * Apply the purely visual effects.
	      */
	
	  }, {
	    key: 'syncPlayer',
	    value: function syncPlayer() {
	      this.setDisplayEffects();
	      if (this.videoSource === 'youtube') {
	        this.setSpeed();
	      }
	      this.scaleVideo();
	    }
	  }, {
	    key: 'logger',
	    value: function logger(msg) {
	      if (!DEBUG) {
	        return;
	      }
	
	      console.log(msg);
	    }
	  }]);
	  return VideoBackground;
	}();
	
	module.exports = VideoBackground;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(9)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(11), __esModule: true };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	module.exports = __webpack_require__(9).Object.assign;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(13);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(27)});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(14)
	  , core      = __webpack_require__(9)
	  , ctx       = __webpack_require__(15)
	  , hide      = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(18)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(22) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(19)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , toPrimitive    = __webpack_require__(25)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(22) && !__webpack_require__(23)(function(){
	  return Object.defineProperty(__webpack_require__(24)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20)
	  , document = __webpack_require__(14).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(20);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(28)
	  , gOPS     = __webpack_require__(43)
	  , pIE      = __webpack_require__(44)
	  , toObject = __webpack_require__(45)
	  , IObject  = __webpack_require__(32)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(23)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(29)
	  , enumBugKeys = __webpack_require__(42);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(30)
	  , toIObject    = __webpack_require__(31)
	  , arrayIndexOf = __webpack_require__(35)(false)
	  , IE_PROTO     = __webpack_require__(39)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(32)
	  , defined = __webpack_require__(34);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(33);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(31)
	  , toLength  = __webpack_require__(36)
	  , toIndex   = __webpack_require__(38);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(37)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(40)('keys')
	  , uid    = __webpack_require__(41);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(14)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 44 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(34);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(47);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(67);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2["default"] === "function" && typeof _iterator2["default"] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = typeof _symbol2["default"] === "function" && _typeof(_iterator2["default"]) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	__webpack_require__(62);
	module.exports = __webpack_require__(66).f('iterator');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(50)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(51)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(37)
	  , defined   = __webpack_require__(34);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(52)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(53)
	  , hide           = __webpack_require__(17)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(54)
	  , $iterCreate    = __webpack_require__(55)
	  , setToStringTag = __webpack_require__(59)
	  , getPrototypeOf = __webpack_require__(61)
	  , ITERATOR       = __webpack_require__(60)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(56)
	  , descriptor     = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(59)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(60)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(19)
	  , dPs         = __webpack_require__(57)
	  , enumBugKeys = __webpack_require__(42)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(24)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(58).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(18)
	  , anObject = __webpack_require__(19)
	  , getKeys  = __webpack_require__(28);
	
	module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14).document && document.documentElement;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).f
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(60)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(40)('wks')
	  , uid        = __webpack_require__(41)
	  , Symbol     = __webpack_require__(14).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(30)
	  , toObject    = __webpack_require__(45)
	  , IE_PROTO    = __webpack_require__(39)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	var global        = __webpack_require__(14)
	  , hide          = __webpack_require__(17)
	  , Iterators     = __webpack_require__(54)
	  , TO_STRING_TAG = __webpack_require__(60)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(64)
	  , step             = __webpack_require__(65)
	  , Iterators        = __webpack_require__(54)
	  , toIObject        = __webpack_require__(31);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(51)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(60);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(80);
	module.exports = __webpack_require__(9).Symbol;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(14)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(22)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(53)
	  , META           = __webpack_require__(70).KEY
	  , $fails         = __webpack_require__(23)
	  , shared         = __webpack_require__(40)
	  , setToStringTag = __webpack_require__(59)
	  , uid            = __webpack_require__(41)
	  , wks            = __webpack_require__(60)
	  , wksExt         = __webpack_require__(66)
	  , wksDefine      = __webpack_require__(71)
	  , keyOf          = __webpack_require__(72)
	  , enumKeys       = __webpack_require__(73)
	  , isArray        = __webpack_require__(74)
	  , anObject       = __webpack_require__(19)
	  , toIObject      = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(25)
	  , createDesc     = __webpack_require__(26)
	  , _create        = __webpack_require__(56)
	  , gOPNExt        = __webpack_require__(75)
	  , $GOPD          = __webpack_require__(77)
	  , $DP            = __webpack_require__(18)
	  , $keys          = __webpack_require__(28)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(76).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(44).f  = $propertyIsEnumerable;
	  __webpack_require__(43).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(52)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(41)('meta')
	  , isObject = __webpack_require__(20)
	  , has      = __webpack_require__(30)
	  , setDesc  = __webpack_require__(18).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(23)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(14)
	  , core           = __webpack_require__(9)
	  , LIBRARY        = __webpack_require__(52)
	  , wksExt         = __webpack_require__(66)
	  , defineProperty = __webpack_require__(18).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(28)
	  , toIObject = __webpack_require__(31);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(28)
	  , gOPS    = __webpack_require__(43)
	  , pIE     = __webpack_require__(44);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(33);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(31)
	  , gOPN      = __webpack_require__(76).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(29)
	  , hiddenKeys = __webpack_require__(42).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(44)
	  , createDesc     = __webpack_require__(26)
	  , toIObject      = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(25)
	  , has            = __webpack_require__(30)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(22) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 78 */
/***/ function(module, exports) {



/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71)('asyncIterator');

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71)('observable');

/***/ },
/* 81 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(83);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports["default"] = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2["default"])(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(85);
	var $Object = __webpack_require__(9).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(22), 'Object', {defineProperty: __webpack_require__(18).f});

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * CustomEvent polyfill for Internet Explorer versions >= 9
	 * Polyfill from
	 *   https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
	 */
	var custEvent = function custEvent() {
	  (function () {
	
	    function CustomEvent(event, params) {
	      params = params || { bubbles: false, cancelable: false, detail: undefined };
	      var evt = document.createEvent('CustomEvent');
	      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	      return evt;
	    }
	
	    CustomEvent.prototype = window.Event.prototype;
	
	    window.CustomEvent = CustomEvent;
	  })();
	};
	
	module.exports = custEvent;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var required = __webpack_require__(88)
	  , lolcation = __webpack_require__(89)
	  , qs = __webpack_require__(90)
	  , relativere = /^\/(?!\/)/
	  , protocolre = /^([a-z0-9.+-]+:)?(\/\/)?(.*)$/i; // actual protocol is first match
	
	/**
	 * These are the parse instructions for the URL parsers, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var instructions = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/\:(\d+)$/, 'port'],                 // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];
	
	 /**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase
	 * @property {Boolean} slashes Indicates whether the protocol is followed by double slash ("//")
	 * @property {String} rest     Rest of the URL that is not part of the protocol
	 */
	
	 /**
	  * Extract protocol information from a URL with/without double slash ("//")
	  *
	  * @param  {String} address   URL we want to extract from.
	  * @return {ProtocolExtract}  Extracted information
	  * @private
	  */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3] ? match[3] : ''
	  };
	}
	
	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my CDO.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }
	
	  var relative = relativere.test(address)
	    , parse, instruction, index, key
	    , type = typeof location
	    , url = this
	    , i = 0;
	
	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }
	
	  if (parser && 'function' !== typeof parser) {
	    parser = qs.parse;
	  }
	
	  location = lolcation(location);
	
	  // extract protocol information before running the instructions
	  var extracted = extractProtocol(address);
	  url.protocol = extracted.protocol || location.protocol || '';
	  url.slashes = extracted.slashes || location.slashes;
	  address = extracted.rest;
	
	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];
	
	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, address.length - index[0].length);
	    }
	
	    url[key] = url[key] || (instruction[3] || ('port' === key && relative) ? location[key] || '' : '');
	
	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) {
	      url[key] = url[key].toLowerCase();
	    }
	  }
	
	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);
	
	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }
	
	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }
	
	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}
	
	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} prop          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function used to parse
	 *                               the query.
	 *                               When setting the protocol, double slash will be removed from
	 *                               the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	URL.prototype.set = function set(part, value, fn) {
	  var url = this;
	
	  if ('query' === part) {
	    if ('string' === typeof value && value.length) {
	      value = (fn || qs.parse)(value);
	    }
	
	    url[part] = value;
	  } else if ('port' === part) {
	    url[part] = value;
	
	    if (!required(value, url.protocol)) {
	      url.host = url.hostname;
	      url[part] = '';
	    } else if (value) {
	      url.host = url.hostname +':'+ value;
	    }
	  } else if ('hostname' === part) {
	    url[part] = value;
	
	    if (url.port) value += ':'+ url.port;
	    url.host = value;
	  } else if ('host' === part) {
	    url[part] = value;
	
	    if (/\:\d+/.test(value)) {
	      value = value.split(':');
	      url.hostname = value[0];
	      url.port = value[1];
	    }
	  } else if ('protocol' === part) {
	    url.protocol = value;
	    url.slashes = !fn;
	  } else {
	    url[part] = value;
	  }
	
	  url.href = url.toString();
	  return url;
	};
	
	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	URL.prototype.toString = function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
	
	  var query
	    , url = this
	    , protocol = url.protocol;
	
	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
	
	  var result = protocol + (url.slashes ? '//' : '');
	
	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }
	
	  result += url.hostname;
	  if (url.port) result += ':'+ url.port;
	
	  result += url.pathname;
	
	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;
	
	  if (url.hash) result += url.hash;
	
	  return result;
	};
	
	//
	// Expose the URL parser and some additional properties that might be useful for
	// others.
	//
	URL.qs = qs;
	URL.location = lolcation;
	module.exports = URL;


/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;
	
	  if (!port) return false;
	
	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;
	
	    case 'https':
	    case 'wss':
	    return port !== 443;
	
	    case 'ftp':
	    return port !== 21;
	
	    case 'gopher':
	    return port !== 70;
	
	    case 'file':
	    return false;
	  }
	
	  return port !== 0;
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
	
	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 }
	  , URL;
	
	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	module.exports = function lolcation(loc) {
	  loc = loc || global.location || {};
	  URL = URL || __webpack_require__(87);
	
	  var finaldestination = {}
	    , type = typeof loc
	    , key;
	
	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }
	
	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }
	
	  return finaldestination;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=([^&]*)/g
	    , result = {}
	    , part;
	
	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (;
	    part = parser.exec(query);
	    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
	  );
	
	  return result;
	}
	
	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';
	
	  var pairs = [];
	
	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';
	
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
	    }
	  }
	
	  return pairs.length ? prefix + pairs.join('&') : '';
	}
	
	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var window = __webpack_require__(92)
	var isFunction = __webpack_require__(93)
	var parseHeaders = __webpack_require__(94)
	var xtend = __webpack_require__(97)
	
	module.exports = createXHR
	createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
	createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest
	
	forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
	    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
	        options = initParams(uri, options, callback)
	        options.method = method.toUpperCase()
	        return _createXHR(options)
	    }
	})
	
	function forEachArray(array, iterator) {
	    for (var i = 0; i < array.length; i++) {
	        iterator(array[i])
	    }
	}
	
	function isEmpty(obj){
	    for(var i in obj){
	        if(obj.hasOwnProperty(i)) return false
	    }
	    return true
	}
	
	function initParams(uri, options, callback) {
	    var params = uri
	
	    if (isFunction(options)) {
	        callback = options
	        if (typeof uri === "string") {
	            params = {uri:uri}
	        }
	    } else {
	        params = xtend(options, {uri: uri})
	    }
	
	    params.callback = callback
	    return params
	}
	
	function createXHR(uri, options, callback) {
	    options = initParams(uri, options, callback)
	    return _createXHR(options)
	}
	
	function _createXHR(options) {
	    if(typeof options.callback === "undefined"){
	        throw new Error("callback argument missing")
	    }
	
	    var called = false
	    var callback = function cbOnce(err, response, body){
	        if(!called){
	            called = true
	            options.callback(err, response, body)
	        }
	    }
	
	    function readystatechange() {
	        if (xhr.readyState === 4) {
	            loadFunc()
	        }
	    }
	
	    function getBody() {
	        // Chrome with requestType=blob throws errors arround when even testing access to responseText
	        var body = undefined
	
	        if (xhr.response) {
	            body = xhr.response
	        } else {
	            body = xhr.responseText || getXml(xhr)
	        }
	
	        if (isJson) {
	            try {
	                body = JSON.parse(body)
	            } catch (e) {}
	        }
	
	        return body
	    }
	
	    var failureResponse = {
	                body: undefined,
	                headers: {},
	                statusCode: 0,
	                method: method,
	                url: uri,
	                rawRequest: xhr
	            }
	
	    function errorFunc(evt) {
	        clearTimeout(timeoutTimer)
	        if(!(evt instanceof Error)){
	            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
	        }
	        evt.statusCode = 0
	        return callback(evt, failureResponse)
	    }
	
	    // will load the data & process the response in a special response object
	    function loadFunc() {
	        if (aborted) return
	        var status
	        clearTimeout(timeoutTimer)
	        if(options.useXDR && xhr.status===undefined) {
	            //IE8 CORS GET successful response doesn't have a status field, but body is fine
	            status = 200
	        } else {
	            status = (xhr.status === 1223 ? 204 : xhr.status)
	        }
	        var response = failureResponse
	        var err = null
	
	        if (status !== 0){
	            response = {
	                body: getBody(),
	                statusCode: status,
	                method: method,
	                headers: {},
	                url: uri,
	                rawRequest: xhr
	            }
	            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
	                response.headers = parseHeaders(xhr.getAllResponseHeaders())
	            }
	        } else {
	            err = new Error("Internal XMLHttpRequest Error")
	        }
	        return callback(err, response, response.body)
	    }
	
	    var xhr = options.xhr || null
	
	    if (!xhr) {
	        if (options.cors || options.useXDR) {
	            xhr = new createXHR.XDomainRequest()
	        }else{
	            xhr = new createXHR.XMLHttpRequest()
	        }
	    }
	
	    var key
	    var aborted
	    var uri = xhr.url = options.uri || options.url
	    var method = xhr.method = options.method || "GET"
	    var body = options.body || options.data || null
	    var headers = xhr.headers = options.headers || {}
	    var sync = !!options.sync
	    var isJson = false
	    var timeoutTimer
	
	    if ("json" in options) {
	        isJson = true
	        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
	        if (method !== "GET" && method !== "HEAD") {
	            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
	            body = JSON.stringify(options.json)
	        }
	    }
	
	    xhr.onreadystatechange = readystatechange
	    xhr.onload = loadFunc
	    xhr.onerror = errorFunc
	    // IE9 must have onprogress be set to a unique function.
	    xhr.onprogress = function () {
	        // IE must die
	    }
	    xhr.ontimeout = errorFunc
	    xhr.open(method, uri, !sync, options.username, options.password)
	    //has to be after open
	    if(!sync) {
	        xhr.withCredentials = !!options.withCredentials
	    }
	    // Cannot set timeout with sync request
	    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
	    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
	    if (!sync && options.timeout > 0 ) {
	        timeoutTimer = setTimeout(function(){
	            aborted=true//IE9 may still call readystatechange
	            xhr.abort("timeout")
	            var e = new Error("XMLHttpRequest timeout")
	            e.code = "ETIMEDOUT"
	            errorFunc(e)
	        }, options.timeout )
	    }
	
	    if (xhr.setRequestHeader) {
	        for(key in headers){
	            if(headers.hasOwnProperty(key)){
	                xhr.setRequestHeader(key, headers[key])
	            }
	        }
	    } else if (options.headers && !isEmpty(options.headers)) {
	        throw new Error("Headers cannot be set on an XDomainRequest object")
	    }
	
	    if ("responseType" in options) {
	        xhr.responseType = options.responseType
	    }
	
	    if ("beforeSend" in options &&
	        typeof options.beforeSend === "function"
	    ) {
	        options.beforeSend(xhr)
	    }
	
	    xhr.send(body)
	
	    return xhr
	
	
	}
	
	function getXml(xhr) {
	    if (xhr.responseType === "document") {
	        return xhr.responseXML
	    }
	    var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
	    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
	        return xhr.responseXML
	    }
	
	    return null
	}
	
	function noop() {}


/***/ },
/* 92 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {if (typeof window !== "undefined") {
	    module.exports = window;
	} else if (typeof global !== "undefined") {
	    module.exports = global;
	} else if (typeof self !== "undefined"){
	    module.exports = self;
	} else {
	    module.exports = {};
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = isFunction
	
	var toString = Object.prototype.toString
	
	function isFunction (fn) {
	  var string = toString.call(fn)
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	};


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(95)
	  , forEach = __webpack_require__(96)
	  , isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    }
	
	module.exports = function (headers) {
	  if (!headers)
	    return {}
	
	  var result = {}
	
	  forEach(
	      trim(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim(row.slice(0, index)).toLowerCase()
	          , value = trim(row.slice(index + 1))
	
	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value
	        } else if (isArray(result[key])) {
	          result[key].push(value)
	        } else {
	          result[key] = [ result[key], value ]
	        }
	      }
	  )
	
	  return result
	}

/***/ },
/* 95 */
/***/ function(module, exports) {

	
	exports = module.exports = trim;
	
	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}
	
	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};
	
	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(93)
	
	module.exports = forEach
	
	var toString = Object.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty
	
	function forEach(list, iterator, context) {
	    if (!isFunction(iterator)) {
	        throw new TypeError('iterator must be a function')
	    }
	
	    if (arguments.length < 3) {
	        context = this
	    }
	    
	    if (toString.call(list) === '[object Array]')
	        forEachArray(list, iterator, context)
	    else if (typeof list === 'string')
	        forEachString(list, iterator, context)
	    else
	        forEachObject(list, iterator, context)
	}
	
	function forEachArray(array, iterator, context) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            iterator.call(context, array[i], i, array)
	        }
	    }
	}
	
	function forEachString(string, iterator, context) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        iterator.call(context, string.charAt(i), i, string)
	    }
	}
	
	function forEachObject(object, iterator, context) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            iterator.call(context, object[k], k, object)
	        }
	    }
	}


/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = extend
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function extend() {
	    var target = {}
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _freeze = __webpack_require__(99);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var filterOptions = ['none', 'blur', 'brightness', 'contrast', 'invert', 'opacity', 'saturate', 'sepia', 'drop-shadow', 'grayscale', 'hue-rotate'];
	
	(0, _freeze2["default"])(filterOptions);
	
	/**
	 * Each filter style needs to adjust the strength value (1 - 100) by a `modifier`
	 * function and a unit, as appropriate. The `modifier` is purely subjective.
	 */
	var filterProperties = {
	  blur: {
	    modifier: function modifier(value) {
	      return value * 0.3;
	    },
	    unit: 'px'
	  },
	  brightness: {
	    modifier: function modifier(value) {
	      return value * 0.009 + 0.1;
	    },
	    unit: ''
	  },
	  contrast: {
	    modifier: function modifier(value) {
	      return value * 0.4 + 80;
	    },
	    unit: '%'
	  },
	  grayscale: {
	    modifier: function modifier(value) {
	      return value;
	    },
	    unit: '%'
	  },
	  'hue-rotate': {
	    modifier: function modifier(value) {
	      return value * 3.6;
	    },
	    unit: 'deg'
	  },
	  invert: {
	    modifier: function modifier(value) {
	      return 1;
	    },
	    unit: ''
	  },
	  opacity: {
	    modifier: function modifier(value) {
	      return value;
	    },
	    unit: '%'
	  },
	  saturate: {
	    modifier: function modifier(value) {
	      return value * 2;
	    },
	    unit: '%'
	  },
	  sepia: {
	    modifier: function modifier(value) {
	      return value;
	    },
	    unit: '%'
	  }
	};
	
	(0, _freeze2["default"])(filterProperties);
	
	module.exports = {
	  filterOptions: filterOptions,
	  filterProperties: filterProperties
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(101);
	module.exports = __webpack_require__(9).Object.freeze;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(20)
	  , meta     = __webpack_require__(70).onFreeze;
	
	__webpack_require__(102)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(13)
	  , core    = __webpack_require__(9)
	  , fails   = __webpack_require__(23);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	var getPropsFromNode = function(node) {
	  var props = {
	    'container': node
	  };
	
	  if (node.getAttribute('data-config-url')) {
	    props.url = node.getAttribute('data-config-url');
	  }
	
	  if (node.getAttribute('data-config-playback-speed')) {
	    props.playbackSpeed = node.getAttribute('data-config-playback-speed');
	  }
	
	  if (node.getAttribute('data-config-filter')) {
	    props.filter = node.getAttribute('data-config-filter');
	  }
	
	  if (node.getAttribute('data-config-filter-strength')) {
	    props.filterStrength = node.getAttribute('data-config-filter-strength');
	  }
	
	  return props;
	};
	
	module.exports = getPropsFromNode;


/***/ }
/******/ ]);