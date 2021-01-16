import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
    Backdrop,
    CircularProgress,
    Link,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { getConfirmationPayment, updateStatus } from '../../../store/actions/PaymentConfirmation/PaymentConfirmationAction'
// import {  } from '../../../store/actions/PaymentConfirmation/PaymentConfirmationAction'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'no', label: 'No' },
  { id: 'name', label: 'Nama' },
  { id: 'no_telepon', label: 'No Telepon' },
  { id: 'total_price', label: 'Harga' },
  { id: 'total_price_ongkir', label: 'Harga dan ongkir' },
  { id: 'status', label: 'Status Pembayaran' },
  { id: 'bukti', label: 'Bukti Pembayaran' },
  { id: 'action', label: 'Aksi' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
},
}));

const dialogStyles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(dialogStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});

const TablePaymentConfirmation = props => {
    const classes = useStyles();
    const history = useHistory()
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const {
        getConfirmationPayment,
        updateStatus,
        paymentConfirmationReducer : {
            confirmPaymentList,
            loadingConfirmPaymentList,
            loadingUpdatePaymentStatus
        },
        status,
    } = props

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [ openConfirmationDialog, setOpenConfirmationDialog ] = useState({
        open: false,
        item: null
    })
    
    const handleOpenConfirmationDialog = (event) => {
        setOpenConfirmationDialog({
            open: true,
            item: event
        })
    }
    
    const handleCloseConfirmationDialog = (event) => {
        setOpenConfirmationDialog({
            open: false,
            item: event
        })
    }

    const onUpdateStatus = event => {
        console.log(status)
        let statusUpdate = status
        if(event !== null){
            if(status === 2){
                statusUpdate = 3
            }else if (status === 3){
                statusUpdate = 4
            }else if (status === 4){
                statusUpdate = 6
            }
            console.log(statusUpdate)
            updateStatus(event, statusUpdate, history)
            handleCloseConfirmationDialog(event)
        }
    }

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, confirmPaymentList.total - page * rowsPerPage);
    
    useEffect(() => {
        getConfirmationPayment(page+1, status)
    }, [ getConfirmationPayment, page, status])

    // console.log(confirmPaymentList)
    let no = 1
    if(!loadingConfirmPaymentList || confirmPaymentList !== null){
        no = confirmPaymentList.from
    }

    return loadingConfirmPaymentList || loadingUpdatePaymentStatus ?
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='small'
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={confirmPaymentList.total}
                    />
                    <TableBody>
                    {stableSort(confirmPaymentList.data, getComparator(order, orderBy))
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                        return (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={row.name}
                            >
                                <TableCell>{no++}</TableCell>
                                <TableCell>{row.checkout.user.name}</TableCell>
                                <TableCell>{row.checkout.user.number_handphone}</TableCell>
                                <TableCell>{row.checkout.total_price}</TableCell>
                                <TableCell>{row.checkout.total_price_plus_ongkir}</TableCell>
                                <TableCell>
                                    {row.status === '2' && (
                                        <Typography variant='p'>
                                            Menunggu Konfirmasi
                                        </Typography>
                                    )}
                                    {row.status === '3' && (
                                        <Typography variant='p'>
                                            Pesanan Diproses
                                        </Typography>
                                    )}
                                    {row.status === '4' && (
                                        <Typography variant='p'>
                                            Barang Sedang Dikirim
                                        </Typography>
                                    )}
                                    {row.status === '5' && (
                                        <Typography variant='p'>
                                            Pesanan Dibatalkan
                                        </Typography>
                                    )}
                                    {row.status === '6' && (
                                        <Typography variant='p'>
                                            Pesanan Selesai
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Link href={row.image} target="_blank">Download Bukti Bayar</Link>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenConfirmationDialog(row)}>
                                        <img src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`} alt="Dashboard" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                        })}
                        {/* {emptyRows > 0 && (
                            <TableRow style={{ height: 33 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )} */}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={confirmPaymentList.per_page}
                    component="div"
                    count={confirmPaymentList.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog
                fullWidth
                open={openConfirmationDialog.open}
                onClose={() => handleCloseConfirmationDialog(openConfirmationDialog.item)}
            >
                {/* <form onSubmit={onUpdateStatus(openConfirmationDialog.item)}> */}
                    <DialogTitle id="customized-dialog-title" onClose={() => handleCloseConfirmationDialog(openConfirmationDialog.item)}>
                        Konfirmasi Pembelian/Pembayaran
                    </DialogTitle>
                    <DialogContent>
                        Apakah anda ingin mengkonfirmasi pembelian ini menjadi ?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => onUpdateStatus(openConfirmationDialog.item)} className={classes.button}>
                            Ya
                        </Button>
                    </DialogActions>
                {/* </form> */}
            </Dialog>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    paymentConfirmationReducer: state.paymentConfirmationReducer
})

export default connect(mapStateToProps, { getConfirmationPayment, updateStatus })(TablePaymentConfirmation)