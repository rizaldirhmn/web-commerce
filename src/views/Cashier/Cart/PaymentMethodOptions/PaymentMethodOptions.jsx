import React from 'react'
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
    }
}))

const PaymentMethodOptions = (props) => {
    const classes = useStyles()
    const { handleDrawerPaymentClose } = props
    
    return(
        <Card className={classes.root}>
            <hr className={classes.cardNotch} />
            <CardHeader
                title="Pilih Metode Pembayaran"
            />
            <CardContent>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        sm={6}
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
                                name="payment_cash"
                                placeholder="Masukan Nilai Tunai"
                                inputProps={{ 'aria-label': 'Masukan Nilai Tunai' }}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <Divider className={classes.dividerHorizontal} orientation="horizontal" />

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
                </Grid>

                <Divider className={classes.dividerHorizontal} orientation="horizontal" />

                <Grid
                    container
                    spacing={2}
                >
                    <Grid
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
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <Typography>Catatan</Typography>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="notes"
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
                        <Button onClick={handleDrawerPaymentClose} variant="contained" size="medium" color="primary">
                            Bayar
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default PaymentMethodOptions