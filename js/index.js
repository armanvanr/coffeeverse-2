document.addEventListener("DOMContentLoaded", function () {
	window.scrollTo(0, 0);
})

if (localStorage.length > 0 && localStorage.getItem("userData")) {
	document.getElementById('nav-sign-in').style.display = 'none'
	document.getElementById('nav-cart').style.display = 'block'
	document.getElementById('nav-sign-out').style.display = 'block'
	document.getElementById('nav-profile').style.display = 'block'
	updateCartCount()
	const joinBtns = document.querySelectorAll(".home-slider .btn-primary")
	for (let button of joinBtns) {
		button.style.display = "none"
	}
} else {
	document.getElementById('nav-sign-in').style.display = 'block'
	document.getElementById('nav-cart').style.display = 'none'
	document.getElementById('nav-sign-out').style.display = 'none'
	document.getElementById('nav-profile').style.display = 'none'
}

//Top 5 Coffee
const homeUrlPath = ['/', '/index.html']
if (homeUrlPath.includes(window.location.pathname)) {
	window.addEventListener("load", getTopMenu)
}
async function getTopMenu() {
	const bestSellerContainer = document.getElementById("best-seller-container")
	try {
		const response = await fetch('http://127.0.0.1:5000/menu/top5', {
			method: "GET",
			headers: { "Content-type": "application/json; charset=UTF-8" }
		})
		if (response.ok) {
			const jsonResponse = await response.json()
			const cards = jsonResponse["data"]["drinks"].map((menu) => {
				return `<div class="col-md-4">
        					<div class="menu-entry menu-card-${menu.id}">
    							<a href="#" class="img" style="background-image: url(${menu.img_url});"></a>
    							<div class="text text-center pt-4">
    								<h3><a href="#">${menu.name}</a></h3>
    								<p class="desc">${menu.desc}</p>
    								<p class="price"><span>Rp${menu.price.toLocaleString()}</span></p>
    								<div class="topMenu">
										<a class="btn btn-primary btn-outline-primary" id="cart-menu-${menu.id}" onclick="addItemToCart(event, ${menu.id}, ${menu.stock})">Add to cart</a>
										<div class="added__animation"><span>+1</span></div>
									</div>
    							</div>
    						</div>
        				</div>`
			})
			bestSellerContainer.innerHTML = cards.join('<br/>')

			if (localStorage.length > 0) {
				updateCartCount()
			}
		} else {
			throw await response.json()
		}
	} catch (err) {
		console.error(err.message)
	}
}

//Show All Menu Items
if (window.location.pathname === '/menu.html') {
	window.addEventListener("load", fetchAllMenu)
}
async function fetchAllMenu() {
	let drinksContainer = document.querySelector("#all-drinks-container")
	let foodsContainer = document.querySelector("#all-foods-container")
	try {
		const response = await fetch('http://127.0.0.1:5000/menu/available', {
			method: "GET",
			headers: { "Content-type": "application/json; charset=UTF-8" }
		})
		if (response.ok) {
			const jsonResponse = await response.json()
			for (let category in jsonResponse["data"]) {
				const cards = jsonResponse["data"][`${category}`].map((menu) => {
					return `<div class="col-md-4 text-center">
								<div class="menu-wrap menu-card-${menu.id}">
									<a href="#" class="menu-img img mb-4" style="background-image: url(${menu.img_url});"></a>
									<div class="text">
										<h3><a href="#">${menu.name}</a></h3>
										<p class="desc pt-1">${menu.desc}</p>
										<p class="price"><span>Rp${menu.price.toLocaleString()}</span></p>
										<div class="allMenu">
											<a class="btn btn-primary btn-outline-primary" id="cart-menu-${menu.id}" onclick="addItemToCart(event, ${menu.id}, ${menu.stock})">Add to cart</a>
											<div class="added__animation"><span>+1</span></div>
										</div>
									</div>
								</div>
							</div>`
				})
				if (category === "drinks") {
					drinksContainer.innerHTML = cards.join('<br/>')
				} else {
					foodsContainer.innerHTML = cards.join('<br/>')
				}
			}

			if (localStorage.length > 0) {
				updateCartCount()
			}
		} else {
			throw await response.json()
		}
	} catch (err) {
		console.error(err.message)
	}
}

