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
            console.log(res.body);
          }
        });
    };
  };
  
  export const showRecipe = (foods_id, history) => {
    console.log(foods_id);
    console.log("called")
    return function(dispatch) {
        request
          .get(`https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1080324985558704372&categoryId=12-95`)
          .end(function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(res.body);
            }
          });
      };
  }