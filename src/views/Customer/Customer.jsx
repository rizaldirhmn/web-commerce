import React, { forwardRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Typography,
    Grid,
    Fab,
    Paper,
    IconButton,
    InputBase,
    Divider,
    Hidden,
    Button
} from '@material-ui/core'
import AddCircle from '@material-ui/icons/AddCircle'
import SearchIcon from '@material-ui/icons/Search'
import { Link as RouterLink } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton'

// Components
import ListCustomer from './ListCustomer'

import { connect } from 'react-redux'
import { getSearchCustomer } from '../../actions/customer'
import { useState } from 'react'

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

const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
));

const Customer = ({ getSearchCustomer, customer : { searchCustomer, loadingSearchCustomer }}) => {
    const classes = useStyles()

    const [ keyword, setKeyword ] = useState('')

    const handleChangeSearch = event => {
        setKeyword(event.target.value)
        setPage(0)
    }

    const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(15);

	const handleChangePage = (event, newPage) => {
        setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

    useEffect(() => {
        getSearchCustomer(keyword, page+1)
    }, [loadingSearchCustomer, getSearchCustomer, keyword, page])

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                    justify="space-between"
                >
                    <Grid item>  
                        <Typography variant="h4">Customer</Typography>
                    </Grid>
                    <Grid item>  
                        <Button variant="contained" color="primary">
                            Import
                        </Button>
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
                            <Fab variant="extended" className={classes.btnAddCustomer} component={CustomRouterLink} to='/customer/create'>
                                <AddCircle className={classes.extendedIcon} />
                                Tambah Customer
                            </Fab>
                        </Grid>
                    </Hidden>
                    <Hidden only={['md','lg','xl']}>
                        <Fab color="primary" aria-label="add" className={classes.fab} component={CustomRouterLink} to='/customer/create'>
                            <AddCircle/>
                        </Fab>
                    </Hidden>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Paper component="form" className={classes.searchRoot}>
                            <IconButton type="button" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <InputBase
                                className={classes.input}
                                name="pesan"
                                onChange={handleChangeSearch}
                                placeholder="Cari Customer"
                                inputProps={{ 'aria-label': 'Cari Customer' }}
                            />
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
                        {!loadingSearchCustomer ? (
                            <ListCustomer 
                                searchCustomer={searchCustomer} 
                                rowsPerPage={rowsPerPage}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                                page={page}
                            />
                        ):(
                            <Skeleton variant="rect"></Skeleton>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    customer : state.customer
})

export default connect(mapStateToProps, {getSearchCustomer})(Customer)