async function searchMenu(event) {
	event.preventDefault()
	let searchResultContainer = document.getElementById("menu-search-container")
	const searchValue = document.getElementById("search-field").value
	try {
		const response = await fetch('http://127.0.0.1:5000/menu/search?' + new URLSearchParams({ keyword: searchValue }), {
			method: "GET",
			headers: { "Content-type": "application/json; charset=UTF-8" }
		})
		if (response.ok) {
			const jsonResponse = await response.json()
			const cards = jsonResponse["data"]["results"].map((menu) => {
				return `<div class="col-md-4 text-center">
							<div class="menu-wrap" id="wrapper-${menu.id}">
								<a href="#" class="menu-img img mb-4" style="background-image: url(${menu.img_url}); background-position: ${menu.category === 'drinks' ? 'bottom' : 'center'}"></a>
								<div class="text">
									<h3><a href="#">${menu.name}</a></h3>
									<p class="desc pt-1">${menu.desc}</p>
									<p class="price"><span>Rp${menu.price.toLocaleString()}</span></p>
									<div class="searchMenu">
										<a class="btn btn-primary btn-outline-primary" id="cart-menu-${menu.id}" onclick="addItemToCart(event, ${menu.id}, ${menu.stock})">Add to cart</a>
										<div class="added__animation"><span>+1</span></div>
									</div>
								</div>
							</div>
						</div>`
			})
			searchResultContainer.innerHTML = cards.join('<br/>')

			if (localStorage.length > 0) {
				updateCartCount()
			}
		} else {
			throw await response.json()
		}
	} catch (err) {
		console.error(err.message)
	}
}


async function addItemToCart(event, menuId, menuStock) {
	event.preventDefault()
	if (localStorage.length > 0) {
		const menuName = document.querySelector(`.menu-card-${menuId} .text h3 a`).innerHTML
		const menuImg = document.querySelector(`.menu-card-${menuId} a`).style.backgroundImage.split('"')[1]
		const menuDesc = document.querySelector(`.menu-card-${menuId} .text .desc`).innerHTML
		const menuPrice = document.querySelector(`.menu-card-${menuId} .price span`).innerHTML.slice(2).replace(',', '')
		const cart = JSON.parse(localStorage.getItem("cartData"))
		const addedItem = cart.find(item => item.menuId === menuId)
		if (addedItem) {
			if (addedItem.qty < addedItem.menuStock) {
				addedItem.qty += 1
			} else {
				Swal.fire({
					icon: "warning",
					title: "Oops",
					text: "Maximum item quantity reached",
					background: "#1E1B1B",
					color: "#fff",
					showCloseButton: true,
					confirmButtonColor: "#c49b5d",
					confirmButtonText: "OK",
					focusConfirm: false,
				})
					.then((result) => { return False })
			}
		} else {
			cart.push({
				menuId: menuId,
				menuName: menuName,
				menuImg: menuImg,
				menuDesc: menuDesc,
				menuPrice: parseInt(menuPrice),
				menuStock: menuStock,
				qty: 1
			})
		}
		localStorage.setItem("cartData", JSON.stringify(cart))
		const cartBtn = event.target
		const plusOne = cartBtn.nextElementSibling
		plusOne.classList.add("clicked")
		setTimeout(function () { plusOne.classList.remove("clicked") }, 600)

		const navCartItemCount = document.querySelector("#nav-cart small")
		const count = JSON.parse(localStorage.getItem("cartData")).length
		navCartItemCount.innerHTML = count
		updateCartCount()
	} else {
		window.location.href = "signin.html"
	}
}

function updateCartCount() {
	const navCartItemCount = document.querySelector("#nav-cart small")

	const cartData = JSON.parse(localStorage.getItem("cartData"))
	if (cartData !== null && cartData.length > 0) {
		const count = cartData.reduce((n, { qty }) => n + qty, 0)
		navCartItemCount.innerHTML = count
		navCartItemCount.parentElement.style.visibility = "visible"
	}
	else {
		navCartItemCount.innerHTML = ""
		navCartItemCount.parentElement.style.visibility = "hidden"
	}
}

//Show Cart Items
if (window.location.pathname === '/cart.html') {
	window.addEventListener("load", showCartItems)
}

