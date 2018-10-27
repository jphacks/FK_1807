import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FoodsList from './FoodsList'

const styles = theme => ({
  root: {
    backgroundColor: "#F9F5EC",
    height: window.parent.screen.height,
    position: "fixed",
    width: "100%"
  },
});

function RootHome(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <FoodsList {...{history: props.history}}/>
    </div>
  );
}

RootHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

RootHome = connect()(RootHome);


export default withStyles(styles)(RootHome);