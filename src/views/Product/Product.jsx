import React, { useEffect, Fragment, forwardRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid,
    Typography,
    Button,
    Card,
    CardMedia,
    CardActionArea,
    CardActions,
    CardContent,
    Backdrop,
    CircularProgress
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { getProduct } from '../../store/actions/Product/product'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    table: {
        width: '100%',
    },
    title: {
        fontFamily: 'Montserrat'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat'
    },
    cardRoot: {
        maxWidth: 345,
    }
}))

const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  ))

const Product = props => {
    const classes = useStyles()
    const {
        getProduct,
        product: {
            productList,
            loadingProductList
        }
    } = props

    useEffect(() => {
        getProduct()
    }, [ getProduct ])

    return loadingProductList ?
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                justify="space-between"
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>
                        List Product
                    </Typography>
                </Grid>
                <Grid item>  
                    <Button className={classes.button} component={CustomRouterLink} to='/product/create'>
                        <div className={classes.textMenu}>
                            + Create Product
                        </div>
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
            >
                {productList.data.map((item, index) => (
                    <Grid
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12}
                        key={index}
                    >
                        <Card className={classes.cardRoot}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                image={item.resource_product[0].url}
                                title={item.name}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.description}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                Share
                                </Button>
                                <Button size="small" color="primary">
                                Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    </Fragment>
    
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProduct })(Product)