function showCartItems() {
	const cartItems = JSON.parse(localStorage.getItem("cartData"))
	const cartTableRows = document.querySelector('.cart-list tbody')
	if (cartItems.length === 0) {
		window.location.href = '/index.html'
	}
	if (cartItems) {
		const itemRows = cartItems.map((item) => {
			return `<tr class="text-center" id="menu-${item.menuId}">
						<td class="product-remove"><a href="" onclick="removeItemFromCart(event, ${item.menuId}, ${item.qty})"><span class="icon-close"></span></a></td>
				
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

function plusQty(e, price, id) {
	e.preventDefault()
	let quantity = document.querySelector(`#menu-${id} .input-number`)
	let total = document.querySelector(`#menu-${id} .total`)
	let cartItems = JSON.parse(localStorage.getItem("cartData"))
	const idx = cartItems.findIndex((item) => item.menuId === id)
	const item = cartItems[idx]

	if (item.qty < item.menuStock) {
		quantity.value = parseInt(quantity.value) + 1
		total.innerHTML = parseInt(quantity.value) * price
		item.qty = parseInt(quantity.value)
		cartItems[idx] = item
		localStorage.setItem("cartData", JSON.stringify(cartItems))
		updateCartCount()
		billSum()
	} else {
		Swal.fire({
			icon: "warning",
			title: "Oops",
			text: "Maximum item quantity reached",
			background: "#1E1B1B",
			color: "#fff",
			showCloseButton: true,
			confirmButtonColor: "#c49b5d",
			confirmButtonText: "OK",
			focusConfirm: false,
		})
	}
}

function minusQty(e, price, id) {
	e.preventDefault()
	let quantity = document.querySelector(`#menu-${id} .input-number`)
	let total = document.querySelector(`#menu-${id} .total`)
	let cartItems = JSON.parse(localStorage.getItem("cartData"))
	const idx = cartItems.findIndex((item) => item.menuId === id)
	const item = cartItems[idx]

	if (parseInt(quantity.value) > 1) {
		quantity.value = parseInt(quantity.value) - 1
		total.innerHTML = parseInt(quantity.value) * price
		item.qty = parseInt(quantity.value)
		cartItems[idx] = item
		localStorage.setItem("cartData", JSON.stringify(cartItems))
		updateCartCount()
		billSum()
	}
}

//Remove item from cart
function removeItemFromCart(e, menuId) {
	e.preventDefault()
	const cart = JSON.parse(localStorage.getItem("cartData"))

	const newCart = cart.filter(item => item.menuId !== menuId)
	localStorage.setItem("cartData", JSON.stringify(newCart))

	updateCartCount()
	showCartItems()
	billSum()
	const currentCart = JSON.parse(localStorage.getItem("cartData"))
	if (currentCart.length === 0) {
		window.location.href = '/index.html'
	}
}

//Sum up the bill
function billSum() {
	const cartItems = JSON.parse(localStorage.getItem("cartData"))
	const balance = JSON.parse(localStorage.getItem("userData"))["balance"]
	let subTotal = 0
	const discount = 0
	let totalBill = 0
	for (item of cartItems) {
		subTotal += item.menuPrice * item.qty
	}
	totalBill = subTotal - discount
	document.getElementById("subTotal").innerHTML = `${subTotal.toLocaleString()}`
	document.getElementById("discount").innerHTML = `${discount.toLocaleString()}`
	document.getElementById("totalBill").innerHTML = `${totalBill.toLocaleString()}`
	document.getElementById("balance").innerHTML = `${balance.toLocaleString()}`
}


//Create Order
function createOrder(event) {
	event.preventDefault()
	const cartItems = JSON.parse(localStorage.getItem("cartData"))
	const userData = JSON.parse(localStorage.getItem("userData"))
	let data = []
	for (item of cartItems) {
		data.push({ menu_id: item.menuId, quantity: item.qty })
	}
	fetch('http://127.0.0.1:5000/order/create', {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ order_items: data, user_data: userData })
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
		.then((jsonResponse) => {
			//clear cartData in localstorage
			localStorage.setItem("cartData", JSON.stringify([]))

			//show success modal: OK button, 'see order detail' button, and cancel button (if waiting list)
			let swalParams = {
				icon: "success",
				title: "Order Successfully Received!",
				text: `${jsonResponse["message"]}`,
				background: "#1E1B1B",
				color: "#fff",
				showCloseButton: true,
				confirmButtonColor: "#c49b5d",
				confirmButtonText: "Create New Order",
				focusConfirm: false,
			}
			if (jsonResponse["data"]["status"] === "waiting-list") {
				swalParams = {
					...swalParams,
					icon: "info",
					showCancelButton: true,
					cancelButtonColor: "#525253",
					cancelButtonText: "See My Order",
					focusCancel: false
				}
			}
			Swal.fire(swalParams)
				.then((result) => {
					if (result.isConfirmed) {
						window.location.href = "menu.html"
					} else if (result.isDismissed) {
						window.location.href = "orders.html"
					} else {
						window.location.href = "index.html"
					}
				})
		})
		.catch((err) => {
			err.json()
				.then((jsonError) => {
					console.error(jsonError.message)
					Swal.fire({
						icon: "error",
						title: "Failed to create an order",
						text: `${jsonError["message"]}`,
						background: "#1E1B1B",
						color: "#fff",
						showCloseButton: true,
						confirmButtonColor: "#c49b5d",
						confirmButtonText: "Change My Order",
						focusConfirm: false,
					})
				})
		})
}

//Cancel Order
function cancelOrder(e, orderId) {
	e.preventDefault()
	Swal.fire({
		icon: "warning",
		title: "Order Cancellation",
		text: "Are you sure you want to cancel this order?",
		background: "#1E1B1B",
		color: "#fff",
		showCloseButton: true,
		confirmButtonColor: "#c49b5d",
		confirmButtonText: "Yes",
		showCancelButton: true,
		cancelButtonColor: "#525253",
		cancelButtonText: "No",
		focusConfirm: false,
		focusClose: false
	})
		.then((result) => {
			if (result.isConfirmed) {
				fetch(`http://127.0.0.1:5000/order/cancel/${orderId}`, {
					method: "PUT",
					headers: { "Content-type": "application/json; charset=UTF-8" },
					body: JSON.stringify({ userData: JSON.parse(localStorage.getItem("userData")) })
				})
					.then((response) => response.json())
					.then((jsonResponse) => {
						Swal.fire({
							icon: "success",
							title: "Order Cancelled",
							background: "#1E1B1B",
							color: "#fff",
							showCloseButton: true,
							confirmButtonColor: "#c49b5d",
							confirmButtonText: "OK",
							focusConfirm: false,
						})
							.then((result) => {
								window.location.reload()
							})
					})
					.catch((err) => console.error(err.message))
			}
			else {
				return false
			}
		})
}

//Sign In
if (window.location.pathname === '/signin.html') {
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
		method: "POST",
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
if (window.location.pathname === '/signup.html') {
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
	if (!name || !email || !password || !confirmPassword) {
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
				setTimeout(() => {
					let sec = 3
					setInterval(() => {
						statusBox.innerHTML = `Redirected to Sign in Page in ${sec} second(s)`
						sec -= 1
					}, 1000)
					setTimeout(() => window.location.href = "signin.html", 4000)
				}, 1000)

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
let signOutBtn = document.getElementById("nav-sign-out")
signOutBtn.addEventListener("click", signout)
function signout(e) {
	e.preventDefault()
	fetch('http://127.0.0.1:5000/user/logout', {
		method: "PUT",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ cartData: JSON.parse(localStorage.getItem("cartData")), userData: JSON.parse(localStorage.getItem("userData")) })
	})
		.then((response) => {
			localStorage.clear()
			window.location.href = "index.html"
		})
		.catch((err) => {
			console.error(err.message)
		})
}

// Member Account Page
const accountUrlPath = ['/profile.html', '/orders.html', '/ewallet.html']
if (accountUrlPath.includes(window.location.pathname)) {
	displaySidebar()
}

if (window.location.pathname === '/profile.html') {
	displayUserData()
}

// Display user data in sidebar
function displaySidebar() {
	const userData = JSON.parse(localStorage.getItem("userData"))
	fetch('http://127.0.0.1:5000/user/details', {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ email: userData["email"] })
	})
		.then((response) => response.json())
		.then((jsonResponse) => {
			const balance = jsonResponse["data"]["balance"]
			const userName = jsonResponse["data"]["name"]
			const userBalanceText = document.getElementById("user-balance-text")
			const usernameSidebar = document.querySelector(".sidebar .user-name")
			userBalanceText.innerHTML = `Rp${balance.toLocaleString()}`
			usernameSidebar.innerHTML = userName

			const userData = JSON.parse(localStorage.getItem("userData"))
			userData["balance"] = balance
			localStorage.setItem("userData", JSON.stringify(userData))
		})
		.catch((err) => console.error(err.message))
}

// Display user data in profile content
function displayUserData() {
	const userData = JSON.parse(localStorage.getItem("userData"))
	const usernameInput = document.getElementById("user-name-input")
	const userNameText = document.getElementById("user-name-text")
	const userEmailText = document.getElementById("user-email-text")
	usernameInput.value = userData["name"]
	userNameText.innerHTML = userData["name"]
	userEmailText.innerHTML = userData["email"]
}

const changeToggleBtn = document.getElementById("data-change")
function changeToggle(e) {
	e.preventDefault()
	const usernameInput = document.getElementById("user-name-input")
	const userNameText = document.getElementById("user-name-text")
	saveToggleBtn.style.display = "inline-block"
	changeToggleBtn.style.display = "none"
	usernameInput.style.display = "inline-block"
	userNameText.style.display = "none"
}

const saveToggleBtn = document.getElementById("data-save")
function saveToggle(e) {
	e.preventDefault()
	const usernameInput = document.getElementById("user-name-input")
	const userData = JSON.parse(localStorage.getItem("userData"))
	fetch('http://127.0.0.1:5000/user/update', {
		method: "PUT",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ name: usernameInput.value, email: userData["email"] })
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
				focusConfirm: false
			})
				.then((response) => {
					userData["name"] = usernameInput.value
					localStorage.setItem("userData", JSON.stringify(userData))
					saveToggleBtn.style.display = "none"
					changeToggleBtn.style.display = "inline-block"
					window.location.reload()
				})
		})
}

