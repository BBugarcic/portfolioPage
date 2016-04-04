$("document").ready(function() {

    var $sections = $("section");
    var $nav = $("#navBar");
    var navHeight = $nav.outerHeight();
    var navPosition = $nav.offset().top;

    $(window).on("scroll", function() {
        var currentPosition = $(this).scrollTop();
    
        //add full color to navbar and make navbar fixed-top
        if(currentPosition >= navPosition + 120) {
            $nav.removeClass("navbar-fixed-top").addClass("navbar-fixed-top").addClass("nav-full-color");
            $("body").css("padding-top","70px");

        } else {
            $nav.removeClass("navbar-fixed-top").removeClass("nav-full-color");
            $("body").css("padding-top", "0px");
        }
    
        //change active state of navbar links on scroll
        $sections.each(function() {
            var top = $(this).offset().top - navHeight;
            var bottom = top + $(this).outerHeight();
        
            if(currentPosition >= top && currentPosition <= bottom) {
                $nav.find("a").removeClass("active");
                $sections.removeClass("active");
            
                $(this).addClass("active");
                $nav.find("a[href='#"+$(this).attr('id')+"']").addClass('active');
            }
        });
    });

    // handle click on navbar links
    $nav.find("a").on("click", function () {
        var $element = $(this);
        var $id = $element.attr("href");
    
        $("html, body").animate( {
            scrollTop: $($id).offset().top
        }, 1000);
        
                    $nav.find("a[href='#"+$(this).attr('id')+"']").addClass('active');
    
        return false;
    });

    // handle click on goDown
    $("#goDown").on("click", function() {
        $("html, body").animate({
            scrollTop: $("#about").offset().top
        }, 1000);
        
        return false;
    });

    $("#linkedIn").on("click", function () {
        window.open("https://www.linkedin.com/in/branislav-bugarcic-3146621b", '_blank');
    });
    
    $("#freeCodeCamp").on("click", function() {
       window.open("http://www.freecodecamp.com/bbugarcic", '_blank');
    });
    
    $("#gitHub").on("click", function() {
       window.open("https://github.com/BBugarcic", '_blank'); 
    });
});