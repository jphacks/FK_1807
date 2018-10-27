import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import RecipeList from './RecipeList'

const styles = theme => ({
  root: {
    backgroundColor: "#F9F5EC",
    height: window.parent.screen.height,
    position: "fixed",
    width: "100%"
  },
});

function RootRecipe(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <RecipeList {...{history: props.history}}/>
    </div>
  );
}

RootRecipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

RootRecipe = connect()(RootRecipe);


export default withStyles(styles)(RootRecipe);