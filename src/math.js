//Types of Javascript function
/*  function declaration
    function expression
    arrow fuction expression
     -optional parenthesis when only a single argumet
     -optional implicit return statement
*/

// function declaration
function square(number) {
  return number * number;
}
console.log(square(5));

function add(a, b) {
  return a + b;
}
console.log(add(7, 6));

//function espression
let square_e = function (number) {
  return number * number;
};
console.log(square_e(5));

let add_e = function (a, b) {
  return a + b;
};
console.log(add_e(7, 6));

//arrow functions expression
let square_a = (number) => {
  return number * number;
};
console.log(square_a(5));

let add_a = (a, b) => {
  return a + b;
};
console.log(add_a(7, 6));

//another way of arrow function expressions
let square_ar = (number) => number * number;
console.log(square_ar(5));
