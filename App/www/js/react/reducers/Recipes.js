const Recipes = (state = {
    recipes: []
  }, action) => {
  
    switch (action.type) {
      case 'ADD_RECIPES':
        console.log(action.res);
        return {
          ...state,
          recipes: action.res
        }
      default:
        return state
    }
  }
  
  export default Recipes