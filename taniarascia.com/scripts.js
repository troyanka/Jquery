$(document).ready(function(){
    // *** ACCORDION ***
    $('.accordion-header').click(function(){
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    });

    // *** TABS ***
    $('.tab-list').on('click', '.tab', function(e){
        $('a.active').removeClass('active');
        $('div.show').removeClass('show');
        $($(this).attr('href')).addClass('show');
        $(this).addClass('active');
    });

    // *** DROPDOWN ***
    $('.dropdownNav ul li a').click(function(e){
        var hasDropdown = $(this).siblings().is('.dropdown');
        if(hasDropdown){
            $(this).next().slideToggle();
        }
        //e.stopPropagation();
    });

    // *** MODAL ***
    $('.open-modal').click(function(){
        $('.modal').css('display', 'block');
        $('.overlay').addClass('active');
    });
    $('.close-modal').click(function(){
        $('.modal').css('display', 'none');
        $('.overlay').removeClass('active');
    });
});
