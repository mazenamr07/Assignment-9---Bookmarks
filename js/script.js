var siteName = document.querySelector(".intake input.first");
var siteURL = document.querySelector(".intake input.second");
var button = document.querySelector("#submit");
var errorMSG = document.querySelector(".error");
var exitIcon = document.querySelector(".icons > button > i");
var tableBody = document.querySelector(".dataTable tbody");
var counter = 1;
var listBookmark = JSON.parse(localStorage.getItem("bookmarks")) || [];

if (listBookmark.length > 0) {
  counter = listBookmark.length + 1;
  displayBookmarks(listBookmark);
}

button.onclick = function () {
  if (siteName.value.length < 3 || siteURL.value === "") {
    errorMSG.classList.replace("d-none", "d-flex");
    return;
  }

  if (siteURL.value.indexOf("https") === -1) {
    siteURL.value = "https://" + siteURL.value;
  }

  var newBookmark = `<tr>
    <td class="align-middle">${counter}</td>
    <td class="align-middle">${siteName.value}</td>
    <td>
      <a href="${siteURL.value}" class="btn visit" target="_blank">
        <i class="fa-solid fa-eye pe-1"></i>
        <span class="text-capitalize">visit</span>
      </a>
    </td>
    <td>
      <a id="delete-${counter}" class="btn delete">
        <i class="fa-solid fa-trash-alt"></i>
        <span class="text-capitalize">delete</span>
      </a>
    </td>
  </tr>`;

  listBookmark.push(newBookmark);
  siteName.value = "";
  siteURL.value = "";

  saveToLocalStorage();
  displayBookmarks(listBookmark);
  counter++;
};

exitIcon.onclick = function () {
  errorMSG.classList.replace("d-flex", "d-none");
};

function displayBookmarks(list) {
  tableBody.innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    tableBody.innerHTML += list[i];
  }

  var deleteButtons = document.querySelectorAll(".delete");
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].onclick = function () {
      var id = this.id.split("-")[1];
      deleteBookmark(parseInt(id, 10));
    };
  }
}

function deleteBookmark(id) {
  listBookmark.splice(id - 1, 1);
  saveToLocalStorage();
  displayBookmarks(listBookmark);
}

function saveToLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(listBookmark));
}
