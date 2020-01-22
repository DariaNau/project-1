var foodINFO = $("#recipeDiv");
var foodOPT;
var wineKEY = "50e942eafbb0432890384d40751871de";

// if enter is pressed by user trigger the on(click) function

$("#userInput").keyup(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#searchBtn").click();
  }
});

// ClICK ON SEARCH TO START 

$("#searchBtn").click(function () {
  // var term = $("#userInput").val().trim()
  // if(!suggestedSearch.includes(term)){
  //   suggestedSearch.push(term)
  // }
  wineDataLoad();
});


// const suggestedSearch = ['Albarino', 'Beaujolais','Cabernet Sauvignon', 'Cava', 'Champagne', 'Chardonnay', 'Chenin Blanc', 'Grenache', 'Malbec', 'Merlot', 'Pinot Grigio', 'Pinot Noir', 'Sauvignon Blanc', 'Zinfandel'];

// $("#userInput").keydown(function(){
//     var val = $(this).val()
//     $("#suggestedSearch").html("")
    
//     for(var i = 0; i < suggestedSearch.length; i++){
//         if(suggestedSearch[i].includes(val)){
//             var item = $("<div>").text(suggestedSearch[i]).addClass('selectSearch')
//             $("#suggestedSearch").append(item)
//         }
//     }
// })

// $(document).on("click", ".selectSearch", function(){
//     var searchItem = $(this).text()
//     $("#suggestedSearch").html("")
//     $('#userInput').val(searchItem)
// })



function wineDataLoad() {

  var userInput = $("#userInput").val().trim();
  var wineURL = "https://api.spoonacular.com/food/wine/dishes?wine=" + userInput + "&apiKey=" + wineKEY;

  // 1ST AJAX CALL - WINE AND FOOD MATCH

  $.ajax({
    url: wineURL,
    method: "GET"
  }).then(function (wineRes) {
    var response1 = wineRes.text;
    var wineINFO = $("#wineDiv");
    var grapeName = $("<p></p>").text(userInput);
    wineINFO.html(grapeName);
    var p = $("<p></p>").text("Great choice! " + response1 + " Choose you recipe below!");
    wineINFO.append(p);
    var response2 = wineRes.pairings;
    localStorage.setItem('response2', JSON.stringify(response2));
    foodINFO.empty();

    // Loop to append pairing options

    var response2Local = JSON.parse(localStorage.getItem('response2'))
    for (var i = 0; i < response2Local.length; i++) {
      foodOPT = $("<a><button></button></a>").text("Food pairing option " + [i + 1] + ": " + response2Local[i]).addClass("pure-button searches").attr("data-name", response2Local[i]);
      foodOPT.attr("href", "recipe.html");
      foodINFO.append(foodOPT);
    };

    //clear input area

    $("#userInput").val("");

    // handling bad requests

  }).catch(function (err) {
    Swal.fire({
      title: 'Oops!',
      text: 'Please enter a valid name of a grape varietal.',
      icon: 'error',
      confirmButtonText: 'Got it'
    })
  });
};


// ------------------------LOCAL STORAGE TO FINISH

function renderButtons() {
  var response2Local = JSON.parse(localStorage.getItem('response2'));
  for (var i = 0; i < response2Local.length; i++) {
    foodOPT = $("<a><button></button></a>").text("Food pairing option " + [i + 1] + ": " + response2Local[i]).addClass("pure-button searches").attr("data-name", response2Local[i]);
    foodOPT.attr("href", "recipe.html");
    foodINFO.append(foodOPT);
  };
}

function init() {
  renderButtons();
}

init();

// ------------------------LOCAL STORAGE TO FINISH


// 2ND AJAX CALL - FOR RECIPIES!

$("#recipeDiv").on("click", ".searches", function () {
  var foodITEM = $(this).attr("data-name");
  getRecipeId(foodITEM)
});

function getRecipeId(foodITEM) {
  var recipeURL = "https://api.spoonacular.com/recipes/autocomplete?number=1&query=" + foodITEM + "&apiKey=" + wineKEY;
  $.ajax({
    url: recipeURL,
    method: "GET"
  }).then(function (RecipeRes) {
    var recipeID = RecipeRes[0].id;
    getRecipeInfo(recipeID);
  });
}

function getRecipeInfo(recipeID) {
  var recipeInfoURL = "https://api.spoonacular.com/recipes/" + recipeID + "/information?includeNutrition=false" + "&apiKey=" + wineKEY;
  $.ajax({
    url: recipeInfoURL,
    method: "GET"
  }).then(function (RecipeInfoRes) {
    console.log(RecipeInfoRes);
    var dataArr = RecipeInfoRes;
    loadRecipe(dataArr);
  });
};

// Load recipe.html page

function loadRecipe(dataArr) {

  // 1 - DISH TITLE

  var title = dataArr.title;
  console.log(title)
  // var titleText = $("<div></div>").text(title);

  // 2 - DISH IMAGE

  var image = dataArr.image;
  console.log(image)

  // 3 - INGRIDIENTS

  var ingList = dataArr.extendedIngredients;
  console.log(ingList)


  for (var i = 0; i < ingList.length; i++) {
    ingred = $("<li></li>").text(ingList[i].originalString);
    console.log(ingred);
    var ingrDiv = $("#ingridientsDiv").style.color = "blue";
    ingrDiv.append(ingred);
  }



  // 4 - INSTRUCTIONS




  // 5 - ALLERGY INFO




  // 6 - OTHER WINE SUGGESTIONS (SIDE BAR) ++++ WINE IMAGE??

};



// how to link recipe.html to each button? <a> tag??