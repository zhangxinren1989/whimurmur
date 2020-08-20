//product-custom.js
init();

function init(){
    $(function(){
        initMainContent();
    });
}

function initMainContent(){
    // 取消a中的img的链接
    if($(".cl-artical a>img")){
        $(".cl-artical a>img").parent().attr("href", "##");
    }
    
    if($(".cl-artical img")){
        $(".cl-artical img").zoomify();
    }
    
    if($(".cl-artical blockquote")){
        $(".cl-artical blockquote").css({"border-left-width": "4px", "border-left-style": "solid"});
        $(".cl-artical blockquote").addClass("border-primary");
    }
}