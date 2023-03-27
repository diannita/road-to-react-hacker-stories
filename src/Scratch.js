const name = "Nobel";

function fisrtResponse() {
  console.log("Who's there?");
}

function secondResponse() {
  console.log(`${name} who?`);
}

function badJoke(fisrtResponse, secondResponse) {
  console.log("Knock, knock");
  fisrtResponse();
  console.log("Nobel.");
  secondResponse("Nobel");
  console.log("Nobel... that's why I knocked.");
}

console.log(badJoke(fisrtResponse, secondResponse));
