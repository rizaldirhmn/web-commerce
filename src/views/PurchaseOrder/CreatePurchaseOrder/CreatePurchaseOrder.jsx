import React, { useEffect, Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    IconButton,
    Tooltip,
    Box,
    Button
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
import DeleteIcon from '@material-ui/icons/Delete'

// Component
import InputOrder from './InputOrder'

// Redux
import { connect } from 'react-redux'
import { 
    getPurchaseOrderDetail, 
    updatePurchaseOrderStatus,
    deletePurchaseOrderDetail
} from '../../../actions/purchaseOrder'
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
    { id: 'item', label: 'Item Produk', minWidth: 100 },
    { id: 'stok', label: 'Stok Tersedia', minWidth: 70 },
    { id: 'qty', label: 'Qty Order', minWidth: 80 },
    { id: 'hpp', label: 'Harga', minWidth: 100 },
    { id: 'total', label: 'Harga Total', minWidth: 100 },
    { id: 'action', label: 'Aksi', minWidth: 100 },
  ];

const CreatePurchaseOrder = ({ 
    updatePurchaseOrderStatus,
    getPurchaseOrderDetail, 
    purchaseOrder: { purchaseOrderDetails, loading, counting },
    deletePurchaseOrderDetail
}) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const history = useHistory()
    
    const { id } = useParams()

    useEffect(() => {
        getPurchaseOrderDetail(id)
    }, [id, loading, getPurchaseOrderDetail, counting]);

	const handleChangePage = newPage => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
    };

    const onUpdate = e => {
        updatePurchaseOrderStatus(id, history)
    }

    const onDeleteItem = id_po_detail => {
        // console.log(id_po_detail)
        deletePurchaseOrderDetail(id, id_po_detail, history)
    }

    return loading || purchaseOrderDetails == null ? 
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
                        <Typography variant="h4">Purchase Order</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Card>
                    <CardHeader 
                        title="List Order"
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
                            {purchaseOrderDetails.data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell>
                                        {product.product.name} {product.product.weight} {product.product.unit}
                                    </TableCell>
                                    <TableCell>
                                        {product.in_stock}
                                    </TableCell>
                                    <TableCell>
                                        {product.qty}
                                    </TableCell>
                                    <TableCell>
                                        <NumberFormat value={product.buy_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    </TableCell>
                                    <TableCell>
                                        <NumberFormat value={product.buy_price * product.qty} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    </TableCell>
                                    <TableCell>
                                        {purchaseOrderDetails.status_po === '99' ? (
                                            <Tooltip title="Hapus product">
                                                <IconButton aria-label="delete" onClick={() => onDeleteItem(product.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ):(
                                            <Typography>Tidak dapat dihapus</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={!loading && purchaseOrderDetails.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    </CardContent>
                </Card>
                {purchaseOrderDetails.status_po === '99' && (
                    <InputOrder />
                )}
                <Card>
                    <CardContent>
                        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                            <Box p={1}>
                                <Typography className={classes.totalPrice}>
                                    <NumberFormat value={purchaseOrderDetails.total_price_invoice} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                </Typography>
                            </Box>
                            <Box p={1}>
                                <Typography variant="h3">
                                    Total :
                                </Typography>
                            </Box>
                        </Box>
                        {purchaseOrderDetails.status_po === '99' && (
                            <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                                <Box p={1}>
                                    <Button variant="contained" className={classes.btn} onClick={onUpdate}>
                                        Kirim
                                    </Button>
                                </Box>
                                <Box p={1}>
                                    <Button variant="outlined">
                                        Batal
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </Fragment>
    
}

CreatePurchaseOrder.propTypes = {
    getPurchaseOrderDetail: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    purchaseOrder: state.purchaseOrder
})

export default connect(mapStateToProps, { getPurchaseOrderDetail, updatePurchaseOrderStatus, deletePurchaseOrderDetail })(CreatePurchaseOrder)