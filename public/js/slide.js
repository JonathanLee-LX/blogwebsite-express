$(function(){
  $(".carousel").carousel({
    interval:3000,
    pause:"hover",
    wrap:true,
    keyboard:true
  })

  $("#carousel-example-generic").on('slide.bs.carousel',function(e){
  })
  $("#go").on('click',function(e){
    e.preventDefault()
    var $pageNum=$("#page-number").val()-1
    $(".carousel").carousel($pageNum)
  })
  $(document).on("scroll",function(e){
    if($(document).scrollTop()>100){
      $('.navbar-inverse').addClass("scrolling")
      //$("#my-nav").addClass("navbar-fixed-top")
    }else {
      $('.navbar-inverse').removeClass("scrolling")
      //$("#my-nav").removeClass("navbar-fixed-top")
    }
  })
})
