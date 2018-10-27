const Foods = (state = {
    foods: [
        {
            parentCategoryId: 0,
            categoryId: 0,
            categoryName: "『調べる』を押してください",
        },
    ],
  }, action) => {
  
    switch (action.type) {
      case 'ADD_FOODS':
        return {
          ...state,
          foods: action.res
        }
      default:
        return state
    }
  }
  
  export default Foods