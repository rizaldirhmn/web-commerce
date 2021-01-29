import React, { useEffect, Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid,
    Typography,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Paper,
    InputBase
} from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination'

import { connect } from 'react-redux'
import { getProduct } from '../../../../../store/actions/Product/product'
import NumberFormat from 'react-number-format'
import { Skeleton } from '@material-ui/lab'

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
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    searchRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
        width: '300px',
        [theme.breakpoints.down('sm')]: {
            width:'100%'
        }
		// marginTop: theme.spacing(2)
	},
	input: {
		marginLeft: theme.spacing(1),
        flex: 1,
        height: '35px',
        fontFamily: 'Montserrat'
	},
	iconButton: {
        padding: 10,
	},
	divider: {
        height: 28,
        margin: 4,
	},
}))

const Product = props => {
    const classes = useStyles()
    const {
        getProduct,
        handleAddProductList,
        product: {
            productList,
            loadingProductList
        }
    } = props

    const [ page, setPage ] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)
    const [keyword, setKeyword] = useState('')

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    } 

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeSearch = event => {
        // setKeyword(event.target.value)
        setInterval(setKeyword(event.target.value), 5000)
        setPage(0)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getProduct(page+1, keyword)
        }, 1000)

        return () => clearTimeout(timer)
    }, [ getProduct, page, keyword ])

    // return loadingProductList || productList === null ?
    // <Backdrop className={classes.backdrop} open>
    //     <CircularProgress color="inherit" />
    // </Backdrop>
    // :
    return (
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
                </Grid>
                <Grid 
                    container
                    spacing={2}
                >
                    <Grid item>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="keyword"
                                value={keyword || ''}
                                onChange={handleChangeSearch}
                                placeholder='Cari Produk'
                                inputProps={{ 'aria-label': 'Cari Customer' }}
                            />
                            
                        </Paper>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                >
                    {!loadingProductList && productList !== null ? (
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
                                    <ListItemText
                                        primary="Aksi"
                                        secondary={
                                            <React.Fragment>
                                                <Button onClick={() => handleAddProductList(item)}>
                                                    Pilih
                                                </Button>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </Grid>
                            ))}
                        </List>
                    ):(
                        <List className={classes.rootList}>
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                key='loading'
                            >
                                <ListItem>
                                    <Skeleton style={{ width: '100%'}}></Skeleton>
                                </ListItem>
                                <ListItem>
                                    <Skeleton style={{ width: '100%'}}></Skeleton>
                                </ListItem>
                                <ListItem>
                                    <Skeleton style={{ width: '100%'}}></Skeleton>
                                </ListItem>
                                <ListItem>
                                    <Skeleton style={{ width: '100%'}}></Skeleton>
                                </ListItem>
                            </Grid>
                        </List>
                    )}
                </Grid>
                {!loadingProductList && productList !== null ? (
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
                ):(
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Skeleton style={{ width: '100%'}}></Skeleton>
                        </Grid>
                    </Grid>
                )}
            </div>
        </Fragment>
    )
    
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProduct })(Product)