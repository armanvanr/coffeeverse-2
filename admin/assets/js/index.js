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