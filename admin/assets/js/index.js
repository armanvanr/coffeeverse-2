if (window.location.href.match("http://127.0.0.1:5500/admin/index.html") && localStorage.length===0){
    window.location.href = "./signin.html"
}

function signin(e){
    e.preventDefault()
    const email = document.getElementById("signinEmail").value
    const password = document.getElementById("signinPassword").value
    let token = btoa(email + ":" + password)
    let myHeaders = new Headers()
    myHeaders.append("Authorization", "Basic" + " " + token)
    myHeaders.append("Content-type", "application/json; charset=UTF-8")
    fetch('http://127.0.0.1:5000/admin/login', {
        method: "POST",
        headers: myHeaders
    })
    .then((response) => {
        if (response.ok){
            return response.json()
        } else {
            throw response
        }
    })
    .then((jsonResponse) => {
        Swal.fire({
			icon: "success",
			title: "Success!",
            text: `${jsonResponse["message"]}`,
			showCloseButton: true,
			confirmButtonText: "OK",
		})
        .then((result) =>{
            localStorage.setItem("adminData", JSON.stringify(jsonResponse["data"]))
            window.location.href = "./index.html"
        })
    })
    .catch((err) => {
        err.json()
        .then((jsonError) => {
            console.error(err.message)
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: `${jsonError["message"]}`,
                showCloseButton: true,
                confirmButtonText: "OK",
            })
        })
    })
}

if (window.location.href.match('http://127.0.0.1:5500/admin/index.html') != null){
    window.addEventListener("load", dipslayTopMemberOrder)
	window.addEventListener("load", dipslayTopMemberSpend)
	window.addEventListener("load", dipslayTopMenuOrder)
	window.addEventListener("load", dipslayLowStockMenu)
}

