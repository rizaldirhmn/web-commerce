import React, { useEffect, Fragment, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Typography,
    Backdrop,
    CircularProgress,
    Button
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

// redux
import { connect } from 'react-redux'
import { getWarehouse } from '../../../store/actions/Master/warehouse'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    table: {
        width: '100%',
    },
    title: {
        fontFamily: 'Montserrat'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat'
    }
}))

const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
))

const Warehouse = props => {
  const classes = useStyles();
  const {
      getWarehouse,
      warehouse: {
          warehouseList,
          loadingWarehouse
      }
  } = props

  useEffect(() => {
      getWarehouse()
  }, [getWarehouse])

  let no = 1
  if(!loadingWarehouse){
      no = warehouseList.from
  }

  return loadingWarehouse ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                justify="space-between"
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>
                        Warehouse
                    </Typography>
                </Grid>
                <Grid item>  
                    <Button className={classes.button} component={CustomRouterLink} to='/warehouse/create'>
                        <div className={classes.textMenu}>
                            + Create Warehouse
                        </div>
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Warehouse name</TableCell>
                                <TableCell align="right">Phone Number</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Village</TableCell>
                                <TableCell align="right">District</TableCell>
                                <TableCell align="right">City</TableCell>
                                <TableCell align="right">Province</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {warehouseList.data.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell>{no++}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.number_phone}</TableCell>
                                    <TableCell align="right">{row.full_address}</TableCell>
                                    <TableCell align="right">{row.village}</TableCell>
                                    <TableCell align="right">{row.district}</TableCell>
                                    <TableCell align="right">{row.city}</TableCell>
                                    <TableCell align="right">{row.province}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    warehouse: state.warehouse
})

export default connect(mapStateToProps, { getWarehouse })(Warehouse) 