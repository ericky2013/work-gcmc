
//注意flash视频代码要放在jquery的ready方法外
//flash 视频播放
//定义默认的flash文件路径(src,picsrc...)
var TRS = {};
TRS.defaultpic = "http://localhost:8077/work/work/Z/demo-2/demo-2-2/swf/image/logo.png.jpg";   //flash 播放使用绝对路径
TRS.swfplayer = "http://localhost:8077/work/work/Z/demo-2/demo-2-2/swf/TRSVideoPlayer.swf";
TRS.videoRoot = "http://localhost:8077/work/work/Z/demo-2/demo-2-2//videos/";   //注意后面还有一个"/"
var $videoTem = $('#js_video_content').clone();   //临时保存DOM元素
$.playByFlash('js_video_content',false);   //调用jquery.flash插件

//点击播放列表更新视频播放
function update_video(src, video_source){
		$("#js_video_content").replaceWith($videoTem);
		// console.log($videoTem);  // div 元素, object元素上的data-xxx属性不好使,这里的div刚好起到缓存数据的作用
		$("#js_video_content").data('video',video_source);   //设置div id="js_video_content" 上的data-xxx属性
		$("#js_video_content").data('vpic', src);
		// console.log($("#js_video_content").data('video'));
		$.playByFlash('js_video_content');  //读取到div id="js_video_content" 上的data-xxx数据后,使用swfobject.js将其转为object元素,且div id="js_video_content" 元素从DOM中移除,同时将object的id设为js_video_content
}

//注册视频播放列表点击事件
$('.list-play-lister').on("click","a",function(evt){
	evt.preventDefault();
	evt.stopPropagation();
   var $this = $(this);
	var video_source = $(this).data("video");
	var src =  $(this).data("vpic");;
	update_video(src, video_source);
})


