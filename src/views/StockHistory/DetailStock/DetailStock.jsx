import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useParams } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton'
import moment from 'moment'
import {
    Grid,
    Typography
} from '@material-ui/core'


import { connect } from 'react-redux'
import { getStockDetail } from '../../../actions/stockHistory'
import { useEffect } from 'react';

const columns = [
  { id: 'no', label: 'No', minWidth: 100 },
  { id: 'tanggal', label: 'Tanggal', minWidth: 150 },
  { id: 'qty_before', label: 'Quantity Sebelumnya', minWidth: 100 },
  { id: 'qty_change', label: 'Perubahan Quantity', minWidth: 100 },
  { id: 'qty_after', label: 'Quantity Sekarang', minWidth: 100 },
  { id: 'status', label: 'Status Perubahan', minWidth: 100 },
  { id: 'type', label: 'Tipe Perubahan', minWidth: 100 },
];

const useStyles = makeStyles(theme => ({
	root: {
        marginTop: '20px',
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

const DetailStock = (props) => {
	const { getStockDetail, stockHistory : { detailStockHistory, loadingDetailStock } } = props
	const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { id } = useParams()
    var no = 1

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
    };

    useEffect(() => {
        getStockDetail(id)
    }, [ loadingDetailStock, getStockDetail, id ])

	return (
		<Fragment>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">History Stock Product</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Paper className={classes.root}>
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
                            {!loadingDetailStock ? (
                                <>
                                    {detailStockHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((detail) => (
                                        <TableRow key={detail.id}>
                                            <TableCell>
                                                {no++}
                                            </TableCell>
                                            <TableCell>
                                                {moment(detail.created_at).format('DD MMMM YYYY')}
                                            </TableCell>
                                            <TableCell>
                                                {detail.qty_before}
                                            </TableCell>
                                            <TableCell>
                                                {detail.qty_change}
                                            </TableCell>
                                            <TableCell>
                                                {detail.qty_after}
                                            </TableCell>
                                            <TableCell>
                                                {detail.status_name}
                                            </TableCell>
                                            <TableCell>
                                                {detail.type_name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ):(
                                <TableRow>
                                    <TableCell colsPan={7}>
                                        <Skeleton variant="rect" height={200}></Skeleton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={!loadingDetailStock && detailStockHistory.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
		</Fragment>
	)
	
}

const mapStateToProps = state => ({
    stockHistory: state.stockHistory
})
export default connect(mapStateToProps, { getStockDetail })(DetailStock)