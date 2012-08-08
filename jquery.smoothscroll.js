/*!
 * jQuery Smooth Scroll plugin v0.9.2
 * https://github.com/terkel/jquery-smoothscroll
 *
 * Copyright (c) 2012 Takeru Suzuki - http://terkel.jp/
 * Licensed under the MIT license - http://www.opensource.org/licenses/MIT
 */
(function (window, document, $) {

    $.smoothScroll = {
        init: initSmoothScroll,
        defaults: {
            selector: '[href^="#"]',
            duration: 400,
            easing: 'swing',
            hash: true,
            paddingTop: 0,
            callback: null
        }
    };

    function initSmoothScroll (options) {

        var opts = $.extend({}, $.smoothScroll.defaults, options),
            $document = $(document),
            node;

        $document.on('click', opts.selector, smoothScroll);

        $document.ready(function () {
            node = scrollableNode('html', 'body');
        });

        function smoothScroll (event) {
            var $this = $(this),
                h = this.hash,
                targetOffset = ($(h).offset())? $(h).offset().top - opts.paddingTop: 0,
                docHeight = $document.height(),
                winHeight = $(window).height();
            if ((docHeight - targetOffset) < winHeight) {
                targetOffset = (docHeight - winHeight);
            }
            event.preventDefault();
            $(node).stop().animate({ scrollTop: targetOffset }, opts.duration, opts.easing, function () {
                if (opts.hash) {
                    location.hash = h;
                }
                if ($.isFunction(opts.callback)) {
                    opts.callback.call($this.get(0));
                }
            });
        }

        // http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links#update4
        function scrollableNode (nodes) {
            var i,
                len,
                node,
                $node,
                scrollable;
            for (i = 0, len = arguments.length; i < len; i++) {
                node = arguments[i],
                $node = $(node);
                if ($node.scrollTop() > 0) {
                    return node;
                } else {
                    $node.scrollTop(1);
                    scrollable = $node.scrollTop() > 0;
                    $node.scrollTop(0);
                    if (scrollable) {
                        return node;
                    }
                }
            }
            return [];
        }

    }

})(window, document, jQuery);