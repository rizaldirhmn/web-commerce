import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import {
    Typography,
    Grid,
    Fab,
    Paper,
    InputBase,
    Divider,
    Hidden,
    CardHeader,
    CardContent,
    Card,
    TextField,
    MenuItem
} from '@material-ui/core'
import AddCircle from '@material-ui/icons/AddCircle'
import { useHistory } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton'

// Components
import ListPurchaseOrder from './ListPurchaseOrder'

// Redux
import { connect } from 'react-redux'
import { addPurchaseOrder, getPurchaseOrder } from '../../actions/purchaseOrder'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    btnAddCustomer: {
        backgroundColor: '#0277BD',
        '&:hover' : {
            backgroundColor: '#2092D6'
        },
        color: '#FFFFFF',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    searchRoot: {
		padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
		width: 'auto',
		// marginTop: theme.spacing(2)
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
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(2),
    },
}))

const PurchaseOrder = ({ 
    addPurchaseOrder,
    getPurchaseOrder, 
	purchaseOrder : { purchaseOrders, loading } 
}) => {
    const classes = useStyles()
    const history = useHistory()

    const onSubmit = e => {
        addPurchaseOrder(history)
    }

    const [ status, setStatus ] = useState(3)
    const [ type, setType ] = useState('id_invoice')
    const [ keyword, setKeyword ] = useState('')

    const handleChangeStatusPrice = event => {
        setStatus(event.target.value)
    }    

    const handleChangeType = event => {
        setType(event.target.value)
    }    

    const handleChangeKeyword = event => {
        setKeyword(event.target.value)
    }

    useEffect(() => {
		getPurchaseOrder(keyword, status, type)
	}, [loading, getPurchaseOrder, keyword, status, type]);

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">Pencatatan Pengeluaran</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                    justify='space-between'
                >
                    <Hidden only={['xs','sm']}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <Fab variant="extended" className={classes.btnAddCustomer} onClick={onSubmit}>
                                <AddCircle className={classes.extendedIcon} />
                                Catat Pengeluaran Baru
                            </Fab>
                        </Grid>
                    </Hidden>
                    <Hidden only={['md','lg','xl']}>
                        <Fab color="primary" aria-label="add" className={classes.fab} onClick={onSubmit}>
                            <AddCircle/>
                        </Fab>
                    </Hidden>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="pesan"
                                onChange={handleChangeKeyword}
                                value={keyword || ''}
                                placeholder="Cari"
                                inputProps={{ 'aria-label': 'Cari Invoice' }}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <TextField 
                                select
                                className={classes.statusPO}
                                variant="outlined"
                                name="type"
                                defaultValue={type}
                                label="Tipe Pencarian"
                                onChange={handleChangeType}
                            >
                                <MenuItem value="id_invoice">No Invoice</MenuItem>
                            </TextField>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
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
                        <Card>
                            <CardHeader 
                                title="List Purchase Order"
                                action={
                                    <TextField 
                                        select
                                        fullWidth
                                        className={classes.statusPO}
                                        variant="outlined"
                                        name="status"
                                        defaultValue={status}
                                        label="Status Harga"
                                        onChange={handleChangeStatusPrice}
                                    >
                                        <MenuItem value="3">On Process</MenuItem>
                                        <MenuItem value="1">Complete</MenuItem>
                                        <MenuItem value="2">Ditolak</MenuItem>
                                    </TextField>
                                }
                            />
                            <CardContent>
                                {!loading ? (
                                    <ListPurchaseOrder purchaseOrders={purchaseOrders} />
                                ):(
                                    <Skeleton variant="rect" height={200}></Skeleton>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

PurchaseOrder.propTypes = {
    getPurchaseOrder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  purchaseOrder: state.purchaseOrder
})

export default connect(mapStateToProps, { addPurchaseOrder, getPurchaseOrder })(PurchaseOrder)