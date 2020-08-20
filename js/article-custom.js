//article-custom.js
init();

function init(){
    $(function(){
       initMainContent();
       initTitle();
       initComment();
       initDonate();
       initThumbUp();
    });
}

function initThumbUp(){
    $.post('/admin/addon/commonapi/queryThumbUp',
        {articleId: $("#articleId").val()},
        function(data){
            if(data && data.thumbUpNum){
                $("#thumbUpNum").text(data.thumbUpNum);
            }
        },
        'json'
    );
    
    $('#thumbUp').on('click', function(e){
        $.post('/admin/addon/commonapi/incThumbUp',
        {
            articleId: $("#articleId").val(),
            userId: $("#userId").val()
        },
        function(data){
            var code = data.code;
            if(code == 0){
                $("#thumbUpNum").text(parseInt($("#thumbUpNum").text()) + 1);
            }else if(code == 1){
                toastr.error("你已经点过赞了");
            }else if(code == 2){
                toastr.error("今天匿名点赞次数超过上限了");
            }
        },
        'json'
    );
    });
    
}

function initDonate(){
    $(".reward_button").hover(function(){
       $("#donate-money").fadeIn('normal'); 
    }, function(){
        $("#donate-money").fadeOut('normal');
    });
}

function initComment(){
    initCkEdtior('editor1', 300);
    initCommentComponent();
}

