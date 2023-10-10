let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submat = document.getElementById("submat");

let mood = "create";
let tmp;

function getTotal() {
  // انشاءت  functin ووضعت به البيانات (value) التي ستاتي من price ,ووضعت شرط اذا كان يوجد بيانات (!="")طبق هذ العملية

  if (price.value != "") {
    // (+)نضع   (string)لتحويل البيانات الى
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    // (total)الانتج يظهر في
    total.innerHTML = result;
    // تغيير لون
    total.style.background = "#040";
    total.style.color = "#fff";
  } else {
    // اذا كانت فارغة اعدها الى اصلها
    total.innerHTML = "";
    total.style.background = "#9d0505";
  }
}

let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submat.onclick = function pro() {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submat.innerHTML = "create";
      count.style.display = "block";
    }
    cleardata();
  }
  localStorage.setItem("product", JSON.stringify(dataPro));

  ShowData();
};

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function ShowData() {
  getTotal();

  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += ` 
    <tr>
     <td>${i + 1}</td>
     <td>${dataPro[i].title}</td>
     <td>${dataPro[i].price}</td>
     <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount}</td>
     <td>${dataPro[i].total}</td>
     <td>${dataPro[i].category}</td>
     <td><button onclick =" update(${i})"  id="update" class="btn">update</button></td>
     <td><button onclick =" deleteData( ${i})" id="delete" class="btn">delete</button></td>
 </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.querySelector(".deleteAll");

  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button  onclick= 'deleteAll()'  class = 'btn'>delete All (${dataPro.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
ShowData();

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  ShowData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  ShowData();
}

function update(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  tmp = i;
  mood = "update";
  submat.innerHTML = " Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchmood = "title";
function getsearch(id) {
  let search = document.getElementById("search");

  if (id == "searchtitle") {
    searchmood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchmood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  ShowData();
}

function searchdata(value) {
  let table = "";
  if (searchmood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += ` 
  <tr>
   <td>${i}</td>
   <td>${dataPro[i].title}</td>
   <td>${dataPro[i].price}</td>
   <td>${dataPro[i].taxes}</td>
   <td>${dataPro[i].ads}</td>
   <td>${dataPro[i].discount}</td>
   <td>${dataPro[i].total}</td>
   <td>${dataPro[i].category}</td>
   <td><button onclick =" update(${i})"  id="update" class="btn">update</button></td>
   <td><button onclick =" deleteData( ${i})" id="delete" class="btn">delete</button></td>
</tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value)) {
        table += ` 
  <tr>
   <td>${i}</td>
   <td>${dataPro[i].title}</td>
   <td>${dataPro[i].price}</td>
   <td>${dataPro[i].taxes}</td>
   <td>${dataPro[i].ads}</td>
   <td>${dataPro[i].discount}</td>
   <td>${dataPro[i].total}</td>
   <td>${dataPro[i].category}</td>
   <td><button onclick =" update(${i})"  id="update" class="btn">update</button></td>
   <td><button onclick =" deleteData( ${i})" id="delete" class="btn">delete</button></td>
</tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
