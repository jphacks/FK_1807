import request from 'superagent';

export const getFoods = () => {
    return function(dispatch) {
      request
        .get(`http://18.220.201.195:3000/api/fridgestatus`)
        .set({ 'Content-Type': 'application/json' })
        .end(function(err, res) {
          if (err) {
            console.log(err);
          } else {
            dispatch(addFoods(res.body))
          }
        });
    };
  };

  const addFoods = res => {
    return {
      type: "ADD_FOODS",
      res
    }
  }
  
  export const showRecipe = (parent_id, foods_id, history) => {
    return function(dispatch) {
      request
      .get(`https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1090973428272746101&categoryId=` + parent_id[0]  + `-` + foods_id[0])
        .end(function(err, res) {
          if (err) {
            console.log(err);
          } else {
            dispatch(addRecipes(res.body.result, history))
            console.log(res)
          }
        });
      };
    
  }

  const addRecipes = (res, history) => {
    history.push("/recipe");
    return {
      type: "ADD_RECIPES",
      res,
    }
  }