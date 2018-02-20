$(function (){
    $(document).on("scroll", _.debounce(function(e){
        if($(document).scrollTop() > 2*$("#my-nav").height()){
            $("#my-nav").addClass("navbar-fixed-top").fadeIn(300);
        }else{
            $("#my-nav").removeClass("navbar-fixed-top")
        }
    }, 300, {'maxWait': 1200}))
})
