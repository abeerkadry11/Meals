'use strict'

let rowData = document.getElementById('rowData')
let searchContainer = document.getElementById('searchContainer');
let submitBtn;
let nameInputTouched;
let ageInputTouched;
let passInputTouched;
let repassInputTouched;
let emailInputTouched;
let phoneInputTouched;









//start sidebar//
function openNav() {
    $('.navv').animate({ left: 0 }, 500);
    $('.open-close').removeClass('d-block').addClass('d-none');
    $('.close').removeClass('d-none').addClass('d-block');
    for (let i = 0; i < 5; i++) {
        $(".links ul li")
            .eq(i)
            .animate({ top: 0 }, (i + 5) * 100);
    }
}
closeNav();
function closeNav() {
    let width = $('.navvContent').outerWidth();
    $('.navv').animate({ left: -width }, 500);
    $('.open-close').removeClass('d-none').addClass('d-block');
    $('.close').removeClass('d-block').addClass('d-none');
    $('.links li').animate({ top: 300 }, 500);

}

$('section').on('click', function(){
    closeNav();
})

$('.navv .open-close').on('click', function () {
    if ($('.navv').css('left') == '0px') {
        closeNav();
    } else {
        openNav()
    }
})

// end sidebar//


// start loading screen//
$(document).ready(function () {
    starting('').then(function() {
        $('.loading-screen').fadeOut(300);
        $('body').css('overflow', 'visible');
        $('.myData').fadeOut(300)
    })
});
//start loading screen//


// Start Meals//
async function getMealDetails(mealID) {
    rowData.innerHTML = "";
    $(".myData").fadeIn(100);
    searchContainer.innerHTML = "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    response = await response.json();
    // displayMeals//
    displayMealDetails(response.meals[0]);
    $(".myData").fadeOut(300);
}
function displayMealDetails(meal) {
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert-danger alert">${meal[`strMeasure${i}`]}${meal[`strIngredient${i}`]
                }</li>`;
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) {
        tags = [];
    }
    let tagsDisplayed = "";
    for (let i = 0; i < tags.length; i++) {
        tagsDisplayed += `<li class="alert-secondary alert">${tags[i]}</li>`;
    }

    let box = `<div class="col-md-4 mt-md-5">
  <img
    src="${meal.strMealThumb}"
    class="w-100 ingredientImg"
    alt=""
  />
  <h2 class="text-center m-3">${meal.strMeal}</h2>
</div>
<div class="col-md-8">
  <h2 class="text-center mb-3">Instructions</h2>
  <p>
    ${meal.strInstructions}
  </p>
  <h4><span class="fw-bolder">Area: </span> ${meal.strArea}</h4>
  <h4><span class="fw-bolder">Category: </span> ${meal.strCategory}</h4>
  <h4 class="fw-bolder">Recipes:</h4>
  <ul class="list-unstyled">
  ${ingredients}
  </ul>
  <h4 class="fw-bolder">Tags:</h4>
  <ul class="list-unstyled">
    ${tagsDisplayed}
  </ul>
  <div class="btns text-center">
    <a target="_blank" href="${meal.strSource}" class="sourceBtn m-2 text-white bg-primary p-2">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="youtubeBtn bg-danger text-white p-2 border-black">Youtube</a>
  </div>
