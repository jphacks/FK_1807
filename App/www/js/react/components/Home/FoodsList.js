import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { getFoods, showRecipe } from '../../actions'
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

class ConfirmationDialogRaw extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
      checkedP: [],
      checkedC: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }


  handleCancel = () => {
    this.props.onClose(this.props.value);
    this.setState({
      checkedP: [],
      checkedC: [],
    });
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
    this.props.dispatch(showRecipe(this.state.checkedP, this.state.checkedC, this.props.history))
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleToggle = (valueP, valueC) => () => {
    const { checkedP, checkedC } = this.state;
    const currentIndexP = checkedP.indexOf(valueP);
    const newCheckedP = [...checkedP];
    const currentIndexC = checkedC.indexOf(valueC);
    const newCheckedC = [...checkedC];

    if (currentIndexC === -1) {
      newCheckedP.push(valueP);
      newCheckedC.push(valueC);
    } else {
      newCheckedP.splice(currentIndexP, 1);
      newCheckedC.splice(currentIndexC, 1);
    }

    this.setState({
      checkedP: newCheckedP,
      checkedC: newCheckedC,
    });
  };

  render() {
    const { value, ...other } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
        style={{height: "100%", width: "100%"}}
      >
        <DialogTitle id="confirmation-dialog-title">レシピの検索</DialogTitle>
        <DialogContent style={{padding: 0}}>
        <List>
          {this.props.foods.map(d => (
            <ListItem key={d.categoryId} role={undefined} dense button onClick={this.handleToggle(d.parentCategoryId, d.categoryId)}>
              <Checkbox
                checked={this.state.checkedC.indexOf(d.categoryId) !== -1}
                tabIndex={-1}
                disableRipple
                style={{color: "#FF9500"}}
              />
              <ListItemText primary={d.categoryName} />
              <ListItemText style={{textAlign: "right"}} primary={d.num} />
            </ListItem>
          ))}
        </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>
            キャンセル
          </Button>
          <Button onClick={this.handleOk} style={{backgroundColor: "#FF9500"}}>
            レシピの選択
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

ConfirmationDialogRaw = connect()(ConfirmationDialogRaw);


const styles = theme => ({
  root: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    marginTop: "10%"
  },
  num: {
    textAlign: "right"
  },
  check: {
    position: 'absolute',
    margin: "auto",
    right: 0,
    left: 0,
    bottom: "12%",
    width: 150,
    height: 150
  },
  recipe: {
    position: 'absolute',
    bottom: "12%",
    right: "2%",
    width: 70,
    height: 70
  },
  cssRoot: {
    backgroundColor: "#FF9500",
    '&:hover': {
      backgroundColor: "#FF9500",
    },
  },
});

class FoodsList extends React.Component {
    state = {
      open: false,
      value: 'Dione',
    };
  
    handleClickListItem = () => {
      this.setState({ open: true });
    };
  
    handleClose = value => {
      this.setState({ value, open: false });
    };
  
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List component="nav">
                    {this.props.foods.map((d, index) => (
                        <ListItem>
                            <ListItemText primary={d.categoryName} />
                            <ListItemText className={classes.num} primary={d.num} />
                        </ListItem>
                    ))}
                </List>
                <IconButton className={classes.check} onClick={e =>{this.props.dispatch(getFoods())}}>
                    <img src='./img/search@3x.png' />
                </IconButton>
                <IconButton className={classes.recipe} onClick={this.handleClickListItem}>
                    <img src='./img/recipe@3x.png' />
                </IconButton>
                <ConfirmationDialogRaw
                    classes={{
                    paper: classes.paper,
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    value={this.state.value}
                    {...{foods: this.props.foods, history: this.props.history}}
                />
            </div>
        );
    }
}

FoodsList.propTypes = {
classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    foods: state.Foods.foods,
  }
}
  

FoodsList = connect(mapStateToProps)(FoodsList);
export default withStyles(styles)(FoodsList);