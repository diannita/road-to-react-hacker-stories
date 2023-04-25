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

  // NOT USED - replace by custom hook (useSemiPersistentState)
  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem("search") || "React"
  // );

  //NOT USED - replace by custom hook
  // React.useEffect(() => {
  //   localStorage.setItem("search", searchTerm);
  // }, [searchTerm]);

  //Custom Hooks
  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value]);

    return [value, setValue];
  };

  //Display custom hooks
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

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

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong> {/* Children */}
      </InputWithLabel>

      <hr />
      <List list={searchedStories} />
    </div>
  );
}

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  children,
}) => (
  <>
    <label htmlFor="id">{children} </label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);

// const Search = (props) => {
//   return <></>;
// };

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
