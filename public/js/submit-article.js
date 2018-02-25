$(function () {
    editor = new wangEditor("#div1", "#div2");
    editor.customConfig.zIndex = 10000;
    editor.customConfig.uploadImgServer = '/upload_photo';
    editor.customConfig.uploadFileName = 'photo';
    editor.customConfig.uploadImgHeaders = {
        'Accept': 'text/json'
    };
    editor.customConfig.uploadImgHooks = {
        success: function (xhr, editor, result) {
            console.log("图片上传成功!!!");
        },
        customInsert: function (insertImg, result, editor) {
            var urls = result.urls;
            console.log(urls);
            urls.forEach(function (url) {
                insertImg(url);
            })
        }
    };

    editor.create();

    //    $('.w-e-panel-container').addClass('fixed-panel')

    $(document).on("scroll", function (e) {
        if ($(document).scrollTop() > $("#my-nav").height() + 10) {
            $(".toolbar").addClass("isfixed");
        } else {
            $(".toolbar").removeClass("isfixed");
        }
    });

    // $("form").on("submit", function (e) {
    //     var article_html = editor.txt.html() // 获取html形式的文章数据
    //     var article_json = editor.txt.getJSON() // 获取json形式的文章数据
    //     var article = {
    //         html: article_html,
    //         json: article_json
    //     }
    //     $("#article-body").val(JSON.stringify(article))
    // })
    $('form').on('submit', function (e){
        var body = editor.txt.html();
        $('#article-body').val(body);
    });
})