import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: 500,
    margin: 'auto',
    backgroundColor: '#E8EAF6',
  },
  border: {
    borderTopStyle: 'solid',
    borderWidth: 0.5
  }
});

const mapStateToProps = state => {
    console.log(state)
    return { item: state.item }
}

class SearchList extends React.Component {
  
  
  render() {
    let searchList
    const { classes } = this.props;
    const { items } = this.props.item;
    // console.log(item)
    if (items) {
      
      searchList = (
        <div>
          { items.map(item => (
            <Link to={`/product/${item.slug}`} style={{ textDecoration: 'none' }}>
              <ListItem className={classes.border}>
                <Avatar src={item.pictUrl} />
                <ListItemText primary={item.name} secondary={item.price} />
            </ListItem>
            </Link>
          ))}
        </div>
      )
    } else {
      searchList = null
    }
    return (
      <div className={classes.root}>
        <List>
          {searchList}
        </List>
      </div>
    );
  }
  
}

SearchList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(SearchList));