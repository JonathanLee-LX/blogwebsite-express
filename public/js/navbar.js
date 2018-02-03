$(function (){
    $(document).on("scroll", function(e){
        if($(document).scrollTop() > 2*$("#my-nav").height()){
            $("#my-nav").addClass("navbar-fixed-top")
        }else{
            $("#my-nav").removeClass("navbar-fixed-top")
        }
    })
})
