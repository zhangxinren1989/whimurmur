// primary color
themeMainColor={base:'#008cba',blue_sky:'#42a6f5',crisp:'#EB6864',darkly:'#375a7f',grey:'#325D88',light_shadow:'#158CBA',
        modern:'#2C3E50',orange:'#E95420',purple:'#482879',square:'#1a1a1a',warm:'#78C2AD',dark_blue:'#2A9FD6'};
// success primary info secondary light
themeFiveColor={base:['rgb(67, 172, 106)','rgb(0, 140, 186)','rgb(91, 192, 222)','rgb(73, 80, 87)','rgb(238, 238, 238)'],
    blue_sky:['rgb(76, 175, 80)','rgb(33, 150, 243)','rgb(156, 39, 176)','rgb(187, 187, 187)','rgb(255, 255, 255)'],
    crisp:['rgb(34, 178, 76)','rgb(235, 104, 100)','rgb(51, 102, 153)','rgb(170, 170, 170)','rgb(248, 249, 250)'],
    darkly:['rgb(0, 188, 140)','rgb(55, 90, 127)','rgb(52, 152, 219)','rgb(68, 68, 68)','rgb(173, 181, 189)'],
    grey:['rgb(147, 197, 75)','rgb(50, 93, 136)','rgb(41, 171, 224)','rgb(142, 140, 132)','rgb(248, 245, 240)'],
    light_shadow:['rgb(40, 182, 44)','rgb(21, 140, 186)','rgb(117, 202, 235)','rgb(85, 85, 85)','rgb(246, 246, 246)'],
    modern:['rgb(24, 188, 156)','rgb(44, 62, 80)','rgb(52, 152, 219)','rgb(149, 165, 166)','rgb(236, 240, 241)'],
    orange:['rgb(56, 180, 74)','rgb(233, 84, 32)','rgb(23, 162, 184)','rgb(174, 167, 159)','rgb(233, 236, 239)'],
    purple:['rgb(19, 185, 85)','rgb(89, 49, 150)','rgb(0, 156, 220)','rgb(169, 145, 212)','rgb(249, 248, 252)'],
    square:['rgb(75, 191, 115)','rgb(26, 26, 26)','rgb(31, 155, 207)','rgb(85, 89, 92)','rgb(255, 255, 255)'],
    warm:['rgb(86, 204, 157)','rgb(120, 194, 173)','rgb(108, 195, 213)','rgb(243, 150, 154)','rgb(248, 249, 250)'],
    dark_blue:['rgb(119, 179, 0)','rgb(42, 159, 214)','rgb(153, 51, 204)','rgb(85, 85, 85)','rgb(34, 34, 34)']};
frameWidthOptimize = null;
frameOptimizeCount = 20;

init();

function init(){
    //鼠标点击特效
    //页面加载事件
    jQuery(function () {
    	initPage();
    	initOther();
    });
}

function initOther(){
    if(!device.mobile()){
        $("[data-toggle='tooltip']").tooltip();
    }
    hljs.initHighlightingOnLoad();
}

function initPage(){
    menuInit();
    // clickInit();
    initTop();
    moveInit();
    
    if($("#shareDiv") && $("#shareDiv").length > 0){
        initShare();
    }
    
    // if($("iframe") && $("iframe").length > 0){
    //     $("iframe").css("max-width", "100%");
    // }
    // 优化广告显示
    if($(".ad-content").length){
        $(".ad-content").find("div,iframe").css("max-width", "100%");
    }
    
    
    frameWidthOptimize = setTimeout(optimizeAdShow, 500);
    
    var footHeight = $("#footer").height();
    $(".cl-cantainer").css("padding-bottom", (footHeight + 20) + "px");
    
    if(bgFollowTheme){
        initBgColor();
    }
    
    initTheme();
    initFont();
}

