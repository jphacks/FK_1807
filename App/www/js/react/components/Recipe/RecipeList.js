import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: window.parent.screen.width/3*2,
    height: window.parent.screen.width/3
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: window.parent.screen.width/3,
    height: window.parent.screen.width/3
  },
});

function RecipeList(props) {
  const { classes, theme } = props;

  return (
    <div style={{height: 500, overflow: "auto"}}>
        {props.recipes.map(d => (
          <Card className={classes.card} onClick={e => {window.open(d.recipeUrl, '_blank')}}>
              <CardMedia
                  className={classes.cover}
                  image={d.mediumImageUrl}
              />
              <div className={classes.details}>
                  <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5" style={{overflow: "hidden", width: "100%", height: 30}}>
                      {d.recipeTitle}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" style={{overflow: "hidden", width: "100%", height: 80}}>
                      {d.recipeDescription}
                  </Typography>
                  </CardContent>
              </div>
          </Card>
        ))}
    </div>
  );
}

RecipeList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        recipes: state.Recipes.recipes,
    }
}

RecipeList = connect(mapStateToProps)(RecipeList);

export default withStyles(styles, { withTheme: true })(RecipeList);