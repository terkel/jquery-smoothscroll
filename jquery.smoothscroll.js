/*!
 * jQuery Smooth Scroll plugin v0.9.1
 * https://github.com/terkel/jquery-smoothscroll
 *
 * Copyright (c) 2011 Takeru Suzuki, http://terkel.jp/
 * Licensed under the MIT license: http://www.opensource.org/licenses/MIT
 */
(function (window, $) {

    var document = window.document,
        location = window.location;

    $.fn.smoothScroll = function (options) {
        var opts = $.extend({}, $.fn.smoothScroll.defaults, options);
        return this.each(function () {
            var $this = $(this),
                h = this.hash,
                elem = ($.browser.webkit || !$.support.boxModel)? 'body': 'html';
            if (/^#/.test(h) && $(h).length === 0) {
                return;
            }
            $this.bind('click', function (event) {
                var targetOffset = ($(h).offset())? $(h).offset().top - opts.paddingTop: 0,
                    documentHeight = $(document).height(),
                    windowHeight = $(window).height();
                if ((documentHeight - targetOffset) < windowHeight) {
                    targetOffset = (documentHeight - windowHeight);
                }
                event.preventDefault();
                $(elem).stop().animate({ scrollTop: targetOffset }, opts.duration, opts.easing, function () {
                    if (opts.hash) {
                        location.hash = h;
                    }
                    if ($.isFunction(opts.callback)) {
                        opts.callback.call($this.get(0));
                    }
                });
            });
        });
    };

    $.fn.smoothScroll.defaults = {
        duration: 400,
        easing: 'swing',
        hash: true,
        paddingTop: 0,
        callback: null
    };

})(window, jQuery);