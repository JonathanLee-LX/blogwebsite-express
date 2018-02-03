$(document).ready(function(){
    $('form').on('submit', function(e){
        e.preventDefault()
        $(".loading").fadeIn(100)
        $("#login-btn").val("正在登录...").attr("disabled", "disabled")
        var username = $('#username').val()
        var password = $('#password').val()
        var user ={
            username: username,
            password: password
        }
        $.ajax({
            url: '/login',
            cache: false,
            data: user,
            method: 'post',
            success: function(msg, statuText) {
                // 登录成功， 跳转到主页
                window.location.href = msg.url
            },
            error: function(xhr, textStatus, error) {
                //登录失败，显示错误信息
                $('.info span').text("用户名或者密码错误!").fadeIn().delay(3000).fadeOut()
            },
            complete: function (){
                $("#login-btn").removeAttr("disabled")
                $(".loading").fadeOut()
            }
        })
    })

// 监听close-icon的点击事件
    $('.close-icon').on('click', function(){
        $('.login-page').fadeOut()
    })
})
