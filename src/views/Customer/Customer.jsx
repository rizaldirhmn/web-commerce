import React, { forwardRef } from 'react'
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
import { Link as RouterLink } from 'react-router-dom';

// Components
import ListCustomer from './ListCustomer'

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

const Customer = () => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">Customer</Typography>
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
                        <Fab color="primary" aria-label="add" className={classes.fab}>
                            <AddCircle/>
                        </Fab>
                    </Hidden>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="pesan"
                                placeholder="Cari Customer"
                                inputProps={{ 'aria-label': 'Cari Customer' }}
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
                        <ListCustomer />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Customer