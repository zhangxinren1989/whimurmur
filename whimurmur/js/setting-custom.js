$(function(){
    $(".night-theme-time").datetimepicker({
        format: 'HH:mm'
    });
    initSlideSetting();
    // checkUpgrade();
    
    document.onkeydown = function keydown(e)
    {
         e = e||event;console.log(e.keyCode + " " + e.target.tagName.toLowerCase());
         if(e.keyCode==13 && e.target.tagName.toLowerCase() != 'textarea')
         {
             $('button[type=submit]').trigger('click');
             e.stopPropagation();
             e.cancellBubble = true;
         }
         
    }
});

function upgradeVersion(versionCode){
    var closeLayer = layer.load(1, {shade: [0.5, '#000']});
    $.post('',
        {versionCode: versionCode},
        function(data){
            layer.close(closeLayer);
            
            if(data.updateCode == 0){
                toastr.info('升级成功, 3秒后重载页面',null,{timeOut: 3000});
                setTimeout(function(){
                    window.location.reload();
                }, 3000);
            }else{
                toastr.error('升级失败，原因：' + data.msg);
            }
        },
        'json'
    );
}

function checkUpgrade(curVersion){
    $.post('',
        {curVersion: curVersion},
        function(data){
            if(data.versionAvai){
                $('#updateAvai').show();
            }
        },
        'json'
    );
}

function initSlideSetting(){
    var slideData = $("#whimurmur_slides").val();
    $.each(slideData.split('\n'), function(i, item){
        $("#slide-added").append("<div class='slide col-sm-12' style='margin-bottom: 10px;'><div class='col-sm-10'>"
           + "<input type='input' class='form-control slide-data' value='" + item + "' disabled></div>"
           + "<span class='remove-slide col-sm-2' style='cursor: pointer'>&nbsp;<i class='fa fa-minus-square-o fa-fw fa-2x'></i></span></div>");
    });
    
    $("#add-slide").click(function(e){
       if(!$("#whimurmur_slide_img_input").val()){
           toastr.error('没有选择图片，不能增加幻灯片！');
           return;
       }
       
       var imgUrl = $("#whimurmur_slide_img_input").val();
       var slideUrl = $("#whimurmur_slide_url").val();
       var slidetitle = $("#whimurmur_slide_title").val();
       $("#slide-added").append("<div class='slide col-sm-12' style='margin-bottom: 10px;'><div class='col-sm-10'>"
           + "<input type='input' class='form-control slide-data' value='" + imgUrl + '|' + slideUrl + '|' + slidetitle + "' disabled></div>"
           + "<span class='remove-slide col-sm-2' style='cursor: pointer'>&nbsp;<i class='fa fa-minus-square-o fa-fw fa-2x'></i></span></div>");
        buildSlideData();
        toastr.success('增加幻灯片成功！')
    });
    
    $("#slide-added").on('click', ".remove-slide", function(e){
        $(e.target).parents(".slide").remove();
        buildSlideData();
        toastr.success('删除幻灯片成功！')
    });
}

function buildSlideData(){
    var slides = $(".slide-data");
    var slideData = '';
    if(slides && slides.length > 0){
        $.each(slides, function(i, item){
           slideData += $(item).val();
           if(i != slides.length - 1){
               slideData += "\n";
           }
        });
        
        $("#whimurmur_slides").val(slideData);
    }
}