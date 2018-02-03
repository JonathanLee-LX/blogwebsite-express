$(document).ready(function(){
    $('form').on('submit', function(e){
        var username = $('#username').val()
        var password = $('#password').val()
        // 进行表单提交前先确认表单是否填写规范

        console.log(nameFlag+':'+pswFlag+':'+isconsistent)
        if(nameFlag && pswFlag && isconsistent){
             //submitForm()
             console.log('success')
        }else{
            e.preventDefault()
        }
    })

    $('#username').on('change', function(e) {
        var username =$(this).val()
        testName(username)
    })

    $('#password').on('change', function(e) {
        testPassWord($(this).val())
    })

    $('#re-password').on('change', function(e) {
        isConsistent()
    })

    // 定义三个标记，分别表示用户名，密码是否正确，还有两次密码是否一致
    var nameFlag, pswFlag, isconsistent

    function testName(username) {
        // 用户名匹配模式
        var namePattern  = /^[0-9a-zA-Z\u0391-\uFFE5]{3,8}$/
        if(!namePattern.test(username)) {
            // 显示错误信息
            $('.name').removeClass('has-success').addClass('has-error').find('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove')
            nameFlag = false
        }else{
            $('.name').removeClass('has-error').addClass('has-success').find('.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok')
            isExist(username)
        }
    }

    // 通过ajax向服务器发起http请求，以确定用户名是否已经存在
    function isExist(username){
        $.ajax({
            url: 'http://localhost:3000/isExist',
            method: 'GET',
            data: {username: username},
            cache: false,
            success: function(result){
                console.log(result.isExist)
                if(result.isExist){
                    // 该用户已经存在，提示用户更换名字,更新提示信息
                    $('.name').removeClass('has-success').addClass('has-error').find('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').next().text(result.info).addClass('error').fadeIn()
                }else{
                    $('.name').find('.check-info').text(result.info).removeClass('error').fadeOut()
                }
                nameFlag = !result.isExist
            },
            error: function (error){
                throw error
            }
        })
    }

    function testPassWord(password){
        // 密码匹配模式
        var pswPattern = /^[0-9a-zA-Z]{6,15}$/
        pswFlag = pswPattern.test(password)
        if(!pswFlag){
            $('.psw').removeClass('has-success').addClass('has-error').find('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').next().text('密码不能少于六位，多于十五位').addClass('error')
        }else{
            $('.psw').removeClass('has-error').addClass('has-success').find('.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok').next().text('').removeClass('error')
        }
        return pswFlag
    }

    function isConsistent(){
        isconsistent= $('#password').val() == $('#re-password').val()
        if(!isconsistent) {
            $('.re-psw').removeClass('has-success').addClass('has-error').find('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove').next().text('两次密码不一致').addClass('error')
        }else{
            $('.re-psw').removeClass('has-error').addClass('has-success').find('.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok').next().text('').removeClass('error')
        }
        return isconsistent
    }

    // 监听close-icon的点击事件
        $('.close-icon').on('click', function(){
            $('.register-page').fadeOut()
        })

})
