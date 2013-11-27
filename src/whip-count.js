(function( $ ) {
  $.fn.whipCount = function(o) {
    var houseTotal  = 435;
    var senateTotal = 100;

    var opts        = $.extend( {
      lineWidth   : 1,
      filibuster  : false,
      legend      : true
    }, o);

    function positionDiv(position, percent){
      return $("<div class='position "+position+"'>")
                .css({ 
                  float : 'left', 
                  width : percent + '%' 
                });
    }
  
    return this.each(function(){
      var $el            = $(this).addClass('wc-chart-wrap');
      var $chart         = $("<div class='wc-chart'>");
      var w              = $el.width();
      var h              = $el.height();
      var $house         = $("<div class='wc-house'>");
      var $senate        = $("<div class='wc-senate'>");
      var positionStates = ['firmYea', 'leanYea', 'unknown', 'leanNay', 'firmNay'];

      if($el.css('position') === 'static') $el.css('position', 'relative');

      var houseCounted  = 0;
      var senateCounted = 0;
      $.each(positionStates, function(i, position){
        var percent;
        if(opts.house){
          if(opts.house[position]){
            percent = opts.house[position] / houseTotal * 100;
            houseCounted += opts.house[position];
            $house.data(position, positionDiv(position, percent));
          }
        }
        if(opts.senate) { 
          if(opts.senate[position]){
            percent = opts.senate[position] / senateTotal * 100;
            senateCounted += opts.senate[position];
            $senate.data(position, positionDiv(position, percent));
          }
        }
      });

      if(opts.house){
        $house.data('unknown', positionDiv('unknown', (houseTotal - houseCounted) / houseTotal * 100));
        $house.append("<div class='wc-label'>House of Representatives</div>");
        $.each(positionStates, function(i, position){
          $house.append($house.data(position));
        });
        $house.append($("<div>").css('clear', 'both'));
        $chart.append($house);
      }
      if(opts.senate){
        $senate.data('unknown', positionDiv('unknown', (senateTotal - senateCounted) / senateTotal * 100));
        $.each(positionStates, function(i, position){
          $senate.append($senate.data(position));
        });
        $senate.append($("<div>").css('clear', 'both'));
        $senate.append("<div class='wc-label'>Senate</div>");
        $chart.append($senate);
      }

      $chart.append($("<div class='wc-line'>").css({
        top       : 0,
        position  : 'absolute',
        height    : $el.height(),
        width     : opts.lineWidth + 'px',
        left      : ((($el.width() / 2) - opts.lineWidth) / $el.width() * 100) + '%'
      }));

      if(opts.filibuster){
        $chart.append($("<div class='wc-line filibuster'>").css({
          position  : 'absolute',
          width     : opts.lineWidth + 'px',
          left      : ((($el.width() * 3 / 5) - opts.lineWidth) / $el.width() * 100) + '%'
        }));        
      }

      $el.append($chart);

      if(opts.legend){
        var legend = '<div class="wc-legend">'+
          '<p class="center">50%</p>'+
          '<p class="fili">60%</p>'+
          '<div class="firms">'+
          '  <div class="yea box pull-left"></div>'+
          '  <div class="label pull-left">YEA</div>'+
          '  <div class="nay box pull-right"></div>'+
          '  <div class="label pull-right">NAY</div>'+
          '  <div class="clear"></div>'+
          '</div>'+
          '<div class="leans">'+
          '  <div class="lean-yea box pull-left"></div>'+
          '  <div class="label pull-left">LEAN YEA</div>'+
          '  <div class="lean-nay box pull-right"></div>'+
          '  <div class="label pull-right">LEAN NAY</div>'+
          '  <div class="clear"></div>'+
          '</div>';
        $el.append(legend);
      }

    });

  };
})( jQuery );