import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

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
  fab: {
    position: 'absolute',
    margin: "auto",
    bottom: "13%",
    right: 0,
    left: 0,
    backgroundColor: "#474431",
    '&:hover': {
      backgroundColor: "#474431",
    },
  },
});

function RecipeList(props) {
  const { classes, theme } = props;

  return (
    <div style={{height: 500, overflow: "auto", padding: "5%"}}>
      <div>
        {props.recipes.map(d => (
          <Card className={classes.card} onClick={e => {document.location.href = d.recipeUrl}}>
              <CardMedia
                  className={classes.cover}
                  image={d.mediumImageUrl}
              />
              <div className={classes.details}>
                  <CardContent className={classes.content} >
                    <Typography component="h6" variant="h6" style={{overflow: "hidden", width: "100%", height: 30}}>
                        {d.recipeTitle}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" style={{overflow: "hidden", width: "100%", height: 60, lineheight: "1px", paddingT0p: "30px"}}>
                        {d.recipeDescription}
                    </Typography>
                  </CardContent>
              </div>
          </Card>
        ))}
      </div>
      <Button variant="fab" className={classes.fab} color='primary' onClick={e => {props.history.push('/')}} aria-label="Close" >
          <CloseIcon />
      </Button>
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
