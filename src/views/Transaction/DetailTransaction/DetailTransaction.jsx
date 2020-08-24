import React, { Fragment, useState, useEffect, forwardRef } from 'react'
import { makeStyles } from '@material-ui/styles'
// import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    CardActions
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
import { Link as RouterLink } from 'react-router-dom'
import moment from 'moment'
import CapitalizedText from '../../../components/layout/CapitalizedText'

// Redux
import { connect } from 'react-redux'
import { getDetailTransaction } from '../../../actions/transaction'
import NumberFormat from 'react-number-format'
import CartIcon from '@material-ui/icons/AddShoppingCart'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    totalPrice: {
        color: '#FF9300',
        fontSize: 30
    },
    btn: {
        backgroundColor: '#FF9300',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#FFA938',
          opacity: 1,
        },
    },
}))

const columns = [
    { id: 'no', label: 'No', minWidth: 30 },
    { id: 'product', label: 'Item Produk', minWidth: 100 },
    { id: 'unit', label: 'Satuan Unit', minWidth: 70 },
    { id: 'jumlah', label: 'Jumlah', minWidth: 80 },
    { id: 'harga_satuan', label: 'Harga Satuan', minWidth: 100 },
    { id: 'total', label: 'Harga Total', minWidth: 100 },
  ];

const CustomRouterLink = forwardRef((props, ref) => (
    <div
        ref={ref}
        style={{ flexGrow: 1 }}
    >
        <RouterLink {...props} />
    </div>
));

const DetailTransaction = ({ getDetailTransaction, transaction : { transaction, loading } }) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const { id } = useParams()
    var no = 1;
    const cashier = JSON.parse(sessionStorage.getItem('data'))

	const handleChangePage = newPage => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
    };

    useEffect(() => {
        getDetailTransaction(id)
    }, [loading, getDetailTransaction, id])

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
                        <Typography variant="h4">Invoice</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            className={classes.btn}
                            variant="contained"
                            component={CustomRouterLink}
                            to='/cashier'
                            startIcon={<CartIcon />}
                        >
                            TRANSAKSI
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Card>
                    <CardContent>
                        <Grid container justify="center">
                            <Grid item>
                                <img alt='logo' width='100' height='100' src={`${process.env.PUBLIC_URL}/images/logo/logo_eoa.png`} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardContent>
                        <Grid container spacing={2} justify="space-between">
                            <Grid
                                item
                            >
                                <Typography variant="h4">Invoice</Typography>
                                <Typography variant="body1">{transaction.customer.name}</Typography>
                                <Typography variant="body1">{transaction.customer.address}</Typography>
                            </Grid>
                            <Grid
                                item
                            >
                                <Typography variant="body1">Tanggal : {moment(transaction.created_at).format('DD MMMM yyyy HH:mm')}</Typography>
                                <Typography variant="body1">Nama Kasir : {cashier.name}</Typography>
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
                                        <CapitalizedText text={product.product.name} /> {product.product.weight} <CapitalizedText text={product.product.unit} />
                                    </TableCell>
                                    <TableCell>
                                        <CapitalizedText text={product.product.unit} />
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
                            <TableRow>
                                <TableCell colSpan={5} align="right">
                                    <Typography variant="h6">Total</Typography>
                                </TableCell>
                                <TableCell>
                                    <NumberFormat value={transaction.total} displayType={'text'} thousandSeparator={true} prefix={`Rp `} />
                                </TableCell>
                            </TableRow>
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
                    <CardActions>
                        <Grid container justify="center">
                            <Grid item>
                                <Typography variant="h3">Terima Kasih</Typography>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>

            </div>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    transaction : state.transaction
})

export default connect(mapStateToProps, { getDetailTransaction })(DetailTransaction)