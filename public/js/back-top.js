$(function (){
  $(document).on('scroll', function (e){
    e.preventDefault();
    if($(this).scrollTop() > 200){
      $('.back-top').show(200);
    }else{
      $('.back-top').hide(200);
    }
  });
  // 返回页面顶部
  $('.back-top').on('click', function (e){
    e.preventDefault();
    $(document).scrollTop(0);
  });
})