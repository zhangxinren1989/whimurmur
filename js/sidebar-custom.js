// 热词
ckHotWords = "";
ckHotWordsEn = "";

initSidebar();

function initSidebar(){
    $(document).ready(function(){
       if($("#card-tag").length){
           labelInit();
       }
       if($("#card-search").length){
           initSearchPage();
       }
       if($("#card-hotWord").length){
           showHotWord();
             // 换一换热词
            $("#card-hotWord").on("click", '#hotword-change', function(e){
                $("#hotWord>.card-header").fadeOut(200);
                $("#hotWord>.card-body>.card-text").fadeOut(200, showHotWord);
                // $("#hotWord>.card-header").fadeIn();
                // $("#hotWord>.card-body>.card-text").fadeIn();
            });
       }
       
       if($(".tagcloud").length){
           /*标签云*/
            tagcloud({
                selector: ".tagcloud",  //元素选择器
                fontsize: 16,       //基本字体大小, 单位px
                mspeed: "slow",   //滚动最大速度, 取值: slow, normal(默认), fast
                ispeed: "slow",   //滚动初速度, 取值: slow, normal(默认), fast
                direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
                keep: false          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
            });
       }
       
       if($('#card-archive').length){
           articleArchiveInit();
       }
       
    });
}

// 文章时间线
function articleArchiveInit(){
    $.post('/admin/addon/commonapi/queryArticleArchive',
        null,
        function(data){
            // console.log("articleArchive: " + JSON.stringify(data));
            if(data){
                if(data.selfArticleMonthly){
                    for(var key in data.selfArticleMonthly){
                        $('#selfArticleArchive tbody').append('<tr><td>' + key + '</td><td>'
                        + '<a href="/article/ex/month-' + key + '-artstyleDefault-1">' + data.selfArticleMonthly[key] + '</a>'
                        + '</td></tr>');
                    }
                }
                if(data.selfArticleYearly){
                    for(var key in data.selfArticleYearly){
                        $('#selfArticleArchive .year-article').append(key + '年创作了' 
                        + '<a href="/article/ex/year-' + key + '-artstyleDefault-1">' + data.selfArticleYearly[key] + '</a>'  
                        + '篇文章.<br>');
                    }
                }
                if(data.reprintArticleMonthly){
                    for(var key in data.reprintArticleMonthly){
                        $('#reprintArticleArchive tbody').append('<tr><td>' + key + '</td><td>'
                        + '<a href="/article/ex/month-' + key + '-artstyleReprint-1">' + data.reprintArticleMonthly[key] + '</a>'
                        + '</td></tr>');
                    }
                }
                if(data.reprintArticleYearly){
                    for(var key in data.reprintArticleYearly){
                        $('#reprintArticleArchive .year-article').append(key + '年转载了' 
                        + '<a href="/article/ex/year-' + key + '-artstyleReprint-1">' + data.reprintArticleYearly[key] + '</a>'   
                        + '篇文章.<br>');
                    }
                }
            }
        },
        'json'
    );
}

//标签初始化
function labelInit(){
    var clr;
    $(".label>li>a").each(function(){
        $(this).hover(function(){
            var clr = Math.floor( Math.random() * 0xffffff);
            var c1 = 0x444444;
            var c2 = 0x888888;
            var c3 = 0xcccccc;
            var c4 = 0x1111110;
            var oppoclr;
            if(clr <= c1){
                oppoclr = c3 - clr;
            }else if(clr <= c2){
                oppoclr = c4 - clr;
            }else if(clr <= c3){
                oppoclr = clr - c1;
            }else{
                oppoclr = clr - c2;
            }
            $(this).css("background-color", '#' + clr.toString(16));
            $(this).css("color", '#' + oppoclr.toString(16));
        }, function(){
            //$(this).css("class", 'badge badge-info'); 
        });
       
    });
}

//搜索初始化
function initSearchPage(){
    if(window.find){
        $("#card-page-search").show();
        $("#searchPage,#searchPageAppendix").click(function(){
            var text = $("#pageSearch").val();
            if(text && text.trim()){
                window.find(text.trim(),false,false,true);
            }
        });
    }else{
        $("#card-page-search").remove();
        $("#searchAppendix").remove();
    }
}