function initBgColor(){
    if($.cookie("body-background-image") == 'none'){
        var curTheme = $.cookie()['curTheme'];
        var linearColor = themeFiveColor[curTheme];
        var bgStyle = 'linear-gradient(135deg,{0},{1},{2},{3},{4},{3},{2},{1},{0})';
        bgStyle = bgStyle.replace(/{(\d+?)}/g, function(s, m){
           return linearColor[m]; 
        });
        
        var bganimation = '@keyframes bganimation {\
              0%{\
                background-position: 0% 50%;\
              }\
              10%{\
                background-position: 20% 50%;\
              }\
              20%{\
                background-position: 40% 50%;\
              }\
              30%{\
                background-position: 60% 50%;\
              }\
              40%{\
                background-position: 80% 50%;\
              }\
              50%{\
                background-position: 100% 50%;\
              }\
              60%{\
                background-position: 80% 50%;\
              }\
              70%{\
                background-position: 60% 50%;\
              }\
              80%{\
                background-position: 40% 50%;\
              }\
              90%{\
                background-position: 20% 50%;\
              }\
            }';
            
	     document.styleSheets[0].insertRule(bganimation, document.styleSheets[0].length);//写入样式
	     document.styleSheets[0].insertRule("body{animation: bganimation 50s infinite}", document.styleSheets[0].length);//写入样式
        
    	$.cookie("body-background-image", bgStyle, {path: "/"});
    }
}

var pause = false;
function footerSlideWord(event, size){
    if(pause){
        return;
    }
    pause = true;
    var index = $(event.target).closest("a").data('index');
    var title = $(event.target).closest("a").data('title');
    var url = $(event.target).closest("a").data('url');
    
    if(title){
        var item={
           img:'', //图片 
           info:title, //文字 
           href: url,//链接 
           close:true, //显示关闭按钮 
           speed:6, //延迟,单位秒,默认6 
           bottom:(Math.random() * 0.8 + 0.1) * $(window).height(), //距离底部高度,单位px,默认随机 
           color:'#' + Math.floor( Math.random() * 0xffffff ).toString(16), //随机颜色
           old_ie_color:'#000000', //ie低版兼容色,不能与网页背景相同,默认黑色 
        }
        $('body').barrager(item);
    }
    
    
    var newIndex = index;
    for(var i = 0; i < 5; i++){
        newIndex = Math.floor(Math.random() * size);
        if(newIndex != index){
            break;
        }
    }
    
    setTimeout(function(){
        $(event.target).closest("div").find("a[data-index='" + index + "']").fadeOut(2000);
        pause = false;
        $(event.target).closest("div").find("a[data-index='" + newIndex + "']").fadeIn(2000);
    }, 3000);
}

function optimizeAdShow(){
    if($("iframe") && $("iframe").length > 0){
        $("iframe").css("max-width", "100%");
        clearTimeout(frameWidthOptimize);
    }else{
        if(frameOptimizeCount-- > 0){
            setTimeout(optimizeAdShow, 500);
        }
    }
}

