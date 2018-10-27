const Recipes = (state = {
    recipes: []
  }, action) => {
  
    switch (action.type) {
      case 'ADD_RECIPES':
        return {
          ...state,
          recipes: action.res
        }
      case 'DEL_RECIPES':
        return {
            recipes: []
        }
      default:
        return state
    }
  }
  
  export default Recipes