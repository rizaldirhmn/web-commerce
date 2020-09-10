import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
// import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    TextField,
    Chip,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
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
import { getStockOpname, balancingStock } from '../../actions/stock_opname'
// import NumberFormat from 'react-number-format'

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
    { id: 'hpp', label: 'HPP', minWidth: 70 },
    { id: 'stock', label: 'Stock Aplikasi (On Hand)', minWidth: 70 },
    { id: 'stock_real', label: 'Stock Nyata (On Hand)', minWidth: 70 },
    { id: 'gap_stock', label: 'Selisih Stock', minWidth: 70 },
  ];

const StockOpname = ({ getStockOpname, balancingStock, stock_opname: { stockOpnames, loading, counting } }) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const history = useHistory()
    var no = 1

    const [ stockReal, setStockReal ] = useState([])

    const [ password, setPassword ] = useState()
    const [ openDialogPassword, setOpenDialogPassword ] = useState(false)

	const handleChangePage = newPage => {
		setPage(newPage);
    };
    
    const handleStockRealChange = (e,product, index) => {
        const { value } = e.target
        const list = [...stockReal]
        list[index] = { 
            id_product : product.id,
            [e.target.name] : value
        }
        setStockReal(list)
    }

    const handleDialogOpenPassword = () => {
        setOpenDialogPassword(true)
    }

    const handleDialogClosePassword = () => {
        setOpenDialogPassword(false)
    }

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleOnSubmit = () => {
        // console.log(stockReal, password)
        balancingStock(stockReal, password, history)
        handleDialogClosePassword(false)
    }

    useEffect(() => {
        getStockOpname()
        // if(!loading){
        //     for (let index = 0; index < stockOpnames.length; index++) {
        //         var list = [...stockReal]
        //         list[index] = { 
        //             id_product : stockOpnames[index].id,
        //             qty : stockOpnames[index].stock_on_hand
        //         }
        //         setStockReal(list)
        //     }
        // }
    }, [ loading, getStockOpname, counting ])
    console.log(stockReal)


    return loading || stockOpnames === null ? 
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
                        <Typography variant="h4">Stock Opname</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Card>
                    <CardHeader 
                        title="List Produk"
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
                            {stockOpnames.map((product,index) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        {no++}
                                    </TableCell>
                                    <TableCell>
                                        {product.name} {product.weight} {product.unit}
                                    </TableCell>
                                    <TableCell>
                                        -
                                    </TableCell>
                                    <TableCell>
                                        {product.stock_on_hand}
                                    </TableCell>
                                    <TableCell>
                                            <TextField
                                                fullWidth
                                                name="qty"
                                                variant="outlined"
                                                defaultValue='0'
                                                onChange={e => handleStockRealChange(e,product,index)}
                                            />
                                    </TableCell>
                                    <TableCell>
                                        {/* <Chip label={` ${stockReal[index] - product.stock} stock`} color="primary" /> */}
                                        {stockReal[index] ? (
                                            <>
                                            {stockReal[index].qty - product.stock_on_hand === 0 ? (
                                                <Chip label={` Balanced `} color="primary" />
                                            ):(
                                                <Chip label={` ${stockReal[index].qty - product.stock_on_hand} stock`} color="primary" />
                                            )}
                                            </>
                                        ):(
                                            <Chip label={` Not Set `} color="primary" />
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
                        count={!loading && stockOpnames.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    </CardContent>
                </Card>
                <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                    <Button className={classes.btn} variant="contained" onClick={handleDialogOpenPassword}>
                        Balancing
                    </Button>
                </Box>
            </div>
        </div>
        <Dialog open={openDialogPassword} onClose={handleDialogClosePassword} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Input Password</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Untuk dapat melakukan Balancing pada stock product, anda harus memasukan kembali password akun anda.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password Anda"
                type="password"
                fullWidth
                required
                onChange={onChangePassword}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClosePassword} color="primary">
                Cancel
            </Button>
            <Button onClick={handleOnSubmit} color="primary">
                Submit
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}

const mapStateToProps = state => ({
    stock_opname: state.stock_opname
})

export default connect(mapStateToProps, { getStockOpname, balancingStock })(StockOpname)