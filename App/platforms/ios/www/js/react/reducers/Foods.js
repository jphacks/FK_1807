const Foods = (state = {
    foods: [
        {
            id: 91,
            name: "test1",
            num: 2
        },
        {
            id: 92,
            name: "test2",
            num: 4
        },
        {
            id: 93,
            name: "test3",
            num: 2
        },
        {
            id: 94,
            name: "test4",
            num: 5
        },
        {
            id: 95,
            name: "test5",
            num: 5
        },
    ],
  }, action) => {
  
    switch (action.type) {
      case 'ADD_FOODS':
        console.log(state.foods)
        return {
          ...state,

        }
      default:
        return state
    }
  }
  
  export default Foods