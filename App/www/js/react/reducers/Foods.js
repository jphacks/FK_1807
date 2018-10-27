const Foods = (state = {
    foods: [
        {
            id: 1,
            name: "test1",
            num: 2
        },
        {
            id: 2,
            name: "test2",
            num: 4
        },
        {
            id: 3,
            name: "test3",
            num: 2
        },
        {
            id: 4,
            name: "test4",
            num: 5
        },
        {
            id: 5,
            name: "test5",
            num: 5
        },
    ],
  }, action) => {
  
    switch (action.type) {
      case 'ADD_FOODS':
        return {
          ...state,
        }
      default:
        return state
    }
  }
  
  export default Foods