</div>`;
    rowData.innerHTML = box;
}
// End Meals//
$(document).ready(function (){
    $('navv').on('click', function() {
        console.log("test");
    })
})


//start catogries//

async function getCategories() {
    rowData.innerHTML = "";
    $(".myData").fadeIn(100);
    searchContainer.innerHTML = "";
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    response = await response.json();
    // console.log(response.categories);//
    displayCategories(response.categories);
    $(".myData").fadeOut(300);
    closeNav()
}
;

function displayCategories(items) {
    let box = "";
    for (let i = 0; i < items.length; i++) {
        box += `<div class="col-md-3 mb-4">
    <div onclick="getCategoryMeals('${items[i].strCategory
            }')" class="meal-card position-relative overflow-hidden">
      <img
        src=${items[i].strCategoryThumb}
        class="w-100"
        alt=""
      />
      <div
        class="position-absolute text-center meal-card-layer"
      >
        <h3>${items[i].strCategory}</h3>
        <p>${items[i].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
      </div>
    </div>
  </div>`;
    }
    rowData.innerHTML = box;
}

async function getCategoryMeals(category) {
    rowData.innerHTML = "";
    $('.myData').fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeals(response.meals.slice(0,20));
    $(".myData").fadeOut(300);
}
//end catogries/



//start area//
async function getArea() {
    rowData.innerHTML = "";
    $('myData').fadeIn(100);
    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    displayArea(response.meals);
    $(".myData").fadeOut(300);
    closeNav()
}

function displayArea(items) {
    let container = "";
    for (let i = 0; i < items.length; i++) {
        container += `
            <div class="col-md-3 mb-4">
                <div onclick="getAreaMeals('${items[i].strArea}')" class="meal-card areaCard text-center overflow-hidden">
                  <i class="fa-solid fa-earth-americas fa-xl mb-2"></i>
                  <h3>${items[i].strArea}</h3>
                </div>
            </div>
        `
    }
    rowData.innerHTML = container;
}

async function getAreaMeals(area) {
    rowData.innerHTML = "";
    $(".myData").fadeIn(100);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    displayMeals(response.meals.slice(0,20));
    $(".myData").fadeOut(300);
}
//end area//

//start ingredients//
async function getIngredients() {
    rowData.innerHTML = "";
    $(".myData").fadeIn(100);
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    response = await response.json();
    // console.log(response);
    displayIngredients(response.meals.slice(0,25));
    $(".myData").fadeOut(300);
    closeNav()
}

function displayIngredients(items) {
    let container = "";
    for (let i = 0 ; i < items.length; i++) {
        container += `
            <div class=" col-12 col-md-3 col-lg-3 mb-4">
                <div onclick="getIngredientsMeals('${items[i].strIngredient
            }')" class=" text-center text-white overflow-hidden ">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i> 
                  <h3>${items[i].strIngredient}</h3>
                  <p>${items[i].strDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
                </div>
            </div>
        `
    }
    rowData.innerHTML = container;
}

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = "";
    $(".myData").fadeIn(100);
    searchContainer.innerHTML = "";

    if (typeof ingredients === "string") {
        ingredients = [ingredients];
    }
    let queryString = ingredients
        .map((ingredient) => `i=${ingredient}`)
        .join("&");
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?${queryString}`
    );
    response = await response.json();
    displayMeals(response.meals);
    $(".myData").fadeOut(300);
}
//end ingredients//



// $(".Ingredients").on("click", async function getIngredientsData() {
//     let resIngredients = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
//     let finalResIngredients = await resIngredients.json();
//     ingredientsData = finalResIngredients.meals;
//     console.log(ingredientsData);
//     displayIngredients()
// })
// function displayIngredients(item) {
//     let cartona = ``;
//     for (let i = 0; i < ingredientsData.length; i++) {
//         cartona += `<div class="col-12 col-md-6 col-lg-3 text-center text-white">
//                         <div>
//                             <i class="fa-solid fa-drumstick-bite fa-4x"></i> 
//                             <h3>${ite[i].strIngredient}</h3>
//                             <p>${ite[i].strDescription}</p>
//                         </div>
//                     </div>`
//     }
//     document.querySelector(".myData").innerHTML = cartona
// }