// 热词更新
function showHotWord(){
   ckHotWords = $.cookie("ckHotWords");
   ckHotWordsEn = $.cookie("ckHotWordsEn");
   if(!ckHotWords || !ckHotWordsEn){
       initHotWord();
   }else{
       ckHotWords = localStorage.getItem("ckHotWords");
       ckHotWordsEn = localStorage.getItem("ckHotWordsEn");
       if(!ckHotWords || !ckHotWordsEn){
           initHotWord();
       }else{
           var hotWords = ckHotWords.split("--");
           var hotWordsEn = ckHotWordsEn.split("--");
           var rand = Math.floor(Math.random() * hotWords.length);
           $("#hotWord>.card-header").text(hotWords[rand]).fadeIn(500);
           $("#hotWord>.card-body>.card-text").text(hotWordsEn[rand]).fadeIn(500);
       }
   }
   
}

// 初始化热词
function initHotWord(){
    $.ajax({
        async : true,
        // http链接地址：url: 'http://www.qingyu.blue:44333/hotdata/hotwords/realtime'
        url : "https://www.qingyu.blue:4433/hotdata/hotwords/realtime",
        type : "GET",
        dataType : "json", // 返回的数据类型，设置为JSONP方式
        data : null,
        success: function(res, status, xhr){
            if(res && res.code == 0){
               var hotWords = res.data;
               
               if(hotWords && hotWords.length){
                   var rand = Math.floor(Math.random() * hotWords.length);
                   $("#hotWord>.card-header").text(hotWords[rand].keyword).fadeIn(500);
                   $("#hotWord>.card-body>.card-text").text(hotWords[rand].keywordEnglish).fadeIn(500);
                   
                   ckHotWords = "";
                   ckHotWordsEn = "";
                   for(var i = 0; i < hotWords.length; i++){
                       ckHotWords += hotWords[i].keyword;
                       ckHotWordsEn += hotWords[i].keywordEnglish;
                       if(i < hotWords.length - 1){
                           ckHotWords += "--";
                           ckHotWordsEn += "--";
                       }
                   }
                   var expireTime = new Date();
                   expireTime.setTime(expireTime.getTime() + 25 * 60 * 1000);
                   // 数据标识放在cookie中用于自动超时更新，真实数据放在localStorage中，因为数据较大，放在cookie中会传到服务器，可能造成请求头过大错误
                   $.cookie("ckHotWords", "ckHotWords", {path: "/", expires: expireTime});
                   $.cookie("ckHotWordsEn", "ckHotWordsEn", {path: "/", expires: expireTime});
                   localStorage.setItem('ckHotWords', ckHotWords);
                   localStorage.setItem('ckHotWordsEn', ckHotWordsEn);
               }else{
                   console.log('没有错误，但没有获取到数据');
               }
            }else{
               console.log('获取数据出错');
           }
        }
    });
            
    /*$.get(
       "https://www.proprogrammar.com:25611/hotwords/realtime",
       null,
       function(res){
           if(res && res.code == 0){
               var hotWords = res.data;
               
               var rand = Math.floor(Math.random() * hotWords.length);
               $("#hotWord>.card-header").text(hotWords[rand].keyword);
               $("#hotWord>.card-body>.card-text").text(hotWords[rand].keywordEnglish);
               
               ckHotWords = "";
               ckHotWordsEn = "";
               for(var i = 0; i < hotWords.length; i++){
                   ckHotWords += hotWords[i].keyword;
                   ckHotWordsEn += hotWords[i].keywordEnglish;
                   if(i < hotWords.length - 1){
                       ckHotWords += "--";
                       ckHotWordsEn += "--";
                       var now = new Date();
                       now.setTime(now.getTime() + 25 * 60 * 1000);
                       $.cookie("ckHotWords", ckHotWords, {expires: now});
                       $.cookie("ckHotWordsEn", ckHotWordsEn, {expires: now});
                   }
               }
           }
       },
       "jsonp");*/
}
