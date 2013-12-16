(function(){
        var ex_id = "js_video_";
        $.extend({
            playByFlash : function(id, autoplay){
try{
                var TRS = window.TRS;
                // alert(123);
                var conf = new Object();
                if ($.isPlainObject(autoplay)){
                    conf = autoplay;
                }else{
                    conf.autoplay = autoplay;
                }

                var $obj = $("#" + id);
                var flashvars = {videoSource:"",autoPlay:'true',isAutoBandWidthDetection:'false',logoCss:'180*80,lt',logoAlpha:'0'};
                var params = {allowFullScreen:'true',quality:'high',allowScriptAccess:'always',wmode:'Opaque'};
                flashvars.videoSource = conf.video || $obj.data('video');
                flashvars.videoImgUrl = conf.vpic || $obj.data('vpic');
                if(flashvars.videoSource.match(/^(http|rtmp):\/\//) == null) flashvars.videoSource = TRS.videoRoot + flashvars.videoSource;
                // flashvars.autoPlay = conf.autoplay || true;
                flashvars.autoPlay = conf.autoplay && true;   //这里应该为&& 要不就永远都是true了
                var height = conf.height || $obj.parent().height();
                var width = conf.width || $obj.parent().width();
                swfobject.embedSWF(TRS.swfplayer, id, width, height, '9.0.124',false,flashvars,params);
                
                return;
}catch(e){
}
            }
        });
        $.fn.extend({
            playVideo : function(autoplay){
                $(this).each(function(){
                    var defConf = {
                        autoplay : false,//自动播放
                        video : "",//视频连接
                        vpic : "",//视频缩略图
                        height : "",//高度
                        width : ""//宽度
                    };
                    var conf = new Object();
                    if ($.isPlainObject(autoplay)){
                        conf = defConf;
                        $.extend(conf, autoplay);
                    }else{
                        conf.autoplay = autoplay;
                    }

                    var id = ex_id + new Date().getTime().toString();
                   /* var videoTem = $('<div id="{{id}}"/>'.format({id:id})).data({
                        video : $(this).data('video'),
                        vpic : $(this).data('vpic')
                    });
                    $(this).empty().html(videoTem);*/
                    $.playByFlash(id, conf);
                });
            }
        });
    })();