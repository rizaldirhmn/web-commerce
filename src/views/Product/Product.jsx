import React, { useEffect, Fragment, forwardRef, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid,
    Typography,
    Button,
    Backdrop,
    List,
    ListItem,
    ListItemAvatar,
    CircularProgress,
    Avatar,
    ListItemText,
    Divider
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import TablePagination from '@material-ui/core/TablePagination'

import { connect } from 'react-redux'
import { getProduct } from '../../store/actions/Product/product'
import NumberFormat from 'react-number-format'

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
    rootList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
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

    const [ page, setPage ] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    } 

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    useEffect(() => {
        getProduct(page+1)
    }, [ getProduct, page ])

    return loadingProductList || productList === null ?
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
                <List className={classes.rootList}>
                    {productList.data.map((item, index) => (
                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        key={index}
                    >
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={item.title} src={item.resource_product[0].url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <React.Fragment>
                                        <RouterLink to={`/product/edit/${item.id}`}>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Edit
                                            </Typography>
                                        </RouterLink>
                                    {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                    </React.Fragment>
                                }
                            />
                            <ListItemText
                                primary="SKU"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {item.sku}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <ListItemText
                                primary="Stok"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {item.stock}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <ListItemText
                                primary="Kategori"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {item.sub_category.category.name}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <ListItemText
                                primary="Harga"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            <NumberFormat value={item.base_price} displayType={'text'} thousandSeparator={true} prefix={`Rp `} />
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Grid>
                    ))}
                    
                </List>
            </Grid>
            <Grid
                container
                spacing={2}
                justify="space-between"
            >
                <Grid item>
                    <Typography variant="h4">
                        Total : {productList.total}
                    </Typography>
                </Grid>
                <Grid item>
                    <TablePagination
                        rowsPerPageOptions={[15]}
                        component="div"
                        count={productList.total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </div>
    </Fragment>
    
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProduct })(Product)