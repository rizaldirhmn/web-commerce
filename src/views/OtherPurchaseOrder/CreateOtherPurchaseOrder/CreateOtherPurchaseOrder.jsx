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
    deletePurchaseOrderDetail,
    updatePurchaseOrderStatus
} from '../../../actions/otherPurchaseOrder'
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
    { id: 'nama', label: 'Deskripsi', minWidth: 100 },
    { id: 'harga', label: 'Harga', minWidth: 100 },
    { id: 'action', label: 'Aksi', minWidth: 100 },
  ];

const CreateOtherPurchaseOrder = ({ 
    getPurchaseOrderDetail, 
    deletePurchaseOrderDetail,
    updatePurchaseOrderStatus,
    otherPurchaseOrder: { otherPurchaseOrderDetails, loadingDetail, counting },
}) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const history = useHistory()
    var no = 1;
    
    const { id } = useParams()

    useEffect(() => {
        getPurchaseOrderDetail(id)
    }, [id, loadingDetail, getPurchaseOrderDetail, counting]);

	const handleChangePage = newPage => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
    };

    const onDeleteItem = id_cost_detail => {
        // console.log(id_cost_detail)
        deletePurchaseOrderDetail(id, id_cost_detail, history)
    }

    const onUpdate = e => {
        updatePurchaseOrderStatus(id, history)
    }

    return loadingDetail || otherPurchaseOrderDetails == null ? 
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
                        <Typography variant="h4">Catatan Pengeluaran</Typography>
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
                            {otherPurchaseOrderDetails.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {no++}
                                    </TableCell>
                                    <TableCell>
                                        {item.description}
                                    </TableCell>
                                    <TableCell>
                                        <NumberFormat value={item.value} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                    </TableCell>
                                    <TableCell>
                                        {otherPurchaseOrderDetails.cost.status === '0' ? (
                                            <Tooltip title="Hapus product">
                                                <IconButton aria-label="delete" onClick={() => onDeleteItem(item.id)}>
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
                        count={!loadingDetail && otherPurchaseOrderDetails.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    </CardContent>
                </Card>
                {otherPurchaseOrderDetails.cost.status === '0' && (
                    <InputOrder />
                )}
                <Card>
                    <CardContent>
                        <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                            <Box p={1}>
                                <Typography className={classes.totalPrice}>
                                    <NumberFormat value={otherPurchaseOrderDetails.cost.total_price_invoice} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
                                </Typography>
                            </Box>
                            <Box p={1}>
                                <Typography variant="h3">
                                    Total :
                                </Typography>
                            </Box>
                        </Box>
                        {otherPurchaseOrderDetails.cost.status === '0' && (
                            <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                                <Box p={1}>
                                    <Button variant="contained" className={classes.btn} onClick={onUpdate}>
                                        Simpan
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

CreateOtherPurchaseOrder.propTypes = {
    getPurchaseOrderDetail: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    otherPurchaseOrder: state.otherPurchaseOrder
})

export default connect(mapStateToProps, { getPurchaseOrderDetail, deletePurchaseOrderDetail, updatePurchaseOrderStatus })(CreateOtherPurchaseOrder)