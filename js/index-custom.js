function initOneSentence(){
    var browser = browserType();
    if("IE" != browser){
        if($("#oneSentence") && $("#oneSentence").length){
            if(device.mobile()){
                $("#oneSentence").css({"height": "140"});
                // 手机端暂时不能生成图片
                $("#oneSentence-capture").remove();
            }else{
                $("#oneSentence").css({"height": "120"});
            }
            $("body").append("<script src='" + tPath + "js/plugin/oneSentence/moment.min.js' type='text/javascript'></script>");
            $("body").append("<script src='" + tPath + "js/plugin/oneSentence/oneSentence.js' type='text/javascript'></script>");
            
            initSentence();
            initType();
        }
    }else{
        $("#card-oneSentence").remove();
    }
}