import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  color: {
    backgroundColor: "white",
    color: "black"
  },
  grow: {
    flexGrow: 1,
    textAlign: "center",
    color: "#FF9500"
  },
};

class Header extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.color}>
                    <Toolbar style={{margin: "auto"}}>
                        <img src="./img/header_logo.png" />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
  }

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);