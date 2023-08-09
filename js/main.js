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

if (localStorage.length > 0){
	document.getElementById('nav-sign-in').style.display = 'none'
	document.getElementById('nav-dropdown').style.display = 'block'
	document.getElementById('nav-cart').style.display = 'block'
	updateCartCount()
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
								<div class="menu-wrap" id="wrapper-${menu.id}">
									<a href="#" class="menu-img img mb-4" style="background-image: url(${menu.img_url});"></a>
									<div class="text">
										<h3><a href="#">${menu.name}</a></h3>
										<p class="desc pt-1">${menu.desc}</p>
										<p class="price"><span>Rp${menu.price.toLocaleString()}</span></p>
										<p><a class="btn btn-primary btn-outline-primary" id="cart-menu-${menu.id}" onclick="addItemToCart(${menu.id})">Add to cart</a></p>
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
			//persist disabled state of cart button each time the menu page has finished fetching data
			if (localStorage.length > 0){
				// disableCartBtn()
				updateCartCount()
			}
        } else {
            throw await response.json()
        }
    } catch (err) {
        console.error(err.message)
    }
}

async function searchMenu(event){
	event.preventDefault()
	let searchResultContainer = document.getElementById("menu-search-container")
	const searchValue = document.getElementById("search-field").value
	try {
        const response = await fetch('http://127.0.0.1:5000/menu/search?'+ new URLSearchParams({keyword:searchValue}), {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            const cards = jsonResponse["data"]["results"].map((menu) => {
            	return `<div class="col-md-4 text-center">
							<div class="menu-wrap" id="wrapper-${menu.id}">
								<a href="#" class="menu-img img mb-4" style="background-image: url(${menu.img_url}); background-position: ${menu.category === 'drinks'? 'bottom':'center'}"></a>
								<div class="text">
									<h3><a href="#">${menu.name}</a></h3>
									<p class="desc pt-1">${menu.desc}</p>
									<p class="price"><span>Rp${menu.price.toLocaleString()}</span></p>
									<p><a class="btn btn-primary btn-outline-primary" id="cart-menu-${menu.id}" onclick="addItemToCart(${menu.id})">Add to cart</a></p>
								</div>
							</div>
						</div>`
                })
		    searchResultContainer.innerHTML = cards.join('<br/>')
			//persist disabled state of cart button each time the menu page has finished fetching data
			if (localStorage.length > 0){
				disableCartBtn()
				updateCartCount()
			}
        } else {
            throw await response.json()
        }
    } catch (err) {
        console.error(err.message)
    }
}

function addItemToCart(menuId){
	if (localStorage.length > 0){
		const menuName = document.querySelector(`#wrapper-${menuId} .text h3 a`).innerHTML
		const menuImg = document.querySelector(`#wrapper-${menuId} a`).style.backgroundImage.split('"')[1]
		const menuDesc = document.querySelector(`#wrapper-${menuId} .text .desc`).innerHTML
		const menuPrice = document.querySelector(`#wrapper-${menuId} .price span`).innerHTML.slice(2).replace(',','')
		const cart = JSON.parse(localStorage.getItem("cartData"))
		addedItem = cart.find(item => item.menuId === menuId)
		if (addedItem){
			addedItem.qty += 1
		} else {
			cart.push({
				menuId : menuId,
				menuName: menuName,
				menuImg: menuImg,
				menuDesc: menuDesc,
				menuPrice: parseInt(menuPrice),
				qty: 1
			})
		}
		localStorage.setItem("cartData", JSON.stringify(cart))
		// const cartBtn = document.getElementById(`cart-menu-${menuId}`)
		// cartBtn.classList.add("disabled")
		
		const navCartItemCount = document.querySelector("#nav-cart small")
		const count = JSON.parse(localStorage.getItem("cartData")).length
		navCartItemCount.innerHTML = count
		updateCartCount()
	} else {
		window.location.href = "signin.html"
	}
}

function disableCartBtn(){
	const cart = JSON.parse(localStorage.getItem("cartData"))
	cart.forEach(item => {
		let cartBtn = document.getElementById(`cart-menu-${item["menuId"]}`)
		cartBtn.classList.add("disabled")
	})
}

function updateCartCount(){
	const navCartItemCount = document.querySelector("#nav-cart small")
	
	const cartData = JSON.parse(localStorage.getItem("cartData"))
	if (cartData.length > 0){
		const count = cartData.reduce((n, {qty}) => n + qty, 0)
		navCartItemCount.innerHTML = count
		navCartItemCount.parentElement.style.visibility = 'visible'
	}
}

//Show Cart Items
if (window.location.href.match('http://127.0.0.1:5500/cart.html') != null){
	window.addEventListener("load", showCartItems)
}

function showCartItems(){
	const cartItems = JSON.parse(localStorage.getItem("cartData"))
	const cartTableRows = document.querySelector('.cart-list tbody')
	if (cartItems){
		const itemRows = cartItems.map((item) => {
			return `<tr class="text-center" id="menu-${item.menuId}">
						<td class="product-remove"><a href="#"><span class="icon-close"></span></a></td>
				
						<td class="image-prod"><div class="img" style="background-image:url(${item.menuImg}); background-position: bottom"></div></td>
				
						<td class="product-name">
							<h3>${item.menuName}</h3>
							<p>${item.menuDesc}</p>
						</td>
				
						<td class="price">Rp${item.menuPrice.toLocaleString()}</td>
							
						<td class="quantity">
							<div class="input-group d-flex mb-3">
								<span class="input-group-btn mr-2">
									<button type="button" class="quantity-left-minus btn" data-type="minus" data-field="" onclick="minusQty(event,${item.menuPrice}, ${item.menuId})">
										<i class="icon-minus"></i>
									</button>
								</span>
								<input type="text" name="quantity" class="form-control input-number" value="${item.qty}" min="1" max="100" disabled>
								<span class="input-group-btn ml-2">
									<button type="button" class="quantity-right-plus btn" data-type="plus" data-field="" onclick="plusQty(event,${item.menuPrice}, ${item.menuId})">
										<i class="icon-plus"></i>
									</button>
								</span>
							</div>
						</td>
				
						<td class="total">${item.menuPrice}</td>
					</tr>`
		})
		cartTableRows.innerHTML = itemRows.join("")
		billSum()
	}
}

function plusQty(e, price, id){
	e.preventDefault()
	let quantity = document.querySelector(`#menu-${id} .input-number`)
	let total = document.querySelector(`#menu-${id} .total`)
	let cartItems = JSON.parse(localStorage.getItem("cartData"))
	const idx = cartItems.findIndex((item) => item.menuId === id)
	const item = cartItems[idx]
	if (parseInt(quantity.value) < 100){
		quantity.value = parseInt(quantity.value) + 1
		total.innerHTML = parseInt(quantity.value)*price
		item.qty = parseInt(quantity.value)
		cartItems[idx] = item
		localStorage.setItem('cartData', JSON.stringify(cartItems))
		updateCartCount()
		billSum()
	}
}

function minusQty(e, price, id){
	e.preventDefault()
	let quantity = document.querySelector(`#menu-${id} .input-number`)
	let total = document.querySelector(`#menu-${id} .total`)
	let cartItems = JSON.parse(localStorage.getItem("cartData"))
	const idx = cartItems.findIndex((item) => item.menuId === id)
	const item = cartItems[idx]
	if (parseInt(quantity.value) > 1){
		quantity.value = parseInt(quantity.value) - 1
		total.innerHTML = parseInt(quantity.value)*price
		item.qty = parseInt(quantity.value)
		cartItems[idx] = item
		localStorage.setItem('cartData', JSON.stringify(cartItems))
		updateCartCount()
		billSum()
	}
}

//Sum up the bill
function billSum(){
	const cartItems = JSON.parse(localStorage.getItem("cartData"))
	const balance = JSON.parse(localStorage.getItem("userData"))["balance"]
	let subTotal = 0
	const discount = 0
	let totalBill = 0
	for (item of cartItems){
		subTotal += item.menuPrice * item.qty
	}
	totalBill = subTotal-discount
	document.getElementById("subTotal").innerHTML = `Rp${subTotal.toLocaleString()}`
	document.getElementById("discount").innerHTML = `Rp${discount.toLocaleString()}`
	document.getElementById("totalBill").innerHTML = `Rp${totalBill.toLocaleString()}`
	document.getElementById("balance").innerHTML = `Rp${balance.toLocaleString()}`
}

//Create Order
function createOrder(event){
	event.preventDefault()
	const cartItems = JSON.parse(localStorage.getItem("cartData"))
	const userData = JSON.parse(localStorage.getItem("userData"))
	let data = []
	for (item of cartItems){
		data.push({menu_id :item.menuId, quantity: item.qty})
	}
	fetch('http://127.0.0.1:5000/order/create', {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({order_items : data, user_data: userData})
	})
	.then((response) => response.json())
	.then((jsonResponse) => {
		//clear cartData in localstorage
		console.log(jsonResponse)
		// localStorage.setItem("cartData", JSON.stringify([]))
		
		//show success modal: OK button and 'see order detail' button
		Swal.fire({
			icon: "success",
			title: "Order Successfully Received!",
			text: `${jsonResponse["message"]}`,
			background: "#1E1B1B",
			color: "#fff",
			showCloseButton: true,
			showDenyButton: true,
			confirmButtonColor: "#c49b5d",
			denyButtonColor: "#525253",
			confirmButtonText: "See Order Details",
			denyButtonText: "Create New Order",
		})
		.then((result) => {
			if (result.isConfirmed) {
				window.location.href = "index.html"
			} else if (result.isDenied) {
				window.location.href = "menu.html"
			} else {
				window.location.href = "index.html"
			}
		})
	})
	.catch((err) => console.error(err.message))
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
				localStorage.setItem("cartData", JSON.stringify(jsonResponse["data"]["cart"]))
                if (jsonResponse.data.role === 'admin'){
					console.info('to admin page')
					window.location.href = 'http://127.0.0.1:5500/index.html'
					// window.location.href = 'http://127.0.0.1:5500/admin/index.html'
				} else if (jsonResponse.data.role === 'member'){
					window.location.href = 'http://127.0.0.1:5500/index.html'
				}
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
				setTimeout(()=> {
					let sec = 3
					setInterval(()=> {
						statusBox.innerHTML = `Redirected to Sign in Page in ${sec} second(s)`
						sec-=1
					}, 1000)
					setTimeout(() => window.location.href = "signin.html", 4000)}, 1000)
				
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
	console.log('out')
	e.preventDefault()
	fetch('http://127.0.0.1:5000/user/logout', {
		method: "PUT",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({cartData: JSON.parse(localStorage.getItem("cartData")), userData: JSON.parse(localStorage.getItem("userData"))})
	})
	.then((response) => {
		localStorage.clear()
		window.location.href = "index.html"
	})
	.catch((err)=>{
		console.error(err.message)
	})
}

//Profile
if (window.location.href.match('http://127.0.0.1:5500/signup.html') != null){
	displayUserData(e)
}

const changeToggleBtn = document.getElementById("data-change")
const saveToggleBtn = document.getElementById("data-save")
const usernameInput = document.getElementById("user-name-input")
const userNameText = document.getElementById("user-name-text")
const userEmailText = document.getElementById("user-email-text")
const userBalanceText = document.getElementById("user-balance-text")
const usernameSidebar = document.querySelector(".sidebar .user-name")

function displayUserData(){
	const userData = JSON.parse(localStorage.getItem('userData'))
	usernameSidebar.innerHTML = userData["name"]
	usernameInput.value = userData["name"]
	userNameText.innerHTML = userData["name"]
	userEmailText.innerHTML = userData["email"]
	userBalanceText.innerHTML = `Rp${userData["balance"].toLocaleString()}`
}

function changeToggle(e){
	e.preventDefault()
	saveToggleBtn.style.display = 'inline-block'
	changeToggleBtn.style.display = 'none'
	usernameInput.style.display = 'inline-block'
	userNameText.style.display = 'none'
}

function saveToggle(e){
	e.preventDefault()
	const userData = JSON.parse(localStorage.getItem('userData'))
	fetch('http://127.0.0.1:5000/user/update', {
		method: "PUT",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({name: usernameInput.value, email: userData["email"]})
	})
	.then((response) => response.json())
	.then((jsonResponse) => {
		Swal.fire({
			icon: "success",
			title: "User Data Successfully Changed",
			background: "#1E1B1B",
			color: "#fff",
			showCloseButton: true,
			confirmButtonColor: "#c49b5d",
			confirmButtonText: "OK",
		})
		.then((response) => {
			userData["name"] = usernameInput.value
			localStorage.setItem("userData", JSON.stringify(userData))
			saveToggleBtn.style.display = 'none'
			changeToggleBtn.style.display = 'inline-block'
			usernameInput.style.display = 'none'
			userNameText.style.display = 'inline-block'
			window.location.reload()
		})
	})
}