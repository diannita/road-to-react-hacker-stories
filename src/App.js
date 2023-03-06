import * as React from "react";

function getByTitle(title) {
  return title;
}

function App() {
  return (
    <div>
      <h1>Hello {getByTitle("world")}</h1>

      <label htmlFor="search" className="b-search">
        Search:{" "}
      </label>
      <input id="search" type="text"></input>
    </div>
  );
}

export default App;
