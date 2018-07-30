import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { getItems, getItemsScroll } from '../../actions/itemActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    maxWidth: 500,
    marginBottom: 20
  },
  media: {
    height: 250,
    paddingTop: '56.25%', // 16:9
    margin: 5
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  container: {
    width: 500,
    margin: 'auto'
  }
});

const mapStateToProps = state => {
    return { item: state.item}
}

class ImageResults2 extends React.Component {

  state = {
      page: 1
  }

  componentDidMount() {
    this.props.getItems(1)
    window.addEventListener('scroll', this.onScroll, false);
  }

  loadItems = (page) => {
    
    // console.log('load')
    // console.log(page)
    this.props.getItemsScroll(page)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && (this.state.page <= this.props.item.total_page)
    ) {
        console.log('state page', this.state.page)
        console.log('redux', this.props.item.total_page)
        this.setState({page: this.state.page+1})  
        this.loadItems(this.state.page);
        console.log('reload')
    }
  }

  render() {
    let imageListContent;
    const { items } = this.props.item
    const { classes } = this.props;
    console.log(items)
    if (items) {
        imageListContent = (
            <div>
                {items.map(img => (
                    <Link key={img._id} to={`/product/${img.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={img.pictUrl}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <h4>{img.name}</h4>
                                <h5>{img.price}</h5>
                                <Typography component="p">
                                    ukuran: {img.size.map(size => (
                                        `${size.size} `
                                    ))}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Link>
                ))}
            </div>
        )
    } else {
        imageListContent = null
    }

    return (
        <div className={classes.container}>
            {imageListContent}
        </div>
    );
  }
}

ImageResults2.propTypes = {
  classes: PropTypes.object.isRequired,
};

const a = withStyles(styles)(ImageResults2);

export default connect(mapStateToProps, { getItems, getItemsScroll })(a);