$(document).ready(function(){

	//nav-bar hover 效果
	$('.nav-links').hover(function(){
		// console.log($(this).closest("li"));
		$(this).closest("li").addClass("borderNone");
	},function(){
		$(this).closest("li").removeClass("borderNone");
	})
		
	//carousel start
	$('.list-carousel').refineSlide({
			useArrows: true,
			maxWidth: 960,
			useThumbs: false,
	      transition: 'cubeH',
	      fallback3d: 'sliceV',
	      autoPlay: false,
	      delay: 5000,
	      transitionDuration: 1000,
	      captionWidth: 100
	});

	//产品删选
	$(".filter-content").isotope({
		 itemSelector: '.product'
	});
	$('#filters').on("click",'a',function(evt){
		evt.preventDefault();
		evt.stopPropagation();
		$('#filters li').removeClass("filter-item-li-current");
		var $this = $(this);
		$this.closest("li").addClass("filter-item-li-current");
		var options = {};
		var key = $('#filters').attr('data-option-key');
		var value = $this.attr("data-option-value");
		value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
       	// changes in layout modes need extra logic
       	changeLayoutMode( $this, options )
     	} else {
       	// otherwise, apply new options
       	$(".filter-content").isotope( options );
     	}
      return false;
	});

	//删选图片透明度
	$(".product img").mouseenter(function(){
		$(".product img").css("opacity","0.5");
		$(this).css("opacity","1");
		// alert(123);
		$(".filter-content").mouseleave(function(){
			$(".product img").css("opacity","1.0");
		})
	});

/*****************垂直菜单******************/
	var gl_index ="";

	function getRandom(min,max)
    {
        return((Math.floor(Math.random()*(max-min)))+min);
    }

	//animation about vertical-meun
	var itemhover = $('.item');
	itemhover.hover(function(){
		 var $this = $(this);
	 	 $this.find('.bak-img').stop().animate({'top':'0'},500);
		 $this.find('.mark-img').stop().animate({'top':'80px'},250);
		 $this.find('.mark-img-hover').stop().animate({'top':'80px', 'opacity':'1'},250);
		 $this.find('.icon-img-hover').stop().animate({'opacity':'1'},100);
	},function(){
		 var $this = $(this);
		 $this.find('.bak-img').stop().animate({top:'-30px'},500);
		 $this.find('.mark-img').stop().animate({top:'0px'},250);
		 $this.find('.mark-img-hover').stop().animate({'top':'0px', 'opacity':'0'},250);
		 $this.find('.icon-img-hover').stop().animate({opacity:'0'},100);
	});

	var preface = $('.preface').children('li');
	var itemcount = preface.length;
	var itemwidth = parseInt($('.preface li:first').css('height'));
	var veritem = $('.hot-box-vertical-menu-li');
	var boxContentWrapper = $('.hot-box-contnent-wrapper');
	var boxContent = $('.hot-box-content');
	//console.log(itemwidth);
	itemhover.click(function(evt){
		 var i=0,j=0;
		 evt.stopPropagation();
		 evt.preventDefault();
		 var $this = $(this);
		 var tmp_li = $this.closest('li');
		 var index = tmp_li.closest('ul').children().index(tmp_li);
		 gl_index = index;

		 // console.log(index);
		 preface.each(function(){
		 	$(this).animate({"height":"0px"},getRandom(500,1000),'easeInOutExpo',function(){
		 		if(++i ==  itemcount){
		 			preface.css('position','absolute');
		 			preface.each(function(){
		 				var index = $(this).parent('ul').children('li').index($(this));
		 				$(this).css('left',itemwidth*index);
		 			})
		 			preface.animate({left:'800px',opacity:'0'},500,function(){
		 				if(++j == itemcount){
		 					preface.css('display','none');
		 					boxContent.closest("div.hot-box-contnent-wrapper").children().eq(index).css({left:"142px"});
		 					// console.log(boxContent.closest("div").children().eq(index));
		 					veritem.css("display","block");
		 					veritem.eq(index).addClass("hot-box-vertical-menu-li-current");
		 					boxContentWrapper.css("display","block");
		 					boxContentWrapper.animate({
		 						opacity:"1"
		 					},700);
		 					return;
		 				}
		 			});
		 		}

		 	});
		 });
		 // preface.animate({"border":"0px",},500,'easeInOutExpo');
	});
/*****************垂直菜单******************/



	//最新活动,专题,新闻,视频
	$('.hot-box-vertical-menu-li').on("click","a",function(evt){
		evt.preventDefault();
		evt.stopPropagation();
		var $this = $(this);
		var tabdex = $this.data("tabdex");
		var itemContent = $('.hot-box-content');
		if(tabdex == "return"){    //返回
			boxContentWrapper.animate({    //boxContentWrapper 
				opacity:"0"
			},200,function(){
				 boxContentWrapper.css("display","none");
				 veritem.removeClass("hot-box-vertical-menu-li-current");
				 veritem.css("display","none");
				 boxContent.css({left:"-820px",opacity:"1"});
				 preface.css('display','block');
			    preface.each(function(){
			   	 $(this).css("position","relative");
			   	 $(this).animate({
			   	 	"height":"433px",
			   	 	"left":"0",
			   	 	"opacity":"1"
			   	 })
			    })
			});
			return;
		}
		var itemContentCurrent = $('.hot-box-content-' + tabdex);
		$this.closest("ul").find("li").removeClass("hot-box-vertical-menu-li-current");
		$this.closest("li").addClass("hot-box-vertical-menu-li-current");
		itemContentCurrent.stop();
		if(itemContentCurrent.css("left") == "142px") return;
		itemContent.css({
			left:"-820px",
			opacity:"0"
		});

		/*itemContentCurrent.animate({
			left:"142px"
		},800,'easeOutElastic');*/			//抽拉式抖动效果

		itemContentCurrent.css({
			left:"142px"
		})
		itemContentCurrent.animate({     //fade效果
			opacity:"1"
		},700);



	});
});

/*图片banner */
	var bannerSlider = $('.banner-slider');
	bannerSlider.children("li").removeClass("dis_none");
	bannerSlider.bxSlider({
		 mode: 'horizontal',
		 captions: true
	});

//判断文档模型:
// alert(document.documentMode);