function initTheme(){
    // 显示，隐藏主题切换    
    $("#theme-lens").click(function(e){
        $("#theme").toggleClass("theme-show");
        $("#theme").toggleClass("theme-hidden");
    });
    
    // 设置当前主题样式
    $("#" + $.cookie()["curTheme"]).addClass("theme-cur");
    
    // 设置选中效果
    var curTheme = $.cookie()["curTheme"];
    var style = "<style>";
    style += "::selection{background-color: {}; color:#FFFFFF; /* Safari */}  \
            ::-moz-selection{background-color: {}; color:#FFFFFF; /* Firefox */ }   \
            ::-webkit-selection{background-color: {}; color:#FFFFFF; /* webkit */ }";
    style += "</style>";themeMainColor
    style = style.replace(/{}/gm, themeMainColor[curTheme]);
    $("head").append(style);
    
    // 优化评论框显示效果
    if($("#cke_1_top") && $("#cke_1_top").length > 0){
        if($.cookie("curTheme") != 'dark_blue'){
            var bgColor = $(".bg-light").css("background-color");
            $("#cke_1_top,#cke_1_bottom").css("background-color", bgColor);
            $(".cke_wysiwyg_frame")[0].contentWindow.document.body.style.backgroundColor = bgColor;
        }else{
            $("#cke_1_top,#cke_1_bottom").css("background-color", '#adb5bd');
            $(".cke_wysiwyg_frame")[0].contentWindow.document.body.style.backgroundColor = '#adb5bd';
        }
    }
    /*$("#loader .l_square>span").addClass("bg-primary");
    // 处理移动设备及窗口大小改变的情况
    var mainTop;
    var mainLeft;
    if(device.mobile()){
        $($("#loader").toArray().reverse()).each(function(i, item){
            $(item).height(document.documentElement.clientHeight * window.devicePixelRatio);
            $(item).width(document.documentElement.clientWidth * window.devicePixelRatio);
            mainTop = ($(window).height() - $("#loader .l_main").height())/ 2;
            mainLeft = ($(window).width() - $("#loader .l_main").width())/ 2;
        });
        // $("#loader, #loader *").height($(this).height() * window.devicePixelRatio);
        // $("#loader, #loader *").width($(this).width() * window.devicePixelRatio);
    }
    
    $("#" + $.cookie()["curTheme"]).addClass("theme-cur");*/
        
    if('darkly' == $.cookie()["curTheme"] || 'dark_blue' == $.cookie()["curTheme"]){
        $("body").css("background-image", "none");
        $("img:not(#donate-money img)").addClass("theme-night");
        $("code,input").addClass("night-cover");
        $(".badge,.btn,.comment-default-block,.thumbs_button,.reward_button").addClass("night-cover");
        $("#card-side-ad-1,#card-side-ad-2,#content-ad,#comment").addClass("night-cover");
    }else{
        if($.cookie("body-background-image")){
            $("body").css("background-image", $.cookie("body-background-image"));
        }
        $("img").removeClass("theme-night");
        $("code,input").removeClass("night-cover");
        $(".badge,.btn,.comment-default-block").removeClass("night-cover");
        $("#card-side-ad-1,#card-side-ad-2,#content-ad,#comment").removeClass("night-cover");
    }
    
    // 点击切换主题（重新加载页面）
    $(".theme").click(function(e){
        // $("body").addClass('no-scroll');
        var changeTheme = $(e.target).attr("id");
        if(changeTheme == $.cookie()["curTheme"]){
            return;
        }else{
            $.cookie("curTheme", changeTheme, {path: "/"});
            window.location.reload();
            /*if('darkly' == changeTheme || 'dark_blue' == changeTheme){
                $("img").addClass("theme-night");
                $("body").css("background-image", "none");
                $("code,input").addClass("night-cover");
                $(".badge,.btn,.comment-default-block").addClass("night-cover");
                $("#card-side-ad-1,#card-side-ad-2,#content-ad,#comment").addClass("night-cover");
            }else{
                $("img").removeClass("theme-night");
                if($.cookie("body-background-image")){
                    $("body").css("background-image", $.cookie("body-background-image"));
                }
                $("code,input").removeClass("night-cover");
                $(".badge,.btn,.comment-default-block").removeClass("night-cover");
                $("#card-side-ad-1,#card-side-ad-2,#content-ad,#comment").removeClass("night-cover");
            }
            
            $("#loader").offset({top:$(window).scrollTop(), left:0});
            if(device.mobile()){
                $("#loader .l_main").offset({top:$(window).scrollTop() + mainTop, left: mainLeft});
            }*/
            
            
            // 这个setTimeout让loader展示出来
            /*setTimeout(function(){
                if($("#" + $.cookie()["curTheme"]) && $("#link-" + $.cookie()["curTheme"])){
                    $("#link-" + $.cookie()["curTheme"]).remove();
                }
                $("#theme-css").attr("href", "/templates/calmlog_ex/bootstrap/css/theme/bootstrap." + changeTheme + ".min.css");
                $("#" + $.cookie()["curTheme"]).removeClass("theme-cur");
                $("#" + changeTheme).addClass("theme-cur");
                $.cookie("curTheme", changeTheme, {path: "/"});
                
                if($("#cke_1_top") && $("#cke_1_top").length > 0){
                    if($.cookie("curTheme") != 'dark_blue'){
                        var bgColor = $(".bg-light").css("background-color");
                        $("#cke_1_top,#cke_1_bottom").css("background-color", bgColor);
                        $(".cke_wysiwyg_frame")[0].contentWindow.document.body.style.backgroundColor = bgColor;
                    }else{
                        $("#cke_1_top,#cke_1_bottom").css("background-color", '#adb5bd');
                        $(".cke_wysiwyg_frame")[0].contentWindow.document.body.style.backgroundColor = '#adb5bd';
                    }
                }
                
                // 这个setTimeout在css文件更改并完成渲染后才隐藏loader
                    setTimeout(function(){
                        if($(window).width() == document.body.scrollWidth){
                            console.log($(window).width());
                            console.log(document.body.scrollWidth);
                            console.log('--------------------');
                            $("#loader").offset({top:-5000, left:0});
                            // $("body").removeClass('no-scroll');
                           
                        }else{
                            setTimeout(showNewTheme, 200);
                        }
                     }, 500);
                        
            }, 500);*/
        }
    })
}

