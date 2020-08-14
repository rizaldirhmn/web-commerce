import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Grid,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Paper,
    InputBase,
    IconButton,
    Divider,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import NumberFormat from 'react-number-format'

// Redux
import { connect } from 'react-redux'
import { addPayment } from '../../../../actions/payment'
import { getSearchCustomerAndClear } from '../../../../actions/customer'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        width: '30%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            borderRadius: theme.spacing(4),
            width: 'auto'
        },
    },
    cardNotch: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: '7px',
        borderRadius: '10px',
        border: 'none',
        width: '50%',
        [theme.breakpoints.up('md')]: {
            width: '30%'
        },
        margin: 'auto',
        backgroundColor: '#EEEEEE'
    },
    searchRoot: {
		padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
		width: 'auto',
		marginTop: theme.spacing(2)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    dividerHorizontal: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: 3,
        margin: 4
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

const PaymentMethodOptions = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const { handleDrawerPaymentClose, getSearchCustomerAndClear, customer : { searchCustomer, loading }, cart : { carts }, addPayment } = props

    const [formState, setFormState] = useState({
        input_price: '',
        note : ''
    });

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
          ...formState,
            [event.target.name]: event.target.value
        }));
    };

    const [ formCustomer ] = useState({
		params: '',
		kata_kunci: ''
	})

    const onSubmitPayment = () => {
        // console.log(searchCustomer.id, formState.input_price)
        addPayment(searchCustomer.id, formState.input_price, formState.note, history)
        handleDrawerPaymentClose()
        getSearchCustomerAndClear(formCustomer.params, formCustomer.kata_kunci)
    }

    return loading || searchCustomer === null ? 
	<Backdrop className={classes.backdrop} open>
		<CircularProgress color="inherit" />
    </Backdrop> 
    :
    <Fragment>
        <Card className={classes.root}>
            <hr className={classes.cardNotch} />
            <CardHeader
                title="Lanjutkan Pembayaran"
            />
            <CardContent>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <Typography>
                            Total Harus Bayar : <NumberFormat value={carts.total_payment} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                        </Typography>
                        
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <Typography>Tunai</Typography>
                        <Paper component="form" className={classes.searchRoot}>
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <Typography variant="subtitle2">Rp</Typography>
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <InputBase
                                className={classes.input}
                                defaultValue={formState.input_price || ''}
                                name="input_price"
                                onChange={handleChange}
                                placeholder="Masukan Nilai Tunai"
                                inputProps={{ 'aria-label': 'Masukan Nilai Tunai' }}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                {/* <Divider className={classes.dividerHorizontal} orientation="horizontal" />

                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={3}
                        
                    >
                        <Button variant="outlined" colro="primary">
                            BCA
                        </Button>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        
                    >
                        <Button variant="outlined" colro="primary">
                            MANDIRI
                        </Button>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        
                    >
                        <Button variant="outlined" colro="primary">
                            BRI
                        </Button>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        
                    >
                        <Button variant="outlined" colro="primary">
                            BNI
                        </Button>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        
                    >
                        <Button variant="outlined" colro="primary">
                            Lainnya
                        </Button>
                    </Grid>
                </Grid> */}

                <Divider className={classes.dividerHorizontal} orientation="horizontal" />

                <Grid
                    container
                    spacing={2}
                >
                    {/* <Grid
                        item
                        lg={6}
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <Typography>Lainnya</Typography>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="other_payment"
                                placeholder="Masukan Jenis Pembayaran"
                                inputProps={{ 'aria-label': 'Masukan Jenis Pembayaran' }}
                            />
                        </Paper>
                    </Grid> */}
                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <Typography>Catatan</Typography>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="note"
                                defaultValue={formState.note || ''}
                                onChange={handleChange}
                                placeholder="Catatan"
                                inputProps={{ 'aria-label': 'Catatan' }}
                            />
                        </Paper>
                    </Grid>
                </Grid>                
            </CardContent>
            <CardActions>
                <Grid container spacing={2} justify="space-between">
                    <Grid item>
                        <Button onClick={handleDrawerPaymentClose} variant="outlined" size="medium" color="primary">
                            Batal
                        </Button>
                    </Grid>
                    <Grid item>
                        {formState.input_price !== '' && (
                            <Button onClick={onSubmitPayment} variant="contained" size="medium" color="primary">
                                Bayar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </Fragment>
    
}

const mapStateToProps = state => ({
    customer: state.customer,
    cart: state.cart
})

export default connect(mapStateToProps, { addPayment, getSearchCustomerAndClear })(PaymentMethodOptions)