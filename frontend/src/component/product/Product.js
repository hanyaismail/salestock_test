import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import red from '@material-ui/core/colors/red';
import { getItemSlug } from '../../actions/itemActions';
import { connect } from 'react-redux'; 

const styles = theme => ({
  card: {
    maxWidth: 500,
    margin: 'auto'
  },
  media: {
    height: 250,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer'
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
});

const mapStateToProps = state => {
    return { item: state.item }
}

class Product extends React.Component {
    state = {
        open: false,
        currentImg: ''
    }

    handleOpen = img => {
        this.setState({ open: true, currentImg: img})
    }

    handleClose = () => {
        this.setState({ open: false})
    }
  

    componentDidMount() {
        const { match: { params } } = this.props
        console.log(params.slug)
        this.props.getItemSlug(params.slug)
    }

    render() {
        let productCard;
        const { classes } = this.props;
        const { items } = this.props.item;
        const item = items[0];

        if(item) {
            productCard = (
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={item.pictUrl}
                        title={item.name}
                        onClick={() => this.handleOpen(item.pictUrl)}
                    />
                    <CardContent>
                        <h4>{item.name}</h4>
                        <h4>{item.price}</h4>
                        <hr />
                        <h4>warna: {item.color}</h4>
                        {item.size.map(size => (
                            <div>
                                <h4>size: {size.size}</h4>
                                <p>Lingkar Dada: {size.bust ? `${size.bust} cm` : '-'}</p>
                                <p>Lebar Bahu: {size.shoulderWidth ? `${size.shoulderWidth} cm` : '-'}</p>
                                <p>Panjang Lengan: {size.armLength ? `${size.armLength} cm` : '-'}</p>
                                <p>Lingkar Lengan: {size.wirst ? `${size.wirst} cm` : '-'}</p>
                                <p>Panjang: {size.height ? `${size.height} cm` : '-'}</p>
                                <p>Lingkar Pinggang: {size.waist ? `${size.waist} cm` : '-'}</p>
                            </div>
                        ))}
                        <h4>{item.detail}</h4>
                        <p>Produk bisa dikembalikan: {item.is_returnable ? 'Ya' : 'Tidak'}</p>
                    </CardContent>
                </Card>
            )
        } else {
            productCard = null
        }

        const actions = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ]
        return (
            <div>
                {productCard}
                <Dialog 
                    action={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <img src={this.state.currentImg} alt="" style={{ width: '100%'}}/>
                </Dialog>
            </div>
        );
    }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getItemSlug })(withStyles(styles)(Product));