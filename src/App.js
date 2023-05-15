import * as React from "react";

const initialStories = [
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
  {
    title: "Javascript ",
    url: "https://javascript.org ",
    author: "Dabby Mangolla ",
    num_comments: 10,
    points: 7,
    objectID: 2,
  },
];

const App = () => {
  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
    );

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

  // states
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then((result) => {
        setStories(result.data.stories);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {isError && <p> Something went wrong ...</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocus,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocus) {
      inputRef.current.focus();
    }
  }, [isFocus]);

  return (
    <>
      <label htmlFor={id}>{children} </label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        autoFocus
      />
    </>
  );
};

// const List = (props) => {
//   return (
//     <div>
//       <h2>{props.title}</h2>
//       <ul>
//         {props.list.map(function (item) {
//           return <Item key={item.objectID} item={item} />;
//         })}
//       </ul>
//     </div>
//   );
// };

const List = ({ list, onRemoveItem }) =>
  list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));

const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    &nbsp;&nbsp;
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dissmiss
      </button>
    </span>
  </div>
);

export default App;
