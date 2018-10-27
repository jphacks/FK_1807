const Foods = (state = {
    foods: [
        {
            parentCategoryId: 12,
            categoryId: 91,
            categoryName: "test1",
            num: 2
        },
        {
            parentCategoryId: 12,
            categoryId: 92,
            categoryName: "test2",
            num: 4
        },
        {
            parentCategoryId: 12,
            categoryId: 93,
            categoryName: "test3",
            num: 2
        },
        {
            parentCategoryId: 12,
            categoryId: 94,
            categoryName: "test4",
            num: 5
        },
        {
            parentCategoryId: 12,
            categoryId: 95,
            categoryName: "test5",
            num: 5
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