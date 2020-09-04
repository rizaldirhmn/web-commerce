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
import NumberFormat from 'react-number-format'
import moment from 'moment'
import DetailIcon from '@material-ui/icons/Search'
import { Link as RouterLink } from 'react-router-dom'
import { 
	Tooltip,
	IconButton,
	Collapse,
	Box,
	Typography
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const columns = [
  { id: 'tanggal', label: 'Tanggal', minWidth: 100 },
  { id: 'total', label: 'Total Pengeluaran', minWidth: 100 },
  { id: 'action', label: 'Aksi', minWidth: 100 },
  
];

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

function Row(props) {
	const { po } = props
	const [open, setOpen] = React.useState(false)
	var no = 1

	return(
		<Fragment>
			<TableRow key={po.id}>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>
					{moment(po.created_at).format('DD MMMM YYYY')}
				</TableCell>
				<TableCell>
					<NumberFormat value={po.total_price_invoice} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
				</TableCell>
				<TableCell>
					<Tooltip title="Detail Invoice">
						<RouterLink to={`/other-purchase-order/create/${po.id}`}>
							<IconButton aria-label="detail" color="primary">
								<DetailIcon />
							</IconButton>
						</RouterLink>
					</Tooltip>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
						<Typography variant="h6" gutterBottom component="div">
							Detail
						</Typography>
						<Table size="small" aria-label="purchases">
							<TableHead>
							<TableRow>
								<TableCell>No</TableCell>
								<TableCell>Nama Produk</TableCell>
								<TableCell align="center">Harga</TableCell>
								<TableCell align="right">Tanggal</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
								{po.cost_detail.map((item) => (
									<TableRow key={item.id}>
										<TableCell>
											{no++}
										</TableCell>
										<TableCell component="th" scope="row">
											{item.description}
										</TableCell>
										<TableCell align="center">
											<NumberFormat value={item.value} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
										</TableCell>
										<TableCell align="right">{moment(item.created_at).format('DD MMMM YYYY')}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	)
}

const ListPurchaseOrder = (props) => {
	const { otherPurchaseOrders } = props
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Fragment>
			<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table" style={{ minWidth: "340px" }}>
				<TableHead>
					<TableRow>
						<TableCell />
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
					{otherPurchaseOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((po) => (
						<Row key={po.id} po={po} />
					))}
				</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={otherPurchaseOrders.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			</Paper>
		</Fragment>
	)
	
}

export default ListPurchaseOrder