function initCommentComponent() {

    $('#jpress-comment-form').on('submit', function () {
		if (typeof (CKEDITOR) != "undefined") {
            for (instance in CKEDITOR.instances) {
                CKEDITOR.instances[instance].updateElement();
            }
        }
		
        $(this).ajaxSubmit({
            type: "post",
            success: function (data) {
                if (data.state == "ok") {

                    $('#comment-pid').val("");
                    $('#comment-captcha').val("");
                    $('#comment-vcode').click();

                    if (data.html){
                        var reg1 = eval($("<div>").text("/(<p>.*?<\\/p>)|(<blockquote>.*<\\/blockquote>)/g").html());
                        var reg2 = /class=(\"toReplyComment\">回复<\/a>)/;
                        if ($(".comment-page > div:first-child").length > 0){
                            $(".comment-page > div:first-child").before(data.html.replace(reg1, function(comment){
                                    return $("<div>").html(comment).text();
                                }).replace(reg2, function(reply){
                                    return "class=\"text-light toReplyComment badge badge-pill badge-primary\"><i class='fa fa-reply' />回复</a>";
                                }));
                        }else {
                            $(".comment-page").html(data.html.replace(reg1, function(comment){
                                    return $("<div>").html(comment).text();
                                }).replace(reg2, function(reply){
                                    return "class=\"text-light toReplyComment badge badge-pill badge-primary\"><i class='fa fa-reply' />回复</a>";
                                }));
                        }
                        //$('.comment-textarea textarea').val('');
                        CKEDITOR.instances.editor1.setData('');
                        
                        $(".comment-page > div:first-child").trigger("create");
                        initCommnetContent();
                    }else {
                        toastr.success('发布评论成功');
                        location.reload();
                    }
                    
                }
                //评论失败
                else {
                    toastr.error('评论失败：' + data.message);

                    //用户未登录
                    if (data.errorCode == 9 && data.gotoUrl) {
                        location.href = data.gotoUrl;
                    }
                    //验证码错误
                    else if (data.errorCode == 2){
                        $('#comment-vcode').click();
                        $('#comment-captcha').val("");
                        $('#comment-captcha').focus();
                    }
                    //其他
                    else {
                        $('#comment-vcode').click();
                        $('#comment-captcha').val("");
                        $('.comment-textarea textarea').val('');
                        $('.comment-textarea textarea').focus();
                    }
                }
            },
            error: function () {
                toastr.error("网络错误，请稍后重试");
            }
        });
        return false;
    });
    
    $(".comment-reply-btn a").each(function(){
       var self = this;
       $(self).addClass("text-light badge badge-pill badge-primary");
       $(self).html("<i class='fa fa-reply' />回复");
    });
    
    $(".comment-content").each(function(){
        var self = this;
        $(self).html($(self).text());
        $(self).show();
    })
    
    initCommnetContent();

    $('body').on('click','.toReplyComment', function () {
        $('#comment-pid').val($(this).attr('data-cid'));
        CKEDITOR.instances.editor1.setData('回复 @' + $(this).attr('data-author') + " ：");
        CKEDITOR.instances.editor1.focus();
        scrollToComment();
        //$('.comment-textarea textarea').val('回复 @' + $(this).attr('data-author') + " ：");
        //$('.comment-textarea textarea').focus();
    });

}

function scrollToComment(){
    $("html").animate({
    scrollTop: $('.comment-default-block').offset().top
})
}

function initCkEdtior(editor, height) {
    CKEDITOR.config.toolbar =
        [
            ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat'],
            ['Blockquote', 'CodeSnippet', /*'Image', 'Html5audio', 'Html5video', 'Flash',*/ 'Table', 'HorizontalRule'],
            ['Link', 'Unlink'/*, 'Anchor'*/],
            ['Outdent', 'Indent'],
            /*['NumberedList', 'BulletedList'],*/
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            '/',
            ['Format', 'FontSize'],
            ['TextColor', 'BGColor'],
            ['Undo', 'Redo'],
            ['Maximize'/*, 'Source'*/]
        ];

    CKEDITOR.config.wordcount = {
        showCharCount: true,
    };

    CKEDITOR.config.disallowedContent = 'img{width,height};img[width,height]';
    // var bgColor = $(".bg-light").css("background-color");
    // CKEDITOR.addCss('.cke_editable{background-color: ' + bgColor + '}');
    var ed = CKEDITOR.replace(editor, {
        autoUpdateElement: true,
        removePlugins: 'easyimage,cloudservices',
        extraPlugins: 'entities,codesnippet,uploadimage,flash,image,wordcount,notification,html5audio,html5video,widget,widgetselection,clipboard,lineutils',
        codeSnippet_theme: 'monokai_sublime',
        height: height,
        uploadUrl: '/commons/ckeditor/upload',
        imageUploadUrl: '/commons/ckeditor/upload',
        filebrowserUploadUrl: '/commons/ckeditor/upload',
        filebrowserBrowseUrl: '/admin/attachment/browse',
        language: 'zh-cn'
    });

    ed.on('instanceReady', function () {
        ed.setKeystroke(CKEDITOR.ALT.CTRL + 83, 'save'); //  Ctrl+s
        ed.setKeystroke(1114195, 'save'); // mac command +s
        // 扩展CKEditor的 ctrl + s 保存命令,方便全屏编辑时快捷保存
        ed.addCommand('save', {
            exec: function () {
                var ds = window.doSubmit;
                ds && ds();
            }
        });
        
        if($.cookie("curTheme") != 'dark_blue'){
            var bgColor = $(".bg-light").css("background-color");
            $("#cke_1_top,#cke_1_bottom").css("background-color", "bgColor");
            $(".cke_wysiwyg_frame")[0].contentWindow.document.body.style.backgroundColor = bgColor;
        }else{
            $("#cke_1_top,#cke_1_bottom").css("background-color", "rgb(128,128,128)");
            $(".cke_wysiwyg_frame")[0].contentWindow.document.body.style.backgroundColor = "rgb(128,128,128)";
        }
        
    });



    ed.on("dialogShow", function (event) {
        // 方便调试
        _dialogShowEvent = event;

        var infoEle = event.data.getContentElement("info", "browse");
        if (infoEle) infoEle.removeAllListeners();

        var linkEle = event.data.getContentElement("Link", "browse");
        if (linkEle) linkEle.removeAllListeners();

        $(".cke_dialog_ui_button").each(function () {
            if ("浏览服务器" == $(this).text()) {
                $(this).off("click");
                $(this).on("click", function (e) {
                    e.stopPropagation();
                    openlayer(event);
                    return false;
                })
            } else {
                $(this).off("click");
            }
        })

    });

    return ed;
}

function initTitle(){
    var toc = $("#toc").tocify({context:".cl-artical",selectors:"h2,h3,h4,h5",theme:"bootstrap",extendPage:false});
    
    if(toc[0].getElementsByTagName("li") && toc[0].getElementsByTagName("li").length > 0){
        $("#catalog-icon").show();
        $("#catalog-icon").click(function(){
            $("#catalog-wrapper").toggleClass("catalog-hide"); 
            $("#catalog-wrapper").toggleClass("catalog-show");
        });
    }else{
        $("#catalog").remove();
    }
}

function initMainContent(){
    // 取消a中的img的链接
    if($(".cl-artical a>img")){
        $(".cl-artical a>img").parent().attr("href", "##");
    }
    
    if($(".cl-artical img")){
        $(".cl-artical img").zoomify();
    }
    
    if($(".cl-artical blockquote,.comment-content blockquote") && $(".cl-artical blockquote,.comment-content blockquote").length > 0){
        $(".cl-artical blockquote,.comment-content blockquote").css({"border-left-width": "4px", "border-left-style": "solid"});
        $(".cl-artical blockquote,.comment-content blockquote").addClass("border-primary break-all");
    }
    
    if($(".cl-artical table tr td").length){
        $(".cl-artical table tr td,.cl-artical table tr th").addClass("border border-secendary");
    }
}

function initCommnetContent(){
    if($(".comment-item blockquote") && $(".cl-artical blockquote,.comment-content blockquote").length > 0){
        $(".comment-item blockquote").css({"border-left-width": "4px", "border-left-style": "solid"});
        $(".comment-item blockquote").addClass("border-primary");
    }
}