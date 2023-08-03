 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll',
    horizontalOffset: 0,
	  verticalOffset: 0
  });

  // Scrollax
  $.Scrollax();


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1,
	        nav:false
	      },
	      600:{
	        items:1,
	        nav:false
	      },
	      1000:{
	        items:1,
	        nav:false
	      }
	    }
		});
		$('.carousel-work').owlCarousel({
			autoplay: true,
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding:0,
			nav: true,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1,
					stagePadding: 0
				},
				600:{
					items: 2,
					stagePadding: 50
				},
				1000:{
					items: 3,
					stagePadding: 100
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	
	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: true,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  $('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('.appointment_time').timepicker();




})(jQuery);

if (localStorage.length > 0 && localStorage.userData !== null){
	document.getElementById('nav-sign-in').style.display = 'none'
	document.getElementById('nav-dropdown').style.display = 'block'
	document.getElementById('nav-cart').style.display = 'block'
	localStorage.setItem("cartData", JSON.stringify({}))
} else {
	document.getElementById('nav-sign-in').style.display = 'block'
	document.getElementById('nav-dropdown').style.display = 'none'
	document.getElementById('nav-cart').style.display = 'none'
}


//Show All Menu Items
if (window.location.href.match('http://127.0.0.1:5500/menu.html') != null){
	window.addEventListener("load", fetchAllMenu)
}
async function fetchAllMenu() {
	let drinksContainer = document.querySelector("#all-drinks-container")
	let foodsContainer = document.querySelector("#all-foods-container")
    try {
        const response = await fetch('http://127.0.0.1:5000/menu/all', {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            for (let category in jsonResponse["data"]) {
                const cards = jsonResponse["data"][`${category}`].map((menu) => {
                    return `<div class="col-md-4 text-center">
								<div class="menu-wrap">
									<a href="#" class="menu-img img mb-4" style="background-image: url(${menu.img_url});"></a>
									<div class="text">
										<h3><a href="#">${menu.name}</a></h3>
										<p class="desc pt-1">${menu.desc}</p>
										<p class="price"><span>Rp${menu.price.toLocaleString()}</span></p>
										<p><a class="btn btn-primary btn-outline-primary" name="${menu.id}" id="cart-menu-${menu.id}">Add to cart</a></p>
									</div>
								</div>
							</div>`
                })
                if (category === "drinks"){
                    drinksContainer.innerHTML = cards.join('<br/>')
                } else {
                    foodsContainer.innerHTML = cards.join('<br/>')
                }
            }
			menuCartButtons = document.querySelectorAll("[id^='cart-menu']")
			for (let cartBtn of menuCartButtons){
				cartBtn.addEventListener('click', authCheck(cartBtn.name))
			}
        } else {
            throw await response.json()
        }
    } catch (err) {
        console.error(err.message)
    }
}
function authCheck(menuId){
	if (localStorage.length > 0 && localStorage.userData !== null){
		cart = JSON.parse(localStorage.getItem("cartData"))
		cart[menuId] = 1
		console.log(cart)
		// localStorage.setItem("cartData", JSON.stringify(jsonResponse["data"]))
	}
}

//Sign In
if (window.location.href.match('http://127.0.0.1:5500/signin.html') != null){
	let formSubmit = document.getElementById("btn-sign-in")
	formSubmit.addEventListener("click", signin)
}
function signin(e) {
    e.preventDefault()
    let email = document.getElementById("sign-in-email").value
    let password = document.getElementById("sign-in-password").value
    let token = btoa(email + ":" + password)
    let myHeaders = new Headers()
    myHeaders.append("Authorization", "Basic" + " " + token)
    myHeaders.append("Content-type", "application/json; charset=UTF-8")

    let statusBox = document.getElementById("sign-in-status")
    fetch('http://127.0.0.1:5000/user/login', {
        method: 'POST',
        headers: myHeaders,
    })
        .then((response) => {
            if (response.ok === false) {
                throw response
            } else {
                return response.json()
            }
        })
        .then((jsonResponse) => {
                localStorage.setItem("userData", JSON.stringify(jsonResponse["data"]))
                statusBox.innerHTML = null
				// location.reload()
                window.location.href = 'http://127.0.0.1:5500/index.html'
        })
        .catch((error) => {
            statusBox.style.color = "#ff3f3f"
            if (error.status === 401) {
                statusBox.innerHTML = "Email and password does not match"
            } else if (error.status === 404) {
                statusBox.innerHTML = "User not found"
            }
        });
}

//Sign Up
if (window.location.href.match('http://127.0.0.1:5500/signup.html') != null){
	let formSubmit = document.getElementById("btn-sign-up")
	formSubmit.addEventListener("click", signup)
}

async function signup(e) {
    e.preventDefault()
    let name = document.getElementById("sign-up-name").value
    let email = document.getElementById("sign-up-email").value
    let password = document.getElementById("sign-up-password").value
    let confirmPassword = document.getElementById("sign-up-confirm-password").value
    let statusBox = document.getElementById("sign-up-status")
	if (!name || !email || !password || !confirmPassword){
        statusBox.style.color = "#ff3f3f"
        statusBox.innerHTML = "Please fill all form fields"
		throw Error("BAD REQUEST")
    }
    if (password === confirmPassword) {
        try {
            const response = await fetch('http://127.0.0.1:5000/user/register', {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: "member"
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            if (response.ok) {
                statusBox.innerHTML = "Account created successfully"
                statusBox.style.color = "#4bb543"
                let inputFields = document.querySelectorAll("input")
                for (let el of inputFields) {
                    el.value = ""
                }
            } else {
                throw await response.json()
            }
        } catch (error) {
            statusBox.innerHTML = error.message
            statusBox.style.color = "#ff3f3f"
        }
    } else {
        statusBox.innerHTML = "Password does not match"
        statusBox.style.color = "#ff3f3f"
    }
}

//Sign Out
let signOutBtn = document.getElementById('nav-sign-out')
signOutBtn.addEventListener('click', signout)
function signout(e){
	e.preventDefault()
	localStorage.clear()
	location.reload()
}