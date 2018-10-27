import request from 'superagent';

export const getFoods = history => {
    return function(dispatch) {
      request
        .get(`http://18.220.201.195:3000/api/fridgestatus`)
        .set({ 'Content-Type': 'application/json' })
        .end(function(err, res) {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
            dispatch(addFoods(res.body, history))
          }
        });
    };
  };

  const addFoods = (res, history) => {
    //history.push("/");
    return {
      type: "ADD_FOODS",
      res
    }
  }
  
  export const showRecipe = (foods_id, history) => {
    console.log(foods_id)
    return function(dispatch) {
      request
      .get(`https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1090973428272746101&categoryId=12-` + foods_id[0])
        .end(function(err, res) {
          if (err) {
            console.log(err);
          } else {
            dispatch(addRecipes(res.body.result, history))
          }
        });
      };
    
  }

  const addRecipes = (res, history) => {
    history.push("/recipe");
    return {
      type: "ADD_RECIPES",
      res
    }
  }