const topMemberOrderTable = document.querySelector("#topMemberOrderTable tbody")
async function dipslayTopMemberOrder(){
    try{
        const response = await fetch('http://127.0.0.1:5000/users/top5/order', {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        const jsonResponse = await response.json()
        const memberList = jsonResponse["data"]["members"]
        const rows = memberList.map((member) => {
            return `<tr>
                        <td>${member.name}</td>
                        <td>${member.email}</td>
                        <td>${member.order_times}</td>
                    </tr>`
        })
        topMemberOrderTable.innerHTML = rows.join("")
    } catch(err){
        console.error(err.message)
    }
}


const topMemberSpendTable = document.querySelector("#topMemberSpendTable tbody")
async function dipslayTopMemberSpend(){
    try{
        const response = await fetch('http://127.0.0.1:5000/users/top5/spend', {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        const jsonResponse = await response.json()
        const memberList = jsonResponse["data"]["members"]
        const rows = memberList.map((member) => {
            return `<tr>
                        <td>${member.name}</td>
                        <td>${member.email}</td>
                        <td>${member.bill_sum.toLocaleString()}</td>
                    </tr>`
        })
        topMemberSpendTable.innerHTML = rows.join("")
    } catch(err){
        console.error(err.message)
    }
}

const topMenuOrderTable = document.querySelector("#topMenuOrderTable tbody")
async function dipslayTopMenuOrder(){
    try{
        const response = await fetch('http://127.0.0.1:5000/menu/top5/order', {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        const jsonResponse = await response.json()
        const menuList = jsonResponse["data"]["menu_list"]
        const rows = menuList.map((menu) => {
            return `<tr>
                        <td>${menu.name}</td>
                        <td>${menu.price}</td>
                        <td>${menu.times.toLocaleString()}</td>
                    </tr>`
        })
        topMenuOrderTable.innerHTML = rows.join("")
    } catch(err){
        console.error(err.message)
    }
}

const lowStockMenuTable = document.querySelector("#lowStockMenuTable tbody")
async function dipslayLowStockMenu(){
    try{
        const response = await fetch('http://127.0.0.1:5000/menu/lowstock', {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        const jsonResponse = await response.json()
        const menuList = jsonResponse["data"]["menu_list"]
        const rows = menuList.map((menu) => {
            return `<tr>
                        <td>${menu.name}</td>
                        <td>${menu.price}</td>
                        <td>${menu.stock.toLocaleString()}</td>
                    </tr>`
        })
        lowStockMenuTable.innerHTML = rows.join("")
    } catch(err){
        console.error(err.message)
    }
}

const menuTableBody = document.querySelector(".table-responsive tbody")
if (window.location.href.match('http://127.0.0.1:5500/admin/menu.html') != null){
	window.addEventListener("load", displayAllMenu)
}

function displayAllMenu(){
    fetch('http://127.0.0.1:5000/menu/all', {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
        const menuList = jsonResponse["data"]["menu_list"]
        const rows = menuList.map((menu) => {
            return `<tr>
                        <td><strong>${menu.name}</strong></td>
                        <td>${menu.price.toLocaleString()}</td>
                        <td>${menu.stock}</td>
                        <td><span class="badge bg-label-${menu.category==="drinks"? "success":"warning"} me-1">${menu.category}</span></td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                  <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="getMenuDetails(${menu.id}, event)">
                                        <i class="bx bx-info-circle mx-1"></i>Details
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <i class="bx bx-trash mx-1"></i>Delete
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>`
        })
        menuTableBody.innerHTML = rows.join("")
    })
    .catch((err) => console.error(err.message))
}

const addModal = document.getElementById("addModal")
async function addMenu(e){
    e.preventDefault()
    const nameValue = addModal.querySelector("#nameAdd").value 
    const categoryValue = addModal.querySelector("#categoryAdd").value 
    const priceValue = parseInt(addModal.querySelector("#priceAdd").value )
    const stockValue = parseInt(addModal.querySelector("#stockAdd").value )
    const imgUrlValue = addModal.querySelector("#imgUrlAdd").value 
    const descValue = addModal.querySelector("#descAdd").value
    const data = {
        name: nameValue,
        category: categoryValue,
        price: priceValue,
        stock: stockValue,
        img_url: imgUrlValue,
        desc: descValue
    }
    try {
        const response = await fetch('http://127.0.0.1:5000/menu', {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        })
        const jsonResponse = await response.json()
        Swal.fire({
			icon: "success",
			title: "Success!",
            text: `${jsonResponse["message"]}`,
			showCloseButton: true,
			confirmButtonText: "OK",
		})
        .then((result) =>{
            window.location.reload()
        })
    } catch(err) {
        console.error(err.message)
    }
    
}

function resetForm(e){
    e.preventDefault()
    fieldList = document.querySelectorAll("#addModal input, #addModal select, #addModal textarea")
    for (let field of fieldList){
        field.value = ''
    }
}

const detailsModal = document.getElementById("detailsModal")
function getMenuDetails(menuId, e){
    e.preventDefault()
    fetch(`http://127.0.0.1:5000/menu/${menuId}`, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
        const menu = jsonResponse["data"]["details"]
        detailsModal.querySelector("img").src = `${menu.img_url}`
        detailsModal.querySelector("h5").innerHTML = `${menu.name}`
        detailsModal.querySelector(".card-text").innerHTML = `${menu.desc}`
        detailsModal.querySelector(".price-text").innerHTML = `Rp${menu.price.toLocaleString()}`
        detailsModal.querySelector(".stock-text").innerHTML = `${menu.stock} units`
        const menuDetails = {
            id: menuId,
            imgUrl: menu.img_url,
            name: menu.name,
            desc: menu.desc,
            price: menu.price,
            stock: menu.stock,
            category: menu.category
        }
        localStorage.setItem("menuDetails", JSON.stringify(menuDetails))
    })
    .catch((err) => console.error(err.message))
}

const editModal = document.getElementById("editModal")
function editMenuDetails(e){
    e.preventDefault()
    const selectedMenu = JSON.parse(localStorage.getItem("menuDetails"))
    editModal.querySelector("#nameEdit").value = selectedMenu["name"]
    editModal.querySelector("#categoryEdit").value = selectedMenu["category"]
    editModal.querySelector("#priceEdit").value = selectedMenu["price"]
    editModal.querySelector("#stockEdit").value = selectedMenu["stock"]
    editModal.querySelector("#imgUrlEdit").value = selectedMenu["imgUrl"]
    editModal.querySelector("#descEdit").value = selectedMenu["desc"]
}   

function saveChanges(e){
    e.preventDefault()
    const nameValue = editModal.querySelector("#nameEdit").value 
    const categoryValue = editModal.querySelector("#categoryEdit").value 
    const priceValue = parseInt(editModal.querySelector("#priceEdit").value )
    const stockValue = parseInt(editModal.querySelector("#stockEdit").value )
    const imgUrlValue = editModal.querySelector("#imgUrlEdit").value 
    const descValue = editModal.querySelector("#descEdit").value
    const data = {
        name: nameValue,
        category: categoryValue,
        price: priceValue,
        stock: stockValue,
        img_url: imgUrlValue,
        desc: descValue
    }
    const menuId = JSON.parse(localStorage.getItem("menuDetails"))["id"]
    fetch(`http://127.0.0.1:5000/menu/${menuId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
        Swal.fire({
			icon: "success",
			title: "Success!",
            text: "Menu Data Successfully Changed",
			showCloseButton: true,
			confirmButtonText: "OK",
		})
        .then((result) =>{
            localStorage.setItem("menuDetails", "{}")
            window.location.reload()
        })
    })
    .catch((err) => console.error(err.message))
}

const orderTableBody = document.querySelector(".table-responsive tbody")
if (window.location.href.match('http://127.0.0.1:5500/admin/orders.html') != null){
	window.addEventListener("load", displayAllOrders)
}
function displayAllOrders(){
    fetch('http://127.0.0.1:5000/orders/all', {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
        const orderList = jsonResponse["data"]["order_list"]
        const badgeColor = {
            "in-process": "primary",
            "waiting-list": "warning",
            "completed": "success",
            "cancelled": "danger"
        }

        const actionType = {
            "in-process": {
                "eventListener": "completeOrder",
                "icon": "check",
                "text": "Complete"
            },
            "waiting-list": {
                "eventListener": "cancelOrder",
                "icon": "x",
                "text": "Cancel"
            },
            "completed": {
                "icon": "",
                "text": ""
            },
            "cancelled": {
                "icon": "",
                "text": ""
            },
        }
        const rows = orderList.map((order) => {
            const btnElement =`<a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" onclick="${actionType[order.status]["eventListener"]}(event, ${order["id"]})">
                                <i class="bx bx-${actionType[order.status]["icon"]}-circle mx-1"></i>${actionType[order.status]["text"]}
                            </a>`
            const orderActionElement = {
                "in-process": btnElement,
                "waiting-list": btnElement,
                "completed": "",
                "cancelled": ""
            }
            return `<tr>
                        <td>${order.id}</td>
                        <td>${order.customer_name}</td>
                        <td>${order.total_bill}</td>
                        <td><span class="badge bg-label-${badgeColor[order.status]} me-1">${order.status}</span></td>
                        <td>${order.created_date}</td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                  <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#orderDetailsModal" onclick="">
                                        <i class="bx bx-info-circle mx-1"></i>Details
                                    </a>
                                    ${orderActionElement[order.status]}
                                </div>
                            </div>
                        </td>
                    </tr>`
        })
        orderTableBody.innerHTML = rows.join("")
    })
    .catch((err) => console.error(err.message))
}

function completeOrder(e, orderId){
    e.preventDefault()
    fetch(`http://127.0.0.1:5000/order/complete/${orderId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
        Swal.fire({
			icon: "success",
			title: "Success!",
            text: `${jsonResponse["message"]}`,
			showCloseButton: true,
			confirmButtonText: "OK",
		})
        .then((result) =>{
            window.location.reload()
        })
    })
}