
const INITIAL_STATE = {
    todos: [],
    id: '',
  };


const blogReducer = (state = INITIAL_STATE, action) => {
    console.log('Unknown Action:', state);
    switch (action.type) {
      case 'ADD_BLOG_API_DATA':
        return {
          ...state,
          todos: [...action.todos],
        };
      case 'ADD_BLOG_ID':
        return {
          ...state,
          id: action.id,
        };
      default:
        return state;
    }
  };
  

export default blogReducer;