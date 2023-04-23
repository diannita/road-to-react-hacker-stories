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

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("search") || "React"
  );

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //another way to filter
  // const searchedStories = stories.filter(function (story) {
  //   return story.title.includes(searchTerm);
  // });

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <hr />

      <Search
        search={searchTerm}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />

      <hr />
      <List list={searchedStories} />
    </div>
  );
}

function Search(props) {
  const handleChange = (event) => {
    props.onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={props.search}
        onChange={handleChange}
      />

      <p>
        searching for <strong>{props.searchTerm}</strong>
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
          return <Item key={item.objectID} item={item} />;
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
