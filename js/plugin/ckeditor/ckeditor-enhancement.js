function initWhimurmurEditor(editor, height, type) {
    height = height || 467;
    type = type || 'html'; //默认用ckeditor

    if (type == 'html') {
        return initWhimurmurCkEdtior(editor, height);
    } else if (type == 'markdown') {
        return initWhimurmurMarkdownEditor(editor, height);
    }
}

function initWhimurmurCkEdtior(editor, height) {
    CKEDITOR.config.toolbar =
        [
            ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat'],
            ['Blockquote', 'CodeSnippet', 'Image', 'Html5audio', 'Html5video', 'Flash', 'Table', 'HorizontalRule'],
            ['Link', 'Unlink', 'Anchor'],
            ['Outdent', 'Indent'],
            ['NumberedList', 'BulletedList'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            '/',
            ['Format', 'FontSize'],
            ['TextColor', 'BGColor'],
            ['Undo', 'Redo'],
            ['Maximize', 'Source'],
            ['reprintInfo']
        ];

    CKEDITOR.config.wordcount = {
        showCharCount: true,
    };

    CKEDITOR.config.disallowedContent = 'img{width,height};img[width,height]';
    CKEDITOR.addCss('.cke_editable img{max-width: 95%;}');

    var ed = CKEDITOR.replace(editor, {
        autoUpdateElement: true,
        removePlugins: 'easyimage,cloudservices',
        extraPlugins: 'entities,codesnippet,uploadimage,flash,image,wordcount,notification,html5audio,html5video,widget,widgetselection,clipboard,lineutils,reprintInfo',
        codeSnippet_theme: 'monokai_sublime',
        height: height,
        uploadUrl: jpress.cpath + '/commons/ckeditor/upload',
        imageUploadUrl: jpress.cpath + '/commons/ckeditor/upload',
        filebrowserUploadUrl: jpress.cpath + '/commons/ckeditor/upload',
        filebrowserBrowseUrl: jpress.cpath + '/admin/attachment/browse',
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

function initWhimurmurMarkdownEditor(editor, height) {
    var simpleMDE = new SimpleMDE({
        element: $(editor)[0],
        autoDownloadFontAwesome: false,
        spellChecker: false,
        styleSelectedText: false,
        forceSync: true,
        renderingConfig: {
            codeSyntaxHighlighting: true
        },
        toolbar: [
            "heading", "bold", "italic", "|"
            , "quote", "unordered-list", "ordered-list", "|"
            , "code", "table", "horizontal-rule", "|"
            , "link", {
                name: "image",
                action: function customFunction(editor) {
                    openlayerBySimplemde(editor);
                },
                className: "fa fa-picture-o",
                title: "插入图片",
            }, "|"
            , "preview", "side-by-side", "fullscreen"
        ]

    });
    // 设置markdown编辑器滚动条高度
    $('.CodeMirror-scroll').css({
        "min-height": height
    });
    return simpleMDE;
}