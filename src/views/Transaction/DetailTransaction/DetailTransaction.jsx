import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
// import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import {
    Card,
    CardContent,
    Grid,
    Typography,
    // IconButton,
    // Tooltip,
} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
// import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'
import moment from 'moment'

// Redux
import { connect } from 'react-redux'
import { getDetailTransaction } from '../../../actions/transaction'
import NumberFormat from 'react-number-format'


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
    { id: 'product', label: 'Item Produk', minWidth: 100 },
    { id: 'unit', label: 'Satuan Unit', minWidth: 70 },
    { id: 'jumlah', label: 'Jumlah', minWidth: 80 },
    { id: 'harga_satuan', label: 'Harga Satuan', minWidth: 100 },
    { id: 'total', label: 'Harga Total', minWidth: 100 },
  ];

const CreatePurchaseOrder = ({ getDetailTransaction, transaction : { transaction, loading } }) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const params = useParams()
    var no = 1;

	const handleChangePage = newPage => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
    };

    useEffect(() => {
        getDetailTransaction(params.id)
    }, [loading, getDetailTransaction, params])

    return loading || transaction == null ? 
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
                    justify="space-between"
                >
                    <Grid item>  
                        <Typography variant="h4">Laporan Detail Penjualan</Typography>
                    </Grid>
                    <Grid item>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" to="/dashboard">
                                Dashboard
                            </Link>
                            <Link color="inherit" to="/report/selling">
                                Laporan
                            </Link>
                            <Typography color="textPrimary">Detail Laporan</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} justify="space-between">
                            <Grid
                                item
                            >
                                <Typography variant="h4">Customer</Typography>
                                <Typography variant="body1">{transaction.customer.name}</Typography>
                                <Typography variant="body1">{transaction.customer.address}</Typography>
                            </Grid>
                            <Grid
                                item
                            >
                                <Typography variant="body1">Tanggal : {moment(transaction.created_at).format('DD MMMM yyyy')}</Typography>
                                <Typography variant="body1">Status : {transaction.status_name}</Typography>
                                <Typography variant="body1">No Invoice : {transaction.inv_name}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
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
                            {transaction.transaction_detail.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        {no++}
                                    </TableCell>
                                    <TableCell>
                                        {product.product.name} {product.product.weight} {product.product.unit}
                                    </TableCell>
                                    <TableCell>
                                        {product.product.unit}
                                    </TableCell>
                                    <TableCell>
                                        {product.qty}
                                    </TableCell>
                                    <TableCell>
                                        <NumberFormat value={product.sell_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    </TableCell>
                                    <TableCell>
                                        <NumberFormat value={product.qty * product.sell_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={!loading && transaction.transaction_detail.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    </CardContent>
                </Card>
            </div>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    transaction : state.transaction
})

export default connect(mapStateToProps, { getDetailTransaction })(CreatePurchaseOrder)