// inputs//
function showSearchInputs() {
    searchContainer.innerHTML = `<div class="row py-5">
      <div class="col-md-6">
        <input
          type="text"
          class="form-control bg-danger  mb-3 mb-md-0"
          placeholder="Search by name...."
          onkeyup="searchByName(this.value)" 
        />
      </div>
      <div class="col-md-6">
        <input
          type="text"
          class="form-control b bg-danger"
          placeholder="Search by first letter....."
          onkeyup="searchByFirstLetter(this.value)"
          oninput="handleInput(this)"
          
        />
      </div>
    </div>`;
    rowData.innerHTML = "";
    closeNav()
}
function handleInput(input) {
    input.value = input.value.replace(/[^a-zA-Z]/, "").slice(0, 1);
}
async function searchByName(item) {
    $(".myData").fadeIn(100);
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
    );
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".myData").fadeOut(300);
}
async function searchByFirstLetter(item) {
    $(".myData").fadeIn(100);
   
    item == "" ? "a" : "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`
    );
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".myData").fadeOut(300);
}




// search by name//
async function starting(name) {
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    response = await response.json();
    displayMeals(response.meals);
  
}

function displayMeals(items) {
    let container = "";
    for (let i = 0; i < items.length; i++) {
        container += `
            <div class="col-md-3 ">
    <div onclick="getMealDetails('${items[i].idMeal}')" class="meal-card text-center position-relative overflow-hidden">
      <img
        src=${items[i].strMealThumb}
        class="w-100"
        alt=""
      />
      <div
        class="position-absolute d-flex align-items-center justify-content-center meal-card-layer"
      >
        <h3 class="p-2">${items[i].strMeal}</h3>
      </div>
    </div>
  </div>
        `
    }
    rowData.innerHTML = container;
}
// end search name//








// start contacts//
function showContactUs() {
    searchContainer.innerHTML = "";
    rowData.innerHTML = `
  <section class="contact-us text-center">
      <div class="min-vh-100 d-flex align-items-center justify-content-center">
        <div class="container w-75">
          <div class="row">
            <div class="col-md-6 mb-4">
              <input
                type="text"
                class="form-control"
                name="name"
                id="name"
                placeholder="Enter Your Name..."
                onkeyup="inputsValidation()"
              />
              <div id="nameAlert" class="alert alert-danger mt-2 d-none">
                Special characters and numbers not allowed
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                placeholder="Enter Your Email..."
                onkeyup="inputsValidation()"
              />
              <div id="emailAlert" class="alert alert-danger mt-2 d-none">
                Email not valid, ex: abeerkadr@gmail.com
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="tel"
                class="form-control"
                name="phone"
                id="phone"
                placeholder="Enter Your Phone Number..."
                onkeyup="inputsValidation()"
              />
              <div id="phoneAlert" class="alert alert-danger mt-2 d-none">
                Phone number not valid
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="number"
                class="form-control"
                name="age"
                id="age"
                min="5"
                onkeyup="inputsValidation()"
                placeholder="Enter Your Age..."
              />
              <div id="ageAlert" class="alert alert-danger mt-2 d-none">
                Age not valid
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                placeholder="Enter Your Password..."
                onkeyup="inputsValidation()"
              />
              <div id="passAlert" class="alert alert-danger mt-2 d-none">
                Password must at least has 8 characters, at least 1 alphabetical and 1 digit
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <input
                type="password"
                class="form-control"
                name="re-password"
                id="re-password"
                placeholder="Enter Your rePassword..."
                onkeyup="inputsValidation()"
              />
              <div id="repassAlert" class="alert alert-danger mt-2 d-none">
                Enter the same password 
              </div>
            </div>
          </div>
          <button id="submitBtn" disabled class="submitBtn bg-danger rounded-3 px-3">Submit</button>
        </div>
      </div>
    </section>
  `;

    nameInputTouched = false;
    phoneInputTouched = false;
    ageInputTouched = false;
    emailInputTouched = false;
    passInputTouched = false;
    repassInputTouched = false;
    submitBtn = document.getElementById("submitBtn");
    document.getElementById("name").addEventListener("focus", () => {
        nameInputTouched = true;
    });
    document.getElementById("age").addEventListener("focus", () => {
        ageInputTouched = true;
    });
    document.getElementById("password").addEventListener("focus", () => {
        passInputTouched = true;
    });
    document.getElementById("re-password").addEventListener("focus", () => {
        repassInputTouched = true;
    });
    document.getElementById("email").addEventListener("focus", () => {
        emailInputTouched = true;
    });
    document.getElementById("phone").addEventListener("focus", () => {
        phoneInputTouched = true;
    });
    closeNav()
}