// Display all orders created by user
if (window.location.pathname === '/orders.html') {
	window.addEventListener("load", getAllOrders)
}
function getAllOrders() {
	const orderCardsContainer = document.querySelector(".order-cards-container")
	const email = JSON.parse(localStorage.getItem("userData"))["email"]
	fetch('http://127.0.0.1:5000/orders/user', {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ email: email })
	})
		.then((response) => response.json())
		.then((jsonResponse) => {
			const orders = jsonResponse["data"]["order_list"]
			const statusColor = {
				"in-process": "#77a8e9",
				"waiting-list": "#f8b500",
				"completed": "#4bb543",
				"cancelled": "#ff3f3f"
			}
			const cards = orders.map((order) => {
				const orderItems = order.items.join(", ")
				const createdDate = order.created_date.slice(0, 16)
				return `<div class="order-card">
						<div class="order-card-header">
							<h6 class="order-id-group">Order ID: <strong>${order.id}</strong></h6>
							<a href="" class="nav-link dropdown-toggle" id="cardDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="icon icon-more_vert"></span></a>
							<div class="dropdown-menu" aria-labelledby="cardDropdown">
								<a class="dropdown-item"><span class="icon icon-info-circle"></span>Details</a>
								<a class="dropdown-item" onclick="cancelOrder(event, ${order.id})" ${order.status === "waiting-list" ? "" : "hidden"}><span class="icon icon-times-circle"></span>Cancel Order</a>
							</div>
						</div>
						<div class="order-card-body">
							<div class="order-date-status-group">
								<div class="order-date">${createdDate}</div>
								<div class="order-status" style="color: ${statusColor[order.status]}">${order.status}</div>
							</div>
							<div class="menu-group">
								<div class="item-names">${order.items.length} item(s): ${orderItems}</div>
								<div class="total-bill">Total Rp<strong>${order.total_bill.toLocaleString()}</strong></div>
							</div>
						</div>
					</div>`
			})
			orderCardsContainer.innerHTML = cards.join("")
		})
}

