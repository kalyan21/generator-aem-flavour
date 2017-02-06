$(document).ready(function(){
	var customAutoPlaySpeed = 1000; 
	if($(".slick-carousal").data('autoplayspeed')){
		customAutoPlaySpeed = $(".slick-carousal").data('autoplayspeed');
	}
    $(".slideshow").slick({
        dots: true,
		prevArrow: '<i class="fa fa-angle-left custom-slick-prev" aria-hidden="true"></i>',
		nextArrow: '<i class="fa fa-angle-right custom-slick-next" aria-hidden="true"></i>',
		autoplay: true,
		autoplaySpeed: customAutoPlaySpeed
    });
});
