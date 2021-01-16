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
import { updateStatus } from '../../../store/actions/PaymentConfirmation/PaymentConfirmationAction'

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
    const {
        openConfirmationDialog,
        handleCloseConfirmationDialog,
        updateStatus,
        paymentConfirmationReducer: {
            loadingUpdatePaymentStatus
        }
    } = props

    const onUpdateStatus = event => {
        console.log(event)
        let statusUpdate = status
        if(event !== null){
            if(status === 2){
                statusUpdate = 3
            }else if (status === 3){
                statusUpdate = 4
            }else if (status === 4){
                statusUpdate = 6
            }
            updateStatus(event, statusUpdate, history)
        }
    }

    return loadingUpdatePaymentStatus ?
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
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
                        <Button onClick={onUpdateStatus(openConfirmationDialog.item)} className={classes.button}>
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

export default connect(mapStateToProps, { updateStatus })(TablePaymentConfirmation)