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
let updateMode = "Create"
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

let dataPro;
//لو في داتا 
if(localStorage.product != null){
    //json.parse = transform data to real type
    dataPro = JSON.parse(localStorage.product)
    
}else{
    dataPro = []
}

submit.onclick = function(){
    //way to create object
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
    //push = add data without delete old data
    //-------- 8-count ----------//
    // الشرط ده معمول عشان اي عدد منتجات يتكتب في الكاونت يتكرر زي ما هو ويتضاف
    if(updateMode === "create"){
        if(newPro.count > 1){
        for(let i = 0; i < newPro.count; i++){
            dataPro.push(newPro)
        }
        }else{
        dataPro.push(newPro)
        }
    }else{
        dataPro[tmp] = newPro
        submit.innerHTML = "Create"
        updateMode = "create"
        count.style.display = "block"

    }
    
    //---------- 3-save to localstorage ----------------
    //localstorage = add data to قواعد البيانات
    //json.stringify = transform data to string
    localStorage.setItem("product", JSON.stringify(dataPro))

    cleanData()
    showData()

}
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
//فكرته اننا اي كلام بندخله للدتا بيز بعد مابندوس كرييت بنرجع نستورده وندخله في القوايم بتاعتنا
function showData(){
    gettotal()
    let table = ""
//لازم نعمل لووب عشان كل مره نعرض الداتا القديمه بالاضافه للجديده
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

    //هنا بنعمل زرار هيظهر بس لما يكون في بيانات بس في الجداول
    //لو مفيش بيانات الزرار هيختفي
    let btnDelete = document.getElementById("deleteAll")
    if(dataPro.length > 0){btnDelete.innerHTML = `
    <button onclick = deleteAll()>Delete All (${dataPro.length})</button>
    `
    }else{
        btnDelete.innerHTML = ''
    }
}
//هنا بننادي علي الفانكشن مرتين مره هنا بعديها ومره جوه الفانكشن بتاعت كرييت
//عشان اول ماندوس كرييت نشغل الفانكشن وتشتغل مره تانيه باستمرار عشان الداتا متتمسحش
showData()
//---------------------------------------------------------------------------------------------------//

//------- 6-Delete element-------//
//فكره عملها اننا بنعمل فصل للاراي دي عن طريق الاسبلايس وبنختاره عن طريق الانديكس
//وبنحط عدد الاراي الي عايزين نمسحها في الاسبلايس جنب ال i
//وبننادي علي شوو داتا عشان يحدث الصفحه ويورينا اننا مسحنا الاراي فعلا
function deleteElement(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()

}
//---------------------------------------------------------------------------------------------------//

//-------- 7-Delete all ----------//
//زي فانكشن اللي بتمسح عنصر واحد بس الاسبلايس بصفر عشان يمسح كله
//وهنا الداتا بيز بنعملها كلير عشان نمسح كل حاجه فيها
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
/*اول حاجه بنربط كل زرار للسيرش عشان البرنامج يعرف احنا بننادي علي مين فيهم
تاني حاجه بنربطه عن طريق الاي دي بتاعه وبنحط الاكشن في ال html
تالت حاجه بنخلي البرنامج اول مابندوس علي اي زرار من بتوع السيرش يعمل فوكاس
للبوكس بتاع السيرش كاننا هنكتب فيه
رابع حاجه



*/
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
