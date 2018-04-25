$('.ourClientsCarousel').owlCarousel({
	loop: false,
	margin: 10,
	nav: true,
	responsive: {
		0: {
			items: 2
		},
		500: {
			items: 3
		},
		1000: {
			items: 6
		}
	}
});
var owlStageWidth = $(".owl-stage").width();
var owlItem = $(".ourClientsCarousel .owl-item");
var owlItemNumber = owlItem.length;
var owlItemWidth = owlStageWidth / owlItemNumber - 10;
var owlItemActiveNumber = $(".ourClientsCarousel .owl-item.active").length;
var sliderNavigation = $(".sliderNavigation");
var sliderNavigationWidth = sliderNavigation.width();
var elementNav = sliderNavigation.find(".elementNav");
var percentStep;
var ourClientsAnimationDuration = 2500;
var ourHowItWorksAnimationDuration = 4000;
$(window).resize(function () {
	setTimeout(function () {
		owlStageWidth = $(".owl-stage").width();
		owlItemWidth = owlStageWidth / owlItemNumber - 10;
		owlItemActiveNumber = $(".ourClientsCarousel .owl-item.active").length;
	}, 500);
	sliderNavigationWidth = sliderNavigation.width();
});
$('.ourClientsCarousel').on("drag.owl.carousel", function () {
	$(".ourClientsCarousel .owl-stage").on("mousemove", function () {
		percentStep = 100 * $(this).position().left / (owlItemWidth * (owlItemNumber - owlItemActiveNumber));
		if (percentStep < -100) {
			elementNav.css({
				left: "100%",
				transition: "inherit"
			})
		} else if (percentStep > 0) {
			elementNav.css({
				left: "0",
				transition: "inherit"
			})
		} else {
			elementNav.css({
				left: -sliderNavigationWidth / 100 * percentStep,
				transition: "inherit"
			});
		}
	})
});
$('.ourClientsCarousel').on("dragged.owl.carousel", function () {
	$(".ourClientsCarousel .owl-stage").off("mousemove");
	setTimeout(function () {
		percentStep = 100 * $(".ourClientsCarousel .owl-stage").position().left / (owlItemWidth * (owlItemNumber - owlItemActiveNumber));
		if (percentStep < -100) {
			elementNav.css({
				left: "100%",
				transition: "left 300ms"
			})
		} else if (percentStep > 0) {
			elementNav.css({
				left: "0",
				transition: "left 300ms"
			})
		} else {
			elementNav.css({
				left: -sliderNavigationWidth / 100 * percentStep,
				transition: "left 300ms"
			});
		}
	}, 200);
});
$(function () {
	var currentLanguage = $(".currentLanguage");
	currentLanguage.on("click", function () {
		$(this).parent().toggleClass("open");
	});
	$(document).on("click", function (e) { //Here is when you click in your entire document
		if (e.target.className !== "currentLanguage") {
			currentLanguage.parent().removeClass("open");
		}
	})
});
$(function () {
	var clientBlock = $(".clientBlock");
	var openClient = {};
	var openClientBlock = $(".openClient");
	var openClientContent = openClientBlock.find(".contentBlock");
	var socialLink = [];
	clientBlock.on("click", function () {
		$("body").addClass("modalOpen");
		var contentClient = $(this).find(".contentClient");
		openClient = {
			imgBlock: contentClient.data("imgblock"),
			institutionClass: contentClient.data("institutionclass"),
			nameInstitution: contentClient.data("nameinstitution"),
			socialLinks: {
				1: {
					link: contentClient.data("socinst"),
					svgName: "instagrammSvg"
				},
				2: {
					link: contentClient.data("socfb"),
					svgName: "facebookSvg"
				},
				3: {
					link: contentClient.data("socvk"),
					svgName: "vkSvg"
				}
			},
			reviewAboutUs: contentClient.data("review"),
			client: {
				name: contentClient.data("nameclient"),
				position: contentClient.data("positionclient"),
				photoClient: contentClient.data("photoclient")
			}
		};
		for (var i = 1; i <= Object.keys(openClient.socialLinks).length; i++) {
			if (openClient.socialLinks[i].link !== undefined) {
				socialLink.push('<a target="_blank" href="' + openClient.socialLinks[i].link + '"><svg><use xlink:href="#' + openClient.socialLinks[i].svgName + '"></use></svg></a>');
			}
		}
		openClientContent.append('<div class="textImage flexWrapper justifyContent alignMiddle">' +
			'<div class="imbBlock"><img src="' + openClient.imgBlock + '" alt=""></div>' +
			'<div class="textBlock"><div class="headerTextBlock\">' +
			'<div class="institutionClass">' + openClient.institutionClass + '</div>' +
			'<div class="nameInstitution inlineBlock alignMiddle">' + openClient.nameInstitution + '</div>' +
			'<div class="socialLink inlineBlock alignMiddle">' + socialLink.join("") + '</div></div>' +
			'<div class="reviewAboutUs"><div class="defaultText">Отзыв о работе с нами:</div>' +
			'<div class="review"></div>' + openClient.reviewAboutUs + '</div>' +
			'<div class="footerTextBlock flexWrapper justifyContent"><div class="client">' +
			'<div class="name">' + openClient.client.name + ',</div>' +
			'<div class="position">' + openClient.client.position + '</div></div>' +
			'<div class="photoClient"><img src="' + openClient.client.photoClient + '" alt=""></div></div></div></div>');
		openClientBlock.addClass("justMeFade");
	});
	openClientBlock.find(".closeBtn").on("click", function () {
		$("body").removeClass("modalOpen");
		openClientBlock.removeClass("justMeFade");
		socialLink = [];
		setTimeout(function () {
			openClientBlock.find(".textImage").remove();
		}, 700);
	});

	function owlNavigation() {
		if (owlItemActiveNumber !== owlItemNumber) {
			if ($(".ourClientsCarousel"))
				elementNav.draggable({
					axis: "x",
					containment: "parent",
					drag: function (event, ui) {
						elementNav.css("transition", "inherit");
						var leftPercent = ( 100 * parseFloat(ui.position.left) / (parseFloat($(this).parent().css("width")) - elementNav.width()));
						$(".owl-stage").css("left", -((owlItemNumber - owlItemActiveNumber) * owlItemWidth + (owlItemNumber - owlItemActiveNumber) * 10) / 100 * leftPercent);
					}
				});
		} else {
			sliderNavigation.css("display", "none");
		}
	}

	owlNavigation();
});
$(".slideBlock").on("mousemove touchmove", function (event) {
	var centerWindowWidth = $(window).width() / 2;
	var coordinatedMove;
	if (event.type === "mousemove") {
		coordinatedMove = event.screenX;
	} else if (event.type === "touchmove") {
		coordinatedMove = event.originalEvent.touches[0].pageX;
		if (coordinatedMove > $(document).width()) {
			coordinatedMove = $(document).width();
		} else if (coordinatedMove <= 0) {
			coordinatedMove = 0;
		}
	}
	if (centerWindowWidth < coordinatedMove && 1340 - $(document).width() >= 1) {
		$(this).find(".slideContent").css("margin-left", -670 + (1 - $(document).width() / 1340) * (1340 / $(document).width() * (centerWindowWidth - coordinatedMove - 100))).css("transition", "200ms");
	} else if (centerWindowWidth > coordinatedMove && 1340 - $(document).width() >= 0) {
		$(this).find(".slideContent").css("margin-left", -670 + (1 - $(document).width() / 1340) * (1340 / $(document).width() * (centerWindowWidth - coordinatedMove + 50))).css("transition", "200ms");
	}
});
$(".slideBlock").on("mouseleave touchend", function () {
	$(this).find(".slideContent").css("margin-left", -670).css("transition", "500ms");
});
$(function () {
	$(".pricesBlock .tabNav .item").on("click", function () {
		var priceName = $(this).data("name-price");
		$(this).addClass("active").siblings().removeClass("active");
		$(".pricesBlock .tabContent .item").siblings().removeClass("active");
		$(".pricesBlock .tabContent").find("[data-name='" + priceName + "']").addClass("active");
	});
	$(".openPrices .tabNav .item").on("click", function () {
		var priceName = $(this).data("name-price");
		$(this).addClass("active").siblings().removeClass("active");
		$(".openPrices .contentBlock .item").siblings().removeClass("active");
		$(".openPrices .contentBlock").find("[data-name='" + priceName + "']").addClass("active");
	})
});
$(function () {
	var openClientBlock = $(".openPrices");
	$(".pricesBlock .yearSubscription").on("click", function () {
		$("body").addClass("modalOpen");
		openClientBlock.addClass("justMeFade");
	});
	openClientBlock.find(".closeBtn").on("click", function () {
		$("body").removeClass("modalOpen");
		openClientBlock.removeClass("justMeFade");
	});
});
$(function () {
	$(".featuresBlock .flexItem").on("touchstart", function () {
		$(this).addClass("active").siblings().removeClass("active");
	})
});

