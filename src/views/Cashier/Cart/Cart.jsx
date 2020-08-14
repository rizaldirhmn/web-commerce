import React, { useState, useEffect, Fragment } from 'react'
import {
    Grid,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Button,
    IconButton,
    SwipeableDrawer,
    Hidden
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import NumberFormat from 'react-number-format'
import {
    Delete
} from '@material-ui/icons'
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'

// Components to Props
import PaymentMethodOptions from './PaymentMethodOptions'

// Redux
import { connect } from 'react-redux'
import { getCart, deleteCartItem, deleteCartAllItem } from '../../../actions/cart'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            borderRadius: theme.spacing(4)
        },
    },
    cardNotch: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: '7px',
        borderRadius: '10px',
        border: 'none',
        width: '50%',
        margin: 'auto',
        backgroundColor: '#EEEEEE'
    },
    contentItems: {
        padding: theme.spacing(1),
        width: '100%',
		height: '390px'
    },
    contentItemsPayment: {
        padding: theme.spacing(1),
    },
    btnPayment: {
        backgroundColor: '#0277BD',
        '&:hover': {
            backgroundColor: "#2F96D3",
            color: '#FFFFFF'
         },
        // maxWidth: '150px',
        width: '100%',
        fontSize: '12px',
        color: '#FFFFFF'
    },
    btnDeleteAll: {
        fontSize: '12px'
    }
}))

const Cart = ({ getCart , cart : { carts, loading, counting }, deleteCartItem, deleteCartAllItem }) => {
    const classes = useStyles()

    const [ modalPaymentOpen, setModalPaymentOpen ] = useState(false)
    
    const handleDrawerPaymentOpen = () => {
        setModalPaymentOpen(true)
    }

    const handleDrawerPaymentClose = () => {
        setModalPaymentOpen(false)
    }

    const onDeleteItem = (e) => {
        deleteCartItem(e)
    }

    const onDeleteAllItem = () => {
        deleteCartAllItem()
    }

    useEffect(() => {
        getCart()
    }, [loading, getCart, counting])

    return loading || carts === null ? '' 
    :
    <Fragment>
        <Card className={classes.root}>
            <Hidden only={['md','lg','xl']}>
                <hr className={classes.cardNotch} />
            </Hidden>
            <CardHeader
                title="Rincian Pesanan"
            />
            <CardContent>
                <PerfectScrollbar>
                    <div className={classes.contentItems}>
                        {carts.cart.map((item) => (
                            <Grid
                                container
                                spacing={2}
                                justify="space-between"
                            >
                                <Grid item>
                                    <Typography variant="h6">
                                        {item.product.name} {item.product.weight} {item.product.unit} (x{item.qty})
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2">
                                        <NumberFormat value={item.total_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                        <IconButton aria-label="delete" className={classes.margin} onClick={() => onDeleteItem(item.id)}>
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </div>
                </PerfectScrollbar>
                <Divider />
                <div className={classes.contentItemsPayment}>
                    <Grid
                        container
                        spacing={2}
                        justify="space-between"
                    >
                        <Grid item>
                            <Typography variant="body">Total Pembayaran</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body">
                                <NumberFormat value={carts.total_payment} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.contentItemsPayment}>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            {carts.cart.length > 0 ? (
                                <Button fullWidth variant="contained" onClick={handleDrawerPaymentOpen} className={classes.btnPayment}>
                                    Lanjutkan Pembayaran
                                </Button>
                            ):(
                                <Button disabled fullWidth variant="contained" onClick={handleDrawerPaymentOpen} className={classes.btnPayment}>
                                    Lanjutkan Pembayaran
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        justify="space-between"
                    >
                        <Grid item>
                            <Button
                                variant="outlined"
                                className={classes.btnDeleteAll}
                                startIcon={<Delete />}
                                onClick={onDeleteAllItem}
                            >
                                Kosongkan
                            </Button>
                        </Grid>
                        
                        <Grid item>
                            <Button fullWidth variant="outlined">
                                Invoice
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </CardContent>
            <SwipeableDrawer
                anchor='bottom'
                open={modalPaymentOpen}
                onClose={handleDrawerPaymentClose}
                onOpen={handleDrawerPaymentOpen}
                disableSwipeToOpen
            >
                <PaymentMethodOptions handleDrawerPaymentClose={handleDrawerPaymentClose} />
            </SwipeableDrawer>
        </Card>
    </Fragment>
}

const mapStateToProps = state => ({
	cart: state.cart
})

export default connect(mapStateToProps, { getCart, deleteCartItem, deleteCartAllItem })(Cart)