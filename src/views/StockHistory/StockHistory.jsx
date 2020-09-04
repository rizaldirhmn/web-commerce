import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Typography,
    Grid,
    Paper,
    IconButton,
    InputBase,
    Divider,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

// Components
import ListProduct from './ListProduct'

import { connect } from 'react-redux'
import { getStock } from '../../actions/stockHistory'
import { useEffect } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

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

const StockHistory = ({
    getStock,
    stockHistory : { stockHistory, loading }
}) => {
    const classes = useStyles()

    useEffect(() => {
        getStock()
    }, [loading, getStock])

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">List Product</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                    justify='space-between'
                >
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="pesan"
                                placeholder="Cari Product"
                                inputProps={{ 'aria-label': 'Cari Product' }}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton type="button" className={classes.iconButton} aria-label="search">
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
                        {!loading ? (
                            <ListProduct stockHistory={stockHistory} />
                        ):(
                            <Skeleton variant="rect" height={100}></Skeleton>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    stockHistory: state.stockHistory
})

export default connect(mapStateToProps, {getStock})(StockHistory)