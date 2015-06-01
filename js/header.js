/*
20141027 make header from Wordpress Contents by moff
Wordpressのヘッダーを、非WPのページで取得表示する。
*/

$(function(){

	//header menu pulldown
	$.ajax({
	url: "/contents/news/",
	//url:"/contents.html",
	type: 'GET',
	dataType: "html",
	cache: false,
	success: function(data, textStatus){
	// 成功したとき
	// data にサーバーから返された html が入る
		var omitNumber = 5;// 5個までは省略せずに表示する
		$('div#menuBox').html($(data).find('nav#site-navigation'));
		if( $('nav#site-navigation li#menuEvent li').length > omitNumber ){
			$('nav#site-navigation li#menuEvent li:gt(' + (omitNumber-1) + ')').addClass('omit');
			$('nav#site-navigation li#menuEvent ul').append('<li><span class="viewAll">すべて見る…</a></span>');
			$('nav#site-navigation li#menuEvent span.viewAll').on('click',function(){
				$(this).parent().hide();
				$('.omit').removeClass('omit');
			});
		}
		openMenu();
		initRollOverImages();
		mobileMenu();
	},
	error: function(xhr, textStatus, errorThrown){
	// エラー処理
	}
	});
});

//openMenu index or Download only
function openMenu(){
	$("ul#menu li").hover(
		function () {
			$("ul.children",this).stop().slideDown();
		},
		function(){
			$("ul.children",this).stop().slideUp();
		}
	);
}

/* 画像のロールオーバー関数 class="mouseon"をつけると、発動。画像名＋HOVERにチェンジ。 */
function initRollOverImages() {
	var image_cache = new Object();
	$("img.mouseon").each(function(i) {
		var imgsrc = this.src;
		var dot = this.src.lastIndexOf('.');
		var imgsrc_on = this.src.substr(0, dot) + 'HOVER' + this.src.substr(dot, 4);
		image_cache[this.src] = new Image();
		image_cache[this.src].src = imgsrc_on;
		$(this).hover(
		function() { this.src = imgsrc_on; },
		function() { this.src = imgsrc; });
	});
}


//menu
function mobileMenu(){
	$(".btnMenuOpen").bind("click",function(){
		$('div#menuBox').toggleClass('visible');
		$('#menuList').fadeToggle(200);
		$('#menuOpen').toggleClass('on');
	});

	$("#menuList a").bind("click", function(){
		$("nav").toggleClass('visible');
		$('#menuList').fadeToggle(200);
		$('#menuOpen').toggleClass('on');
	});
}