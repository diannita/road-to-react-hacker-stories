import * as React from "react";

function App() {
  const stories = [
    {
      title: "React ",
      url: "https://reactjs.org ",
      author: "Jordan Walke ",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux ",
      url: "https://redux.js.org ",
      author: "Dan Abramov, Andrew Clark ",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const javascriptLibraries = [
    {
      title: "jQuery ",
      url: "https://jquery.org ",
      author: "Jonh Resig",
      num_comments: 5,
      points: 10,
      objectID: 2,
    },
    {
      title: "Angular ",
      url: "https://angularjs.org ",
      author: "Google ",
      num_comments: 4,
      points: 8,
      objectID: 3,
    },
  ];

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <hr />
      <Search />
      <hr />
      <List list={stories} title="React Ecosystem" />
      <List list={javascriptLibraries} title="Javascrip Libraries" />
    </div>
  );
}

function Search() {
  const [searchTerm, setSearchTerm] = React.useState("");

  console.log(`rendering search with searchTerm: ${searchTerm}`);

  const handleChange = (event) => {
    console.log(`Before setting searchTerm: ${searchTerm}`);
    setSearchTerm(event.target.value);
    // console.log(event.target.value);
    console.log(`After setting searchTerm: ${searchTerm}`);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <p>
        searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
}

function List(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {props.list.map(function (item) {
          return <Item item={item} />;
        })}
      </ul>
    </div>
  );
}

const Item = (props) => {
  return (
    <li key={props.item.objectID}>
      <span>
        <a href="{props.item.url}">{props.item.title + `  `}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li>
  );
};

export default App;
