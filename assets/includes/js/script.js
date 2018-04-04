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
	$(document).on("click",function(e){ //Here is when you click in your entire document
		if(e.target.className !== "currentLanguage"){
			currentLanguage.parent().removeClass("open");
		}
		// if($(e.target).closest('p').length==0) { // If click is not paragraph
		// 	console.log(e);
		// }
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
		console.log(owlItemNumber);
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
		if(coordinatedMove > $(document).width()){
			coordinatedMove = $(document).width();
		}else if(coordinatedMove <=0){
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

//    canvas Script
var canvas = document.getElementById('nokey'),
	can_w = parseInt(canvas.getAttribute('width')),
	can_h = parseInt(canvas.getAttribute('height')),
	ctx = canvas.getContext('2d');

// console.log(typeof can_w);

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

console.log(randomNumFrom(0, 10));

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
	console.log('Window Resize...');
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
	console.log('mouseenter');
	mouse_in = true;
	balls.push(mouse_ball);
});
canvas.addEventListener('mouseleave', function () {
	console.log('mouseleave');
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
$(function () {
	var headerBlock = $(".headerBlock");
	$(window).on("scroll", function () {
		var scroll = $(window).scrollTop();

		if (scroll >= 700) {
			headerBlock.addClass("blackHeader")
		} else {
			headerBlock.removeClass("blackHeader");
		}
	})
});