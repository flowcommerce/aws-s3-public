
(function ($) {
    // MENU HAMBURGUER ANIMATION --------------------------------
    $('.hamburger-container').click(function () {
        $('#hamburger').toggleClass('open');
        $('#hamburger-content').toggleClass('nav-open');
        $('header').toggleClass('nav-open');
    });




    // Cache selectors
    var lastId,
        topMenu = $(".ancor"),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {

        var href = $(this).attr("href")
            //offsetTop = href === "#" ? 0 : $(href).offset().top+2;  
        $('html, body').stop().animate({
            scrollTop: href === "#" ? 0 : $(href).offset().top - 58
        }, 1500);

        e.preventDefault();
    });


// MAIN MENU ANIMATION
    // Menu change
    var nav = $('header');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 136) {
            nav.addClass("active");
        } else {
            nav.removeClass("active");
        }
    });





    if(screen.width < 1025){
		//Código para setar o Height em 100% fixVH IOSproblem
		var bg = $("#hero");
		
		function resizeBackground() {
		bg.height($(window).height());
	}

	$(window).resize(resizeBackground);
	resizeBackground();
		
}


	
    $(window).scroll(function () {
    	if ($(this).scrollTop() > 0) {
    		$('.pie_progress').asPieProgress('start');
    	}
    });
	


    $('.pie_progress').asPieProgress({
    	namespace: 'pie_progress',
    	min: 0,
    	max: 100,
    	goal: 100,
    	speed: 30, // speed of 1/100
    	barcolor: '#000',
    	barsize: '15',
    	trackcolor: '#f2f2f2',
    	fillcolor: 'none',
    	easing: 'ease',
    	numberCallback(n) {
    		'use strict';
    		const percentage = Math.round(this.getPercentage(n));
    		return `${percentage}<i class="icon1">%</i><i class="icon2">+</i><i class="icon3">8</i>`;
    	},
    	contentCallback: null
    });
	
	$("path").attr('stroke', 'url(#grad)');


    //Plugin activation
    $(window).enllax();

	//Parallax
    $('.parallax').parallax();
	
	// MENU HAMBURGUER ANIMATION --------------------------------
    $('#id-landed').click(function () {
        $('.a-landed').trigger('click');
    });
    $('#id-pay').click(function () {
        $('.a-pay').trigger('click');
    });
    $('#id-ord').click(function () {
        $('.a-ord').trigger('click');
    });
	
	//Tabs
    $('.tabs').tabs();
	
	
	
	$(document).ready(function(){
    $('.collapsible').collapsible();
  });
	
})(jQuery);


