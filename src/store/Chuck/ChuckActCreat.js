
import { SET_CATEGORY, SET_JOKES } from './ChuckActions'
  
  export const setCategory = (Category) => {
    return {
      type: SET_CATEGORY,
      payload: Category,
    }
  }

  export const setJokes = (Jokes) => {
    return {
      type: SET_JOKES,
      payload: Jokes,
    }
  }

 

  