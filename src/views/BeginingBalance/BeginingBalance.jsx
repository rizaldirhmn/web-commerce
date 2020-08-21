import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
// import PropTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    // IconButton,
    // Tooltip,
    // Box,
    // Button
} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
// import DeleteIcon from '@material-ui/icons/Delete'

// Redux
import { connect } from 'react-redux'
import { getFirstBalance } from '../../actions/first_balance'
// import NumberFormat from 'react-number-format'

// Component
import InputOrder from './InputOrder'
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    btn: {
        backgroundColor: '#FF9300',
        color : '#FFFFFF',
        // marginTop: theme.spacing(1)
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    totalPrice: {
        color: '#FF9300',
        fontSize: 30
    }
}))

const columns = [
    { id: 'no', label: 'No', minWidth: 30 },
    { id: 'product', label: 'Produk', minWidth: 100 },
    { id: 'jumlah', label: 'Jumlah', minWidth: 70 },
  ];

const BeginingBalance = ({ getFirstBalance, first_balance : { firstBalances, loading, counting } }) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    // const history = useHistory()
    var no = 1

	const handleChangePage = newPage => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
    };

    useEffect(() => {
        getFirstBalance()
    }, [loading, getFirstBalance, counting])

    return loading || firstBalances === null ? 
        <Backdrop className={classes.backdrop} open>
            <CircularProgress color="inherit" />
        </Backdrop>  
    :
        <Fragment>
            <div className={classes.root}>
                <div className={classes.row}>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item>  
                            <Typography variant="h4">Stock Awal</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.row}>
                    <Card>
                        <CardHeader 
                            title="List Stock Awal"
                        />
                        <CardContent>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table" style={{ minWidth: "340px" }}>
                            <TableHead>
                                <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {firstBalances.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            {no++}
                                        </TableCell>
                                        <TableCell>
                                            {product.branch_stock.product.name} {product.branch_stock.product.weight} {product.branch_stock.product.unit}
                                        </TableCell>
                                        <TableCell>
                                            {product.branch_stock.product.stock}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={!loading && firstBalances.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        </CardContent>
                    </Card>
                    {firstBalances.length === 0 && (
                        <InputOrder />
                    )}
                </div>
            </div>
        </Fragment>
    
}

const mapStateToProps = state => ({
    first_balance : state.first_balance
})

export default connect(mapStateToProps, {getFirstBalance})(BeginingBalance)