$(window).scroll(function(){
    if($(this).scrollTop() > 1)
        {
            $("#main").addClass('shrink');
            $(".headerlink").addClass('shrink');
            $("#logo").addClass('shrink');
        }
    else 
        {
            $("#main").removeClass('shrink');
            $(".headerlink").removeClass('shrink');
            $("#logo").removeClass('shrink');
        }
});