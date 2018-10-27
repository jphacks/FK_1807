const Recipes = (state = {
    recipes: [
        {
            img: "./karaage.jpg",
            title: "タイトル",
            subtitle: "サブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトル"
        },
        {
            img: "./karaage.jpg",
            title: "タイトル",
            subtitle: "サブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトル"
        },
        {
            img: "./karaage.jpg",
            title: "タイトル",
            subtitle: "サブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトル"
        },
        {
            img: "./karaage.jpg",
            title: "タイトル",
            subtitle: "サブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトル"
        },
        {
            img: "./karaage.jpg",
            title: "タイトル",
            subtitle: "サブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトルーサブタイトル"
        },
    ]
  }, action) => {
  
    switch (action.type) {
      case 'ADD_RECIPES':
        return {
          ...state,
        }
      default:
        return state
    }
  }
  
  export default Recipes