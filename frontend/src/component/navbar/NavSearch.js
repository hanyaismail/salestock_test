import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { searchItems } from '../../actions/itemActions';
import { connect } from 'react-redux';


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 80
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    width: 500,
    margin: 'auto'
  },
  input: {
    width: '100%',
    margin: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    backgroundColor: 'white'
  }
});

class NavSearch extends React.Component {
  state = {
    searchText: '',
  }

  onTextChange = (e) => {
    const val = e.target.value
    this.setState({[e.target.name]: val});
    this.props.searchItems(val)
  };

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.container}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <Link to="/" style={{ textDecoration: 'none', color:'inherit' }}><HomeIcon /></Link>
            </IconButton>
            <Input
                placeholder="Placeholder"
                className={classes.input}
                name="searchText"
                value={this.state.searchText}
                onChange={this.onTextChange}
                inputProps={{
                    'aria-label': 'Description',
                }}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { searchItems })(withStyles(styles)(NavSearch));