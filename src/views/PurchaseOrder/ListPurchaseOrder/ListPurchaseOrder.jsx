import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import DetailIcon from '@material-ui/icons/Search'
import moment from 'moment'
import { Link as RouterLink } from 'react-router-dom'
import { 
	Tooltip,
	IconButton,
	Typography,
} from '@material-ui/core';
import NumberFormat from 'react-number-format'

const columns = [
  { id: 'no_invoice', label: 'No Invoice', minWidth: 100 },
  { id: 'nama', label: 'Nama Pembeli', minWidth: 200 },
  { id: 'cabang', label: 'Cabang', minWidth: 200 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'tanggal', label: 'Tanggal Pembelian', minWidth: 200 },
  { id: 'total', label: 'Total Pembelian', minWidth: 200 },
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

const ListPurchaseOrder = (props) => {
	const { purchaseOrders } = props
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
					{purchaseOrders.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((po) => (
						<TableRow key={po.id}>
							<TableCell>
								{po.inv_name}
							</TableCell>
							<TableCell>
								{po.user.name}
							</TableCell>
							<TableCell>
								{po.branch.name}
							</TableCell>
							<TableCell>
								{po.status_name}
							</TableCell>
							<TableCell>
								{moment(po.created_at).format('DD MMMM YYYY HH:mm')}
							</TableCell>
							<TableCell>
								<NumberFormat value={po.total_price_invoice} displayType={'text'} thousandSeparator={true} prefix={`Rp `} />
							</TableCell>
							<TableCell>
								<Tooltip title="Detail Invoice">
									<RouterLink to={`/purchase-order/create/${po.id}`}>
										<IconButton aria-label="detail" color="primary">
											<DetailIcon />
										</IconButton>
									</RouterLink>
								</Tooltip>
								<Tooltip title="Hapus Invoice">
									<IconButton aria-label="delete" color="primary">
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell colsPan={5}>
							<Typography variant="h4">Total</Typography>
						</TableCell>
						<TableCell colsPan={2}>
							<NumberFormat value="10000000" displayType={'text'} thousandSeparator={true} prefix={`Rp `} />
						</TableCell>
					</TableRow>
				</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={purchaseOrders.data.length}
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