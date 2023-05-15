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

// definding the reducer - redux
const storiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_STORIES":
      return action.payload;
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "REMOVE_STORY":
      return state.filter(
        (story) => action.payload.objectID !== story.objectID
      );
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

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

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  React.useEffect(() => {
    // old
    // setIsLoading(true);
    // new redux
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.data.stories,
        });

        // setIsLoading(false);
      })
      // old
      // .catch(() => setIsError(true));
      //new redux
      .catch(() => dispatchStories({ type: "STORIES_FTECH_FAILURE" }));
  }, []);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    dispatchStories({
      type: "REMOVE_STORIES",
      payload: item,
    });
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter((story) =>
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

      {stories.isError && <p> Something went wrong ...</p>}
      {stories.isLoading ? (
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
