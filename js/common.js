$(function() {

//2014/12/04スマホチェック
var ua = {};
ua.name = window.navigator.userAgent.toLowerCase();
 
ua.isiPhone = ua.name.indexOf('iphone') >= 0;
ua.isiPod = ua.name.indexOf('ipod') >= 0;
ua.isiOS = (ua.isiPhone || ua.isiPod);
ua.isAndroid = ua.name.indexOf('android') >= 0;
ua.isSp = (ua.isiOS || ua.isAndroid);

if (ua.isSp) {
$('html').css('font-size','140%');
$('body').addClass('sp');
$('.dataDownload').hide();
}else{
	scrollHeader();
	//2014/12/04 Gotop button
	gotop();
}


	// test チェックボタンを押すとリンクがアクティブになる（既存の機能） 20141027
	$('.buttonCenter input[type=checkbox]').on('click',function() {
		if($('.buttonCenter :checked').length > 0) {
			$('#submit').show();
			$('#submitDis').hide();
		} else {
			$('#submit').hide();
			$('#submitDis').show();
		}
	});

	//リンクページの文字数調整
	$.each( $('.articleBox h2') , function() {
		var limit = 42;
		var t = charcount( $(this).text() );
		//$(this).text( '(' + t + ')' + $(this).text() );

		 if( t > limit ){
		 	$(this).text( $(this).text().substr(0, limit) + '…' );
			var tt = charcount( $(this).text() );
			//$(this).text( '(' + tt + ')' + $(this).text() );
		 }
	});

	// 4コマカテゴリーのリンク削除 20141027
	$("h3.title a").append('<a>').find('a').unwrap().remove();

	//画像オンマウス
	initRollOverImages();

	//Works page tab
	worksTab();

	//open menu
	openMenu();


	//open menu mobile
	mobileMenu();






	//よんこまマンガ topicPath 省略
	$('#nochoice #topicPath ul li:nth-child(3),#unity-4 #topicPath ul li:nth-child(3),#uniyon #topicPath ul li:nth-child(3)').hide();

	//header menu pulldown
	var omitNumber = 5;// 5個までは省略せずに表示する
	if( $('nav#site-navigation li#menuEvent li').length > omitNumber ){
		$('nav#site-navigation li#menuEvent li:gt(' + (omitNumber-1) + ')').addClass('omit');
		$('nav#site-navigation li#menuEvent ul').append('<li><span class="viewAll">すべて見る…</a></span>');
		$('nav#site-navigation li#menuEvent span.viewAll').on('click',function(){
			$(this).parent().hide();
			$('.omit').removeClass('omit');
		});
	}

});




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


//WorksTab
function worksTab(){
	$('li#tabEvent').on('click',function(){
		$('ul#worksTag').find('li').removeClass('active');
		$('li#tabEvent').addClass('active');
		$('div.worksArticleBox.collaboration').hide();
		$('div.worksArticleBox.usersgame').hide();
		$('div.worksArticleBox.event').show();
		$('div.worksArticleBox.goods').hide();
	});


	$('li#tabUsersGame').on('click',function(){
		$('ul#worksTag').find('li').removeClass('active');
		$('li#tabUsersGame').addClass('active');
		$('div.worksArticleBox.collaboration').hide();
		$('div.worksArticleBox.usersgame').show();
		$('div.worksArticleBox.event').hide();
		$('div.worksArticleBox.goods').hide();
	});


	$('li#tabCollaboration').on('click',function(){
		$('ul#worksTag').find('li').removeClass('active');
		$('li#tabCollaboration').addClass('active');
		$('div.worksArticleBox.collaboration').show();
		$('div.worksArticleBox.usersgame').hide();
		$('div.worksArticleBox.event').hide();
		$('div.worksArticleBox.goods').hide();

	});

	$('li#tabGoods').on('click',function(){
		$('ul#worksTag').find('li').removeClass('active');
		$('li#tabGoods').addClass('active');
		$('div.worksArticleBox.collaboration').hide();
		$('div.worksArticleBox.usersgame').hide();
		$('div.worksArticleBox.event').hide();
		$('div.worksArticleBox.goods').show();
	});
}

//ArticleHeader
function scrollHeader(){
$(window).scroll(function(){
var y = $(this).scrollTop();
$('header.articleHeader').css('background-position', 'center ' + parseInt( -y / 5 + 95) + 'px');
});
}


//openMenu
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

//文字数カウント
function charcount(str) { 
    var r = 0; 
    for (var i = 0; i < str.length; i++) { 
        var c = str.charCodeAt(i); 
        // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff 
        // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3 
        if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) { 
            r += 1; 
        } else { 
            r += 2; 
        } 
    } 
    return r;
}



//menu
function mobileMenu(){
	$(".btnMenuOpen").bind("click",function(){
		$('div#menuBox').toggleClass('visible');
		
		$('#menuOpen').toggleClass('on');
	});
}



function gotop(){
// page Topフェードイン・アウト
	$(window).bind("scroll", function() {
	if ($(this).scrollTop() > 100) { 
		$("div#goTop").fadeIn();
	} else {
		$("div#goTop").fadeOut();
	}
});

	//ページ上部へ戻る
	$('div#goTop').click(function () {
		$('html,body').animate({ scrollTop: 0 }, 'fast');
		return false;
	});

}



