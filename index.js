'use strict';
require('scrollingelement');
var assign = require('lodash/assign');
var scrollingElement = document.scrollingElement;

/**
 * Compares current scrolltop with targeted scrolltop
 * and returns 1 for downward (or no) page scroll and -1 for upward.
 *
 * @param {Number} currentScrollTop
 * @param {Number} targetScrollTop
 * @returns {Number}
 */
var getDirection = function(currentScrollTop, targetScrollTop) {
    return (currentScrollTop <= targetScrollTop) ? 1 : -1;
};

/**
 * Returns a HTML elements Y-offset.
 *
 * @param {HTMLElement} el
 * @returns {Number}
 */
var getElementScrollTop = function(el) {
    var rect = el.getBoundingClientRect();
    return rect.top + scrollingElement.scrollTop;
};

/**
 * Returns the HTML element referenced from passed elements HREF-attribute.
 *
 * @param {HTMLElement} el
 * @returns {HTMLElement}
 */
var getTargetElement = function(el) {
    var targetId = el.getAttribute('href').replace('#', '');
    return document.getElementById(targetId);
};

/**
 * Calculates how many times requestAnimationFrame needs to be called
 * to meet the targeted duration of animation.
 *
 * @param {Number} duration
 * @param {Number} framesPerSecond
 * @returns {Number}
 */
var getFramesByDuration = function(duration, framesPerSecond) {
    var frameRate = 1000 / framesPerSecond;
    return Math.round(duration / frameRate);
};

/**
 * Sets the documents scrollTop.
 *
 * @param {Number} y
 */
var snap = function(y) {
    scrollingElement.scrollTop = y;
};

/**
 * A linear easing equation.
 *
 * @param {Number} t current time
 * @param {Number} b beginning value
 * @param {Number} c change in value
 * @param {Number} d duration
 * @returns {Number}
 */
var linearEasing = function (t, b, c, d) {
    return c * t / d + b;
};

var defaultOptions = {
    duration: 400,
    distance: 400,
    offset: 0,
    easingEquation: linearEasing
};

function anchorScroller(els, opts) {

    var options = assign(defaultOptions, opts),
        frames = getFramesByDuration(options.duration, 60),

        target,
        offsetScrollTop,
        currentScrollTop,
        targetScrollTop,
        direction = 1,
        time = 0;

    var scroll = function(reset) {
        var tweened;

        if (reset) {
            time = 0;
        }

        time++;
        tweened = options.easingEquation(time, 0, options.distance, frames);
        scrollingElement.scrollTop = offsetScrollTop + (tweened * direction);

        if (time < frames) {
            requestAnimationFrame(function() {
                scroll();
            });
        }
    };

    var initializeScroll = function(e) {
        target = getTargetElement(this);
        targetScrollTop = getElementScrollTop(target) + options.offset;
        direction = getDirection(scrollingElement.scrollTop, targetScrollTop);
        offsetScrollTop = targetScrollTop - (options.distance * direction);

        snap(offsetScrollTop);
        scroll(true);

        e.preventDefault();
    };

    var addEventListeners = function() {
        for (var i = 0; i < els.length; i++) {
            els[i].addEventListener('click', initializeScroll);
        }
    };

    addEventListeners();
}

module.exports = anchorScroller;
