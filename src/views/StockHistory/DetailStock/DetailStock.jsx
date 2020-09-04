import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useParams } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton'
import {
    Grid,
    Typography,
    Card,
    Chip,
    CardContent
} from '@material-ui/core'
import moment from 'moment'

import ArrowUpIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownIcon from '@material-ui/icons/ArrowDownward'

import { connect } from 'react-redux'
import { getStockDetail } from '../../../actions/stockHistory'
import { useEffect } from 'react';

import GrafikStock from './GrafikStock'

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

    const selectedDate  = useState(new Date());

    const submitDefault = moment().subtract(7,'d').format('YYYY-MM-DD');
    const submitDefaultEndDate = moment().format('YYYY-MM-DD');
    const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: moment().subtract(7,'d').format('YYYY-MM-DD')
        }
        
    });
    const handleStartDate = (date) => {
        const changeDate = moment(date).format('YYYY-MM-DD');
        setStartDate(startDate => ({
            ...startDate,
                submit: {
                    submit: changeDate
            },
                view: {
                    view: date
            }
        }));
    };

    const [ endDate, setEndDate ] = useState({
        submit: {
            submit: submitDefaultEndDate
        },
        view: {selectedDate}
    });
    const handleEndDate = (date) => {
    const all = moment(date).format('YYYY-MM-DD');
        setEndDate(endDate => ({
            ...endDate,
            submit: {
                submit: all
            },
            view: {
                view: date
            }
        }));
    };

    useEffect(() => {
        getStockDetail(id, startDate.submit.submit, endDate.submit.submit)
    }, [ loadingDetailStock, getStockDetail, id, startDate, endDate ])

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
                {!loadingDetailStock && (
                    <GrafikStock 
                        detailStockHistory={detailStockHistory} 
                        startDate={startDate} 
                        endDate={endDate} 
                        handleEndDate={handleEndDate}
                        handleStartDate={handleStartDate}
                  />
                )}
            </div>
            <div className={classes.row}>
                <Card className={classes.root}>
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
                                {!loadingDetailStock ? (
                                    <>
                                        {detailStockHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((detail) => (
                                            <TableRow key={detail.id}>
                                                <TableCell>
                                                    {no++}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(detail.created_at).format('DD MMMM YYYY HH:mm')}
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
                                                    {detail.status === '1' && (
                                                        <Chip
                                                            icon={<ArrowDownIcon fontSize="small" />}
                                                            label="Pengurangan"
                                                            style={{ color: '#FF6565' }}
                                                            variant="outlined"
                                                        />
                                                    )}
                                                    {detail.status === '2' && (
                                                        <Chip
                                                            icon={<ArrowUpIcon fontSize="small" />}
                                                            label="Penambahan"
                                                            style={{ color: '#4AD991' }}
                                                            variant="outlined"
                                                        />
                                                    )}
                                                    {detail.status === '5' && (
                                                        <Chip
                                                            icon={<ArrowUpIcon fontSize="small" />}
                                                            label="Penambahan"
                                                            style={{ color: '#4AD991' }}
                                                            variant="outlined"
                                                        />
                                                    )}
                                                    {detail.status === '4' && (
                                                        <Chip
                                                            icon={<ArrowUpIcon fontSize="small" />}
                                                            label="Penambahan"
                                                            style={{ color: '#4AD991' }}
                                                            variant="outlined"
                                                        />
                                                    )}
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
                    </CardContent>
                </Card>
            </div>
		</Fragment>
	)
	
}

const mapStateToProps = state => ({
    stockHistory: state.stockHistory
})
export default connect(mapStateToProps, { getStockDetail })(DetailStock)