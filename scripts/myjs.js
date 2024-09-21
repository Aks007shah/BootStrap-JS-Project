// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

function newsLetterBtn() {
  let newsletterBtn = document.newsLetter.newsLetterform.value;

  if (newsletterBtn == "" || newsletterBtn == null) {
    document.getElementById("error_newsletter").innerHTML =
      "<font color = red> Email Cannot be Empty! </font>";
    return false;
  } else {
    document.getElementById("error_newsletter").innerText = "";
  }
}

function formValidationModal() {
  let modalFormLogin = document.loginModalForm.emailModalForm.value;
  let modalFormPassword = document.loginModalForm.passwordModalForm.value;

  if (modalFormLogin == "" || modalFormLogin == null) {
    document.getElementById("error_login_form").innerText =
      "Please, enter a valid Email";
    document.getElementById("error_login_form").style.color = "red";
    document.getElementById("exampleInputEmail1").style.border =
      "2px solid red";
    return false;
  } else {
    document.getElementById("error_login_form").innerText = "";
  }

  if (modalFormPassword == "" || modalFormPassword == null) {
    document.getElementById("error_password_form").innerText =
      "Password cannot be empty";
    document.getElementById("error_password_form").style.color = "red";
    document.getElementById("exampleInputPassword1").style.border =
      "2px solid red";
    return false;
  } else {
    document.getElementById("error_password_form").innerText = "";
  }
}

function formSignupValidationModal() {
  let modalFormsignup_email = document.signupModalForm.signupEmail.value;
  let modalFormsignup_pass = document.signupModalForm.signupPassword.value;

  if (modalFormsignup_email == "" || modalFormsignup_email == null) {
    document.getElementById("error_email_SU").innerText =
      "Please, enter a valid Email";
    document.getElementById("error_email_SU").style.color = "red";
    document.getElementById("inputEmailSU").style.border = "2px solid red";
    return false;
  } else {
    document.getElementById("error_email_SU").innerText = "";
  }

  if (modalFormsignup_pass == "" || modalFormsignup_pass == null) {
    document.getElementById("error_pass_SU").innerText =
      "Password cannot be empty";
    document.getElementById("error_pass_SU").style.color = "red";
    document.getElementById("inputPassword4").style.border = "2px solid red";
    return false;
  } else {
    document.getElementById("error_pass_SU").innerText = "";
  }
}

//Autumn page JS --------------->

// let bagItems = [];
let bagItemCountElement; //global for all pages
let bagItems;
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnAutumnPage();
  displayBagIcon();
  // addToBag();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  
  // calling fnc
  displayBagIcon();
}

function displayBagIcon() {
  bagItemCountElement = document.querySelector("#bag-item-count");

  if (bagItemCountElement) {
    if (bagItems.length > 0) {
      bagItemCountElement.style.visibility = "visible";
      bagItemCountElement.innerText = bagItems.length;
    } else {
      bagItemCountElement.style.visibility = "hidden";
    }
  }
}

function displayItemsOnAutumnPage() {
  let itemContainerElements = document.querySelector("#autmn-items-container");

  if (!itemContainerElements) {
    return;
  }

  let innerHtml = "";

  itemsAutumn.forEach((item) => {
    innerHtml += `<div class="autmn-item-container">

        <div class="card shad Section1-cont h-100">
            <img src="${item.image}" class="card-img-top item_image_count" alt="...">
            <div class="card-body">
                <div class="rating">
                    ${item.rating.stars} ⭐ | ${item.rating.count}
                </div>
                <h5 class="card-title">${item.company}</h5>
                <p class="card-text">${item.item_name}</p>
                <p>Rs ${item.current_price} <del>Rs ${item.original_price}</del> <span class="text-danger">(${item.discount_percentage}% off)</span></p>
                <button type="button" class="btn btn-outline-dark " onclick="addToBag(${item.id})">Add To Cart</button>
                <button type="button" class="btn btn-outline-warning">Wishlist</button>
            </div>
        </div>
    </div>`;
  });

  itemContainerElements.innerHTML = innerHtml;
}
//Autumn page
