(function($){
    $.fn.scrollSection = function(init){
        var option = {
            "autoPlay" : false,
            "autoPlayTime":3000,
            "eventType":"click",
            "width":"100%",
            "height":"400px"
        }
        $.extend(option,init);

        function nextScroll(vcon){
            var offset = (vcon.find('li').outerHeight(true)) * -1;
            vcon.stop().animate({
              top: offset
            }, "normal", function() {
              for(var i=0;i<vcon.find('ul').length;i++){
                var firstItem = vcon.find('ul').eq(i).find('li').first();
                vcon.find("ul").eq(i).append(firstItem);
              }
              $(this).css("top", "0px");
                console.log('next');
            });
        }

        function preScroll(vcon){
            var offset = (vcon.find('li').outerHeight(true)) * -1;
            for(var i=0;i<vcon.find('ul').length;i++){
              var lastItem = vcon.find('ul').eq(i).find('li').last();
              vcon.find("ul").eq(i).prepend(lastItem);
            }
            vcon.css("top", offset);
            vcon.animate({
              top: "0px"
            }, "normal", function() {
            })
        }

        function autoPlay(me){
            var timer = setInterval(function(){
                nextScroll(me.find('.viewContent'));
            },option.autoPlayTime);

            me.find('.viewContent').hover(function(){
            　  clearInterval(timer);
             },function(){
                timer = setInterval(function(){
                  nextScroll(me.find('.viewContent'));
                },option.autoPlayTime);
            });
        }

        return this.each(function(){
            var me = $(this);
            me.css('width', option.width);
            if(option.height == "auto"){
                console.log('auto');
            }
            me.find('.viewShow').css('height', option.height);

            console.log(me.find('.zoomImage').outerHeight(true));

            me.find('.goNext span').on(option.eventType,function(){
                nextScroll(me.find('.viewContent'));
            });
            me.find('.goPrev span').on(option.eventType,function(){
                preScroll(me.find('.viewContent'));
            });

            if(option.autoPlay){
                autoPlay(me);
            }

        });
    };
})(jQuery);





