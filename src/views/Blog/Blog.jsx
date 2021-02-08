import React, { useEffect, Fragment, forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Paper,
    Backdrop,
    CircularProgress,
    Grid,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'

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
  { id: 'no', disablePadding: false, label: 'No' },
  { id: 'name', disablePadding: false, label: 'Judul Blog' },
  { id: 'imageUrl', disablePadding: false, label: 'Foto' },
  { id: 'actions', disablePadding: false, label: 'Action' },
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(4)
    },
    title: {
        fontFamily: 'Montserrat'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat'
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
}));

const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
))

const Banner = props => {
  const classes = useStyles();
  const {
    onFetchBlogList,
    loadingBlogList,
    blogList,
    onDeleteBlog,
    loadingBannerData
  } = props
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

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

  const [ openDialogConfirmation, setOpenDialogConfirmation ] = useState({
      open: false,
      item: null
  })

  const changeOpenDialogConfirmation = event => {
      setOpenDialogConfirmation({
          open: true,
          item: event
      })
  }

  const changeCloseDialogConfirmation = event => {
    setOpenDialogConfirmation({
        open: false,
        item: event
    })
}

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  let no = 1

  const onClickDeleteBlog = event => {
    onDeleteBlog(event.slug)
    changeCloseDialogConfirmation(event)
  }

  useEffect(() => {
      onFetchBlogList('', page+1)
  }, [onFetchBlogList, page])

  return loadingBlogList || blogList === null || loadingBannerData ? 
  <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
  </Backdrop>
  :
  <Fragment>
    <div className={classes.root}>
        <Grid
            container
            spacing={2}
            justify="space-between"
        >
            <Grid item>  
                <Typography variant="h4" className={classes.title}>
                    Blog
                </Typography>
            </Grid>
            <Grid item>  
                <Button className={classes.button} component={CustomRouterLink} to='/blog/create'>
                    <div className={classes.textMenu}>
                        + Create Blog
                    </div>
                </Button>
            </Grid>
        </Grid>
        <Grid
            container
            spacing={2}
        >
            <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
            >
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
                        rowCount={blogList.total}
                        />
                        <TableBody>
                        {stableSort(blogList.data, getComparator(order, orderBy))
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            // const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.name}
                                >
                                    <TableCell id={labelId}>{no++}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                        <img src={row.image} width={100} alt=""/>
                                    </TableCell>
                                    <TableCell>
                                      <Grid container spacing={2}>
                                        <Grid item>
                                          <Tooltip arrow title="Edit Banner">
                                            <IconButton component={CustomRouterLink} to={`/blog/edit/${row.slug}`}>
                                              <img src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`} alt="Edit Banner" />
                                            </IconButton>
                                          </Tooltip>
                                        </Grid>
                                        <Grid item>
                                          <Tooltip arrow title="Delete Banner">
                                            <IconButton onClick={() => changeOpenDialogConfirmation(row)}>
                                              <img src={`${process.env.PUBLIC_URL}/images/icon/cancel.svg`} alt="Delete Banner" />
                                            </IconButton>
                                          </Tooltip>
                                        </Grid>
                                      </Grid>
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
                    rowsPerPageOptions={[15]}
                    component="div"
                    count={blogList.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>
        <Dialog
            open={openDialogConfirmation.open}
            onClose={() => changeCloseDialogConfirmation(openDialogConfirmation.item)}
        >
            <DialogContent>
                <DialogContentText>
                    Are you sure want to delete this blog?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} onClick={() => changeCloseDialogConfirmation(openDialogConfirmation.item)}>
                    Cancel
                </Button>
                <Button className={classes.button} onClick={() => onClickDeleteBlog(openDialogConfirmation.item)}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  </Fragment>
}

const mapStateToProps = state => ({
    blogList: state.blog.blogList,
    loadingBlogList: state.blog.loadingBlogList,
    loadingBannerData: state.banner.loadingBannerData
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchBlogList: (kata_kunci, page) => dispatch(actions.fetchBlogList(kata_kunci, page)),
        onDeleteBlog : (id) => dispatch(actions.deleteBlogList(id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)