function initFont(){
    var fonts = [['PingFang SC', 'PingFang SC'],['Hiragino Sans GB', 'Hiragino Sans GB'],['simsun', 'simsun'],['cursive', 'cursive'],['monospace', 'monospace'],
        ['serif', 'serif'],['sans-serif', 'sans-serif'],['fantasy', 'fantasy'],['Arial', 'Arial'],['Arial Black', 'Arial Black'],['Arial Narrow', 'Arial Narrow'],
        ['Arial Rounded MT Bold', 'Arial Rounded MT Bold'],['Bookman Old Style', 'Bookman Old Style'],['Bradley Hand ITC', 'Bradley Hand ITC'],['Century', 'Century'],
        ['Century Gothic', 'Century Gothic'],['Comic Sans MS', 'Comic Sans MS'],['Courier', 'Courier'],['Courier New', 'Courier New'],['Georgia', 'Georgia'],
        ['Gentium', 'Gentium'],['Impact', 'Impact'],['King', 'King'],['Lucida Console', 'Lucida Console'],['Lalit', 'Lalit'],['Modena', 'Modena'],
        ['Monotype Corsiva', 'Monotype Corsiva'],['Papyrus', 'Papyrus'],['Tahoma', 'Tahoma'],['TeX', 'TeX'],['Times', 'Times'],['Times New Roman', 'Times New Roman'],
        ['Trebuchet MS', 'Trebuchet MS'],['Verdana', 'Verdana'],['Verona', 'Verona'],['LiHei Pro Medium', '儷黑 Pro'],['LiSong Pro Light', '儷宋 Pro'],['BiauKai', '標楷體'],
        ['Apple LiGothic Medium', '蘋果儷中黑'],['Apple LiSung Light', '蘋果儷細宋'],['PMingLiU', '新細明體'],['MingLiU', '細明體'],['DFKai-SB', '標楷體'],['SimHei', '黑体'],
        ['SimSun', '宋体'],['NSimSun', '新宋体'],['FangSong', '仿宋'],['KaiTi', '楷体'],['FangSong_GB2312', '仿宋_GB2312'],['KaiTi_GB2312', '楷体_GB2312'],
        ['Microsoft JhengHei', '微軟正黑體'],['Microsoft YaHei', '微软雅黑体'],['LiSu', '隶书'],['YouYuan', '幼圆'],['STXihei', '华文细黑'],['STKaiti', '华文楷体'],
        ['STSong', '华文宋体'],['STZhongsong', '华文中宋'],['STFangsong', '华文仿宋'],['FZShuTi', '方正舒体'],['FZYaoti', '方正姚体'],['STCaiyun', '华文彩云'],
        ['STHupo', '华文琥珀'],['STLiti', '华文隶书'],['STXingkai', '华文行楷'],['STXinwei', '华文新魏'],['STHeiti', '华文黑体']];
    var detector = new Detector();
   
    for(var i = 0; i < fonts.length; i++){
        if(!detector.detect(fonts[i][0])){
            fonts.splice(i, 1);
            i--;
        }
    }
    
    fonts.unshift([$('html').css('font-family'), '默认字体']);
    
    var fontChange = '';
    var fontSize = $('html').css('font-size');
    for(var i = 0; i < fonts.length; i++){
        fontChange += '<span class="font bg-navy" id="font-' + fonts[i][0].replace(/ /g, '') + '"'
            + ' style="font-family:' + fonts[i][0] + ';font-size:' + fontSize + '" >' + fonts[i][1] + '</span>';
        
    }
    
    if(fontChange){
        var defFont = $.cookie('curFont');
        if(!defFont){
            defFont = fonts[0][0];
            $('body').css('font-family', defFont);
            
            $.cookie("curFont", defFont, {path: "/"});
        }else{
            $('body').css('font-family', defFont.replace(/"/g, ''));
        }
        
        $('#font-settings').html(fontChange);
        // $('#font-settings .font').removeClass('font-cur');
        $('#font-' + defFont.replace(/ |"/g, '')).addClass('font-cur');
        
        $('#font-settings .font').on('click', function(e){
            var curFont = $(this).css('font-family').replace(/"/g, '');;
            $('body').css('font-family', curFont);
            $('#font-settings .font').removeClass('font-cur');
            $('#font-' + curFont.replace(/ /g, '')).addClass('font-cur');
            $.cookie("curFont", curFont, {path: "/"});
        });
    }
}

function initShare(){
    var path = window.location.pathname;
    if((path.startsWith("/article/") || path.startsWith('/product/')) 
        && !path.startsWith("/article/category/") && !path.startsWith('/product/category/')
        && !path.startsWith("/article/search?") && !path.startsWith('/product/search?')){
        $("#share").click(function(){
            $("#shareDiv").show();
        });
        
        $(document).on('click',function(e) {
            if($(e.target).closest('#share').length == 0){
                $("#shareDiv").hide();
            }
            return true;
        });
        
        $("#wechatShareQr").qrcode({
            text: window.location.href, //设置二维码内容
            // render: "table", //设置渲染方式
            render: "canvas",
            width: 148, //设置宽度,默认生成的二维码大小是 256×256
            height: 148, //设置高度
            typeNumber: -1, //计算模式
            background: "#ffffff", //背景颜色
            foreground: "#000000" //前景颜色
        });
    }
}

// 菜单初始化
function menuInit(){
    $("#menu>ul>li").hover(function(){
    	$(this).children("ul").css("display", "block");
    },function(){
    	 $("#menu>ul>li ul").css("display", "none");
    	 $("#menu>ul>li li").each(function(){
    		if($(this).children("a").children("span").text() == "返回上级 <"){
    			$(this).children("a").children("span").text($(this).attr("data-menu"));
    			$(this).children("a").children("i").attr("class", "fa fa-" + $(this).children("a").children("i").attr("data-icon") + " fa-fw");
    		}
    	 });
    });
    $("#menu>ul>li ul>li").click(function(){
    	if($(this).children("a").children("span").text() == "返回上级 <"){
    		$(this).find("ul").slideUp();
    		$(this).children("a").children("span").text($(this).attr("data-menu"));
    		$(this).children("a").children("i").attr("class", "fa fa-" + $(this).children("a").children("i").attr("data-icon") + " fa-fw");
    		$(this).find("li").each(function(){
    			if($(this).children("a").children("span").text() == "返回上级 <"){
    			$(this).children("a").children("span").text($(this).attr("data-menu"));
    		    $(this).children("a").children("i").attr("class", "fa fa-" + $(this).children("a").children("i").attr("data-icon") + " fa-fw");
    		}
    		});
    	}else if($(this).children("ul").length){
    		$(this).children("ul").css("display", "block");
    		$(this).children("a").children("span").text("返回上级 <");
    		$(this).children("a").children("i").attr("class", "fa fa-reply fa-fw");
    		//$(this).closest("ul").css("display", "none");
    	}else{
    		if($(this).children("a").attr("target") == "_blank"){
    			   window.open($(this).children("a").attr("href"));
    		}else{
    				window.location.href = $(this).children("a").attr("href");
    		}
    	}
    	return false;
    });
}

/*//鼠标点击特效初始化
function clickInit(){
    //鼠标点击特效
    //给页面创建点击事件
    $("html").click(function (e) {

        var winW = $(document).width();
        //创建元素; 创建的元素是span元素,这个元素的内容是随机二进制数
        var bin = $("<span style='display:none;font-weight: bold'>").text(Math.floor((Math.random() * 256)).toString(2));
        //在页面上添加span元素
        $("#bin").append(bin);
        
        //获取鼠标点击坐标
        var px = e.pageX;
        var py = e.pageY;

        //给span元素添加css样式
        bin.css({
            "z-index": 999, //设置或获取定位对象的堆叠次序(z-index):999
            "top": py - 20, //上(top):y-20
            "left": px, //左:x
            "position": "absolute", //定位:绝对定位
            "color": '#' + Math.floor( Math.random() * 0xffffff ).toString(16), //随机颜色
            "user-select": "none", //使文字不被选中
            "width": bin.width() + px + 3 > winW ? winW - px - 3 : bin.width(),//下面三个防止内容撑开文档宽度
            "display" : "block",
            "overflow": "hidden"
        });

        //
        bin.animate({
                "top": py - 180, //上:y-180 
                "opacity": 0 //透明度(opacity):0 
            }, 2000, //1500,调节动画速度 
            function () { //回调函数 
                bin.remove(); //删除
            }
        );

    });
}
*/

// 返回顶部初始化
function initTop(){
    if($(document).scrollTop() > 50){
        $("#top").show();
    }
    // 手机端使用body，电脑端使用html
    $("#top").click(function(){
        $("html,body").animate({
           "scrollTop": 0 
        }, 1000);
    });
    
    $(document).scroll(function() {
        var scroH = $(document).scrollTop();  //滚动高度
        // var viewH = $(window).height();  //可见高度 
        // var contentH = $(document).height();  //内容高度
 
        if(scroH > 50){  //距离顶部大于100px时
            $("#top").show();
        }else{
            $("#top").hide();
        }
        /*if (contentH - (scroH + viewH) <= 100){  //距离底部高度小于100px
             
        }  
        if (contentH = (scroH + viewH)){  //滚动条滑到底部啦
             
        }  */
 
    });
}

moveScrollTo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
index = 0;
moveSize = 0;
touchtime = new Date().getTime();
// 双击定位初始化
function moveInit(){
    if(device.mobile()){
        $("html").on("click", function(){
            if( new Date().getTime() - touchtime < 500 ){
                dblClickCall();
            }else{
                touchtime = new Date().getTime();
            }
        });
    }else{
        $("html").dblclick(dblClickCall);
    }
    
    $("#movePre").click(function(){
        if(index > 0){
            index--;
            $("html,body").animate({
               scrollTop: moveScrollTo[index] 
            }, 1000);
            
            $("#movePost").css({"cursor": "pointer"});
            if(index == 0){
                $("#movePre").css({"cursor": "not-allowed"});
            }
        }
    });
    $("#movePost").click(function(){
        if(index < moveSize - 1){
            index++;
            $("html,body").animate({
               scrollTop: moveScrollTo[index] 
            }, 1000);
        
            $("#movePre").css({"cursor": "pointer"});
            if(index == moveSize - 1){
                $("#movePost").css({"cursor": "not-allowed"});
            }
        }
    });
    $("#moveCur").click(function(){
        if(0 < moveSize){
            $("html,body").animate({
               scrollTop: moveScrollTo[0] 
            }, 1000);
            index = 0;
            $("#movePre").css({"cursor": "not-allowed"});
            if(moveSize > 1){
                $("#movePost").css({"cursor": "pointer"});
            }
        }
    });
}

function dblClickCall(){
    moveScrollTo.unshift($("html").scrollTop() || $("body").scrollTop());
    if(moveSize < 10){
        moveSize++;
    }
    $("#moveCur").css({"cursor": "pointer"});
    if(moveSize > 1){
        $("#movePost").css({"cursor": "pointer"});
    }
}

function browserType(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("MSIE") > -1 || !!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE";
    }; //判断是否IE浏览器
    
    return "UNKNOWN";
}

// 辅助类
String.prototype.startsWith=function(str){
    var reg=new RegExp("^"+str);
    return reg.test(this);
}

String.prototype.endsWith=function(str){
    var reg=new RegExp(str+"$");
    return reg.test(this);
}