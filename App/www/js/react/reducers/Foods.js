const Foods = (state = {
    foods: [
        {
            categoryName: "『調べる』を押してください",
        },
    ],
    visible: false,
  }, action) => {
  
    switch (action.type) {
      case 'ADD_FOODS':
        return {
          ...state,
          foods: action.res,
          visible: true
        }
      default:
        return state
    }
  }
  
  export default Foods