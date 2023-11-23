function toggleCreat() {
    var creat = document.getElementById("creat");
    creat.classList.toggle("open");
}

function addApp() {
    var appNameInput = document.getElementById("appNameInput");
    var appDescInput = document.getElementById("appDescInput");
    var appDateInput = document.getElementById("appDateInput");
    var appIconInput = document.getElementById("appIconInput");

    var appName = appNameInput.value;
    var appDesc = appDescInput.value;
    var appDate = appDateInput.value;
    var appIcon = appIconInput.files[0];

    var tableBody = document.getElementById("appTableBody");
    var newRaw = document.createElement("tr");
    var iconUrl = URL.createObjectURL(appIcon)
    newRaw.innerHTML = `
    <td>${appName}</td>
    <td>${appDesc}</td>
    <td>${appDate}</td>
    <td><img src = "${iconUrl}" alt = "${appName}图标" width = "30"></td>
    `;

    tableBody.appendChild(newRaw);

    toggleCreat();


    fetch("https://www.baidu.com/", {
        method: "POST",
        body: JSON.stringify({ appName, appDesc, appDate, appIcon })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        })


    appNameInput.value = "";
    appDescInput.value = "";
    appDateInput.value = "";
    appIconInput.value = "";
    URL.revokeObjectURL(iconURL);

}

function searchApp() {
    var input, filter, table, td, tr, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("appTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

const createButton = document.querySelector('.create-button');
const overlay = document.querySelector('.overlay');
const creatElement = document.querySelector('.creat');

createButton.addEventListener('click', function () {
    overlay.style.display = 'block';
    creatElement.style.display = 'block';
});

overlay.addEventListener('click', function () {
    overlay.style.display = 'none';
    creatElement.style.display = 'none';
});

document.querySelector('.cancel-button').addEventListener('click', function () {
    overlay.style.display = 'none';
    creatElement.style.display = 'none';
});

document.querySelector('.submit-button').addEventListener('click', function () {
    overlay.style.display = 'none';
    creatElement.style.display = 'none';
});



function sortTableByTimeDescending() {
    var table = document.getElementById('appTable');
    var rows = Array.from(table.rows).slice(1);
  
    rows.sort(function(a, b) {
      var timeA = new Date(a.cells[2].innerText);
      var timeB = new Date(b.cells[2].innerText);
      return timeB - timeA;
    });
  
    rows.forEach(function(row) {
      table.appendChild(row);
    });
  }