var input_1 = document.querySelector(".intake input.first");
var input_2 = document.querySelector(".intake input.second");
var button = document.querySelector("#submit");

button.addEventListener("click", function () {
  if (input_1.value.length < 3 || ) {
    console.log("error");
  }
  console.log(input_1.value, input_2.value);
});
