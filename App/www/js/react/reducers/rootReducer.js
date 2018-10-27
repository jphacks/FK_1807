import { combineReducers } from 'redux'
import Foods from './Foods'
import Recipes from './Recipes'

const rootReducer = combineReducers({
  Foods,
  Recipes
})

export default rootReducer