function animate() {
	var controller = $.superscrollorama({
		triggerAtCenter: true,
		playoutAnimations: false,
		reverse: false
	});
	controller.pin($('.ourClients .scrollBlock'), ourClientsAnimationDuration, {
		anim: (new TimelineLite())
			.append(
				TweenMax.to($('.ourClients .titleBlock'), 1,
					{css: {top: 0}})
			)
			.append([
				TweenMax.fromTo($('.ourClients .firstBlock'), 1.25,
					{css: {top: 300, opacity: 0}},
					{css: {top: 0, opacity: 1}}),
				TweenMax.fromTo($('.ourClients .secondBlock'), 1.25,
					{css: {top: 500, opacity: 0}},
					{css: {top: 0, opacity: 1}}),
				TweenMax.fromTo($('.ourClients .thirdBlock'), 1.25,
					{css: {top: 700, opacity: 0}},
					{css: {top: 0, opacity: 1}}),
				TweenMax.fromTo($('.ourClients .sliderNavigation'), 1.25,
					{css: {top: 900, opacity: 0}},
					{css: {top: 0, opacity: 1}})
			])

	});
	controller.pin($('.howItWorks .scrollBlock'), ourHowItWorksAnimationDuration, {
		anim: (new TimelineLite())
			.append(
				TweenMax.fromTo($('.howItWorks .tracks'), .8,
					{css: {top: 600}},
					{css: {top: 0}}))
			.append(
				TweenMax.to($('.howItWorks .tracks .numbers'), .5,
					{css: {'font-size': 77}})
			)
			.append([
				TweenMax.to($('.howItWorks .tracks .after'), .5,
					{css: {opacity: 1, right: 0}}),
				TweenMax.to($('.howItWorks .tracks .before'), .5,
					{css: {opacity: 1, left: 0}}),
				TweenMax.to($('.howItWorks .genre'), .5,
					{css: {opacity: 1, left: 0}}),
				TweenMax.to($('.howItWorks .genre .before'), .5,
					{css: {opacity: 1, left: 0}}),
				TweenMax.to($('.howItWorks .institution'), .5,
					{css: {opacity: 1, right: 0}}),
				TweenMax.to($('.howItWorks .institution .after'), .5,
					{css: {opacity: 1, right: 0}})
			])
			.append([
				TweenMax.to($('.howItWorks .servers'), 1,
					{css: {opacity: 1, left: 0}}),
				TweenMax.to($('.howItWorks .brands'), 1,
					{css: {opacity: 1, right: 0}})
			])
			.append([
				TweenMax.to($('.howItWorks .wifiStep'), .5,
					{css: {opacity: 1, top: 0}}),
				TweenMax.to($('.howItWorks .laptop'), 1.5,
					{css: {opacity: 1, top: 0}}),
				TweenMax.to($('.howItWorks .laptop .logoBlock'), 1,
					{css: {top: 100}}),
				TweenMax.to($('.howItWorks .laptop .content'), 1,
					{css: {top: 230}})
			])
			.append(
				TweenMax.to($('.howItWorks .loudspeaker'), 0.1,
					{css: {opacity: 1}})
			)
			.append([
				TweenMax.to($('.howItWorks .loudspeaker.left'), 1,
					{css: {left: 0}, immediateRender: true}),
				TweenMax.to($('.howItWorks .loudspeaker.left .line'), 2,
					{css: {width: 180}}),
				TweenMax.to($('.howItWorks .loudspeaker.right .line'), 2,
					{css: {width: 180}}),
				TweenMax.to($('.howItWorks .loudspeaker.right'), 1,
					{css: {right: 0}})
			])
			.append([
				TweenMax.to($('.howItWorks .loudspeaker.left .content'), .5,
					{css: {left: 15, opacity: 1}}),
				TweenMax.to($('.howItWorks .loudspeaker.right .content'), .5,
					{css: {right: 15, opacity: 1}})
			])
	});
}
animate();
$(function () {
	$(".signIn, .connectBtn, .reviewForm").on("click", function (e) {
		e.preventDefault();
		var showForm = $(this).data("name");
		console.log(showForm);
		var modalFormBlock = $(".modalFormBlock");
		var closeBtnForm = modalFormBlock.find(".closeBtn");
		$("body").addClass("modalOpen");
		modalFormBlock.addClass(showForm + " justMeFade");
		closeBtnForm.on("click", function () {
			modalFormBlock.removeClass(showForm + " justMeFade");
			$("body").removeClass("modalOpen");
		});
	})
});
$(function () {
	var firstScreen = $(".firstScreen");
	var playerBlock = $(".player");
	var playerIndex = playerBlock.index();
	var firstScreenItems = firstScreen.find(".items");
	var playerItems = {
		playerLogo: playerBlock.find(".logoItem img"),
		playerTitle: playerBlock.find(".titleItem"),
		pauseBtn: playerBlock.find(".pause"),
		playBtn: playerBlock.find(".play"),
		nextBtn: playerBlock.find(".next"),
		prevBtn: playerBlock.find(".prev"),
		muteBtn: firstScreen.find(".mute .svgBlock"),
		progressBlock:playerBlock.find(".progressBar"),
		categoryPlayer:playerBlock.find(".category .item")
	};
	var bias;
	var dataItemValue;
	var eachDataPositionElemnts;
	var categoryIndex = 0;
	var arr = [
		{
			categoryBar: "totalCategory",
			backgroundImg: "assets/img/bgFirstBlock.jpg",
			nameCategory: "GOOD AND BEAUTY",
			items: [
				{
					name: "MAMAN",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "FRAPOLLI",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "AZUMA",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "M1 Club Hotel",
					audioTrack: "asset/music/blackBacardi.mp3",
					logo: "assets/img/shape-6.png"
				},
				{
					name: "BRISTOL",
					audioTrack: "assets/music/fury-road.mp3",
					logo: "assets/img/shape-6.png"
				},
				{
					name: "GASTROBAR",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "CORVIN",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Тетя-Мотя",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Одесское профессиональное училище железнодорожного транспорта и строительства",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Компот",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Одесский Профессиональный Лицей Строительства И Архитектуры Государственный Профессионально-техническое Учебное Заведение",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Кафе Фанкони",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Traveler`s Coffee",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Алхимия",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "КлараБара",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Одесская государственная академия строительства и архитектуры",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Tavernetta",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Фрателли",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Стейкхаус. Мясо и Вино",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Одесский национальный морской университет",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Альпина",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Национальный университет «Одесская морская академия»",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Buffalo 99",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Бернардацци",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Бремен",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Тюлька",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Make my Cake",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "ОГАУ Корпус#1",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Жето",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Sophie Cafe",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Дача",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Гоголь-Моголь",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Одесский национальный политехнический университет",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Terrace. Sea View",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Братья Гриль",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				}
			]
		},
		{
			categoryBar: "fashionRetail",
			backgroundImg: "assets/img/911825525_preview_2.jpg",
			nameCategory: "FASHION & RETAIL",
			items: [
				{
					name: "MAMAN1",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "FRAPOLLI1",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "AZUMA1",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "M1 Club Hotel1",
					audioTrack: "asset/music/blackBacardi.mp3",
					logo: "assets/img/shape-6.png"
				},
				{
					name: "BRISTOL1",
					audioTrack: "assets/music/fury-road.mp3",
					logo: "assets/img/shape-6.png"
				},
				{
					name: "GASTROBAR1",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "CORVIN1",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Тетя-Мотя1",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Одесское профессиональное училище железнодорожного транспорта и строительства1",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				}
			]
		},
		{
			categoryBar: "HEALTH & BEAUTY",
			backgroundImg: "assets/img/downloaded.jpg",
			nameCategory: "HEALTH & BEAUTY",
			items: [
				{
					name: "MAMAN2",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "FRAPOLLI2",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "AZUMA2",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "M1 Club Hotel2",
					audioTrack: "assets/music/blackBacardi.mp3",
					logo: "assets/img/shape-6.png"
				},
				{
					name: "BRISTOL2",
					audioTrack: "assets/music/fury-road.mp3",
					logo: "assets/img/shape-6.png"
				},
				{
					name: "GASTROBAR2",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "CORVIN2",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Тетя-Мотя2",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				},
				{
					name: "Одесское профессиональное училище железнодорожного транспорта и строительства2",
					audioTrack: "awdawdawd.mp3",
					logo: "wdadwawd.png"
				}
			]
		}
	];
	firstScreenItems.each(function () {
		$(this).attr("data-value", $(this).index()).text(arr[categoryIndex].items[$(this).index()].name)
	});
	var arrLength = arr[categoryIndex].items.length;
	var audioPlay = new Audio(arr[0].items[playerIndex].audioTrack);
	player();
	playerItems.playerLogo.attr("src", arr[categoryIndex].items[playerIndex].logo);
	playerItems.playerTitle.text(arr[categoryIndex].items[playerIndex].name);
	playerItems.pauseBtn.on("click touch", function () {
		audioPlay.pause();
		$(this).parent().removeClass("paused");
	});
	playerItems.playBtn.on("click touch", function () {
		audioPlay.play();
		$(this).parent().addClass("paused")
	});
	playerItems.muteBtn.on("click touch", function () {
		var stateMute = $(this).data("mute");
		if (stateMute === false) {
			audioPlay.muted = true;
			$(this).data("mute", true).addClass("true").parent().find(".title").text("Включить звук");
		} else {
			audioPlay.muted = false;
			$(this).data("mute", false).removeClass("true").parent().find(".title").text("Выключить звук");
		}

	});
	playerItems.nextBtn.on("click", function () {
		audioPlay.pause();
		audioPlay.currentTime = 0;
		bias = $(this).parents(playerBlock).next().index() - playerIndex;
		playerItems.playerLogo.addClass("fadeOut").attr("src", arr[categoryIndex].items[$(this).parents(".player").next().data("value")].logo);
		playerItems.playerTitle.addClass("fadeOut").text(arr[categoryIndex].items[$(this).parents(".player").next().data("value")].name);
		audioPlay = new Audio(arr[categoryIndex].items[$(this).parents(".player").next().data("value")].audioTrack);
		setTimeout(function () {
			playerItems.playerLogo.removeClass("fadeOut");
			playerItems.playerTitle.removeClass("fadeOut");
			player();
		}, 500);
		changePlayerItem(bias);
	});
	playerItems.prevBtn.on("click", function () {
		bias = $(this).parents(playerBlock).prev().index() - playerIndex;
		audioPlay.pause();
		audioPlay.currentTime = 0;
		playerItems.playerLogo.addClass("fadeOut").attr("src", arr[0].items[$(this).parents(".player").prev().data("value")].logo);
		playerItems.playerTitle.addClass("fadeOut").text(arr[0].items[$(this).parents(".player").prev().data("value")].name);
		audioPlay = new Audio(arr[0].items[$(this).parents(".player").prev().data("value")].audioTrack);
		setTimeout(function () {
			playerItems.playerLogo.removeClass("fadeOut");
			playerItems.playerTitle.removeClass("fadeOut");
			player();
		}, 500);
		changePlayerItem(bias);
	});
	playerItems.categoryPlayer.on("click touch",function () {
		audioPlay.pause();
		audioPlay.currentTime = 0;
		firstScreenItems.addClass("fadeOut");
		categoryIndex = $(this).index();
		firstScreen.css("background","url("+arr[categoryIndex].backgroundImg+")");
		audioPlay = new Audio(arr[categoryIndex].items[playerIndex].audioTrack);
		firstScreenItems.each(function () {
			$(this).data("value", $(this).index()).text(arr[categoryIndex].items[$(this).index()].name).attr("data-value", $(this).index()).text(arr[categoryIndex].items[$(this).index()].name)
		});
		playerItems.playerLogo.addClass("fadeOut").attr("src", arr[categoryIndex].items[playerIndex].logo);
		playerItems.playerTitle.addClass("fadeOut").text(arr[categoryIndex].items[playerIndex].name);
		setTimeout(function () {
			firstScreenItems.removeClass("fadeOut");
			playerItems.playerLogo.removeClass("fadeOut");
			playerItems.playerTitle.removeClass("fadeOut");
			player();
		}, 500);
		$(this).addClass("active").siblings().removeClass("active");
	});
	firstScreenItems.on("click", function () {
		dataItemValue = 0;
		audioPlay.pause();
		audioPlay.currentTime = 0;
		bias = $(this).index() - playerIndex;
		dataItemValue = $(this).data("value");
		playerItems.playerLogo.addClass("fadeOut").attr("src", arr[categoryIndex].items[dataItemValue].logo);
		playerItems.playerTitle.addClass("fadeOut").text(arr[categoryIndex].items[dataItemValue].name);
		audioPlay = new Audio(arr[categoryIndex].items[dataItemValue].audioTrack);
		setTimeout(function () {
			playerItems.playerLogo.removeClass("fadeOut");
			playerItems.playerTitle.removeClass("fadeOut");
			player();
		}, 500);
		changePlayerItem(bias);
	});
	function player() {
		audioPlay.play();
		audioPlay.addEventListener('timeupdate', function () {
			var curtime = parseInt(audioPlay.currentTime, 10);
			if (curtime===Math.floor(audioPlay.duration)){
				audioPlay.currentTime = 0;
				audioPlay.pause();
				playerItems.playBtn.parent().removeClass("paused");
				$(".progressBar").width("0%");
			}
			else{
				$(".progressBar").width(curtime / audioPlay.duration * 100 + "%");
			}
		});
	}
	function changePlayerItem(bias){
		firstScreenItems.addClass("fadeOut");
		var peremennaya = 0;
		arrLength = arr[categoryIndex].items.length;
		setTimeout(function () {
			$(".firstScreen .items").each(function () {
				var items = $(this);
				eachDataPositionElemnts = items.data("value");
				if (eachDataPositionElemnts + bias >= arrLength) {
					peremennaya = eachDataPositionElemnts + bias - arrLength;
				} else if (eachDataPositionElemnts + bias <= arrLength + (eachDataPositionElemnts + bias)) {
					peremennaya = arrLength + (eachDataPositionElemnts + bias);
					if (peremennaya >= arrLength) {
						peremennaya = arrLength + (eachDataPositionElemnts + bias - arrLength);
					}
				}
				else {
					peremennaya = eachDataPositionElemnts + bias;
				}
				items.removeClass("fadeOut").data("value", peremennaya).attr("data-value", peremennaya).text(arr[categoryIndex].items[peremennaya].name);
			});
		}, 500);
	}
});
$(function () {
	//    canvas Script
	var canvas = document.getElementById('nokey'),
		can_w = parseInt(canvas.getAttribute('width')),
		can_h = parseInt(canvas.getAttribute('height')),
		ctx = canvas.getContext('2d');
	var ball = {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			r: 0,
			alpha: 1,
			phase: 0
		},
		ball_color = {
			r: 232,
			g: 0,
			b: 0
		},
		R = 2,
		balls = [],
		alpha_f = 0.03,
		alpha_phase = 0,

// Line
		link_line_width = 0.8,
		dis_limit = 260,
		add_mouse_point = true,
		mouse_in = false,
		mouse_ball = {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			r: 0,
			type: 'mouse'
		};

// Random speed
	function getRandomSpeed(pos) {
		var min = -1,
			max = 1;
		switch (pos) {
			case 'top':
				return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
				break;
			case 'right':
				return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
				break;
			case 'bottom':
				return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
				break;
			case 'left':
				return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
				break;
			default:
				return;
				break;
		}
	}

	function randomArrayItem(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function randomNumFrom(min, max) {
		return Math.random() * (max - min) + min;
	}


// Random Ball
	function getRandomBall() {
		var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
		switch (pos) {
			case 'top':
				return {
					x: randomSidePos(can_w),
					y: -R,
					vx: getRandomSpeed('top')[0],
					vy: getRandomSpeed('top')[1],
					r: R,
					alpha: 1,
					phase: randomNumFrom(0, 10)
				}
				break;
			case 'right':
				return {
					x: can_w + R,
					y: randomSidePos(can_h),
					vx: getRandomSpeed('right')[0],
					vy: getRandomSpeed('right')[1],
					r: R,
					alpha: 1,
					phase: randomNumFrom(0, 10)
				}
				break;
			case 'bottom':
				return {
					x: randomSidePos(can_w),
					y: can_h + R,
					vx: getRandomSpeed('bottom')[0],
					vy: getRandomSpeed('bottom')[1],
					r: R,
					alpha: 1,
					phase: randomNumFrom(0, 10)
				}
				break;
			case 'left':
				return {
					x: -R,
					y: randomSidePos(can_h),
					vx: getRandomSpeed('left')[0],
					vy: getRandomSpeed('left')[1],
					r: R,
					alpha: 1,
					phase: randomNumFrom(0, 10)
				}
				break;
		}
	}

	function randomSidePos(length) {
		return Math.ceil(Math.random() * length);
	}

// Draw Ball
	function renderBalls() {
		Array.prototype.forEach.call(balls, function (b) {
			if (!b.hasOwnProperty('type')) {
				ctx.fillStyle = 'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + b.alpha + ')';
				ctx.beginPath();
				ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
			}
		});
	}

// Update balls
	function updateBalls() {
		var new_balls = [];
		Array.prototype.forEach.call(balls, function (b) {
			b.x += b.vx;
			b.y += b.vy;

			if (b.x > -(50) && b.x < (can_w + 50) && b.y > -(50) && b.y < (can_h + 50)) {
				new_balls.push(b);
			}

			// alpha change
			b.phase += alpha_f;
			b.alpha = Math.abs(Math.cos(b.phase));
			// console.log(b.alpha);
		});

		balls = new_balls.slice(0);
	}

// loop alpha
	function loopAlphaInf() {

	}

// Draw lines
	function renderLines() {
		var fraction, alpha;
		for (var i = 0; i < balls.length; i++) {
			for (var j = i + 1; j < balls.length; j++) {

				fraction = getDisOf(balls[i], balls[j]) / dis_limit;

				if (fraction < 1) {
					alpha = (1 - fraction).toString();

					ctx.strokeStyle = 'rgba(150,150,150,' + alpha + ')';
					ctx.lineWidth = link_line_width;

					ctx.beginPath();
					ctx.moveTo(balls[i].x, balls[i].y);
					ctx.lineTo(balls[j].x, balls[j].y);
					ctx.stroke();
					ctx.closePath();
				}
			}
		}
	}

// calculate distance between two points
	function getDisOf(b1, b2) {
		var delta_x = Math.abs(b1.x - b2.x),
			delta_y = Math.abs(b1.y - b2.y);

		return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
	}

// add balls if there a little balls
	function addBallIfy() {
		if (balls.length < 20) {
			balls.push(getRandomBall());
		}
	}

// Render
	function render() {
		ctx.clearRect(0, 0, can_w, can_h);

		renderBalls();

		renderLines();

		updateBalls();

		addBallIfy();

		window.requestAnimationFrame(render);
	}

// Init Balls
	function initBalls(num) {
		for (var i = 1; i <= num; i++) {
			balls.push({
				x: randomSidePos(can_w),
				y: randomSidePos(can_h),
				vx: getRandomSpeed('top')[0],
				vy: getRandomSpeed('top')[1],
				r: R,
				alpha: 1,
				phase: randomNumFrom(0, 10)
			});
		}
	}

// Init Canvas
	function initCanvas() {
		canvas.setAttribute('width', window.innerWidth);
		canvas.setAttribute('height', window.innerHeight);

		can_w = parseInt(canvas.getAttribute('width'));
		can_h = parseInt(canvas.getAttribute('height'));
	}

	window.addEventListener('resize', function (e) {
		initCanvas();
	});

	function goMovie() {
		initCanvas();
		initBalls(20);
		window.requestAnimationFrame(render);
	}

	goMovie();

// Mouse effect
	canvas.addEventListener('mouseenter', function () {
		mouse_in = true;
		balls.push(mouse_ball);
	});
	canvas.addEventListener('mouseleave', function () {
		mouse_in = false;
		var new_balls = [];
		Array.prototype.forEach.call(balls, function (b) {
			if (!b.hasOwnProperty('type')) {
				new_balls.push(b);
			}
		});
		balls = new_balls.slice(0);
	});
	canvas.addEventListener('mousemove', function (e) {
		var e = e || window.event;
		mouse_ball.x = e.pageX;
		mouse_ball.y = e.pageY;
		// console.log(mouse_ball);
	});
});
$(function () {
	var headerBlock = $(".headerBlock");
    var windowWidth = $(window).width();
    $(window).resize(function () {
    	windowWidth = $(document).width();
    });
	headerBlock.find(".listMenu a").click(function(e) {
		e.preventDefault();
		var section = $(this).attr("href");
        var offsetTopBlock = 0;
        if(windowWidth >= 1200){
            if(section==="#ourClients")	{
                offsetTopBlock = ourClientsAnimationDuration;
            }
            else if(section==="#howItWorks"){
                if($(".headerBlock").offset().top >= $(".howItWorks").offset().top || $("#ourClients").offset().top <=  $(".headerBlock").offset().top){
                    offsetTopBlock = ourHowItWorksAnimationDuration;
                }else{
                    offsetTopBlock = ourHowItWorksAnimationDuration + 1800;
                }
            }else{
				offsetTopBlock=0;
            }
		}else{
            offsetTopBlock = 0;
		}

		$("html, body").animate({
			scrollTop: $(section).offset().top + offsetTopBlock
		});
	});
	$(window).on("scroll", function () {
		var scroll = $(window).scrollTop();
		if (scroll >= 700) {
			headerBlock.addClass("blackHeader")
		} else {
			headerBlock.removeClass("blackHeader");
		}
	})
});