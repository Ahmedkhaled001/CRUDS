//------------------- 1-get total ------------------------
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let disscount = document.getElementById("disscount")
let tot = document.getElementById("tot")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let updateMode = "create"
let tmp


function gettotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value ) - +disscount.value
        tot.innerHTML = (result)
        tot.style.backgroundColor = "#040"
    }else{
        tot.innerHTML = "";
        tot.style.backgroundColor = "rgb(191, 8, 8)";
    }
}


//---------------------------------------------------------------------------------------------------//
//--------------------- 2-create ----------------------

let dataPro =[]
//لو في داتا 
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
    
}

submit.onclick = function(){
    //way to create object
    if(updateMode === "create" && title.value != "" && price.value != "" && category.value != "" && count.value != ""){

        document.getElementById("comment-ifnull").innerHTML=""
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        disscount:disscount.value,
        count:count.value,
        category:category.value.toLowerCase(),
        tot:tot.innerHTML,
    }
    //-------- 8-count ----------//
    console.log("dfd")
    if(updateMode === "create"){
        if(newPro.count != null){
        for(let i = 0; i <= newPro.count; i++){
            dataPro.push(newPro)
        }
        }

    }else{
        dataPro[tmp] = newPro
        submit.innerHTML = "Create"
        updateMode = "create"
        count.style.display = "block"

    }
    
    //---------- 3-save to localstorage ----------------
    localStorage.setItem("product", JSON.stringify(dataPro))

    cleanData()
    showData()

}else{
    document.getElementById("comment-ifnull").innerHTML="*please add title , price , category and count"
}}
//---------------------------------------------------------------------------------------------------//
//------- 4-clean data from inputboxes after click on create --------
function cleanData(){
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    disscount.value = ""
    count.value = ""
    category.value = ""
    tot.innerHTML = ""

}
//---------------------------------------------------------------------------------------------------//
//------ 5-read data at table ---------
function showData(){
    gettotal()
    let table = ""
    for ( let i = 1; i < dataPro.length; i++){
        table += `
        <tbody>
            <td>${[i]}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].taxes}</td>
            <td><button id="update" onclick=updateData(${i})>Update</button></td>
            <td><button id="delete" onclick=deleteElement(${i})>Delete</button></td>
        </tbody>
        `

    }
    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("deleteAll")
    if(dataPro.length > 0){btnDelete.innerHTML = `
    <button onclick = deleteAll()>Delete All (${dataPro.length - 1})</button>
    `
    }else{
        btnDelete.innerHTML = ''
    }
}
showData()
//---------------------------------------------------------------------------------------------------//

//------- 6-Delete element-------//
function deleteElement(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()

}
//---------------------------------------------------------------------------------------------------//

//-------- 7-Delete all ----------//
function deleteAll(){
    dataPro.splice(0)
    localStorage.clear()
    showData()

}
//---------------------------------------------------------------------------------------------------//

//-------- 8-Update ----------//


function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    ads.value = dataPro[i].ads
    taxes.value = dataPro[i].taxes
    category.value = dataPro[i].category
    disscount.value = dataPro[i].disscount
    count.style.display = "none"
    submit.innerHTML = "Update"
    updateMode = "update"
    gettotal()
    tmp = i
    scroll({
        top: 0,
        behavior: "smooth",
    })



}

//---------------------------------------------------------------------------------------------------//

//-------- 9-Search ----------//
let search = document.getElementById("searchBox")
let searchMode = "title"

function getSearchMode(id){
    if(id === 'searchTitle'){
        searchMode = "title"
        search.placeholder = "Search By Title"
    }else{
        searchMode = "category"
        search.placeholder = "Search By Category"
    }
    search.focus()
    search.value = ''
    showData()
}

function searchData(value){
    let table = ''
    for(let i = 0; dataPro.length; i++){
        if(searchMode == "title"){
                if(dataPro[i].title.includes(value.toLowerCase())){
                    table += `
                        <tbody>
                            <td>${[i]}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].category}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td><button id="update" onclick=updateData(${i})>Update</button></td>
                            <td><button id="delete" onclick=deleteElement(${i})>Delete</button></td>
                        </tbody>
                        `
                }
        }else{
                if(dataPro[i].category.includes(value.toLowerCase())){
                    table += `
                        <tbody>
                            <td>${[i]}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].category}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td><button id="update" onclick=updateData(${i})>Update</button></td>
                            <td><button id="delete" onclick=deleteElement(${i})>Delete</button></td>
                        </tbody>
                        `
                }
        }
        document.getElementById("tbody").innerHTML = table;
    }
}
