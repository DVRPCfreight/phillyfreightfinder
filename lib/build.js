/*-----------------------------------------------------------
    Open Freight Dynamic Markers is a customized version of the Leaflet.AwesomeMarkers. 
    This plugin provides Open Freight App with the ability to add icon sets as markers.
    (c) 2014 Michael Ruane DVRPC

/*--------------------------------------------------------
  Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
  (c) 2012-2013, Lennard Voogdt

  http://leafletjs.com
  https://github.com/lvoogdt
*/


/*global L*/

(function (window, document, undefined) {
    "use strict";
    /*
     * Leaflet.AwesomeMarkers assumes that you have already included the Leaflet library.
     */

    L.OpenFreightMarkers = {};

    L.OpenFreightMarkers.version = '1.0.0';

    L.OpenFreightMarkers.Icon = L.Icon.extend({
        options: {
            iconSize: [35, 46],
            iconAnchor:   [17, 42],
            popupAnchor: [1, -32],
            shadowAnchor: [10, 12],
            shadowSize: [36, 16],
            markerSet: 'open-freight',
            mapMarker: 'circle-md',
            iconSet: 'dynico',
            spinClass: 'fa-spin',
            extraClasses: '',
            icon: 'home',
            markerColor: 'blue',
            iconColor: 'white',
            legendMarker: 'circle-md',
            layer:'',
            title: '',
            onLoad: true
        },

        initialize: function (options) {
            options = L.Util.setOptions(this, options);
        },

        createIcon: function () {
            var div = document.createElement('div'),
                options = this.options;

            if (options.icon) {
                div.innerHTML = this._createInner();
            }

            if (options.bgPos) {
                div.style.backgroundPosition =
                    (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }

            this._setIconStyles(div, 'icon-' + options.markerColor);
            return div;

        },

        _createInner: function() {
            var iconClass, iconSpinClass = "", iconColorClass = "", iconColorStyle = "", options = this.options;

            if(options.icon.slice(0,options.iconSet.length+1) === options.iconSet + "-") {
                iconClass = options.icon;
            } else {
                iconClass = options.iconSet + "-" + options.icon;
            }

            if(options.spin && typeof options.spinClass === "string") {
                iconSpinClass = options.spinClass;
            }

            if(options.iconColor) {
                if(options.iconColor === 'white' || options.iconColor === 'black') {
                    iconColorClass = "icon-" + options.iconColor;
                } else {
                    iconColorStyle = "style='color: " + options.iconColor + "' ";
                }
            }

            return "<i " + iconColorStyle + "class='" + options.extraClasses + " " + options.iconSet + " " + iconClass + " " + iconSpinClass + " " + iconColorClass + "'></i>";
        },

        _setIconStyles: function (img, name) {
            var options = this.options,
                size, 
                anchor;
            if (options.mapMarker === 'circle-sm') {
                if (name === 'shadow') {size = L.point([30,30]);} else {size = L.point([28,28]);}
            } else if (options.mapMarker === 'circle-md') {
                if (name === 'shadow') {size = L.point([34,34]);} else {size = L.point([32,32]);}
            } else if (options.mapMarker === 'circle-cm') {
                if (name === 'shadow') {size = L.point([34,16]);} else {size = L.point([28,36]);}
            }
            else {
                size = L.point(options[name === 'shadow' ? 'shadowSize' : 'iconSize']);
            }
            

            if (name === 'shadow') {
                if (options.mapMarker === 'circle-cm') {
                    anchor = L.point([10,12]);
                } else if(options.mapMarker === 'circle-sm') {
                    
                } else if (options.mapMarker === 'circle-md') {
                    
                } else {
                    anchor = L.point(options.shadowAnchor || options.iconAnchor);
                }
            } else {
                if (options.mapMarker === 'circle-cm') {
                    anchor = L.point([14,34]);
                } else if(options.mapMarker === 'circle-sm') {
                    
                }else if (options.mapMarker === 'circle-md') {
                  
                } else {
                    anchor = L.point(options.iconAnchor);
                }
            }

            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }
            if (name=== 'shadow') {
                img.className = options.mapMarker + '-' + name + ' ' + options.mapMarker;
            } else {
                img.className = options.markerSet + '-' + name + ' ' + options.mapMarker;
            }

            if (anchor) {
                img.style.marginLeft = (-anchor.x) + 'px';
                img.style.marginTop  = (-anchor.y) + 'px';
            }

            if (size) {
                img.style.width  = size.x + 'px';
                img.style.height = size.y + 'px';
            }
        },

        createShadow: function () {
            var div = document.createElement('div');

            this._setIconStyles(div, 'shadow');
            return div;
      }

      
    });
	//Dynamic Icon Marker Legend + Info Window Functionality
    L.createLegend = function (options) {
        window['DynaIcon' + options.layer] = ''+ options.iconSet +' '+ options.iconSet +'-'+options.icon+'';
        window['DynaClass'+ options.layer] =  ''+options.markerColor+'';
        window['DynaTitle' + options.layer] = ''+options.title+'';
        if(options.legendMarker === 'checkbox'){
             $('#' + options.layer + '.dyna').wrap('<div class="checkbox" data-toggle="tooltip" title="Click to toggle layer"></div>').after('<label for="' + options.layer + '" class="dynacheck"><div class="legend-check"><i class="dynico dynico-square-o"></i></div> '+options.title+'</label>');
        }else{
            $('#' + options.layer + '.dyna').wrap('<div class="checkbox" data-toggle="tooltip" title="Click to toggle layer"></div>').after('<label for="' + options.layer + '"><div class="'+ options.legendMarker +' legend-icon '+ options.markerSet +'-icon-'+ options.markerColor +'"><i class="dynico dynico-'+options.icon+'"></i></div> '+options.title+'</label>');
        }
        if(options.onLoad === false){
        }else{
        	$('#' + options.layer + '.dyna').attr('checked', true);
        }
        
    };

    L.OpenFreightMarkers.icon = function (options, presets) {
            var Options = $.extend({},presets, options);
            L.createLegend(Options);
            return new L.OpenFreightMarkers.Icon(Options);
            
           
    };



}(this, document));;
/*
 * jQuery FlexSlider v2.6.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  var focused = true;

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture) {
                        e.currentTarget._gesture.addPointer(e.pointerId);
                      }
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              if ( undefined === slide.attr( 'data-thumb-alt' ) ) { slide.attr( 'data-thumb-alt', '' ); }
              altText = ( '' !== slide.attr( 'data-thumb-alt' ) ) ? altText = ' alt="' + slide.attr( 'data-thumb-alt' ) + '"' : '';
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
          // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            onTouchStart = function(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            };

            onTouchMove = function(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            };

            onTouchEnd = function(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            };

            el.addEventListener('touchstart', onTouchStart, false);
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
              if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
              }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.itemM = slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.itemM = slideMargin;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
      slider.computedM = slider.itemM;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})(jQuery);
;
(function(){function e(e){this._value=e}function t(e,t,n,r){var i,s,o=Math.pow(10,t);return s=(n(e*o)/o).toFixed(t),r&&(i=new RegExp("0{1,"+r+"}$"),s=s.replace(i,"")),s}function n(e,t,n){var r;return r=t.indexOf("$")>-1?i(e,t,n):t.indexOf("%")>-1?s(e,t,n):t.indexOf(":")>-1?o(e,t):a(e._value,t,n)}function r(e,t){var n,r,i,s,o,a=t,f=["KB","MB","GB","TB","PB","EB","ZB","YB"],l=!1;if(t.indexOf(":")>-1)e._value=u(t);else if(t===d)e._value=0;else{for("."!==h[p].delimiters.decimal&&(t=t.replace(/\./g,"").replace(h[p].delimiters.decimal,".")),n=new RegExp("[^a-zA-Z]"+h[p].abbreviations.thousand+"(?:\\)|(\\"+h[p].currency.symbol+")?(?:\\))?)?$"),r=new RegExp("[^a-zA-Z]"+h[p].abbreviations.million+"(?:\\)|(\\"+h[p].currency.symbol+")?(?:\\))?)?$"),i=new RegExp("[^a-zA-Z]"+h[p].abbreviations.billion+"(?:\\)|(\\"+h[p].currency.symbol+")?(?:\\))?)?$"),s=new RegExp("[^a-zA-Z]"+h[p].abbreviations.trillion+"(?:\\)|(\\"+h[p].currency.symbol+")?(?:\\))?)?$"),o=0;o<=f.length&&!(l=t.indexOf(f[o])>-1?Math.pow(1024,o+1):!1);o++);e._value=(l?l:1)*(a.match(n)?Math.pow(10,3):1)*(a.match(r)?Math.pow(10,6):1)*(a.match(i)?Math.pow(10,9):1)*(a.match(s)?Math.pow(10,12):1)*(t.indexOf("%")>-1?.01:1)*((t.split("-").length+Math.min(t.split("(").length-1,t.split(")").length-1))%2?1:-1)*Number(t.replace(/[^0-9\.]+/g,"")),e._value=l?Math.ceil(e._value):e._value}return e._value}function i(e,t,n){var r,i=t.indexOf("$")<=1?!0:!1,s="";return t.indexOf(" $")>-1?(s=" ",t=t.replace(" $","")):t.indexOf("$ ")>-1?(s=" ",t=t.replace("$ ","")):t=t.replace("$",""),r=a(e._value,t,n),i?r.indexOf("(")>-1||r.indexOf("-")>-1?(r=r.split(""),r.splice(1,0,h[p].currency.symbol+s),r=r.join("")):r=h[p].currency.symbol+s+r:r.indexOf(")")>-1?(r=r.split(""),r.splice(-1,0,s+h[p].currency.symbol),r=r.join("")):r=r+s+h[p].currency.symbol,r}function s(e,t,n){var r,i="",s=100*e._value;return t.indexOf(" %")>-1?(i=" ",t=t.replace(" %","")):t=t.replace("%",""),r=a(s,t,n),r.indexOf(")")>-1?(r=r.split(""),r.splice(-1,0,i+"%"),r=r.join("")):r=r+i+"%",r}function o(e){var t=Math.floor(e._value/60/60),n=Math.floor((e._value-60*60*t)/60),r=Math.round(e._value-60*60*t-60*n);return t+":"+(10>n?"0"+n:n)+":"+(10>r?"0"+r:r)}function u(e){var t=e.split(":"),n=0;return 3===t.length?(n+=60*60*Number(t[0]),n+=60*Number(t[1]),n+=Number(t[2])):2===t.length&&(n+=60*Number(t[0]),n+=Number(t[1])),Number(n)}function a(e,n,r){var i,s,o,u,a,f,l=!1,c=!1,v=!1,m="",g="",y="",w=Math.abs(e),E=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],S="",x=!1;if(0===e&&null!==d)return d;if(n.indexOf("(")>-1?(l=!0,n=n.slice(1,-1)):n.indexOf("+")>-1&&(c=!0,n=n.replace(/\+/g,"")),n.indexOf("a")>-1&&(n.indexOf(" a")>-1?(m=" ",n=n.replace(" a","")):n=n.replace("a",""),w>=Math.pow(10,12)?(m+=h[p].abbreviations.trillion,e/=Math.pow(10,12)):w<Math.pow(10,12)&&w>=Math.pow(10,9)?(m+=h[p].abbreviations.billion,e/=Math.pow(10,9)):w<Math.pow(10,9)&&w>=Math.pow(10,6)?(m+=h[p].abbreviations.million,e/=Math.pow(10,6)):w<Math.pow(10,6)&&w>=Math.pow(10,3)&&(m+=h[p].abbreviations.thousand,e/=Math.pow(10,3))),n.indexOf("b")>-1)for(n.indexOf(" b")>-1?(g=" ",n=n.replace(" b","")):n=n.replace("b",""),o=0;o<=E.length;o++)if(i=Math.pow(1024,o),s=Math.pow(1024,o+1),e>=i&&s>e){g+=E[o],i>0&&(e/=i);break}return n.indexOf("o")>-1&&(n.indexOf(" o")>-1?(y=" ",n=n.replace(" o","")):n=n.replace("o",""),y+=h[p].ordinal(e)),n.indexOf("[.]")>-1&&(v=!0,n=n.replace("[.]",".")),u=e.toString().split(".")[0],a=n.split(".")[1],f=n.indexOf(","),a?(a.indexOf("[")>-1?(a=a.replace("]",""),a=a.split("["),S=t(e,a[0].length+a[1].length,r,a[1].length)):S=t(e,a.length,r),u=S.split(".")[0],S=S.split(".")[1].length?h[p].delimiters.decimal+S.split(".")[1]:"",v&&0===Number(S.slice(1))&&(S="")):u=t(e,null,r),u.indexOf("-")>-1&&(u=u.slice(1),x=!0),f>-1&&(u=u.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+h[p].delimiters.thousands)),0===n.indexOf(".")&&(u=""),(l&&x?"(":"")+(!l&&x?"-":"")+(!x&&c?"+":"")+u+S+(y?y:"")+(m?m:"")+(g?g:"")+(l&&x?")":"")}function f(e,t){h[e]=t}var l,c="1.5.2",h={},p="en",d=null,v="0,0",m="undefined"!=typeof module&&module.exports;l=function(t){return l.isNumeral(t)?t=t.value():0===t||"undefined"==typeof t?t=0:Number(t)||(t=l.fn.unformat(t)),new e(Number(t))},l.version=c,l.isNumeral=function(t){return t instanceof e},l.language=function(e,t){if(!e)return p;if(e&&!t){if(!h[e])throw new Error("Unknown language : "+e);p=e}return(t||!h[e])&&f(e,t),l},l.languageData=function(e){if(!e)return h[p];if(!h[e])throw new Error("Unknown language : "+e);return h[e]},l.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var t=e%10;return 1===~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th"},currency:{symbol:"$"}}),l.zeroFormat=function(e){d="string"==typeof e?e:null},l.defaultFormat=function(e){v="string"==typeof e?e:"0.0"},l.fn=e.prototype={clone:function(){return l(this)},format:function(e,t){return n(this,e?e:v,void 0!==t?t:Math.round)},unformat:function(e){return"[object Number]"===Object.prototype.toString.call(e)?e:r(this,e?e:v)},value:function(){return this._value},valueOf:function(){return this._value},set:function(e){return this._value=Number(e),this},add:function(e){return this._value=this._value+Number(e),this},subtract:function(e){return this._value=this._value-Number(e),this},multiply:function(e){return this._value=this._value*Number(e),this},divide:function(e){return this._value=this._value/Number(e),this},difference:function(e){var t=this._value-Number(e);return 0>t&&(t=-t),t}},m&&(module.exports=l),"undefined"==typeof ender&&(this.numeral=l),"function"==typeof define&&define.amd&&define([],function(){return l})}).call(this);
// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function($) {
    
    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    }
    
    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    }
    
    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();
                
                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);
                
                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth || 0,
                    height: this.$element[0].offsetHeight || 0
                });

                if (typeof this.$element[0].nearestViewportElement == 'object') {
                    // SVG
					var el = this.$element[0];
                    var rect = el.getBoundingClientRect();
					pos.width = rect.width;
					pos.height = rect.height;
                }

                
                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);
                
                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }
                
                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }
                
                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }
                
                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }

                var t = this;
                var set_hovered  = function(set_hover){
                    return function(){
                        t.$tip.stop();
                        t.tipHovered = set_hover;
                        if (!set_hover){
                            if (t.options.delayOut === 0) {
                                t.hide();
                            } else {
                                setTimeout(function() { 
                                    if (t.hoverState == 'out') t.hide(); }, t.options.delayOut);
                            }
                        }
                    };
                };
               $tip.hover(set_hovered(true), set_hovered(false));
            }
        },
        
        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },
        
        fixTitle: function() {
            var $e = this.$element;
            
            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
            if (typeof $e.context.nearestViewportElement == 'object'){                                                        
                if ($e.children('title').length){
                    $e.append('<original-title>' + ($e.children('title').text() || '') + '</original-title>')
                        .children('title').remove();
                }
            }
        },
        
        getTitle: function() {
            
            var title, $e = this.$element, o = this.options;
            this.fixTitle();

            if (typeof o.title == 'string') {
                var title_name = o.title == 'title' ? 'original-title' : o.title;
                if ($e.children(title_name).length){
                    title = $e.children(title_name).html();
                } else{
                    title = $e.attr(title_name);
                }
                
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, "");
            return title || o.fallback;
        },
        
        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
            }
            return this.$tip;
        },
        
        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },
        
        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };
    
    $.fn.tipsy = function(options) {
        
        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }
        
        options = $.extend({}, $.fn.tipsy.defaults, options);

        if (options.hoverlock && options.delayOut === 0) {
	    options.delayOut = 100;
	}
        
        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }
        
        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn === 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        }
        
        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut === 0) {
                tipsy.hide();
            } else {
                var to = function() {
                    if (!tipsy.tipHovered || !options.hoverlock){
                        if (tipsy.hoverState == 'out') tipsy.hide(); 
                    }
                };
                setTimeout(to, options.delayOut);
            }    
        }

        if (options.trigger != 'manual') {
            var binder = options.live ? 'live' : 'bind',
                eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }
        
        return this;
        
    };
    
    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover',
        hoverlock: false
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable 
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
     $.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
			    boundTop = $(document).scrollTop() + margin,
			    boundLeft = $(document).scrollLeft() + margin,
			    $this = $(this);

			if ($this.offset().top < boundTop) dir.ns = 'n';
			if ($this.offset().left < boundLeft) dir.ew = 'w';
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

			return dir.ns + (dir.ew ? dir.ew : '');
		};
    };
})(jQuery);;
/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a){var b=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,getUniqueId:function(){var a=0;return function(){return a++}}(),templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},noop:function(){}}}(),c="0.10.5",d=function(){"use strict";function a(a){return a=b.toStr(a),a?a.split(/\s+/):[]}function c(a){return a=b.toStr(a),a?a.split(/\W+/):[]}function d(a){return function(){var c=[].slice.call(arguments,0);return function(d){var e=[];return b.each(c,function(c){e=e.concat(a(b.toStr(d[c])))}),e}}}return{nonword:c,whitespace:a,obj:{nonword:d(c),whitespace:d(a)}}}(),e=function(){"use strict";function c(c){this.maxSize=b.isNumber(c)?c:100,this.reset(),this.maxSize<=0&&(this.set=this.get=a.noop)}function d(){this.head=this.tail=null}function e(a,b){this.key=a,this.val=b,this.prev=this.next=null}return b.mixin(c.prototype,{set:function(a,b){var c,d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key]),(c=this.hash[a])?(c.val=b,this.list.moveToFront(c)):(c=new e(a,b),this.list.add(c),this.hash[a]=c,this.size++)},get:function(a){var b=this.hash[a];return b?(this.list.moveToFront(b),b.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new d}}),b.mixin(d.prototype,{add:function(a){this.head&&(a.next=this.head,this.head.prev=a),this.head=a,this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a),this.add(a)}}),c}(),f=function(){"use strict";function a(a){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+b.escapeRegExChars(this.prefix))}function c(){return(new Date).getTime()}function d(a){return JSON.stringify(b.isUndefined(a)?null:a)}function e(a){return JSON.parse(a)}var f,g;try{f=window.localStorage,f.setItem("~~~","!"),f.removeItem("~~~")}catch(h){f=null}return g=f&&window.JSON?{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},get:function(a){return this.isExpired(a)&&this.remove(a),e(f.getItem(this._prefix(a)))},set:function(a,e,g){return b.isNumber(g)?f.setItem(this._ttlKey(a),d(c()+g)):f.removeItem(this._ttlKey(a)),f.setItem(this._prefix(a),d(e))},remove:function(a){return f.removeItem(this._ttlKey(a)),f.removeItem(this._prefix(a)),this},clear:function(){var a,b,c=[],d=f.length;for(a=0;d>a;a++)(b=f.key(a)).match(this.keyMatcher)&&c.push(b.replace(this.keyMatcher,""));for(a=c.length;a--;)this.remove(c[a]);return this},isExpired:function(a){var d=e(f.getItem(this._ttlKey(a)));return b.isNumber(d)&&c()>d?!0:!1}}:{get:b.noop,set:b.noop,remove:b.noop,clear:b.noop,isExpired:b.noop},b.mixin(a.prototype,g),a}(),g=function(){"use strict";function c(b){b=b||{},this.cancelled=!1,this.lastUrl=null,this._send=b.transport?d(b.transport):a.ajax,this._get=b.rateLimiter?b.rateLimiter(this._get):this._get,this._cache=b.cache===!1?new e(0):i}function d(c){return function(d,e){function f(a){b.defer(function(){h.resolve(a)})}function g(a){b.defer(function(){h.reject(a)})}var h=a.Deferred();return c(d,e,f,g),h}}var f=0,g={},h=6,i=new e(10);return c.setMaxPendingRequests=function(a){h=a},c.resetCache=function(){i.reset()},b.mixin(c.prototype,{_get:function(a,b,c){function d(b){c&&c(null,b),k._cache.set(a,b)}function e(){c&&c(!0)}function i(){f--,delete g[a],k.onDeckRequestArgs&&(k._get.apply(k,k.onDeckRequestArgs),k.onDeckRequestArgs=null)}var j,k=this;this.cancelled||a!==this.lastUrl||((j=g[a])?j.done(d).fail(e):h>f?(f++,g[a]=this._send(a,b).done(d).fail(e).always(i)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(a,c,d){var e;return b.isFunction(c)&&(d=c,c={}),this.cancelled=!1,this.lastUrl=a,(e=this._cache.get(a))?b.defer(function(){d&&d(null,e)}):this._get(a,c,d),!!e},cancel:function(){this.cancelled=!0}}),c}(),h=function(){"use strict";function c(b){b=b||{},b.datumTokenizer&&b.queryTokenizer||a.error("datumTokenizer and queryTokenizer are both required"),this.datumTokenizer=b.datumTokenizer,this.queryTokenizer=b.queryTokenizer,this.reset()}function d(a){return a=b.filter(a,function(a){return!!a}),a=b.map(a,function(a){return a.toLowerCase()})}function e(){return{ids:[],children:{}}}function f(a){for(var b={},c=[],d=0,e=a.length;e>d;d++)b[a[d]]||(b[a[d]]=!0,c.push(a[d]));return c}function g(a,b){function c(a,b){return a-b}var d=0,e=0,f=[];a=a.sort(c),b=b.sort(c);for(var g=a.length,h=b.length;g>d&&h>e;)a[d]<b[e]?d++:a[d]>b[e]?e++:(f.push(a[d]),d++,e++);return f}return b.mixin(c.prototype,{bootstrap:function(a){this.datums=a.datums,this.trie=a.trie},add:function(a){var c=this;a=b.isArray(a)?a:[a],b.each(a,function(a){var f,g;f=c.datums.push(a)-1,g=d(c.datumTokenizer(a)),b.each(g,function(a){var b,d,g;for(b=c.trie,d=a.split("");g=d.shift();)b=b.children[g]||(b.children[g]=e()),b.ids.push(f)})})},get:function(a){var c,e,h=this;return c=d(this.queryTokenizer(a)),b.each(c,function(a){var b,c,d,f;if(e&&0===e.length)return!1;for(b=h.trie,c=a.split("");b&&(d=c.shift());)b=b.children[d];return b&&0===c.length?(f=b.ids.slice(0),void(e=e?g(e,f):f)):(e=[],!1)}),e?b.map(f(e),function(a){return h.datums[a]}):[]},reset:function(){this.datums=[],this.trie=e()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),c}(),i=function(){"use strict";function d(a){return a.local||null}function e(d){var e,f;return f={url:null,thumbprint:"",ttl:864e5,filter:null,ajax:{}},(e=d.prefetch||null)&&(e=b.isString(e)?{url:e}:e,e=b.mixin(f,e),e.thumbprint=c+e.thumbprint,e.ajax.type=e.ajax.type||"GET",e.ajax.dataType=e.ajax.dataType||"json",!e.url&&a.error("prefetch requires url to be set")),e}function f(c){function d(a){return function(c){return b.debounce(c,a)}}function e(a){return function(c){return b.throttle(c,a)}}var f,g;return g={url:null,cache:!0,wildcard:"%QUERY",replace:null,rateLimitBy:"debounce",rateLimitWait:300,send:null,filter:null,ajax:{}},(f=c.remote||null)&&(f=b.isString(f)?{url:f}:f,f=b.mixin(g,f),f.rateLimiter=/^throttle$/i.test(f.rateLimitBy)?e(f.rateLimitWait):d(f.rateLimitWait),f.ajax.type=f.ajax.type||"GET",f.ajax.dataType=f.ajax.dataType||"json",delete f.rateLimitBy,delete f.rateLimitWait,!f.url&&a.error("remote requires url to be set")),f}return{local:d,prefetch:e,remote:f}}();!function(c){"use strict";function e(b){b&&(b.local||b.prefetch||b.remote)||a.error("one of local, prefetch, or remote is required"),this.limit=b.limit||5,this.sorter=j(b.sorter),this.dupDetector=b.dupDetector||k,this.local=i.local(b),this.prefetch=i.prefetch(b),this.remote=i.remote(b),this.cacheKey=this.prefetch?this.prefetch.cacheKey||this.prefetch.url:null,this.index=new h({datumTokenizer:b.datumTokenizer,queryTokenizer:b.queryTokenizer}),this.storage=this.cacheKey?new f(this.cacheKey):null}function j(a){function c(b){return b.sort(a)}function d(a){return a}return b.isFunction(a)?c:d}function k(){return!1}var l,m;return l=c.Bloodhound,m={data:"data",protocol:"protocol",thumbprint:"thumbprint"},c.Bloodhound=e,e.noConflict=function(){return c.Bloodhound=l,e},e.tokenizers=d,b.mixin(e.prototype,{_loadPrefetch:function(b){function c(a){f.clear(),f.add(b.filter?b.filter(a):a),f._saveToStorage(f.index.serialize(),b.thumbprint,b.ttl)}var d,e,f=this;return(d=this._readFromStorage(b.thumbprint))?(this.index.bootstrap(d),e=a.Deferred().resolve()):e=a.ajax(b.url,b.ajax).done(c),e},_getFromRemote:function(a,b){function c(a,c){b(a?[]:f.remote.filter?f.remote.filter(c):c)}var d,e,f=this;if(this.transport)return a=a||"",e=encodeURIComponent(a),d=this.remote.replace?this.remote.replace(this.remote.url,a):this.remote.url.replace(this.remote.wildcard,e),this.transport.get(d,this.remote.ajax,c)},_cancelLastRemoteRequest:function(){this.transport&&this.transport.cancel()},_saveToStorage:function(a,b,c){this.storage&&(this.storage.set(m.data,a,c),this.storage.set(m.protocol,location.protocol,c),this.storage.set(m.thumbprint,b,c))},_readFromStorage:function(a){var b,c={};return this.storage&&(c.data=this.storage.get(m.data),c.protocol=this.storage.get(m.protocol),c.thumbprint=this.storage.get(m.thumbprint)),b=c.thumbprint!==a||c.protocol!==location.protocol,c.data&&!b?c.data:null},_initialize:function(){function c(){e.add(b.isFunction(f)?f():f)}var d,e=this,f=this.local;return d=this.prefetch?this._loadPrefetch(this.prefetch):a.Deferred().resolve(),f&&d.done(c),this.transport=this.remote?new g(this.remote):null,this.initPromise=d.promise()},initialize:function(a){return!this.initPromise||a?this._initialize():this.initPromise},add:function(a){this.index.add(a)},get:function(a,c){function d(a){var d=f.slice(0);b.each(a,function(a){var c;return c=b.some(d,function(b){return e.dupDetector(a,b)}),!c&&d.push(a),d.length<e.limit}),c&&c(e.sorter(d))}var e=this,f=[],g=!1;f=this.index.get(a),f=this.sorter(f).slice(0,this.limit),f.length<this.limit?g=this._getFromRemote(a,d):this._cancelLastRemoteRequest(),g||(f.length>0||!this.transport)&&c&&c(f)},clear:function(){this.index.reset()},clearPrefetchCache:function(){this.storage&&this.storage.clear()},clearRemoteCache:function(){this.transport&&g.resetCache()},ttAdapter:function(){return b.bind(this.get,this)}}),e}(this);var j=function(){return{wrapper:'<span class="twitter-typeahead"></span>',dropdown:'<span class="tt-dropdown-menu"></span>',dataset:'<div class="tt-dataset-%CLASS%"></div>',suggestions:'<span class="tt-suggestions"></span>',suggestion:'<div class="tt-suggestion"></div>'}}(),k=function(){"use strict";var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},suggestions:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),b.isMsie()&&b.isMsie()<=7&&b.mixin(a.input,{marginTop:"-1px"}),a}(),l=function(){"use strict";function c(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d="typeahead:";return b.mixin(c.prototype,{trigger:function(a){var b=[].slice.call(arguments,1);this.$el.trigger(d+a,b)}}),c}(),m=function(){"use strict";function a(a,b,c,d){var e;if(!c)return this;for(b=b.split(i),c=d?h(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function b(b,c,d){return a.call(this,"async",b,c,d)}function c(b,c,d){return a.call(this,"sync",b,c,d)}function d(a){var b;if(!this._callbacks)return this;for(a=a.split(i);b=a.shift();)delete this._callbacks[b];return this}function e(a){var b,c,d,e,g;if(!this._callbacks)return this;for(a=a.split(i),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=f(c.sync,this,[b].concat(d)),g=f(c.async,this,[b].concat(d)),e()&&j(g);return this}function f(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&f>e;e+=1)d=a[e].apply(b,c)===!1;return!d}return d}function g(){var a;return a=window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)}}function h(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var i=/\s+/,j=g();return{onSync:c,onAsync:b,off:d,trigger:e}}(),n=function(a){"use strict";function c(a,c,d){for(var e,f=[],g=0,h=a.length;h>g;g++)f.push(b.escapeRegExChars(a[g]));return e=d?"\\b("+f.join("|")+")\\b":"("+f.join("|")+")",c?new RegExp(e):new RegExp(e,"i")}var d={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(e){function f(b){var c,d,f;return(c=h.exec(b.data))&&(f=a.createElement(e.tagName),e.className&&(f.className=e.className),d=b.splitText(c.index),d.splitText(c[0].length),f.appendChild(d.cloneNode(!0)),b.parentNode.replaceChild(f,d)),!!c}function g(a,b){for(var c,d=3,e=0;e<a.childNodes.length;e++)c=a.childNodes[e],c.nodeType===d?e+=b(c)?1:0:g(c,b)}var h;e=b.mixin({},d,e),e.node&&e.pattern&&(e.pattern=b.isArray(e.pattern)?e.pattern:[e.pattern],h=c(e.pattern,e.caseSensitive,e.wordsOnly),g(e.node,f))}}(window.document),o=function(){"use strict";function c(c){var e,f,h,i,j=this;c=c||{},c.input||a.error("input is missing"),e=b.bind(this._onBlur,this),f=b.bind(this._onFocus,this),h=b.bind(this._onKeydown,this),i=b.bind(this._onInput,this),this.$hint=a(c.hint),this.$input=a(c.input).on("blur.tt",e).on("focus.tt",f).on("keydown.tt",h),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop),b.isMsie()?this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){g[a.which||a.keyCode]||b.defer(b.bind(j._onInput,j,a))}):this.$input.on("input.tt",i),this.query=this.$input.val(),this.$overflowHelper=d(this.$input)}function d(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function e(a,b){return c.normalizeQuery(a)===c.normalizeQuery(b)}function f(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var g;return g={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},c.normalizeQuery=function(a){return(a||"").replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(c.prototype,m,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.trigger("focused")},_onKeydown:function(a){var b=g[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._checkInputValue()},_managePreventDefault:function(a,b){var c,d,e;switch(a){case"tab":d=this.getHint(),e=this.getInputValue(),c=d&&d!==e&&!f(b);break;case"up":case"down":c=!f(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!f(b);break;default:c=!0}return c},_checkInputValue:function(){var a,b,c;a=this.getInputValue(),b=e(a,this.query),c=b?this.query.length!==a.length:!1,this.query=a,b?c&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(a){this.query=a},getInputValue:function(){return this.$input.val()},setInputValue:function(a,b){this.$input.val(a),b?this.clearHint():this._checkInputValue()},resetInputValue:function(){this.setInputValue(this.query,!0)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),d=""!==a&&c&&!this.hasOverflow(),!d&&this.clearHint()},getLanguageDirection:function(){return(this.$input.css("direction")||"ltr").toLowerCase()},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:document.selection?(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$hint=this.$input=this.$overflowHelper=null}}),c}(),p=function(){"use strict";function c(c){c=c||{},c.templates=c.templates||{},c.source||a.error("missing source"),c.name&&!f(c.name)&&a.error("invalid dataset name: "+c.name),this.query=null,this.highlight=!!c.highlight,this.name=c.name||b.getUniqueId(),this.source=c.source,this.displayFn=d(c.display||c.displayKey),this.templates=e(c.templates,this.displayFn),this.$el=a(j.dataset.replace("%CLASS%",this.name))}function d(a){function c(b){return b[a]}return a=a||"value",b.isFunction(a)?a:c}function e(a,c){function d(a){return"<p>"+c(a)+"</p>"}return{empty:a.empty&&b.templatify(a.empty),header:a.header&&b.templatify(a.header),footer:a.footer&&b.templatify(a.footer),suggestion:a.suggestion||d}}function f(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var g="ttDataset",h="ttValue",i="ttDatum";return c.extractDatasetName=function(b){return a(b).data(g)},c.extractValue=function(b){return a(b).data(h)},c.extractDatum=function(b){return a(b).data(i)},b.mixin(c.prototype,m,{_render:function(c,d){function e(){return p.templates.empty({query:c,isEmpty:!0})}function f(){function e(b){var c;return c=a(j.suggestion).append(p.templates.suggestion(b)).data(g,p.name).data(h,p.displayFn(b)).data(i,b),c.children().each(function(){a(this).css(k.suggestionChild)}),c}var f,l;return f=a(j.suggestions).css(k.suggestions),l=b.map(d,e),f.append.apply(f,l),p.highlight&&n({className:"tt-highlight",node:f[0],pattern:c}),f}function l(){return p.templates.header({query:c,isEmpty:!o})}function m(){return p.templates.footer({query:c,isEmpty:!o})}if(this.$el){var o,p=this;this.$el.empty(),o=d&&d.length,!o&&this.templates.empty?this.$el.html(e()).prepend(p.templates.header?l():null).append(p.templates.footer?m():null):o&&this.$el.html(f()).prepend(p.templates.header?l():null).append(p.templates.footer?m():null),this.trigger("rendered")}},getRoot:function(){return this.$el},update:function(a){function b(b){c.canceled||a!==c.query||c._render(a,b)}var c=this;this.query=a,this.canceled=!1,this.source(a,b)},cancel:function(){this.canceled=!0},clear:function(){this.cancel(),this.$el.empty(),this.trigger("rendered")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=null}}),c}(),q=function(){"use strict";function c(c){var e,f,g,h=this;c=c||{},c.menu||a.error("menu is required"),this.isOpen=!1,this.isEmpty=!0,this.datasets=b.map(c.datasets,d),e=b.bind(this._onSuggestionClick,this),f=b.bind(this._onSuggestionMouseEnter,this),g=b.bind(this._onSuggestionMouseLeave,this),this.$menu=a(c.menu).on("click.tt",".tt-suggestion",e).on("mouseenter.tt",".tt-suggestion",f).on("mouseleave.tt",".tt-suggestion",g),b.each(this.datasets,function(a){h.$menu.append(a.getRoot()),a.onSync("rendered",h._onRendered,h)})}function d(a){return new p(a)}return b.mixin(c.prototype,m,{_onSuggestionClick:function(b){this.trigger("suggestionClicked",a(b.currentTarget))},_onSuggestionMouseEnter:function(b){this._removeCursor(),this._setCursor(a(b.currentTarget),!0)},_onSuggestionMouseLeave:function(){this._removeCursor()},_onRendered:function(){function a(a){return a.isEmpty()}this.isEmpty=b.every(this.datasets,a),this.isEmpty?this._hide():this.isOpen&&this._show(),this.trigger("datasetRendered")},_hide:function(){this.$menu.hide()},_show:function(){this.$menu.css("display","block")},_getSuggestions:function(){return this.$menu.find(".tt-suggestion")},_getCursor:function(){return this.$menu.find(".tt-cursor").first()},_setCursor:function(a,b){a.first().addClass("tt-cursor"),!b&&this.trigger("cursorMoved")},_removeCursor:function(){this._getCursor().removeClass("tt-cursor")},_moveCursor:function(a){var b,c,d,e;if(this.isOpen){if(c=this._getCursor(),b=this._getSuggestions(),this._removeCursor(),d=b.index(c)+a,d=(d+1)%(b.length+1)-1,-1===d)return void this.trigger("cursorRemoved");-1>d&&(d=b.length-1),this._setCursor(e=b.eq(d)),this._ensureVisible(e)}},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.outerHeight(!0),d=this.$menu.scrollTop(),e=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10),0>b?this.$menu.scrollTop(d+b):c>e&&this.$menu.scrollTop(d+(c-e))},close:function(){this.isOpen&&(this.isOpen=!1,this._removeCursor(),this._hide(),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,!this.isEmpty&&this._show(),this.trigger("opened"))},setLanguageDirection:function(a){this.$menu.css("ltr"===a?k.ltr:k.rtl)},moveCursorUp:function(){this._moveCursor(-1)},moveCursorDown:function(){this._moveCursor(1)},getDatumForSuggestion:function(a){var b=null;return a.length&&(b={raw:p.extractDatum(a),value:p.extractValue(a),datasetName:p.extractDatasetName(a)}),b},getDatumForCursor:function(){return this.getDatumForSuggestion(this._getCursor().first())},getDatumForTopSuggestion:function(){return this.getDatumForSuggestion(this._getSuggestions().first())},update:function(a){function c(b){b.update(a)}b.each(this.datasets,c)},empty:function(){function a(a){a.clear()}b.each(this.datasets,a),this.isEmpty=!0},isVisible:function(){return this.isOpen&&!this.isEmpty},destroy:function(){function a(a){a.destroy()}this.$menu.off(".tt"),this.$menu=null,b.each(this.datasets,a)}}),c}(),r=function(){"use strict";function c(c){var e,f,g;c=c||{},c.input||a.error("missing input"),this.isActivated=!1,this.autoselect=!!c.autoselect,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.$node=d(c.input,c.withHint),e=this.$node.find(".tt-dropdown-menu"),f=this.$node.find(".tt-input"),g=this.$node.find(".tt-hint"),f.on("blur.tt",function(a){var c,d,g;c=document.activeElement,d=e.is(c),g=e.has(c).length>0,b.isMsie()&&(d||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){f.focus()}))}),e.on("mousedown.tt",function(a){a.preventDefault()}),this.eventBus=c.eventBus||new l({el:f}),this.dropdown=new q({menu:e,datasets:c.datasets}).onSync("suggestionClicked",this._onSuggestionClicked,this).onSync("cursorMoved",this._onCursorMoved,this).onSync("cursorRemoved",this._onCursorRemoved,this).onSync("opened",this._onOpened,this).onSync("closed",this._onClosed,this).onAsync("datasetRendered",this._onDatasetRendered,this),this.input=new o({input:f,hint:g}).onSync("focused",this._onFocused,this).onSync("blurred",this._onBlurred,this).onSync("enterKeyed",this._onEnterKeyed,this).onSync("tabKeyed",this._onTabKeyed,this).onSync("escKeyed",this._onEscKeyed,this).onSync("upKeyed",this._onUpKeyed,this).onSync("downKeyed",this._onDownKeyed,this).onSync("leftKeyed",this._onLeftKeyed,this).onSync("rightKeyed",this._onRightKeyed,this).onSync("queryChanged",this._onQueryChanged,this).onSync("whitespaceChanged",this._onWhitespaceChanged,this),this._setLanguageDirection()}function d(b,c){var d,f,h,i;d=a(b),f=a(j.wrapper).css(k.wrapper),h=a(j.dropdown).css(k.dropdown),i=d.clone().css(k.hint).css(e(d)),i.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly",!0).attr({autocomplete:"off",spellcheck:"false",tabindex:-1}),d.data(g,{dir:d.attr("dir"),autocomplete:d.attr("autocomplete"),spellcheck:d.attr("spellcheck"),style:d.attr("style")}),d.addClass("tt-input").attr({autocomplete:"off",spellcheck:!1}).css(c?k.input:k.inputWithNoHint);try{!d.attr("dir")&&d.attr("dir","auto")}catch(l){}return d.wrap(f).parent().prepend(c?i:null).append(h)}function e(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function f(a){var c=a.find(".tt-input");b.each(c.data(g),function(a,d){b.isUndefined(a)?c.removeAttr(d):c.attr(d,a)}),c.detach().removeData(g).removeClass("tt-input").insertAfter(a),a.remove()}var g="ttAttrs";return b.mixin(c.prototype,{_onSuggestionClicked:function(a,b){var c;(c=this.dropdown.getDatumForSuggestion(b))&&this._select(c)},_onCursorMoved:function(){var a=this.dropdown.getDatumForCursor();this.input.setInputValue(a.value,!0),this.eventBus.trigger("cursorchanged",a.raw,a.datasetName)},_onCursorRemoved:function(){this.input.resetInputValue(),this._updateHint()},_onDatasetRendered:function(){this._updateHint()},_onOpened:function(){this._updateHint(),this.eventBus.trigger("opened")},_onClosed:function(){this.input.clearHint(),this.eventBus.trigger("closed")},_onFocused:function(){this.isActivated=!0,this.dropdown.open()},_onBlurred:function(){this.isActivated=!1,this.dropdown.empty(),this.dropdown.close()},_onEnterKeyed:function(a,b){var c,d;c=this.dropdown.getDatumForCursor(),d=this.dropdown.getDatumForTopSuggestion(),c?(this._select(c),b.preventDefault()):this.autoselect&&d&&(this._select(d),b.preventDefault())},_onTabKeyed:function(a,b){var c;(c=this.dropdown.getDatumForCursor())?(this._select(c),b.preventDefault()):this._autocomplete(!0)},_onEscKeyed:function(){this.dropdown.close(),this.input.resetInputValue()},_onUpKeyed:function(){var a=this.input.getQuery();this.dropdown.isEmpty&&a.length>=this.minLength?this.dropdown.update(a):this.dropdown.moveCursorUp(),this.dropdown.open()},_onDownKeyed:function(){var a=this.input.getQuery();this.dropdown.isEmpty&&a.length>=this.minLength?this.dropdown.update(a):this.dropdown.moveCursorDown(),this.dropdown.open()},_onLeftKeyed:function(){"rtl"===this.dir&&this._autocomplete()},_onRightKeyed:function(){"ltr"===this.dir&&this._autocomplete()},_onQueryChanged:function(a,b){this.input.clearHintIfInvalid(),b.length>=this.minLength?this.dropdown.update(b):this.dropdown.empty(),this.dropdown.open(),this._setLanguageDirection()},_onWhitespaceChanged:function(){this._updateHint(),this.dropdown.open()},_setLanguageDirection:function(){var a;this.dir!==(a=this.input.getLanguageDirection())&&(this.dir=a,this.$node.css("direction",a),this.dropdown.setLanguageDirection(a))},_updateHint:function(){var a,c,d,e,f,g;a=this.dropdown.getDatumForTopSuggestion(),a&&this.dropdown.isVisible()&&!this.input.hasOverflow()?(c=this.input.getInputValue(),d=o.normalizeQuery(c),e=b.escapeRegExChars(d),f=new RegExp("^(?:"+e+")(.+$)","i"),g=f.exec(a.value),g?this.input.setHint(c+g[1]):this.input.clearHint()):this.input.clearHint()},_autocomplete:function(a){var b,c,d,e;b=this.input.getHint(),c=this.input.getQuery(),d=a||this.input.isCursorAtEnd(),b&&c!==b&&d&&(e=this.dropdown.getDatumForTopSuggestion(),e&&this.input.setInputValue(e.value),this.eventBus.trigger("autocompleted",e.raw,e.datasetName))},_select:function(a){this.input.setQuery(a.value),this.input.setInputValue(a.value,!0),this._setLanguageDirection(),this.eventBus.trigger("selected",a.raw,a.datasetName),this.dropdown.close(),b.defer(b.bind(this.dropdown.empty,this.dropdown))},open:function(){this.dropdown.open()},close:function(){this.dropdown.close()},setVal:function(a){a=b.toStr(a),this.isActivated?this.input.setInputValue(a):(this.input.setQuery(a),this.input.setInputValue(a,!0)),this._setLanguageDirection()},getVal:function(){return this.input.getQuery()},destroy:function(){this.input.destroy(),this.dropdown.destroy(),f(this.$node),this.$node=null}}),c}();!function(){"use strict";var c,d,e;c=a.fn.typeahead,d="ttTypeahead",e={initialize:function(c,e){function f(){var f,g,h=a(this);b.each(e,function(a){a.highlight=!!c.highlight}),g=new r({input:h,eventBus:f=new l({el:h}),withHint:b.isUndefined(c.hint)?!0:!!c.hint,minLength:c.minLength,autoselect:c.autoselect,datasets:e}),h.data(d,g)}return e=b.isArray(e)?e:[].slice.call(arguments,1),c=c||{},this.each(f)},open:function(){function b(){var b,c=a(this);(b=c.data(d))&&b.open()}return this.each(b)},close:function(){function b(){var b,c=a(this);(b=c.data(d))&&b.close()}return this.each(b)},val:function(b){function c(){var c,e=a(this);(c=e.data(d))&&c.setVal(b)}function e(a){var b,c;return(b=a.data(d))&&(c=b.getVal()),c}return arguments.length?this.each(c):e(this.first())},destroy:function(){function b(){var b,c=a(this);(b=c.data(d))&&(b.destroy(),c.removeData(d))}return this.each(b)}},a.fn.typeahead=function(b){var c;return e[b]&&"initialize"!==b?(c=this.filter(function(){return!!a(this).data(d)}),e[b].apply(c,[].slice.call(arguments,1))):e.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=c,this}}()}(window.jQuery);
;
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////  Declare Shared Values //////////////////////

var hlweight = 7, 			//weight of highlighted feature outline
	hlColor = "#00CCFF";	//color of point, outline and line highlights


var layersearch, props, header, content, featureName, featureClass, featureIcon;

////////////////////////////////////////////////////
///Individual Feature actions ///////////////////// 

//Trucking-Highway Actions ////////////
//  freeway
function clkHwy(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>';
    var Owner = " ";
    if (props.OWNER===undefined){ Owner = " ";}
                else { Owner = "<div class='two_third' style='float:left;'><div class='datafield'>" + props.OWNER+ "</div><div class='labelfield'>Owner</div>";}

    content = "<div id='baseInfo'>"+ Owner +"</div>"
                        +"<img src='lib/images/Shields/" + props.SHLD_ID + ".png' alt='Shield' height='50' style='padding-left:20px;'>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#RailrivCap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='RailrivCap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td class='item'><strong> </strong></td><td><strong>" + props.DIR_1 + "</strong></td><td><strong>" + props.DIR_2 + "</strong></td></tr>"
                                +"<tr class='active'><td class='item'><strong><a title='Predominant lane count for designated segment' data-toggle='infotooltip'>Capacity <span style='font-weight:normal;'>(lanes)</span></a>: </strong></td><td>" + props.CAP_1 + "</td><td>" + props.CAP_2 + "</td></tr>"
                                +"<tr class='active'><td class='item'><strong><a title='Average Annual Daily Traffic volume for truck traffic (FHWA Vehicle Classes 5-13)' data-toggle='infotooltip'>Truck AADT</a>: </strong></td><td>" + props.ACT_1A + "</td><td>" + props.ACT_2A + "</td></tr>"
                                +"<tr class='active'><td class='item'><strong>Truck share of <a title='Average Annual Daily Traffic' data-toggle='infotooltip'>AADT</a>: </strong></td><td>" + props.ACT_1B + "</td><td>" + props.ACT_2B + "</td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.YEAR + " " + props.SOURCE + "</div></div>",
    featureName = '<p>Type: ' + props.TYPE + '</p>',
    featureClass = 'hwycl',
    featureIcon = 'hwyicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};
//  truck parking
function clkParking(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.OWNER+ "</div><div class='labelfield'>Owner</div>"
                        +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Operator(s)</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP + "</div><div class='labelfield'>Municipality(ies)</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#RailrivCap' data-toggle='tab'>Capacity & Activity</a></li></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='RailrivCap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Truck Spaces Available: </strong></td><td>" + props.CAPACITY + "</td></tr>"
                                +"<tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>Truck Spaces Utilized</a>: </strong></td><td> " + props.RATING + " </td></tr>"
                                +"</table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
                     // +"<p>More Information: " + props.REPORT + "</p>";
    featureName = '<p>Type: Truck Parking</p>',
    featureClass = 'hwycl',
    featureIcon = 'trkparkicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);   
};

var custom_matches = {'CI-1': 'South Philadelphia Freight Complex', 'CI-2': 'Broadway & Gloucester Marine Terminals'};

function findMatch(layer, id){
    var facility;
    $.each(layer._layers, function(key, value) {
        if(value.feature.properties.PFF_ID === id){
            facility = value.feature.properties.NAME;
        } 

    });
    return facility
}


//  NHS Connectors
function clkNHS(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>';
    var facility = findMatch(portpoly, props.LINK_ID) || findMatch(commairpoly, props.LINK_ID) || findMatch(intermodalpoly, props.LINK_ID) || custom_matches[props.LINK_ID];
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" +  facility/*props.FAC_SERVED*/ + "</div><div class='labelfield'>Facility Served</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP_S + "</div><div class='labelfield'>Municipality(ies)</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#RailrivCap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='RailrivCap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong> <a title='Predominant lane count for designated segment' data-toggle='infotooltip'>Lanes per direction</a>: </strong></td><td>" + props.CAP_1 + "</td></tr>"
                                +"<tr class='active'><td><strong> <a title='Average Annual Daily Traffic' data-toggle='infotooltip'>AADT</a>: </strong></td><td>not available</td></tr>"
                                +"</table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
                     //           +"<br/><p>" + props.Profile + "</p>";,
    featureName = '<p>Type: NHS Connector</p>',
    featureClass = 'hwycl',
    featureIcon = 'nhsicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);       
};
//  Highway Bridges
function clkHwyRvrXing(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.LINE + "</div><div class='labelfield'>Highway</div>"
                        +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                        +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Tolled (y/n)</div>"
                        +"<div class='datafield'>" + props.TYPE + "</div><div class='labelfield'>Bridge Type</div>"
                        +"<div class='datafield'>" + props.TOWN_1 + " - " + props.TOWN_2  + "</div><div class='labelfield'>Connecting Municipality(ies)</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#RailrivCap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='RailrivCap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong><a title='Total count of lanes, both directions.' data-toggle='infotooltip'>Travel Lanes</a>: </strong></td><td>" + props.CAP_1 + "</td></tr>"
                                +"<tr class='active'><td><strong>Vertical Restriction <span style='font-weight:normal;'>(ft)</span>: </strong></td><td>" + props.CAP_2 + "</td></tr>"
                                +"<tr class='active'><td><strong> <a title='Average Annual Daily Traffic' data-toggle='infotooltip'>AADT</a>: </strong></td><td>" + props.ACT_1 + "</td></tr>"
                                +"</table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
    featureName = '<p>Type: Highway River Crossing</p>',
    featureClass = 'hwycl',
    featureIcon = 'hwyrivicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};  

//Rail Actions
//rail lines
function clkRailline(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
            +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Operator(s)</div>"
            +"</div><!--close baseInfo-->"
            +"<div class='infoDivider'></div>"
            +"<div id='indactorInfo'>"
            +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
            +"<li class='active'><a href='#IntermodalCap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
            +"<div id='indicator' class='tab-content'><!--tab panes-->"
            +"<div class='tab-pane active' id='IntermodalCap' style='padding-bottom: 12px;'>"
                    +"<table class='table table-hover'>"
                    +"<tr class='active'><td><strong> <a title='Predominant count of through tracks on designated segment' data-toggle='infotooltip'>Number of Tracks</a>: </strong></td><td>" + props.TRK_MAIN + "</td></tr>"
                    +"<tr class='active'><td><strong> <a title='Ability to operate double stack trains. Double stack is a technology allowing intermodal containers to be stack two high on train cars.' data-toggle='infotooltip'>Double Stack Clearance</a>: </strong></td><td> " + props.TRK_DBL + " </td></tr>"
                    +"<tr class='active'><td><strong> <a title='Capacity to operate 286,000 pound rail cars on designated segment' data-toggle='infotooltip'>286k Capacity</a>: </strong></td><td>" + props.TRK_WEIGHT + "</td></tr>"
                    +"<tr class='active'><td><strong> Trains Daily: </strong></td><td>not reported</td></tr></table>"
            +"</div></div>"
            +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
    featureName = '<p>Type: ' + props.TYPE + '</p>',
    featureClass = 'railcl',
    featureIcon = 'railicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};  
//rail yards
function clkRailYard(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                        +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Operator(s)</div>"
                        +"<div class='datafield'>" + findMatch(railines, props.RAIL_ID) + "</div><div class='labelfield'>Line Serving</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP + "</div><div class='labelfield'>Municipality(ies)</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#IntermodalCap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='IntermodalCap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Acres: </strong></td><td>" + numeral(props.GIS_ACRES).format('0,0.0') + "</td></tr>"
                                +"<tr class='active'><td><strong>Annual Car Count: </strong></td><td>n/a</td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
                        //+"<div style='height:34px;'><a href='http://www.dvrpc.org/webmaps/PhillyFreightFinder/reports/FC/FC34.pdf' target='_blank' style='line-height:34px;float:left;'><div class='pdf'></div>Related Report: " + props.REPORT + "</a></span></div></div>" ;
    featureName = '<p>Type: Rail Yard</p>',
    featureClass = 'railcl',
    featureIcon = 'railyardicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};  
//rail crossings
function clkRailXing(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                        +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Operator(s)</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP + "</div><div class='labelfield'>Municipality(ies)</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong> <a title='Count of active tracks at grade crossing' data-toggle='infotooltip'>Tracks at Crossing</a>: </strong></td><td>" + props.TRACKS + "</td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE_1 + "</div></div>"
                        +"<div style='height:34px;'><a href='http://safetydata.fra.dot.gov/OfficeofSafety/publicsite/Crossing/Report.aspx?phasetype=C&rpttype=A&txtcrossingnum="+props.FRA_ID+"' target='_blank' style='line-height:34px;float:left;'><div class='pdf'></div>FRA Crossing History</a></div>",
                        // +"<p>" + props.Report + "</p>";
    featureName = '<p>Type: Class I Grade Crossing</p>',
    featureClass = 'railcl',
    featureIcon = 'railcrossicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};
//rail intermodal
function clkIntermodal(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                        +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Operator(s)</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP + "</div><div class='labelfield'>Municipality(ies)</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#IntermodalCap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='IntermodalCap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Acres: </strong></td><td>" + numeral(props.ACRES).format('0,0.0') + "</td></tr>"
                                +"<tr class='active'><td><strong>Activity: </strong></td><td>n/a</td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
                        //+"<div style='height:34px;'><a href='http://www.dvrpc.org/webmaps/PhillyFreightFinder/reports/FC/FC34.pdf' target='_blank' style='line-height:34px;float:left;'><div class='pdf'></div>Related Report</a></span></div></div>" ;
    featureName = '<p>Type: Intermodal Rail Yard</p>',
    featureClass = 'railcl',
    featureIcon = 'railintericon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};
//rail river crossing
function clkRailRvrXing(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + findMatch(railines, props.LINK_ID) + "</div><div class='labelfield'>Rail Line</div>"
                        +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                        +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Operator(s)</div>"
                        +"<div class='datafield'>" + props.TYPE + "</div><div class='labelfield'>Bridge Type</div>"
                        +"<div class='datafield'>" + props.TOWN_1 + " - " + props.TOWN_2  + "</div><div class='labelfield'>Connecting Municipality(ies)</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#RailrivCap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='RailrivCap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Width <span style='font-weight:normal;'>(tracks)</span>: </strong></td><td>" + props.CAP_1 + "</td></tr>"
                                +"<tr class='active'><td><strong> <a title='Ability to operate double stack trains. Double stack is a technology allowing intermodal containers to be stack two high on train cars.' data-toggle='infotooltip'>Double Stack Clearance</a>: </strong></td><td>" + props.CAP_2 + "</td></tr>"
                                +"<tr class='active'><td><strong> <a title='Capacity to operate 286,000 pound rail cars on designated segment' data-toggle='infotooltip'>286k Capacity</a>: </strong></td><td>" + props.CAP_3 + "</td></tr>"
                                +"<tr class='active'><td><strong>Activity: </strong></td><td>" + props.ACT_1 + "</a></td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
    featureName = '<p>Type: Rail River Crossing</p>',
    featureClass = 'railcl',
    featureIcon = 'railrivicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//Ports/Waterways Features
//Ports
function clkport(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>';
    var contentBulk = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                        +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Operator(s)</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP + "</div><div class='labelfield'>Municipal Location</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#portCap' data-toggle='tab'>Capacity</a></li>"
                        +"<li><a href='#portAct' data-toggle='tab'>Activity</a></li></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='portCap' style='padding-bottom: 12px;height:72px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Berth Depth <span style='font-weight:normal;'><a title='Mean Low Water' data-toggle='infotooltip'>(MLW)</a></span>: </strong></td><td>not reported</td></tr>"
                                +"<tr class='active'><td><strong>Storage Capacity: </strong></td><td>not reported</td></tr></table>"
                        +"</div>"
                        +"<div class='tab-pane' id='portAct' style='padding-bottom: 12px;height:72px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td class='item'><strong>2012 Ship Arrivals: </strong></td><td>" + props.ACT_1 + "</td><td>o</td></tr>"
                                +"<tr class='active'><td class='item'><strong>Cargo handled: </strong></td><td colspan='2' style='line-height:1!important;'>" + props.CARGO + "</td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>" + props.SOURCE + "</div></div>",
    contentGeneral ="<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                        +"<div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Operator(s)</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP + "</div><div class='labelfield'>Municipal Location</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#portCap' data-toggle='tab'>Capacity</a></li>"
                        +"<li><a href='#portAct' data-toggle='tab'>Activity</a></li></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='portCap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Qty of Berths: </strong></td><td>" + props.CAP_1 + "</td></tr>"
                                +"<tr class='active'><td><strong>Total Berth Length: </strong></td><td>" + props.CAP_2 + " linear ft</td></tr>"
                                +"<tr class='active'><td><strong>Berth Depth <span style='font-weight:normal;'><a title='Mean Low Water' data-toggle='infotooltip'>(MLW)</a></span>: </strong></td><td>" + props.CAP_3 + " feet</td></tr>"
                                +"<tr class='active'><td><strong>Available Cranes: </strong></td><td><a title='" + props.CAP_4 + "' data-toggle='infotooltip'>" + props.CAP_6 + "</a></td></tr>"
                                +"<tr class='active'><td><strong>Warehouse Space: </strong></td><td>" + props.CAP_5 + "</td></tr></table>"
                        +"</div>"
                        +"<div class='tab-pane' id='portAct' style='padding-bottom: 12px;height:132px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td class='item'><strong>2012 Ship Arrivals: </strong></td><td>" + props.ACT_1 + "</td><td>o</td></tr>"
                                +"<tr class='active'><td class='item'><strong>Cargo handled: </strong></td><td colspan='2' style='line-height:1!important;'>" + props.CARGO + "</td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>" + props.SOURCE + "</div></div>";
    if (props.TYPE == 'Bulk'){ content = contentBulk; } else {content = contentGeneral;}
    featureName = '<p>Type: '+ props.TYPE + ' Terminal</p>',
    featureClass = 'portcl',
    featureIcon = 'porticon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};
//anchorage
function clkanchorage(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.TOWNSHIP_S + "</div><div class='labelfield'>Adjacent Municipality(ies)</div>"
            //+"<div class='datafield'>" + props.Start + "</div><div class='labelfield'>Start Point</div>"
            //+"<div class='datafield'>" + props.End + "</div><div class='labelfield'>End Point</div>"
            +"</div><!--close baseInfo-->"
            +"<div class='infoDivider'></div>"
            +"<div id='indactorInfo'>"
            +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
            +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
            +"<div id='indicator' class='tab-content'><!--tab panes-->"
            +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                    +"<table class='table table-hover'>"
                    +"<tr class='active'><td><strong> Annual Ships (" + props.YEAR + "): </strong></td><td>" + props.ACT_1 + "</td></tr></table>"
            +"</div></div>"
            +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
    featureName = '<p>Type: Anchorage</p>',
    featureClass = 'portcl',
    featureIcon = 'anchicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};
//River
function clkriver(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.TOWNSHIPS + "</div><div class='labelfield'>Adjacent Municipality(ies)</div>"
            +"<div class='datafield'>" + props.START_ + "</div><div class='labelfield'> <a title='Nautical miles from Atlantic Ocean' data-toggle='infotooltip'>Start Point</a>: </div>"
            +"<div class='datafield'>" + props.END + "</div><div class='labelfield'> <a title='Nautical miles from Atlantic Ocean' data-toggle='infotooltip'>End Point</a>: </div>"
            +"</div><!--close baseInfo-->"
            +"<div class='infoDivider'></div>"
            +"<div id='indactorInfo'>"
            +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
            +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
            +"<div id='indicator' class='tab-content'><!--tab panes-->"
            +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                    +"<table class='table table-hover'>"
                    +"<tr class='active'><td><strong>Channel Width <span style='font-weight:normal;'>(ft)</span>: </strong></td><td>" + props.WIDTH + "</td></tr>"
                    +"<tr class='active'><td><strong> Channel Depth <span style='font-weight:normal;'><a title='Mean Lower Low Water' data-toggle='infotooltip'>(MLLW in ft)</a></span>: </strong></td><td>" + props.DEPTH + "</td></tr>"
                    +"<tr class='active'><td><strong> <a title='Approved vertical clearance within navigable channel' data-toggle='infotooltip'>Maximum Air Draft <span style='font-weight:normal;'>(ft)</span></a>: </strong></td><td>" + props.CLEARANCE + "</td></tr>"
                    +"<tr class='active'><td><strong>Annual Activity: </strong></td><td>not reported</td></tr></table>"
            +"</div></div>"
            +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
    featureName = '<p>Type: River Channel</p>',
    featureClass = 'portcl',
    featureIcon = 'rivericon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//Freight Centers
function clkFreightCenter(e) {
    initializeHL(e);
    var fclass;
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.CENTER_TYP + "</div><div class='labelfield'>Type</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP_S + "</div><div class='labelfield'>Municipality(ies): </div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Acres: </strong></td><td>" + numeral(props.ACRES_1).format('0,0.0') + "</td></tr>"
                                +"<tr class='active'><td><strong>Output: </strong></td><td>not available</td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>";
                        // +"<p>" + props.REPORT + "</p>";
    if (props.CENTER_TYP === 'Intermediate'){
            fclass = 'fcinter';
    }else if(props.CENTER_TYP === 'Major'){
            fclass = 'fcmajor';
    }else if (props.CENTER_TYP === 'Mega'){
            fclass = 'fcmega';
    }else{}

    featureName = '<p>Type: '+ props.CENTER_TYP +' Freight Center</p>',
    featureClass = ''+ fclass +'cl',
    featureIcon = ''+ fclass +'icon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//Airports
//commercial/reliever
function clkairport(e) {
    initializeHL(e);
    var aclass;
    header = '<p>(' + props.PFF_ID + ') ' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.TYPE + "</div><div class='labelfield'>Type</div>"
            +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
            +"<div class='datafield'>" + props.TOWNSHIP + "</div><div class='labelfield'>Municipality(ies): </div>"
            +"</div><!--close baseInfo-->"
            +"<div class='infoDivider'></div>"
            +"<div id='indactorInfo'>"
            +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
            +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>"
            +"<div id='indicator' class='tab-content'><!--tab panes-->"
            +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                    +"<table class='table table-hover'>"
                    +"<tr class='active'><td><strong>Runway(s): </strong></td><td>" + props.CAP_1 + "</td></tr>"
                    +"<tr class='active'><td><strong>Runway Length(s): </strong></td><td> " + props.CAP_2 + " </td></tr>"
                    +"<tr class='active'><td><strong>Total Acreage: </strong></td><td>" + props.CAP_3 + "</td></tr>"
                    +"<tr class='active'><td><strong> <a title='Count of annual takeoffs and landings' data-toggle='infotooltip'>Annual Operations</a>: </strong></td><td> " + numeral(props.ACTIVITY_1).format('0,0') + " </td></tr></table>"
            +"</div></div>"
            +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>";
    if (props.TYPE === 'Commercial'){
            aclass = 'comm';
    }else if(props.TYPE === 'Reliever'){
            aclass = 'rel';
    } else{}
    featureName = '<p>Type: '+ props.TYPE +' Airport</p>',
    featureClass = ''+ aclass +'aircl',
    featureIcon = ''+ aclass +'icon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};
//heliports
function clkheliport(e) {
    initializeHL(e);
    header = '<p>(' + props.PFF_ID + ") " +props.FACILITY + '</p>',
    content = "<div id='baseInfo'>"
                +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                +"<div class='datafield'>" + props.CITY + "</div><div class='labelfield'>Municipality(ies): </div>"
                +"</div><!--close baseInfo-->"
                +"<div class='infoDivider'></div>"
                +"<div id='indactorInfo'>"
                +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>"
                +"<div id='indicator' class='tab-content'><!--tab panes-->"
                +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                        +"<table class='table table-hover'>"
                        +"<tr class='active'><td><strong>Diameter: </strong></td><td>" + props.SIZE_ + " ft</td></tr>"
                        +"<tr class='active'><td><strong>Annual Operations: </strong></td><td>not available</td></tr></table>"
                +"</div></div>"
                +"<div class='labelfield source'>Data Source: 2013 DVRPC</div></div>",
    featureName = '<p>Type: Heliport</p>',
    featureClass = 'heliportcl',
    featureIcon = 'heliporticon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//Energy-Utilities
//pipelines
function clkpipelines(e) {
    initializeHL(e);
    header = '<p>Pipeline</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.TYPE + "</div><div class='labelfield'>Material Transported</div>"
            +"<div class='datafield'>" + props.COUNTY + "</div><div class='labelfield'>County</div>"
            +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
    featureName = '<p>Type: Pipeline</p>',
    featureClass = 'energycl',
    featureIcon = 'pipelineicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//Community
//Freight as Good Neighbor
function clkfgneighbor(e) {
    initializeHL(e);
    header = '<p>Freight as a Good Neighbor</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.MUNICIPALI + "</div><div class='labelfield'>Municipality</div>"
            +"<div class='datafield'>" + props.COUNTY + " County</div><div class='labelfield'>County</div>"
            +"<div class='datafield'> " + props.DESCR1 + props.DESCR2 +" "+ props.DESCR3 + " </div>"
            +"<div class='labelfield source'>Data Source: 2012 DVRPC</div></div>",
    featureName = '<p>Type: Freight as a Good Neighbor</p>',
    featureClass = 'communcl',
    featureIcon = 'communicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};



            /////////////////////////////////////////////////////
            //////////////////////////////////////////////////
            /////// Regional Highcharts graphs


$(document).ready(function() {
    
    

    $( 'a[href="#"]' ).click( function(e) {
      e.preventDefault();
     });
    
    /*Highcharts.setOptions({
        chart: {
                type: 'pie',
                backgroundColor: '#396AB2'

            },
        title: {
                verticalAlign: 'middle',
                align: 'center',
                floating: true,
                useHTML: true
            },
        yAxis: {
                title: {
                    text: ''
                }
            },
        credits: {
                enabled: false
            },
        plotOptions: {
                pie: {
                    shadow: false,
                    dataLabels: {
                        enabled: false},
                    borderColor: '#335e9f',
                    borderWidth: 0,
                    colors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69'],
                }
            },
        series: [{ 
                size: '230%',
                innerSize: '130%', 
            }]

    });

    $.getJSON('data/valueRegion.json', function(data) {
                    var valueData = [], tonData=[], data1 = data.region, dataLen = data1.length;
                    for (var i = 0; i < dataLen; i++){ 
                        valueData.push({
                            name: data1[i].type,
                            y:  data1[i].value}),
                        tonData.push({
                            name: data1[i].type,
                            y: data1[i].tons
                        })
                    }
                    
                    var ValChart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerValue',
                        },
                        
                        title: {
                            text: '<div style="text-align:center;line-height: 0.8;"><span class="chartPrefix">by</span><br><span class="chartLabel">VALUE</span></div>',
                            y: -55
                        },
                        tooltip: {
                            formatter: function() {
                                return '<b>' + this.key + '</b><br/><b>$'+ this.y + '</b> billion<br/>'+ Math.round(this.percentage*100)/100 +'%';
                            }
                        },
                        plotOptions: {
                            pie: {
                                center: ['50%', '-15%'],
                                colors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69'],
                                startAngle: 90,
                                endAngle: 270

                            }
                        },
                        series: [{
                            id: 'Values',
                            name: 'Value', 
                            size: '230%',
                            innerSize: '130%', 
                            data: valueData
                        }]
                    });

                    var tonChart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerTon',
                        },
                        
                        title: {
                            text: '<div style="text-align:center;line-height: 0.8;"><span class="chartPrefix">by</span><br><span class="chartLabel">TONNAGE</span></div>',
                            y: 55
                        },
                        tooltip: {
                            formatter: function() {
                                return '<b>' + this.key + '</b><br/><b>'+ this.y + '</b> tons<br/>'+ Math.round(this.percentage*100)/100 +'%';
                            }
                        },
                        plotOptions: {
                            pie: {
                                center: ['50%', '120%'],
                                colors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69'],
                                startAngle: -90,
                                endAngle: 90

                            }
                        },
                        series: [{
                            id: 'Tons',
                            name: 'Ton', 
                            size: '230%',
                            innerSize: '130%', 
                            data: tonData
                        }]
                    });

     });*/

});
function activateTooltip() {
    $("[data-toggle=infotooltip]").tooltip({ placement: 'left'});
}
//custom button functionality
function modalLink(modal, tab){
    var element =  document.getElementById(modal);
    if (typeof(element) != 'undefined' && element != null){ 
        $('#'+modal+' li:eq('+ tab +') a').tab('show'); 
    }else{
        setTimeout(function(){
          $('#'+modal+' li:eq('+ tab +') a').tab('show');
        }, 0);
    }
} 

//topoJSON handling

L.TopoJSON = L.GeoJSON.extend({  
  addData: function(jsonData) {    
    if (jsonData.type === "Topology") {
      for (key in jsonData.objects) {
        geojson = topojson.feature(jsonData, jsonData.objects[key]);
        L.GeoJSON.prototype.addData.call(this, geojson);
      }
    }    
    else {
      L.GeoJSON.prototype.addData.call(this, jsonData);
    }
  }  
});
// Copyright (c) 2013 Ryan Clark
;
//declare boundary of region
var oLat = 40.018,
    oLng = -75.148,
    zLevel = 9; ///adjust lat-lon coordinates to center on your region

var map, map2, countySearch = [],
    polyLayer = [],
    highwaySearch = [],
    truckParkSearch = [],
    nhsSearch = [],
    hwyBridgeSearch = [],
    railSearch = [],
    railyardSearch = [],
    intermodalSearch = [],
    RailBridgeSearch = [],
    xingSearch = [],
    riverSearch = [],
    portSearch = [],
    anchSearch = [],
    commairSearch = [],
    relairSearch = [],
    heliportSearch = [],
    FCinterSearch = [],
    FCmajorSearch = [],
    FCmegaSearch = [],
    mcountyPrint = [];
//countyMap
//county maps
/*var Stamen_TonerBackground = L.tileLayer('http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: 'abcd',
    opacity: 0.0
});
countymap = L.map("map2", {
    minZoom: 8,
    maxZoom: 8,
    dragging: false,
    zoomControl: false,
    boxZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    layers: [Stamen_TonerBackground]
});
//countyregions
var mcounty = L.geoJson(null, {
    style: {
        color: "#efefef",
        weight: 4,
        fillColor: "#396ab2",
        opacity: 1,
        fillOpacity: 1
    },
    onEachFeature: function(feature, layer) {
        layer.on({
            mouseover: displayCountyname,
            mouseout: clearCountyname,
            click: populateCounty
        });
    }
});
$.getJSON("data/county5k.js", function(data) {
    mcounty.addData(data);
}).complete(function() {
    countymap.fitBounds(mcounty.getBounds());
});*/

    //declare basemaps
    // Basemap Layers
    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    var Esri_transportation = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
        minZoom: 8,
        maxZoom: 18
    });
    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    });

    //create map instance
    var map = L.map("mapDIV", {
        minZoom: zLevel,
        maxZoom: 16,
        zoomControl: false,
        layers: [Esri_WorldGrayCanvas]
    }).setView([oLat, oLng], zLevel);

    //add Layer Control to map
    var baseLayers = {
        "Satellite": Esri_WorldImagery,
        "Street Map": Esri_WorldGrayCanvas
    };
    L.control.layers(baseLayers).addTo(map);

    //load legend elements
    $('.panelinfo').addClass('dynico dynico-info');
    
    

    //advanced handling of street labels
    //Base and Overlay Handling
    var topPane = map._createPane('leaflet-top-pane', map.getPanes().mapPane);

    function addStreetLabels() {
        var topLayer = (Esri_transportation).addTo(map);
        topPane.appendChild(topLayer.getContainer());
        topLayer.setZIndex(2);
    }
    map.on('moveend', function() {
        if (map.getZoom() > 13 && map.hasLayer(Esri_WorldImagery)) {
            addStreetLabels();

        }
        if (map.getZoom() <= 13) {
            map.removeLayer(Esri_transportation);
        }
    });
    map.on('baselayerchange', function() {
        if (map.getZoom() > 13 && map.hasLayer(Acetate_all)) {
            map.removeLayer(Esri_transportation);
        }
        if (map.getZoom() > 13 && map.hasLayer(Esri_WorldImagery)) {
            addStreetLabels();
        }
    });
    // Static DVRPC Layers
   /* var counties = L.geoJson(null, {
        style: function(feature) {
            return {
                color: "white",
                fill: false,
                opacity: 0.4,
                clickable: false,
            };
        },
        onEachFeature: function(feature, layer) {
            countySearch.push({
                name: layer.feature.properties.Co_Name,
                source: "Counties",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });
    $.getJSON("data/counties.js", function(data) {
        counties.addData(data);
    }).complete(function() {
        map.fitBounds(counties.getBounds());
    });
    (counties).addTo(map);
    alert(counties.getBounds());*/


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////      Declare Data Layers Here        ///////////////////
//////////////////////////////////////////////////////////////////

//define Icon types for point features
var rdIconSize = 30;

var PFFcustomIcon = L.Icon.extend({
    options: {
        iconSize: [rdIconSize, rdIconSize],
        iconAnchor: [rdIconSize / 2, rdIconSize / 2],
        popupAnchor: [0, rdIconSize / 2]
    }
});
var IconPresets = {markerSet: 'open-freight', mapMarker: 'circle-cm', legendMarker:'circle-md', iconSet: 'dynico'};


var commicon = L.OpenFreightMarkers.icon({
        icon: 'airport', markerColor: 'forest', layer:'commGroup', title: 'Commercial Airport'}, IconPresets),
    relvicon = new L.OpenFreightMarkers.icon({
        icon: 'airport', markerColor: 'green', layer:'relGroup', title: 'Reliever Airport'}, IconPresets),
    helicon = L.OpenFreightMarkers.icon({
        icon: 'heliport', markerColor: 'ltgreen', layer:'heliport', title: 'Heliport'}, IconPresets),
    FCintericon = L.OpenFreightMarkers.icon({
        icon: 'center', markerColor: 'peach', layer:'FCintergroup', title: 'Intermediate Center'}, IconPresets),
    FCmajoricon = L.OpenFreightMarkers.icon({
        icon: 'center', markerColor: 'orange', layer:'FCmajorgroup', title: 'Major Center'}, IconPresets),
    FCmegaicon = L.OpenFreightMarkers.icon({
        icon: 'center', markerColor: 'red', layer:'FCmegagroup', title: 'Mega Center'}, IconPresets),
    hwyicon = L.OpenFreightMarkers.icon({
        icon: 'truck', markerColor: 'purple', layer:'freeway', title: 'Highway'}, IconPresets),
    trckprkicon = L.OpenFreightMarkers.icon({
        icon: 'parking', markerColor: 'purple', layer:'trkparkgroup', title: 'Truck Parking'}, IconPresets),
    hwybricon = L.OpenFreightMarkers.icon({
        icon: 'bridge', markerColor: 'purple', layer:'hwyrivcrossing', title: 'Highway River Crossing'}, IconPresets),
    NHSicon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: 'purple', layer:'nhsgroup', title: 'NHS Connector'}, IconPresets),
    railLineicon = L.OpenFreightMarkers.icon({
        icon: 'rail', markerColor: 'gold', layer:'railines', title: 'Rail Line'}, IconPresets),
    ryicon = L.OpenFreightMarkers.icon({
        icon: 'railyard', markerColor: 'gold', layer:'railyardgroup', title: 'Rail Yard'}, IconPresets),
    imicon = L.OpenFreightMarkers.icon({
        icon: 'intermodal', markerColor: 'gold', layer:'intermodalgroup', title: 'Intermodal Yard'}, IconPresets),
    xingicon = L.OpenFreightMarkers.icon({
        icon: 'railxing', markerColor: 'gold', layer:'gradexing', title: 'Class I Grade Crossing'}, IconPresets),
    rbicon = L.OpenFreightMarkers.icon({
        icon: 'bridge', markerColor: 'gold', layer:'railbridge', title: 'Rail River Crossing'}, IconPresets),
    prticon = L.OpenFreightMarkers.icon({
        icon: 'ship', markerColor: 'blue', layer:'portGroup', title: 'Port Terminal'}, IconPresets),
    anchicon = L.OpenFreightMarkers.icon({
        icon: 'anchor', markerColor: 'blue', layer:'anchorageGroup', title: 'Anchorage'}, IconPresets),
    riverIcon = L.OpenFreightMarkers.icon({
        icon: 'river', markerColor: 'blue', layer:'river', title: 'Navigable River'}, IconPresets),
    fgnicon = L.OpenFreightMarkers.icon({
        icon: 'community', markerColor: 'teal', layer:'fgneighbor', title: 'Freight as a Good Neighbor'}, IconPresets),
    pipeIcon = L.OpenFreightMarkers.icon({
        icon: 'pipeline', markerColor: 'yellow', layer:'pipelines', title: 'Pipeline', onLoad: false}, IconPresets);
   
    //define airport layers
    //define commercial airports
    var commairpoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#216937",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkairport,
                dblclick: zoomToFeature
            });
            commairSearch.push({
                name: layer.feature.properties.NAME,
                source: "CommAirports",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });
    

    var commairpt = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: commicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkairport,
                dblclick: zoomToPoint
            });
        }
    });
   

    //define releiver airports
    var relairpoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#30B34C",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkairport,
                dblclick: zoomToFeature
            });
            relairSearch.push({
                name: layer.feature.properties.NAME,
                source: "ReleivAirports",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });
    

    var relvairpt = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: relvicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkairport,
                dblclick: zoomToPoint
            });
        }
    });
    

    var heliport = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: helicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkheliport,
                dblclick: zoomToPoint
            });
            heliportSearch.push({
                name: layer.feature.properties.FACILITY,
                source: "Heliports",
                id: L.stamp(layer),
                lat: layer.feature.geometry.coordinates[1],
                lng: layer.feature.geometry.coordinates[0]
            });
        }
    });
    

    //define freight centers
    //define intermediate centers
    var FCinterpoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#F9AB90",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkFreightCenter,
                dblclick: zoomToFeature
            });
            FCinterSearch.push({
                name: layer.feature.properties.NAME,
                source: "FCInter",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });
    

    var FCinterpt = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: FCintericon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkFreightCenter,
                dblclick: zoomToFC
            });
        }
    });
    

    //define major centers
    var FCmajorpoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#F26122",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkFreightCenter,
                dblclick: zoomToFeature
            });
            FCmajorSearch.push({
                name: layer.feature.properties.NAME,
                source: "FCmajor",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });



    var FCmajorpt = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: FCmajoricon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkFreightCenter,
                dblclick: zoomToFC
            });
        }
    });


    //define mega centers
    var FCmegapoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#C1332B",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkFreightCenter,
                dblclick: zoomToFeature
            });
            FCmegaSearch.push({
                name: layer.feature.properties.NAME,
                source: "FCmega",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });



    var FCmegapt = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: FCmegaicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkFreightCenter,
                dblclick: zoomToFC
            });
        }
    });


    //define highway layers      
    //define truck parking polygons
    var truckparkpoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#884C9E",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkParking,
                dblclick: zoomToFeature
            });
            truckParkSearch.push({
                name: layer.feature.properties.NAME,
                source: "TruckParking",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });


    var tppoints = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: trckprkicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkParking,
                dblclick: zoomToPoint
            });
        }
    });


    var hwyrivcrossing = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: hwybricon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkHwyRvrXing,
                dblclick: zoomToPoint
            });
            hwyBridgeSearch.push({
                name: layer.feature.properties.NAME_1,
                source: "HwyBridges",
                id: L.stamp(layer),
                lat: layer.feature.geometry.coordinates[1],
                lng: layer.feature.geometry.coordinates[0]
            });
        }
    }) 

    //define NHS polylines
    var nhspoly = new L.TopoJSON(null, {
        style: {
            weight: 5,
            color: "#E8C3F5 ",
            opacity: 1
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkNHS,
                dblclick: zoomToFeature
            });
            nhsSearch.push({
                name: layer.feature.properties.NAME,
                source: "NHS",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });


    var nhs = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: NHSicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkNHS,
                dblclick: zoomToPoint
            });
        }
    });

    //define freeways
    var freeway = new L.TopoJSON(null, {
        style: function style(feature) {
            switch (feature.properties.TYPE) {
                case 'Limited Access Highway':
                    return {
                        color: "#C57AE0",
                        weight: 5,
                        opacity: 1
                    };
                case 'Interstate Highway':
                    return {
                        color: "#884C9E",
                        weight: 5,
                        opacity: 1
                    };
            }
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkHwy,
                dblclick: zoomToFeature
            });
            highwaySearch.push({
                name: layer.feature.properties.NAME,
                source: "Highways",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }

    });


    //define rail layers
    //define rail lines
    var railines = new L.TopoJSON(null, {
        style: function style(feature) {
            switch (feature.properties.TYPE) {
                case 'Industrial Track \/ Shortline':
                    return {
                        color: "#FDD195",
                        weight: 5,
                        opacity: 0.90
                    };
                case 'Secondary':
                    return {
                        color: "#FCBB65",
                        weight: 5,
                        opacity: 0.90
                    };
                case 'Interstate':
                    return {
                        color: "#FD8D3C",
                        weight: 5,
                        opacity: 0.90
                    };
            }
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkRailline,
                dblclick: zoomToFeature
            });
            railSearch.push({
                name: layer.feature.properties.NAME,
                source: "RailLines",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });


    //define rail yards
    var railyardpoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#FBA919",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkRailYard,
                dblclick: zoomToFeature
            });
            railyardSearch.push({
                name: layer.feature.properties.NAME,
                source: "RailYards",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });



    var railyardpt = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: ryicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkRailYard,
                dblclick: zoomToPoint
            });
        }
    });

    //define intermodal
    var intermodalpoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#FBA919",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkIntermodal,
                dblclick: zoomToFeature
            });
            intermodalSearch.push({
                name: layer.feature.properties.NAME_1,
                source: "Intermodal",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });

    var intermodalpt = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: imicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkIntermodal,
                dblclick: zoomToPoint
            });
        }
    });

    //define grade crossings
    var gradexing = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: xingicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkRailXing,
                dblclick: zoomToPoint
            });
            xingSearch.push({
                name: layer.feature.properties.NAME,
                source: "GradeCrossing",
                id: L.stamp(layer),
                lat: layer.feature.geometry.coordinates[1],
                lng: layer.feature.geometry.coordinates[0]
            });
        }
    });
    $.getJSON("data/pff_grade_xings.js", function(data) {
        gradexing.addData(data);
    });
    //define rail bridge
    var railbridge = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: rbicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkRailRvrXing,
                dblclick: zoomToPoint
            });
            RailBridgeSearch.push({
                name: layer.feature.properties.NAME,
                source: "RailBridges",
                id: L.stamp(layer),
                lat: layer.feature.geometry.coordinates[1],
                lng: layer.feature.geometry.coordinates[0]
            });
        }
    });

    //define maritime facilities
    //define river
    var river = new L.TopoJSON(null, {
        style: {
            fillColor: "#55B8DF",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.65
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkriver,
                dblclick: zoomToFeature
            });
            riverSearch.push({
                name: layer.feature.properties.NAME,
                source: "Rivers",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });


    //define ports
    var portpoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#29A0CF",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.75
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkport,
                dblclick: zoomToFeature
            });
            portSearch.push({
                name: layer.feature.properties.NAME,
                source: "PortTerminals",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });



    var porticon = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: prticon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkport,
                dblclick: zoomToPoint
            });
        }
    });

    //define anchorages
    var anchoragepoly = new L.TopoJSON(null, {
        style: {
            fillColor: "#0E76BC",
            fillOpacity: 0.50,
            weight: 1,
            color: "#E0E0E0 ",
            opacity: 0.65
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkanchorage,
                dblclick: zoomToFeature
            });
            anchSearch.push({
                name: layer.feature.properties.NAME,
                source: "Anchorages",
                id: L.stamp(layer),
                bounds: layer.getBounds()
            });
        }
    });
    

    var anchoricon = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: anchicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkanchorage,
                dblclick: zoomToPoint
            });
        }
    });


    //define energy layers
    //define pipelines
    var pipelines = new L.TopoJSON(null, {
        style: {
            color: "#EFD315",
            weight: 3,
            opacity: 0.90
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkpipelines,
                dblclick: zoomToFeature
            });
        }
    });




    //pipeline visibility hack
    map.on('moveend', function() {
        if (map.getZoom() > 14) {
            $('#pipelabel').parent().addClass('disabled');
            $('#pipelabel').closest('.panel').find('.checked_all').addClass('disabled');
        }
        if (map.getZoom() > 14 && map.hasLayer(pipelines) && $("#pipelines").is(':checked')) {
            map.removeLayer(pipelines);
            var pipelinelegend = document.getElementById('pipehidden');
            pipelinelegend.innerHTML = "[not available at zoom level]";
        }
        if (map.getZoom() <= 14) {
            $('#pipelabel').parent().removeClass('disabled');
            $('#pipelabel').closest('.panel').find('.checked_all').removeClass('disabled');
        }
        if (map.getZoom() <= 14 && $("#pipelines").is(':checked')) {
            map.addLayer(pipelines);
            var pipelinelegend = document.getElementById('pipehidden');
            pipelinelegend.innerHTML = "";
            $('#pipelabel').parent().removeClass('disabled');
        }
    });

    //define community layers
    //define freight as a good neighbor
    var fgneighbor = L.geoJson(null, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: fgnicon
            });
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                click: clkfgneighbor,
                dblclick: zoomToPoint
            });
        }
    });



    




    //map.setMaxBounds(counties.getBounds());
    //add layers in groups by order
    //countymap.addLayer(mcounty);
    

    var FCintergroup = new L.FeatureGroup([FCinterpt, FCinterpoly]);
    var FCmajorgroup = new L.FeatureGroup([FCmajorpt, FCmajorpoly]);
    var FCmegagroup = new L.FeatureGroup([FCmegapt, FCmegapoly]);
    var FCenters = {
        "Mega Center": FCmegagroup,
        "Major Center": FCmajorgroup,
        "Intermediate Center": FCintergroup
    };
    var railyardgroup = new L.FeatureGroup([railyardpt, railyardpoly]);
    var intermodalgroup = new L.FeatureGroup([intermodalpt, intermodalpoly]);
    var Rail = {
        "Rail Line": railines,
        "Rail Yard": railyardgroup,
        "Intermodal Yard": intermodalgroup,
        "Class I Grade Crossing": gradexing,
        "Rail River Crossing": railbridge
    };
    var portGroup = new L.FeatureGroup([porticon, portpoly]);
    var anchorageGroup = new L.FeatureGroup([anchoricon, anchoragepoly]);
    var Portwater = {
        "Navigable River": river,
        "Port Terminal": portGroup,
        "Anchorage": anchorageGroup
    };
    var commGroup = new L.FeatureGroup([commairpt, commairpoly]);
    var relGroup = new L.FeatureGroup([relvairpt, relairpoly]);
    var airport = {
        "Commercial": commGroup,
        "Reliever": relGroup
    };

    var nhsgroup = new L.FeatureGroup([nhspoly, nhs]);
    var trkparkgroup = new L.FeatureGroup([truckparkpoly, tppoints]);
    var Highway = {
        "Freeway": freeway,
        "NHS Connector": nhsgroup,
        "Truck Parking": trkparkgroup,
        "Highway River Crossing": hwyrivcrossing
    };



    ///////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //  Create search functionality using Typeahead   ////
    //////////////////////////////////////////////////////

    // Highlight search box text on click
   $("#searchbox").click(function() {
        $(this).select();
    });

    // Typeahead search functionality
    function loadSearchBar() {
        $("#loading").hide();
        var $e1 = $('#searchbox'),
            $e2 = $('#searchhome');
        var e1 = $e1[0],
            e2 = $e2[0];
        /*var countyBH = new Bloodhound({
            name: "Counties",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: countySearch,
            limit: 10
        });*/
        var hwysBH = new Bloodhound({
            name: "Highways",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: highwaySearch,
            limit: 10
        });
        var nhsBH = new Bloodhound({
            name: "NHS",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: nhsSearch,
            limit: 10
        });
        var parkingBH = new Bloodhound({
            name: "TruckParking",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: truckParkSearch,
            limit: 10
        });
        var hwyBridgeBH = new Bloodhound({
            name: "HwyBridges",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: hwyBridgeSearch,
            limit: 10
        });
        var railLineBH = new Bloodhound({
            name: "RailLines",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: railSearch,
            limit: 10
        });
       
        var yardsBH = new Bloodhound({
            name: "RailYards",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: railyardSearch,
            limit: 10
        });
        var intermodalBH = new Bloodhound({
            name: "Intermodal",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: intermodalSearch,
            limit: 10
        });
        var gradexingBH = new Bloodhound({
            name: "GradeCrossing",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: xingSearch,
            limit: 10
        });
        var railBridgeBH = new Bloodhound({
            name: "RailBridges",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: RailBridgeSearch,
            limit: 10
        });
        var riverBH = new Bloodhound({
            name: "Rivers",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: riverSearch,
            limit: 10
        });
        var portsBH = new Bloodhound({
            name: "PortTerminals",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: portSearch,
            limit: 10
        });
        var anchBH = new Bloodhound({
            name: "Anchorages",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: anchSearch,
            limit: 10
        });
        var commBH = new Bloodhound({
            name: "CommAirports",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: commairSearch,
            limit: 10
        });
        var releiverBH = new Bloodhound({
            name: "ReleivAirports",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: relairSearch,
            limit: 10
        });
        var heliBH = new Bloodhound({
            name: "Heliports",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: heliportSearch,
            limit: 10
        });
        var interBH = new Bloodhound({
            name: "FCinter",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: FCinterSearch,
            limit: 10
        });
        var majorBH = new Bloodhound({
            name: "FCmajor",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: FCmajorSearch,
            limit: 10
        });
        var megaBH = new Bloodhound({
            name: "FCmega",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: FCmegaSearch,
            limit: 10
        });

        var geonamesBH = new Bloodhound({
            name: "GeoNames",
            datumTokenizer: function(d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
                filter: function(data) {
                    return $.map(data.geonames, function(result) {
                        return {
                            name: result.name + ", " + result.adminCode1,
                            lat: result.lat,
                            lng: result.lng,
                            source: "GeoNames"
                        };
                    });
                },
                ajax: {
                    beforeSend: function(jqXhr, settings) {
                        settings.url += "&east=" + counties.getBounds().getEast() + "&west=" + counties.getBounds().getWest() + "&north=" + counties.getBounds().getNorth() + "&south=" + counties.getBounds().getSouth();
                        $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
                    },
                    complete: function(jqXHR, status) {
                        $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
                    }
                }
            },
            limit: 10
        });
        //countyBH.initialize();
        hwysBH.initialize();
        parkingBH.initialize();
        hwyBridgeBH.initialize();
        nhsBH.initialize();
        railLineBH.initialize();
        yardsBH.initialize();
        intermodalBH.initialize();
        gradexingBH.initialize();
        railBridgeBH.initialize();
        riverBH.initialize();
        portsBH.initialize();
        anchBH.initialize();
        commBH.initialize();
        releiverBH.initialize();
        heliBH.initialize();
        interBH.initialize();
        majorBH.initialize();
        megaBH.initialize();
        geonamesBH.initialize();

        $([e1, e2]).typeahead({
            minLength: 2,
            highlight: true,
            hint: false
        }, {
        /*    //$("#searchbox").typeahead([{
            name: "Counties",
            displayKey: "name",
            source: countyBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'>County</h5>"
            }
        }, {*/
            name: "Highways",
            displayKey: "name",
            source: hwysBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/truck.png' class='searchico'>Highways</h5>"
            }
        }, {
            name: "NHS",
            displayKey: "name",
            source: nhsBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/nhs.png' class='searchico'>NHS Connectors</h5>"
            }
        }, {
            name: "TruckParking",
            displayKey: "name",
            source: parkingBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/parking.png' class='searchico'>Truck Parking</h5>"
            }
        }, {
            name: "HwyBridges",
            displayKey: "name",
            source: hwyBridgeBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/bridge2.png' class='searchico'>Highway River Crossings</h5>"
            }
        }, {
            name: "RailLines",
            displayKey: "name",
            source: railLineBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/train.png' class='searchico'>Rail Lines</h5>"
            }
        }, {
            name: "RailYards",
            displayKey: "name",
            source: yardsBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/railyard.png' class='searchico'>Rail Yards</h5>"
            }
        }, {
            name: "Intermodal",
            displayKey: "name",
            source: intermodalBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/intermodal.png' class='searchico'>Intermodal Rail Yards</h5>"
            }
        }, {
            name: "GradeCrossing",
            displayKey: "name",
            source: gradexingBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/gradecrossing.png' class='searchico'>Grade Crossings</h5>"
            }
        }, {
            name: "RailBridges",
            displayKey: "name",
            source: railBridgeBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/bridge1.png' class='searchico'>Rail River Crossing</h5>"
            }
        }, {
            name: "Rivers",
            displayKey: "name",
            source: riverBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/river.png' class='searchico'>River Channels</h5>"
            }
        }, {
            name: "PortTerminals",
            displayKey: "name",
            source: portsBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/ports.png' class='searchico'>Port Terminals</h5>"
            }
        }, {
            name: "Anchorages",
            displayKey: "name",
            source: anchBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/anchor.png' class='searchico'>Anchorages</h5>"
            }
        }, {
            name: "CommAirports",
            displayKey: "name",
            source: commBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/airport1.png' class='searchico'>Commercial Airports</h5>"
            }
        }, {
            name: "ReleivAirports",
            displayKey: "name",
            source: releiverBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/airport2.png' class='searchico'>Releiver Airports</h5>"
            }
        }, {
            name: "Heliports",
            displayKey: "name",
            source: heliBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/heliport.png' class='searchico'>Heliports</h5>"
            }
        }, {
            name: "FCinter",
            displayKey: "name",
            source: interBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/17.png' class='searchico'>Intermediate Center</h5>"
            }
        }, {
            name: "FCmajor",
            displayKey: "name",
            source: majorBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/18.png' class='searchico'>Major Center</h5>"
            }
        }, {
            name: "FCmega",
            displayKey: "name",
            source: megaBH.ttAdapter(),
            templates: {
                header: "<h5 class='typeahead-header'><img src='lib/images/flat/19.png' class='searchico'>Mega Center</h5>"
            }

        }, {
            name: "GeoNames",
            displayKey: "name",
            source: geonamesBH.ttAdapter(),
            templates: {
                header: "<h4 class='typeahead-header'>Place Results</h4>"
            }
        }).on("typeahead:selected", function(obj, datum) {
            $('#search-panel').fadeOut('fast');
            resetHighlight();
            resetInfoWindow();
            $e1.typeahead('val', '');
            if ($('#nav_search').hasClass('hidden')) {
                $('#pFFlanding').fadeOut(800);
                $('#nav_search').removeClass('hidden');
                $('#maplink').addClass('hidden');
            };
            if (datum.source === "Counties") {
                map.fitBounds(datum.bounds);
            };
            if (datum.source === "Highways") {
                if (!map.hasLayer(freeway)) {
                    map.addLayer(freeway);
                    $("#freeway").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "NHS") {
                if (!map.hasLayer(nhsgroup)) {
                    map.addLayer(nhsgroup);
                    $("#nhsgroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "TruckParking") {
                if (!map.hasLayer(trkparkgroup)) {
                    map.addLayer(trkparkgroup);
                    $("#trkparkgroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "HwyBridges") {
                if (!map.hasLayer(hwyrivcrossing)) {
                    map.addLayer(hwyrivcrossing);
                    $("#hwyrivcrossing").prop("checked", true);
                };
                map.setView([datum.lat, datum.lng], 17);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "RailLines") {
                if (!map.hasLayer(railines)) {
                    map.addLayer(railines);
                    $("#railines").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "RailYards") {
                if (!map.hasLayer(railyardgroup)) {
                    map.addLayer(railyardgroup);
                    $("#railyardgroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "Intermodal") {
                if (!map.hasLayer(intermodalgroup)) {
                    map.addLayer(intermodalgroup);
                    $("#intermodalgroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "GradeCrossing") {
                if (!map.hasLayer(gradexing)) {
                    map.addLayer(gradexing);
                    $("#gradexing").prop("checked", true);
                };
                map.setView([datum.lat, datum.lng], 17);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "RailBridges") {
                if (!map.hasLayer(railbridgept)) {
                    map.addLayer(railbridgept);
                    $("#railbridgept").prop("checked", true);
                };
                map.setView([datum.lat, datum.lng], 17);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "Rivers") {
                if (!map.hasLayer(river)) {
                    map.addLayer(river);
                    $("#river").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "PortTerminals") {
                if (!map.hasLayer(portGroup)) {
                    map.addLayer(portGroup);
                    $("#portGroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                    //highlightportpoly(map._layers[datum.id]);
                };
            };
            if (datum.source === "Anchorages") {
                if (!map.hasLayer(anchorageGroup)) {
                    map.addLayer(anchorageGroup);
                    $("#anchorageGroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "CommAirports") {
                if (!map.hasLayer(commGroup)) {
                    map.addLayer(commGroup);
                    $("#commGroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "ReleivAirports") {
                if (!map.hasLayer(relGroup)) {
                    map.addLayer(relGroup);
                    $("#relGroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "Heliports") {
                if (!map.hasLayer(heliport)) {
                    map.addLayer(heliport);
                    $("#heliport").prop("checked", true);
                };
                map.setView([datum.lat, datum.lng], 17);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "FCinter") {
                if (!map.hasLayer(FCintergroup)) {
                    map.addLayer(FCintergroup);
                    $("#FCintergroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "FCmajor") {
                if (!map.hasLayer(FCmajorgroup)) {
                    map.addLayer(FCmajorgroup);
                    $("#FCmajorgroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "FCmega") {
                if (!map.hasLayer(FCmegagroup)) {
                    map.addLayer(FCmegagroup);
                    $("#FCmegagroup").prop("checked", true);
                };
                map.fitBounds(datum.bounds);
                if (map._layers[datum.id]) {
                    map._layers[datum.id].fire("click");
                };
            };
            if (datum.source === "GeoNames") {
                map.setView([datum.lat, datum.lng], 14);
            };
            if ($(".navbar-collapse").height() > 50) {
                $(".navbar-collapse").collapse("hide");
            };
            /*}).on("typeahead:initialized ", function () {
                $(".tt-dropdown-menu").css("max-height", 300);*/
        }).on("typeahead:opened", function() {
            $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
            $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
        }).on("typeahead:closed", function() {
            $(".navbar-collapse.in").css("max-height", "");
            $(".navbar-collapse.in").css("height", "");
        });
        $(".twitter-typeahead").css("position", "static");
        $(".twitter-typeahead").css("display", "block");
    }

function renderLayers(){
    var layers = [];
    $('input:checkbox[name="LayerCont"]').each(function () {
        // Remove all overlay layers
        map.removeLayer(window[$(this).attr('id')]);
        if ($('#' + $(this).attr('id')).is(':checked')) {
            // Add checked layers to array for sorting
            layers.push({
                'z-index': $(this).attr('z-index'),
                'layer': $(this)
            });
        }
        
    }); 
    var orderedLayers = sortByKey(layers, 'z-index');
         // Loop through ordered layers array and add to map in correct order
        $.each(orderedLayers, function () {
            map.addLayer(window[$(this)[0].layer[0].id]);
    });
}

function pointify(data){
    var data_n = jQuery.extend(true, {}, data);
    for(var i = 0; i < data_n.features.length; i++){
        data_n.features[i].geometry.type = 'Point';
        data_n.features[i].geometry.coordinates = [data_n.features[i].properties.LONG_, data_n.features[i].properties.LAT]
    }
    return data_n
}

function pointify_topo(data, layer){
    var data_n = jQuery.extend(true, {}, data['objects'][layer]);
    data_n.features = data_n.geometries;
    data_n.type = 'FeatureCollection';
    data_n.geometries = [];
    for(var i = 0; i < data_n.features.length; i++){
        data_n.features[i].type = 'Feature'
        data_n.features[i].geometry = {'type': 'Point','coordinates': [data_n.features[i].properties.LONG_, data_n.features[i].properties.LAT]};
    }
    return data_n
}


function loadLayers (){
    var mapLoad = $('#mapLoad').val();
        if(mapLoad === 'false'){
        
        $.getJSON("data/freight_center_Intermediate.js", function(data) {
            FCinterpoly.addData(data);
            var data_n = pointify_topo(data, 'freight_center_Intermediate');
            FCinterpt.addData(data_n);
        });
        polyLayer.push('FCinterpoly');
        
       $.getJSON("data/freight_center_Major.js", function(data) {
            FCmajorpoly.addData(data);
             var data_n = pointify_topo(data, 'freight_center_Major');
            FCmajorpt.addData(data_n);
        });
        polyLayer.push('FCmajorpoly');
        
        $.getJSON("data/freight_center_Mega.js", function(data) {
            FCmegapoly.addData(data);
             var data_n = pointify_topo(data, 'freight_center_Mega');
            FCmegapt.addData(data_n);
        });
        polyLayer.push('FCmegapoly');
       
        $.getJSON("data/airports_Commercial.js", function(data) {
            commairpoly.addData(data);
             var data_n = pointify_topo(data, 'airports_Commercial');
            commairpt.addData(data_n);
        });
        polyLayer.push('commairpoly');


        $.getJSON("data/airports_Reliever.js", function(data) {
            relairpoly.addData(data);
            var data_n = pointify_topo(data, 'airports_Reliever');
            relvairpt.addData(data_n);
        });
        polyLayer.push('relairpoly');

    
        $.getJSON("data/heliport.js", function(data) {
            heliport.addData(data);
        });

        $.getJSON("data/truck_parking.js", function(data) {
            truckparkpoly.addData(data);
            var data_n = pointify_topo(data, 'truck_parking');
            tppoints.addData(data_n);
        });
        polyLayer.push('truckparkpoly');
        
        $.getJSON("data/river_crossing_Highway.js", function(data) {
            hwyrivcrossing.addData(data);
        });

        $.getJSON("data/river.js", function(data) {
            river.addData(data);
        });
        polyLayer.push('river');

        $.getJSON("data/ports.js", function(data) {
            portpoly.addData(data);
            var data_n = pointify_topo(data, 'ports');
            porticon.addData(data_n);
        });
        polyLayer.push('portpoly');

        $.getJSON("data/freight_rail.js", function(data) {
            railines.addData(data);
        });
        polyLayer.push('railines');

        $.getJSON("data/rail_yards.js", function(data) {
            railyardpoly.addData(data);
            var data_n = pointify_topo(data, 'rail_yards');
            railyardpt.addData(data_n);
        });
        polyLayer.push('railyardpoly');
       
        $.getJSON("data/intermodal.js", function(data) {
            intermodalpoly.addData(data);
            var data_n = pointify_topo(data, 'intermodal');
            intermodalpt.addData(data_n);
        });
        polyLayer.push('intermodalpoly');
       
        $.getJSON("data/river_crossing_Rail.js", function(data) {
            railbridge.addData(data);
        });
        
        $.getJSON("data/nhs_connectors.js", function(data) {
            nhspoly.addData(data);
            var data_n = pointify_topo(data, 'nhs_connectors');
            nhs.addData(data_n);
            
        });

        polyLayer.push('nhspoly');

        $.getJSON("data/highways.js", function(data) {
            freeway.addData(data);
        });
        polyLayer.push('freeway');

        $.getJSON("data/anchorages.js", function(data) {
            anchoragepoly.addData(data);
            var data_n = pointify_topo(data, 'anchorages');
            anchoricon.addData(data_n);
        });
        polyLayer.push('anchoragepoly');

        $.getJSON("data/pipelines.js", function(data) {
            pipelines.addData(data);
        });
        polyLayer.push('pipelines');

        $.getJSON("data/good_neighbor_pts.js", function(data) {
            fgneighbor.addData(data);
        });
        
        //set checkbox status
        $('.legPanel').each(function(){
            var loadall = $(this).find('input.layer').length;
            var loadchecked = $(this).find('input.layer:checked').length;
            if (loadall == loadchecked) {
                $(this).closest('.panel').find('.checked_all').html('<div class="chkicon dynico dynico-check-square-o"></div>');
                $(this).closest('.panel-body').append('<input type="hidden" class="Chkd" value="false" />');
            } else {
                $(this).closest('.panel').find('.checked_all').html('<div class="chkicon dynico dynico-square-o"></div>');
                $(this).closest('.panel-body').append('<input type="hidden" class="Chkd" value="true" />');
            }
            var cbo = $(this).find('.dynacheck').length;
                if (cbo > 0){
                    $(this).find('input.layer:checked').siblings('.dynacheck').find('.legend-check').html('<i class="dynico dynico-check-square-o"></i>');
                }
        });
        $('input#mapLoad').attr('value', 'true');
       
       
    
     //renderLayers
     //renderLayers();
     //re-render layers (hack to ordering based on load delay)
     setTimeout(function() { renderLayers();}, 500);
     setTimeout(function() { loadSearchBar();}, 1500);
     //setTimeout(function() { renderLayers();loadSearchBar(); }, 5500);
    }
    
}

;
//***************************************///
//  PhillyFreightFinder App Core Functions
//  Dyna Icon Markers [inactive]
//  Core.js
//  Version: 3.1.2
//

//JQuery extend..create functions for easing in place of JQuery UI
$.easing.jswing = $.easing.swing;

$.extend($.easing,
{def: 'easeOutQuad',
easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    }
});

$.fn.capitalize = function () {
    $.each(this, function () {
        var caps = this.value;
        caps = caps.charAt(0).toUpperCase() + caps.slice(1);
        this.value = caps;
    });
    return this;
};
//store global tab variable
var current_tab;

//stop button from remaining selected


function setMap(){
    $('.landingUI').fadeOut('fast', 'easeOutQuad' , function (){
            $('.mapUI').fadeIn('fast', 'easeInQuad' );
            $('#mapDIV').fadeIn('fast', 'easeInQuad' );
            loadLayers(); 
            map.invalidateSize(); 
            resetHighlight();
            resetInfoWindow();
            //setTimeout(function() {$("#loading").hide();}, 300);
        });  
}
function loadScript(id){
    $.getScript('lib/tools/'+ id + '.js');
}

//load content based on hash
$(function() {
  // Javascript to enable link to tab
  var url = document.location.toString();
  var windowHeight = $(window).height() - 250;
            
  if (url.match('#')) {
    var full_hash = url.split('#')[1].split('/');
    var tab_id = full_hash[0];
    var prev_tab = url.split('#')[1];
    if (tab_id != 'map' && tab_id !== undefined) {
        $('#' + tab_id).show(); 
        
        if(tab_status[tab_id] === false){
            $('#'+ tab_id).load('includes/'+ tab_id + '.html', loadScript(tab_id));
            tab_status[tab_id] = true; 
        }
        $('#pFFlanding').css('min-height', windowHeight + 'px');
        $('.content-footer').fadeIn('slow');
    }else {
        setMap();
   }
  }else {
    $('#home').show();
    $('#pFFlanding').css('min-height', windowHeight + 'px');
    $('.content-footer').fadeIn('slow');
  }
  // Change hash for page-reload
  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        window.location.hash = e.target.hash;  
  });
});
        
function getLocationHash () {
  var hashLocation = window.location.hash.substring(1),
    locations = hashLocation.split('/');
  return locations[0];
}

//create navigation of content based on hash changes for self contained app
$(window).bind('hashchange', function() {
    var tab_id = getLocationHash();
        if(tab_id === 'map?search'){
            $('#search-panel').fadeIn('fast');
            location.hash = '#map';
        }else if (tab_id != 'map') {
        	$('.mapUI').fadeOut('fast', 'easeOutQuad' , function (){
                $('.landingUI').fadeIn('fast', 'easeInQuad' );
            });
            if(tab_status[tab_id] === false){
                    $('#'+ tab_id).load('includes/'+ tab_id + '.html', loadScript(tab_id));
                    tab_status[tab_id] = true;
                }
            $('.landtab-content > .tab-pane').hide();  
            var windowHeight = $(window).height() - 250;
            $('#pFFlanding').css('min-height', windowHeight + 'px');
            $('#' + tab_id).show();  
            $('body, html, #pFFlanding').scrollTop(0);            
        }else{ 
           setMap();
        }
    
});

//ensure load sequence occurs after dom is fully rendered
function executeOnLoad(node, func) {
        var locate_node = document.getElementById(node);
       if(locate_node !== null) {
            func();
       } else {
            setTimeout(function() { executeOnLoad(node, func); }, 100);
       }
    }

//change sidebar based on screen size if screen resized
$(window).resize(function () {
    $(".tt-dropdown-menu").css("max-height", $("#container").height() - $(".navbar").height() - 20);
    //sidebar handling if small screen
    if (document.body.clientWidth <= 767) {
        $("#mapDIV").attr("class", "col-sm-12 col-lg-12 leaflet-container leaflet-fade-anim");
        $("#sidebar").css("display", "none");
        $("#toggle i").attr('class', 'glyphicon glyphicon-th-list');
    } else {
        var sidebarViz = $("#sidebar").css("display");
        if (sidebarViz == "block") {
            $("#mapDIV").attr('class', 'col-sm-8 col-lg-9 leaflet-container leaflet-fade-anim');
            $("#toggle i").attr('class', 'glyphicon glyphicon-chevron-left');
        } else {
            $("#mapDIV").attr('class', 'col-sm-12 col-lg-12 leaflet-container leaflet-fade-anim');
            $("#toggle i").attr('class', 'glyphicon glyphicon-th-list');
        }
        
    }
    map.invalidateSize(); 
});

// Placeholder hack for IE
if (navigator.appName == "Microsoft Internet Explorer") {
    $("input").each(function () {
        if ($(this).val() == "" && $(this).attr("placeholder") != "") {
            $(this).val($(this).attr("placeholder"));
            $(this).focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
            });
            $(this).blur(function () {
                if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
            });
        }
    });
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

   
//Document Ready
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    if (document.body.clientWidth <= 767) {
        $("#mapDIV").css("class", "col-sm-12 col-lg-12");
        $("#sidebar").css("display", "none");
    }
    
    //layer group check all functionality
    $('.checked_all').on("click", function (e) {
        var listPanel = $(this).parent().siblings('.panel-collapse').children('.panel-body').children('input.Chkd');
        var $element = $(this);
            if (listPanel.attr('value') == 'true') {
                loadBar().done(function() {
                    $element.children().attr('class', 'chkicon dynico dynico-check-square-o');
                    $(listPanel).siblings('.checkbox').children('input').prop('checked', true).change();
                    $(listPanel).val('false');
                    $("#loadingtm").fadeOut(150);
                });
            } else {
                $element.children().attr('class', 'chkicon dynico dynico-square-o');
                $(listPanel).siblings('.checkbox').children('input').prop('checked', false).change();
                $(listPanel).val('true');
            } 

     });
    function loadBar(){
        return $("#loadingtm").show().delay(100).promise();
    }
});

///LayerControls: Order and add to Map as legend items are changed
//Z-index not yet functional in Leaflet
$('input:checkbox[name="LayerCont"]').on('change', function () {
    var layers = [];

    if ($('#' + $(this).attr('id')).is(':checked')) {
        $("#loadingtm").show();
        $('input:checkbox[name="LayerCont"]').each(function () {
            // Remove all overlay layers
            map.removeLayer(window[$(this).attr('id')]);
            if ($('#' + $(this).attr('id')).is(':checked')) {
                // Add checked layers to array for sorting
                layers.push({
                    'z-index': $(this).attr('z-index'),
                    'layer': $(this)
                });
            }
        });
        // Sort layers array by z-index
        var orderedLayers = sortByKey(layers, 'z-index');
        // Loop through ordered layers array and add to map in correct order
        $.each(orderedLayers, function () {
            map.addLayer(window[$(this)[0].layer[0].id]);
        });
        $("#loadingtm").delay(100).fadeOut(150);
    } else {
        // Simply remove unchecked layers
        map.removeLayer(window[$(this).attr('id')]);
    }
});
//update check all button on layer toggle
$('.layer').change(function () {
    var all = $(this).closest('.panel-body').find('input.layer').length;
    var checked = $(this).closest('.panel-body').find('input.layer:checked').length;
    if (all == checked) {
        $(this).closest('.panel').find('.checked_all').children().attr('class', 'chkicon dynico dynico-check-square-o');
        $(this).closest('.panel-body').find('.Chkd').val('false');
    } else {
        $(this).closest('.panel').find('.checked_all').children().attr('class', 'chkicon dynico dynico-square-o');
        $(this).closest('.panel-body').find('.Chkd').val('true');
    }
    var cbo = $(this).siblings('.dynacheck').length;
    if (cbo > 0){
        if($(this).is(':checked')){
            $(this).siblings('.dynacheck').find('.legend-check i').attr('class', 'dynico dynico-check-square-o');
        }else{
            $(this).siblings('.dynacheck').find('.legend-check i').attr('class', 'dynico dynico-square-o');
        }
    }
});
//Sidebar Toggle button
$("#toggle").click(function () {
    $("#toggle i").toggleClass("glyphicon-chevron-left glyphicon-th-list");
    $("#mapDIV").toggleClass("col-sm-8 col-lg-9 col-sm-12 col-lg-12");
    var sidebarViz = $("#sidebar").css("display");
    if (sidebarViz == "block") {
        $("#sidebar").css("display", "none");
    } else {
        $("#sidebar").css("display", "block");
    }
    if (document.body.clientWidth <= 767) {
        $("#mapDIV").toggleClass("hidden");
    }
    map.invalidateSize(); 
    return false;
});

///////////////////////////////////////////////////
/////   Info window Functionality   //////////////
//////////////////////////////////////////////////
function toggleinfo(e) {
    if ($('#togbtn').hasClass('hide')) {
        $('#togbtn').removeClass('hide');
    }
    if ($('#togbtn').hasClass('glyphicon-plus')) {
        $('#togbtn').attr('class', 'glyphicon glyphicon-minus InfoTgl');
    } else {}
    var h = document.getElementById('info').offsetHeight + document.getElementById('infoheader').offsetHeight+0;
    $('#infobox_').addClass('active').css('bottom', h);
}

function togglemin(e) {
    if ($('#togbtn').hasClass('glyphicon-plus')) {} else {
        $('#togbtn').attr('class', 'glyphicon glyphicon-plus InfoTgl');
    }
    $('#infobox_').css('bottom', 0).removeClass('active');
}

$(".InfoTgl").click(function () {
    if ($('#infobox_').hasClass('active')) {
        togglemin();
    } else {
        toggleinfo();
    }
});
$('#mobileInfo_modal').on('hide.bs.modal',function(){
            resetHighlight();
        }); 

//////////////////////////////////////////////////
////            UI Functions            //////////
//////////////////////////////////////////////////

///On load loading bar functionality
$( document ).ajaxStop(function() {
    setTimeout(function() {
              $("#loadingtm").hide();
            }, 300);

});


/////////////////////////////////////////////////
//////////// New Leaflet Control ////////////////
/////////// Add Center to Region //////////////
///////////////////////////////////////////////

L.Control.mapCenter = L.Control.Zoom.extend({
  options: {
    position: "topleft",
    zoomInText: "+",
    zoomInTitle: "Zoom in",
    zoomOutText: "-",
    zoomOutTitle: "Zoom out",
    zoomMinText: "<i class='dynico dynico-dvrpc'></i>",
    zoomMinTitle: "View Full Region",
    vcLatLng: [oLat, oLng],
    vcZoom: 9
  },

  onAdd: function (map) {
    var zoomName = "leaflet-control-zoom"
      , container = L.DomUtil.create("div", zoomName + " leaflet-bar")
      , options = this.options

    this._map = map

    this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
     zoomName + '-in', container, this._zoomIn, this)

    this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
     zoomName + '-out', container, this._zoomOut, this)

    this._zoomMinButton = this._createButton(options.zoomMinText, options.zoomMinTitle,
     zoomName + '-min', container, this._zoomMin, this)

    this._updateDisabled()
    map.on('zoomend zoomlevelschange', this._updateDisabled, this)

    return container
  },

  
  
  _zoomMin: function () {
    var opts = this.options
    var zoom = opts.vcZoom || 6;
    this._map.setView(opts.vcLatLng, zoom)
  },

  _updateDisabled: function () {
    var map = this._map
      , className = "leaflet-disabled"

    L.DomUtil.removeClass(this._zoomInButton, className)
    L.DomUtil.removeClass(this._zoomOutButton, className)
    L.DomUtil.removeClass(this._zoomMinButton, className)

    if (map._zoom === map.getMinZoom()) {
      L.DomUtil.addClass(this._zoomOutButton, className)
    }

    if (map._zoom === map.getMaxZoom()) {
      L.DomUtil.addClass(this._zoomInButton, className)
    }

    if (map._zoom === map.getMinZoom()) {
      L.DomUtil.addClass(this._zoomMinButton, className)
    }
  }
})
//Add controls
map.addControl(new L.Control.mapCenter());


/////////////////////////////////////////// 
//Action on feature selections////////////    
//Initialize highlight function, clear map and define click source
function initializeHL(e){
    resetHighlight();
    layersearch = e.feature;            //define layer value for search event
    if (layersearch===undefined){       //if click event set highlight style and define prop value
        highlightMapFeature(e.target);
        props = e.target.feature.properties;
    }else{                              //if search event set highlight style define prop value
        highlightMapFeature(e);
        props = layersearch.properties;
    }
    $('#search-panel').fadeOut('fast');
    $('#searchbox').typeahead('val', '');
    return props;
}

function contentPush(header, content, featureName, featureClass, featureIcon){
    //push content to DOM elements using JS
    //if (featureName != ''){var FNclass = featureClass;}
    //if (featureIcon != ''){var icons = ''+ featureIcon +' icon'}
    if (document.body.clientWidth <= 375) {
        document.getElementById('mobileheader').innerHTML = header;                         //push content to info box header
        document.getElementById('mobileinfo').innerHTML = content;                          //push content to info box
        document.getElementById('mobilefeatureName').innerHTML = featureName;    //push Feature Type (optional, see below for manual version)
        document.getElementById('mobileMdHeader').className = ''+ featureClass +' modal-header';                 //push class to create style for info header
        //document.getElementById('mobileiconography').className = ''+ icons +'';       //push icon class information (optional)
        $('#mobileInfo_modal').modal('show');
    } else {    
        document.getElementById('infoheader').innerHTML = header;                   //push content to info box header
        document.getElementById('info').innerHTML = content;                        //push content to info box
        document.getElementById('featureName').innerHTML = featureName;             //push Feature Type (optional, see below for manual version)
        document.getElementById('featureName').className = ''+ featureClass +'';          //push class to create style for feature name
        document.getElementById('infoheader').className = ''+ featureClass +'';           //push class to create style for info header
        document.getElementById('iconography').className = ''+ featureIcon +'';       //push icon class information (optional)
    }
    toggleinfo();
    activateTooltip();            
}

//zoom to polygon feature
function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
}
function zoomToPoint(e){
    var layer= e.target;
    var latLng = layer.getLatLng();
        map.setView(latLng, 15);
}   
function zoomToFC(e){
        var layer= e.target;
        var latLng = layer.getLatLng();
            map.setView(latLng, 13);
            }   
//determine feature type and highlight              
function highlightMapFeature(lyr){
    var id = lyr.feature.geometry.type;
    if (id != 'Point'){
        lyr.setStyle({weight: hlweight, color: ""+ hlColor +""});
    } else {
        iconElem = L.DomUtil.get(lyr._icon);
        iconElem.id = 'preselect';
        
        if ($(iconElem).is('img')){
            hlmarkerSize = rdIconSize + 8;
            iconElem.style.border="4px " + hlColor + " solid";
            iconElem.style.height= hlmarkerSize + "px";
            iconElem.style.width= hlmarkerSize + "px";
            iconElem.style.marginTop="-" + hlmarkerSize/2 + "px";
            iconElem.style.marginLeft="-" + hlmarkerSize/2 + "px";
            iconElem.id="selectedIcon";
        } else if($('#preselect').hasClass('circle-cm')) {
            $(iconElem).append('<div class="markerBox cm" style="border-color:'+hlColor+'"></div>');
            iconElem.id='selectedIcon';
        }else if($('#preselect').hasClass('circle-sm')) {
            $(iconElem).append('<div class="markerBox sm" style="border-color:'+hlColor+'"></div>');
            iconElem.id='selectedIcon';
        }
        else if($('#preselect').hasClass('circle-md')) {
            $(iconElem).append('<div class="markerBox md" style="border-color:'+hlColor+'"></div>');
            iconElem.id='selectedIcon';
        }
    }
}          
//reset all layer styles before highlight (LONG HANDED--Revision in works)      
function resetHighlight(){
    //reset poly features individually
    for (var i = 0, l = polyLayer.length; i < l; i++) {
        var nm = polyLayer[i],
        resStyle = window[nm].options.style;
        window[nm].setStyle(resStyle);
    }
    resetIconhighlights();

}

//hack to remove highlight from markers
function resetIconhighlights(){
    var highlticon = document.getElementById('selectedIcon');
    if (highlticon!=undefined){
        highlticon.id = 'prehide';
        $('.markerBox').remove();

        if( $(iconElem).is('img')){
            highlticon.style.border="";
            highlticon.style.height= rdIconSize + "px";
            highlticon.style.width= rdIconSize + "px";
            highlticon.style.marginTop="-" + rdIconSize/2 + "px";
            highlticon.style.marginLeft="-" + rdIconSize/2 + "px";
            highlticon.id="";
        } else {
            highlticon.id="";
        }
    }else{
        //do nothing
    }
}

function resetInfoWindow (){
        $('#togbtn').addClass('hide');
        $('#infobox_').removeClass('active').css('bottom',0);
        document.getElementById('featureName').innerHTML = '';
        document.getElementById('infoheader').innerHTML = '<p>Click feature to view details</p>';
        document.getElementById('infoheader').className = '';
        document.getElementById('featureName').className = '';
        document.getElementById('iconography').className = '';
        document.getElementById('info').innerHTML = '';
}
// Clear the tooltip, highlights, and search bar when map is clicked   
map.on('click',function(e){
        resetHighlight();
        resetInfoWindow();
        $('#search-panel').fadeOut('fast');
        $('#searchbox').typeahead('val', '');        
});


// Tooltip Provisions for the Sidebar Legend elements
$('.tab-content').find('.panel-group.legend .panel-heading').first().find('a > div').attr('data-placement', 'bottom');
$('.panel-group.legend').find('.panellink').attr('data-toggle', 'tooltip').attr('title', 'View/hide layers in group');
$('.panel-group.legend').find('.panelinfo').attr('data-toggle', 'tooltip').attr('title', 'Learn about these layers');
$('.panel-group.legend').find('.checked_all').attr('data-toggle', 'tooltip').attr('title', 'Toggle All Layers').attr('data-placement', 'left');




/* ========================================================================
 * Bootstrap Dropdowns Enhancement: dropdowns-enhancement.js v3.1.1 (Beta 1)
 * http://behigh.github.io/bootstrap_dropdowns_enhancement/
 * ========================================================================
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

(function($) {
    "use strict";

    var toggle   = '[data-toggle="dropdown"]',
        disabled = '.disabled, :disabled',
        backdrop = '.dropdown-backdrop',
        menuClass = 'dropdown-menu',
        subMenuClass = 'dropdown-submenu',
        namespace = '.bs.dropdown.data-api',
        eventNamespace = '.bs.dropdown',
        openClass = 'open',
        touchSupport = 'ontouchstart' in document.documentElement,
        opened;


    function Dropdown(element) {
        $(element).on('click' + eventNamespace, this.toggle)
    }

    var proto = Dropdown.prototype;

    proto.toggle = function(event) {
        var $element = $(this);

        if ($element.is(disabled)) return;

        var $parent = getParent($element);
        var isActive = $parent.hasClass(openClass);
        var isSubMenu = $parent.hasClass(subMenuClass);
        var menuTree = isSubMenu ? getSubMenuParents($parent) : null;

        closeOpened(event, menuTree);

        if (!isActive) {
            if (!menuTree)
                menuTree = [$parent];

            if (touchSupport && !$parent.closest('.navbar-nav').length && !menuTree[0].find(backdrop).length) {
                // if mobile we use a backdrop because click events don't delegate
                $('<div class="' + backdrop.substr(1) + '"/>').appendTo(menuTree[0]).on('click', closeOpened)
            }

            for (var i = 0, s = menuTree.length; i < s; i++) {
                if (!menuTree[i].hasClass(openClass)) {
                    menuTree[i].addClass(openClass);
                    positioning(menuTree[i].children('.' + menuClass), menuTree[i]);
                }
            }
            opened = menuTree[0];
        }

        return false;
    };

    proto.keydown = function (e) {
        if (!/(38|40|27)/.test(e.keyCode)) return;

        var $this = $(this);

        e.preventDefault();
        e.stopPropagation();

        if ($this.is('.disabled, :disabled')) return;

        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');

        if (!isActive || (isActive && e.keyCode == 27)) {
            if (e.which == 27) $parent.find(toggle).trigger('focus');
            return $this.trigger('click');
        }

        var desc = ' li:not(.divider):visible a';
        var desc1 = 'li:not(.divider):visible > input:not(disabled) ~ label';
        var $items = $parent.find(desc1 + ', ' + '[role="menu"]' + desc + ', [role="listbox"]' + desc);

        if (!$items.length) return;

        var index = $items.index($items.filter(':focus'));

        if (e.keyCode == 38 && index > 0)                 index--;                        // up
        if (e.keyCode == 40 && index < $items.length - 1) index++;                        // down
        if (!~index)                                      index = 0;

        $items.eq(index).trigger('focus');
    };

    proto.change = function (e) {

        var
            $parent,
            $menu,
            $toggle,
            selector,
            text = '',
            $items;

        $menu = $(this).closest('.' + menuClass);

        $toggle = $menu.parent().find('[data-label-placement]');

        if (!$toggle || !$toggle.length) {
            $toggle = $menu.parent().find(toggle);
        }

        if (!$toggle || !$toggle.length || $toggle.data('placeholder') === false)
            return; // do nothing, no control

        ($toggle.data('placeholder') == undefined && $toggle.data('placeholder', $.trim($toggle.text())));
        text = $.data($toggle[0], 'placeholder');

        $items = $menu.find('li > input:checked');

        if ($items.length) {
            text = [];
            $items.each(function () {
                var str = $(this).parent().find('label').eq(0),
                    label = str.find('.data-label');

                if (label.length) {
                    var p = $('<p></p>');
                    p.append(label.clone());
                    str = p.html();
                }
                else {
                    str = str.html();
                }


                str && text.push($.trim(str));
            });

            text = text.length < 4 ? text.join(', ') : text.length + ' selected';
        }

        var caret = $toggle.find('.caret');

        $toggle.html(text || '&nbsp;');
        if (caret.length)
            $toggle.append(' ') && caret.appendTo($toggle);

    };

    function positioning($menu, $control) {
        if ($menu.hasClass('pull-center')) {
            $menu.css('margin-right', $menu.outerWidth() / -2);
        }

        if ($menu.hasClass('pull-middle')) {
            $menu.css('margin-top', ($menu.outerHeight() / -2) - ($control.outerHeight() / 2));
        }
    }

    function closeOpened(event, menuTree) {
        if (opened) {

            if (!menuTree) {
                menuTree = [opened];
            }

            var parent;

            if (opened[0] !== menuTree[0][0]) {
                parent = opened;
            } else {
                parent = menuTree[menuTree.length - 1];
                if (parent.parent().hasClass(menuClass)) {
                    parent = parent.parent();
                }
            }

            parent.find('.' + openClass).removeClass(openClass);

            if (parent.hasClass(openClass))
                parent.removeClass(openClass);

            if (parent === opened) {
                opened = null;
                $(backdrop).remove();
            }
        }
    }

    function getSubMenuParents($submenu) {
        var result = [$submenu];
        var $parent;
        while (!$parent || $parent.hasClass(subMenuClass)) {
            $parent = ($parent || $submenu).parent();
            if ($parent.hasClass(menuClass)) {
                $parent = $parent.parent();
            }
            if ($parent.children(toggle)) {
                result.unshift($parent);
            }
        }
        return result;
    }

    function getParent($this) {
        var selector = $this.attr('data-target');

        if (!selector) {
            selector = $this.attr('href');
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }

        var $parent = selector && $(selector);

        return $parent && $parent.length ? $parent : $this.parent()
    }

    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    var old = $.fn.dropdown;

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.dropdown');

            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)));
            if (typeof option == 'string') data[option].call($this);
        })
    };

    $.fn.dropdown.Constructor = Dropdown;

    $.fn.dropdown.clearMenus = function(e) {
        $(backdrop).remove();
        $('.' + openClass + ' ' + toggle).each(function () {
            var $parent = getParent($(this));
            var relatedTarget = { relatedTarget: this };
            if (!$parent.hasClass('open')) return;
            $parent.trigger(e = $.Event('hide' + eventNamespace, relatedTarget));
            if (e.isDefaultPrevented()) return;
            $parent.removeClass('open').trigger('hidden' + eventNamespace, relatedTarget);
        });
        return this;
    };


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old;
        return this
    };


    $(document).off(namespace)
        .on('click' + namespace, closeOpened)
        .on('click' + namespace, toggle, proto.toggle)
        .on('click' + namespace, '.dropdown-menu > li > input[type="checkbox"] ~ label, .dropdown-menu > li > input[type="checkbox"], .dropdown-menu.noclose > li', function (e) {
            e.stopPropagation()
        })
        .on('change' + namespace, '.dropdown-menu > li > input[type="checkbox"], .dropdown-menu > li > input[type="radio"]', proto.change)
        .on('keydown' + namespace, toggle + ', [role="menu"], [role="listbox"]', proto.keydown)
}(jQuery));