// 使用ajax来获取新内容
$(function(){
  $(".load-more").on('click', function(e){
    $load()
  });

  $(document).on('scroll', function (e){
    if($(this).height() - $(this).scrollTop() === $(window).height())
      $load();
  })

  // 分页加载，page记录当前第几页
  var page = 1;
  var $load = function (){
    $.ajax({
      url: '/load-more',
      method: 'GET',
      data: {
        msg: true,
        page: page
      },
      success: function (data) {
        if(data.end){
          $('.info').remove();
          var $info = $('<strong class=\"info\">已经到底了...</strong>');
          return  $info.appendTo('#article-list').delay(3000).fadeOut(500);
        }
        $("#article-list").append(data);
        page++;
      },
      error: function (xhr, status, error) {
        console.log(error.stack)
      }
    })
  }
  // 载入页面的时候进行加载
  $load();
})
