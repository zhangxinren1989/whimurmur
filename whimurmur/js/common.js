function copyText(title, content){
    var textToCopy = new ClipboardJS('#inputCopyUse', {
        text: function() {
            return content;
        }
    });
    
    textToCopy.on('success', function(e) {
        toastr.info(title + '已复制到剪贴板，可以贴粘到别处');
        textToCopy.destroy();
    });

    textToCopy.on('error', function(e) {
        toastr.error(title + '不能复制');
        textToCopy.destroy();
    });
    
    $('#inputCopyUse').trigger('click');
}

function isWindowVisiable(id){
    var ele = $('#' + id);
    var eleTop = ele.offset().top;
    var eleHeight = ele.height();
    var scrollTop = $(window).scrollTop();
    var winHeight = $(window).height();
    
    return eleTop < scrollTop + winHeight && eleTop + eleHeight > scrollTop;
}