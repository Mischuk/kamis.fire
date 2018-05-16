$(function() {
    /* throttle / debounce */
    (function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

    $('a[href="#"]').click(function(e){
      e.preventDefault();
    });

    autosize($('textarea'));

    $('select').select2({
      minimumResultsForSearch: Infinity
    });

    (function($) {

        $.fn.eqHeights = function (options) {
          var $el = $(this),
            $window = $(window),
            opts = $.extend({}, $.fn.eqHeights.defaults, options);
          if ($el.length > 0 && !$el.data('eqHeights')) {
            $(window).bind('resize.eqHeights', function () {
              $el.eqHeights(opts);
            });
            $el.data('eqHeights', true);
          }
          return $el.each(function () {
            var children = $(this).find(opts.childrenSelector);
            if (!(opts.minWidth) || opts.minWidth < $window.width()) {
              var curHighest = 0;
              children.each(function () {
                var $el = $(this),
                  elHeight = $el.height('auto').height();
                if (elHeight > curHighest) {
                  curHighest = elHeight;
                }
              }).height(curHighest);
            } else {
              children.height('auto');
            }
          });
        };
        $.fn.eqHeights.defaults = {
          childrenSelector: '*',
          minWidth: ''
        };

        $('.equal-columns').eqHeights({
          childrenSelector: '> .column',
          minWidth: 400
        });

    }(jQuery));

    //=include modules.js
});