// 使用ajax来获取新内容
$(function(){
  $(".load-more").on('click', function(e){
    $('.load-more').text('拼命加载中...');
    $load();
  });

  $(document).on('scroll', _.debounce(function (e) {
    if ($(this).height() - $(this).scrollTop() === $(window).height())
      $load();
  }, 300, {'maxWait': 1200}))

  var $load = function (){
    var page = 1;
    return function () {
      $.ajax({
        url: '/load-more',
        method: 'GET',
        data: {
          msg: true,
          page: page
        },
        success: function (data) {
          if (data.end) {
            return $('.load-more').text('别刷了,真的没有了...');
          }
          $("#article-list").append(data);
          page++;
        },
        error: function (xhr, status, error) {
          console.log(error.stack)
        }
      })
    }
  }();
  // 载入页面的时候进行加载
  $load();
})
