let currentPage = 1;
const itemsPerPage = 100; 
let allDepartments = []; 

fetch("https://openday.kumaraguru.in/api/v1/departments/")
  .then((response) => response.json())
  .then((result) => {
    allDepartments = result;
    displayPage(allDepartments, currentPage);
    createPaginationControls(allDepartments);
  })
  .catch((error) => console.error(error));

function displayPage(depts, page) {
  let start = (page - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedDepts = depts.slice(start, end);
  let a = "";

  paginatedDepts.forEach((dept, id) => {
    a += `<div class="pdept" onclick="onpress(${dept.id})">
            <img src="https://picsum.photos/id/${start + id}/200/300" alt="department${start + id}" id="image"></img>
            <h3>${dept.name}</h3>
          </div>`;
  });

  document.getElementById("dispdept").innerHTML = a;
}

function createPaginationControls(depts) {
  const totalPages = Math.ceil(depts.length / itemsPerPage);
  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="goToPage(${i})" class = "btn">${i}</button>`;
  }

  document.getElementById("pagination").innerHTML = paginationHTML;
}

function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayPage(allDepartments, currentPage);
}

function onpress(id) {
  const url = `https://openday.kumaraguru.in/api/v1/department/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const img = `<img src = "https://picsum.photos/id/${id-1}/1600/600"></img>`
      const dname = `<h2>Department Name: ${result.name}</h2>`;
      const desc = `<h2>Description: ${result.description}</h2>`;
      const link = `<a href="${result.link}" target="_blank">${result.link}</a>`;
      const block = `<h2>Block : ${result.block}</h2>` 
      localStorage.setItem("result0",img)
      localStorage.setItem("result1", dname);
      localStorage.setItem("result2", desc);
      localStorage.setItem("result3", link);
      localStorage.setItem("result4", block);
      window.location.href = "details.html";
    })
    .catch((error) => console.error(error));
}

const search = () => {
  const searchInput = document.getElementById("search").value.toLowerCase();
  
  const filteredDepts = allDepartments.filter((dept) => {
    const textValue = dept.name.toLowerCase();
    return textValue.indexOf(searchInput) > -1;
  });

  currentPage = 1; 
  displayPage(filteredDepts, currentPage);
  createPaginationControls(filteredDepts);
};

function move(){
  window.location.href="map.html"
}
