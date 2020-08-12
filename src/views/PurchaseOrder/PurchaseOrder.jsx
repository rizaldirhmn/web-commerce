import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Typography,
    Grid,
    Fab,
    Paper,
    IconButton,
    InputBase,
    Divider,
    Hidden
} from '@material-ui/core'
import AddCircle from '@material-ui/icons/AddCircle'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom';

// Components
import ListPurchaseOrder from './ListPurchaseOrder'

// Redux
import { connect } from 'react-redux'
import { addPurchaseOrder } from '../../actions/purchaseOrder'

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

const PurchaseOrder = ({ addPurchaseOrder}) => {
    const classes = useStyles()
    const history = useHistory()

    const onSubmit = e => {
        addPurchaseOrder(history)
    }

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">Purchase Order</Typography>
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
                                Buat Pembelian Baru
                            </Fab>
                        </Grid>
                    </Hidden>
                    <Hidden only={['md','lg','xl']}>
                        <Fab color="primary" aria-label="add" className={classes.fab}>
                            <AddCircle/>
                        </Fab>
                    </Hidden>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="pesan"
                                placeholder="Cari Invoice"
                                inputProps={{ 'aria-label': 'Cari Invoice' }}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
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
                        <ListPurchaseOrder />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default connect(null, { addPurchaseOrder })(PurchaseOrder)