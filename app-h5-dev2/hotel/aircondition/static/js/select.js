/*! jQuery select
 * Author: Vilien
 * Date: 2014-12-19
 * 调用方式：
 */
;(function($, gmu){

var template = ''+
'<dl class="pop-clock">' +
'    <dt></dt>'+
'    <dd>' +
'        <span class="pop-select">'+
'            <ul>'+
'                <li data-value="@value">@label</li>'+
'            </ul>'+
'            <div class="sel-shadow"></div>'+
'        </span>'+
'    </dd>' +
'</dl>' +
'';

$.fn.jqmselect= function(options)
    { 
        var _self = $(this);
        var defaults = {
            items:[],
            template: template
        };
        var settings = $.extend({}, defaults, options || {});
        var isScrolling = false; // 滚动开关
        var oldtop = 0;
        var Y = 0;
        var select = $(settings.template);
        var list = $("<ul></ul>");
        var selectValue = "";

        // 初始化
        select.find(".pop-select>ul").replaceWith(list);
        for (var i=0;i<settings.items.length;i++) {
            var val = settings.items[i].value ? settings.items[i].value : settings.items[i].label;
            list.append('<li data-value="'+val+'">'+settings.items[i].label+'</li>');
            if (i===1) selectValue = val;
        }


        select.on("touchstart mousedown", ".pop-select .sel-shadow", function(e){
            var touch = event.targetTouches ? event.targetTouches[0] : e;
            oldtop = parseInt(list.css("margin-top"));
            Y = touch.pageY;
            isScrolling = true;
        });

        select.on("touchmove mousemove", ".pop-select .sel-shadow", function(e){
            if (!isScrolling) return true;
            var touch = event.targetTouches ? event.targetTouches[0] : e;
            var lh = list.children("li").height();
            var mig = oldtop + touch.pageY - Y;
            if (mig < lh * 1.5 && mig > -(lh * (list.children().length - 1.5))) {
                list.css("margin-top", mig);
            }
        });

        select.on("touchend mouseup", function(){
            var mid = select.find(".pop-select").height() / 2;
            list.children().each(function(){
                var diff = mid - ($(this).position().top + $(this).height() / 2);
                if (Math.abs(diff) <= $(this).height()/2) {
                    list.animate({"margin-top": parseInt(list.css("margin-top")) + diff}, 100);
                    selectValue = $(this).attr("data-value");
                    return true;
                }
            });
            isScrolling = false;
        });

        return gmu.Dialog({
            autoOpen: false,
            closeBtn: false,
            buttons: {
                '确定': function(){
                    _self.is("input") ? _self.val(selectValue) : _self.text(selectValue);
                    if ($.isFunction(settings.callback)) {
                        settings.callback(selectValue);
                    }
                    this.close();
                }
            },
            content: select
        });
    }

})(Zepto || jQuery, gmu);
