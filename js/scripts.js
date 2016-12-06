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
    $('.cheeseburger').click(function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('.nav-wrap').toggleClass('open');
    });

    // fire animated skill bars
    $('.skillbar').each(function() {
        $(this).find('.skillbar-bar').animate({
            width: $(this).attr('data-percent')
        }, 3000);
    });

});
