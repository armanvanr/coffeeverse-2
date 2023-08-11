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
                        <td>Rp${menu.price.toLocaleString()}</td>
                        <td>${menu.stock}</td>
                        <td><span class="badge bg-label-${menu.category==="drinks"? "success":"warning"} me-1">${menu.category}</span></td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                  <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#modalDetails"
                                    ><i class="bx bx-info-circle mx-1"></i>Details</a
                                  >
                                  <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#modalDelete"
                                    ><i class="bx bx-trash mx-1"></i>Delete</a
                                  >
                                </div>
                            </div>
                        </td>
                    </tr>`
        })
        menuTableBody.innerHTML = rows.join("")
    })
    .catch((err) => console.error(err.message))
}

const tableRows = menuTableBody.querySelectorAll("tr")
for (let row of tableRows){
    row.addEventListener("click", function(event){
        showRowDetails(event)
    })
}

function showRowDetails(e){
    // e.preventDefault()
    console.log(1)
}