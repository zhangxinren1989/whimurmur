
var reprintInfo = {
        exec: function(editor) {
                editor.insertHtml('<blockquote>\
            <p>作者：</p>\
            <p>链接：</p>\
            <p>来源：</p>\
            </blockquote>\
            <hr>\
            <br>');
        }
    };
    var cmmd = 'reprintInfo';
CKEDITOR.plugins.add(cmmd, {
    init: function(editor) {
        editor.addCommand(cmmd, reprintInfo);
        editor.ui.addButton('reprintInfo', {
            label: '转载信息',
            icon: 'plugins/reprintInfo/images/reprint.png',
            command: cmmd
        });
    }
});