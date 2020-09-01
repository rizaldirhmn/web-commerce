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
    IconButton,
    Divider,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField'

// Redux
import { connect } from 'react-redux'
import { addPayment } from '../../../../actions/payment'

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
    const { handleDrawerPaymentClose, customer : { searchCustomer, loadingSearchCustomer }, cart : { carts }, addPayment } = props

    const [formState, setFormState] = useState({
        input_price: '',
    });

    const [ changes, setChanges ] = useState(0)

    const handleChange = event => {
        // event.presist()
        setFormState(formState => ({
          ...formState,
            [event.target.name]: event.target.value
        }));

        setChanges(event.target.value - carts.total_payment)
    };

    const onSubmitPayment = () => {
        // console.log(searchCustomer.id, formState.input_price)
        addPayment(searchCustomer[0].id, formState.input_price, formState.note, history)
        handleDrawerPaymentClose()
    }

    return loadingSearchCustomer || searchCustomer === null ? 
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
                            <NumberFormat
                                {...props}
                                defaultValue={formState.input_price || ''}
                                name="input_price"
                                customInput={TextField}
                                type="text"
                                thousandSeparator
                                onValueChange={({ value: v }) => handleChange({ target : { name : 'input_price', value: v} })}
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
                        <Typography>Kembalian</Typography>
                        <Paper component="form" className={classes.searchRoot}>
                            {/* <InputBase
                                className={classes.input}
                                value={}
                                placeholder="Catatan"
                                inputProps={{ 'aria-label': 'Catatan' }}
                            /> */}
                                {changes <= 0 ? (
                                    <NumberFormat value='0' displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                ):(
                                    <NumberFormat value={changes} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                )}
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

export default connect(mapStateToProps, { addPayment })(PaymentMethodOptions)