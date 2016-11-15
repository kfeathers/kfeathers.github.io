$(document).ready(function() {

    // smooth scrolling
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    // when user clicks the burger menu icon toggle menu
    $('.nav-toggle').click(function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('.nav-wrap').toggleClass('open');
    });

    // when user clicks a link
    $('.main-nav li a').click(function() {
        $('.nav-toggle').toggleClass('active');
        $('.nav-wrap').toggleClass('open');
    });

    // fire animated skill bars when scrolling after certain point from top
    $(window).scroll(function() {
        $('.skillbar').each(function() {
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 650) {
                $(this).find('.skillbar-bar').animate({
                    width: $(this).attr('data-percent')
                }, 3000);
            }
        });

    });

});