function inputsValidation() {
    //& Start Alerts for inputs
    if (nameInputTouched) {
        if (nameValidation()) {
            document
                .getElementById("nameAlert")
                .classList.replace("d-block", "d-none");
            document.getElementById("name").classList.add("is-valid");
            document.getElementById("name").classList.remove("is-invalid");
        } else {
            document
                .getElementById("nameAlert")
                .classList.replace("d-none", "d-block");
            document.getElementById("name").classList.add("is-invalid");
            document.getElementById("name").classList.remove("is-valid");
        }
    }

    if (emailInputTouched) {
        if (emailValidation()) {
            document
                .getElementById("emailAlert")
                .classList.replace("d-block", "d-none");
            document.getElementById("email").classList.add("is-valid");
            document.getElementById("email").classList.remove("is-invalid");
        } else {
            document
                .getElementById("emailAlert")
                .classList.replace("d-none", "d-block");
            document.getElementById("email").classList.add("is-invalid");
            document.getElementById("email").classList.remove("is-valid");
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document
                .getElementById("phoneAlert")
                .classList.replace("d-block", "d-none");
            document.getElementById("phone").classList.add("is-valid");
            document.getElementById("phone").classList.remove("is-invalid");
        } else {
            document
                .getElementById("phoneAlert")
                .classList.replace("d-none", "d-block");
            document.getElementById("phone").classList.add("is-invalid");
            document.getElementById("phone").classList.remove("is-valid");
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document
                .getElementById("ageAlert")
                .classList.replace("d-block", "d-none");
            document.getElementById("age").classList.add("is-valid");
            document.getElementById("age").classList.remove("is-invalid");
        } else {
            document
                .getElementById("ageAlert")
                .classList.replace("d-none", "d-block");
            document.getElementById("age").classList.add("is-invalid");
            document.getElementById("age").classList.remove("is-ivalid");
        }
    }

    if (passInputTouched) {
        if (passValidation()) {
            document
                .getElementById("passAlert")
                .classList.replace("d-block", "d-none");
            document.getElementById("password").classList.add("is-valid");
            document.getElementById("password").classList.remove("is-invalid");
        } else {
            document
                .getElementById("passAlert")
                .classList.replace("d-none", "d-block");
            document.getElementById("password").classList.add("is-invalid");
            document.getElementById("password").classList.remove("is-valid");
        }
    }

    if (repassInputTouched) {
        if (repassValidation()) {
            document
                .getElementById("repassAlert")
                .classList.replace("d-block", "d-none");
            document.getElementById("re-password").classList.add("is-valid");
            document.getElementById("re-password").classList.remove("is-invalid");
        } else {
            document
                .getElementById("repassAlert")
                .classList.replace("d-none", "d-block");
            document.getElementById("re-password").classList.add("is-invalid");
            document.getElementById("re-password").classList.remove("is-valid");
        }
    }
    //& End Alerts for inputs

    if (
        nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passValidation() &&
        repassValidation()
    ) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}
function nameValidation() {
    var nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    return nameRegex.test(document.getElementById("name").value);
}
function emailValidation() {
    var emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(document.getElementById("email").value);
}
function phoneValidation() {
    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(document.getElementById("phone").value);
}
function ageValidation() {
    // allow ages between 1 and 149
    var ageRegex = /^(?:1[0-4][0-9]|[1-9][0-9]|[1-9])$/;
    return ageRegex.test(document.getElementById("age").value);
}

function passValidation() {
    
    var passRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
    return passRegex.test(document.getElementById("password").value);
}
function repassValidation() {
    return (
        document.getElementById("re-password").value ==
        document.getElementById("password").value
    );
}