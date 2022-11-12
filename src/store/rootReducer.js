import { combineReducers } from 'redux'
import {default as Category} from './Chuck/ChuckReducer'
import {default as Jokes} from './Chuck/ChuckReducer'



 


const rootReducer = combineReducers({
    Category,
    Jokes,
   
  
})

export default rootReducer