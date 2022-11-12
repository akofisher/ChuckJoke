import { SET_CATEGORY, SET_JOKES } from './ChuckActions';
  
  const initialState = {
    Category: [],
    Jokes: '', 
   
    
  }
  
  export default function productsReducer(state = initialState, action) {
    switch (action.type) {
      case SET_CATEGORY:
        return {
          ...state,
          Category: action.payload,
        }
        break;

        case SET_JOKES:
          return {
            ...state,
            Jokes: [
              ...state.Jokes,
              {

                ...action.payload, 
              },
            ],
          }
          break;
      
      default:
        return state
    }
  }