//Display Balance Transaction
if (window.location.pathname === '/ewallet.html') {
	window.addEventListener("load", getAllWalletRecords)
}
function getAllWalletRecords() {
	const walletCardsContainer = document.querySelector(".wallet-cards-container")
	const email = JSON.parse(localStorage.getItem("userData"))["email"]
	fetch('http://127.0.0.1:5000/balance/user', {
		method: "POST",
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify({ email: email })
	})
		.then((response) => response.json())
		.then((jsonResponse) => {
			const records = jsonResponse["data"]["record_list"]
			let balanceDate
			const iconType = {
				"topup": "icon-dollar",
				"payment": "icon-coffee",
				"refund": "icon-undo"
			}
			function capitalize(word){
				return word.charAt(0).toUpperCase()+word.slice(1)
			}
			const cards = records.map((record) => {
				if (record.completed_date) {
					balanceDate = record.completed_date.slice(0, 16)
				} else {
					balanceDate = record.created_date.slice(0, 16)
				}
				const recordType = capitalize(record.type)
				return `<div class="wallet-card">
							<div class="wallet-card-header">
								<h6 class="wallet-date">${balanceDate}</h6>
								<a href="" class="nav-link"><span class="icon icon-info-circle"></span></a>
							</div>
							<div class="wallet-card-body d-flex justify-content-between">
								<div class="wallet-type"><div class="icon ${iconType[record.type]}"></div><div><em>${recordType}</em></div></div>
								<div class="nominal" style="color: ${record.type === "topup"? "#4bb543" : "inherit"}">
									<span style="${record.type === "topup"? "display: flex; color: #4bb543" : "display: none"}">+&nbsp;</span>
									<strong>Rp${record.nominal.toLocaleString()}</strong>
								</div>
							</div>
						</div>`
			})
			walletCardsContainer.innerHTML = cards.join("")
		})
}