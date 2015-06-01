/*
20141126 by moff.inc
*/

$(function() {
	var timer = false;
	$(window).resize(function() {
	    if (timer !== false) {
	        clearTimeout(timer);
	    }
	    timer = setTimeout(function() {
			topContentBoxMargin();
	    }, 700);
	});
});

function topContentBoxMargin(){
	var liw = 300; // $('ul#rssArticle').width() + $('ul#rssArticle').css('martingRight');
	var bm = 30;//Base margin = $('div.topContentsBox').css('marginLeft');
	var w = $('.rap').width() - (bm*2) - $('section#informationBox').width() ;
	var m = Math.floor((w%liw)/2);
	var mL = m + bm;
	var mR = m + bm;
	var speed = 400;// m sec
	//$('.topContentsBox h2').html('<p style="position:absolute;z-index:100;top:0;left:100px">topContentsBox' + w+ ' /liw ' + liw + ' /m ' + m + ' /mL ' + mL + ' /mR ' + mR + '</p>' );
	//$('div.rap').css('border','solid thin red');
	if( $(window).width() > 650 ){
		//$('.topContentsBox h2').html('<p style="position:absolute;z-index:100;top:0;left:100px">window' + $(window).width());
	//$('div.rap').css('border','solid thin red');
		$('div.topContentsBox').animate({'marginLeft': mL },speed , 'easeOutElastic');
		$('section#informationBox').animate({'right': mR },speed , 'easeOutElastic');
	}
}

