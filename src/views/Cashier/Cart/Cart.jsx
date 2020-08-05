import React, { useState } from 'react'
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
		height: '337px'
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
        maxWidth: '150px',
        fontSize: '12px',
        color: '#FFFFFF'
    },
    btnDeleteAll: {
        fontSize: '12px'
    }
}))

const Cart = () => {
    const classes = useStyles()

    const [ modalPaymentOpen, setModalPaymentOpen ] = useState(false)
    
    const handleDrawerPaymentOpen = () => {
        setModalPaymentOpen(true)
    }

    const handleDrawerPaymentClose = () => {
        setModalPaymentOpen(false)
    }
    
    return(
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
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                        >
                            <Grid item>
                                <Typography variant="h6">Emas 0.1 gram</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2">
                                    <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    <IconButton aria-label="delete" className={classes.margin}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
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
                                <NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.contentItemsPayment}>
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
                            >
                                Kosongkan
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleDrawerPaymentOpen} className={classes.btnPayment}>
                                Pilih Pembayaran
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
                <PaymentMethodOptions />
            </SwipeableDrawer>
        </Card>
    )
}

export default Cart