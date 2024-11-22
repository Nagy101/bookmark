var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var lightBoxContaner = document.querySelector(".lightbox-contaner");
var lightBoxItem = document.querySelector(".lightbox-item");
var closeBtn = document.getElementById("close");
var siteContainer = [];
if (localStorage.getItem("site") != null) {
  siteContainer = JSON.parse(localStorage.getItem("site"));
  display();
}

function submite() {
  if (validationFirstInput(siteName) && validationFirstInput(siteURL)) {
    var nameSiteUrl = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    siteContainer.push(nameSiteUrl);
    localStorage.setItem("site", JSON.stringify(siteContainer));
    display();
    clear();
  } else {
    lightBoxContaner.classList.replace("d-none", "d-flex");
  }
}
function clear() {
  siteName.value = null;
  siteURL.value = null;
  siteName.classList.remove("is-valid");
  siteURL.classList.remove("is-valid");
}

function display() {
  var cartona = "";
  for (var i = 0; i < siteContainer.length; i++) {
    cartona += `
    <tr>
            <td>${i + 1}</td>
            <td>${siteContainer[i].siteName}</td>
            <td>
              <button id="visitBtn" class="btn">
                
<a href="${
      siteContainer[i].siteURL
    }" target="_blank"><i class="fa-solid fa-eye"></i>  Visit</a>
               
              </button>
            </td>
            <td>
              <button onclick="deleteSite(${i})" id="deleteBtn" class="btn">
                <i class="fa-regular fa-trash-can"></i> Delete
              </button>
            </td>
          </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = cartona;
}
function deleteSite(i) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        siteContainer.splice(i, 1);
        localStorage.setItem("site", JSON.stringify(siteContainer));
        display();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your Link has been deleted.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary Link is safe :)",
          icon: "error",
        });
      }
    });
}

function validationFirstInput(elemnt) {
  var regex = {
    siteName: /[a-zA-Z]{3,}/,
    siteURL: /^https?:\/\//g,
  };

  if (regex[elemnt.id].test(elemnt.value)) {
    elemnt.classList.remove("is-invalid");
    elemnt.classList.add("is-valid");
    return true;
  } else {
    elemnt.classList.remove("is-valid");
    elemnt.classList.add("is-invalid");
    return false;
  }
}
function close() {
  lightBoxContaner.classList.replace("d-flex", "d-none");
}
closeBtn.addEventListener("click", close);
lightBoxContaner.addEventListener("click", function (e) {
  e.stopPropagation();
  close();
});
lightBoxItem.addEventListener("click", function (e) {
  e.stopPropagation();
});
