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
    Grid,
    Typography,
    Button,
    Tooltip,
    IconButton,
    InputBase,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { Skeleton } from '@material-ui/lab';

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
  { id: 'name', disablePadding: false, label: 'Nama User' },
  { id: 'phone', disablePadding: false, label: 'No Handphone' },
  { id: 'role', disablePadding: false, label: 'Role Akses' },
  { id: 'actions', disablePadding: false, label: 'Aksi' },
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
    btnConf: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        height: '500px'
    },
    table: {
        minWidth: 750,
        height: '500px'
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
    searchRoot: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
          width: '300px',
          [theme.breakpoints.down('sm')]: {
              width:'100%'
          }
      // marginTop: theme.spacing(2)
    },
    input: {
      marginLeft: theme.spacing(1),
          flex: 1,
          height: '35px',
          fontFamily: 'Montserrat'
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

const Category = props => {
  const classes = useStyles();
  const {
    onFetchUserList,
    userList,
    loadingUserList,
  } = props
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [keyword, setKeyword] = useState('')

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

  const handleChangeSearch = event => {
    // setKeyword(event.target.value)
    setInterval(setKeyword(event.target.value), 5000)
    setPage(0)
  }

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  let no = 1
  if (!loadingUserList && userList !== null) {
      no = userList.from
  }

  useEffect(() => {
      onFetchUserList(page+1, keyword)
  }, [onFetchUserList, page, keyword])

  return (
    <Fragment>
      <div className={classes.root}>
          <Grid
              container
              spacing={2}
              justify="space-between"
          >
              <Grid item>  
                  <Typography variant="h4" className={classes.title}>
                      Pengaturan Pengguna
                  </Typography>
              </Grid>
              <Grid item>  
                  <Button className={classes.button} component={CustomRouterLink} to='/users/create'>
                      <div className={classes.textMenu}>
                          + Buat Pengguna
                      </div>
                  </Button>
              </Grid>
          </Grid>
          <Grid 
              container
              spacing={2}
          >
              <Grid item>
                  <Paper component="form" className={classes.searchRoot}>
                      <InputBase
                          className={classes.input}
                          name="keyword"
                          value={keyword || ''}
                          onChange={handleChangeSearch}
                          placeholder='Cari Pengguna'
                          inputProps={{ 'aria-label': 'Cari Pengguna' }}
                      />
                      
                  </Paper>
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
                      <TableContainer className={classes.table}>
                      <Table
                          aria-labelledby="tableTitle"
                          size='small'
                          aria-label="enhanced table"
                      >
                          {loadingUserList || userList == null ? (
                            <>
                            <EnhancedTableHead
                              classes={classes}
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={0}
                            />
                            <TableBody>
                              <TableRow>
                                <TableCell colSpan={5}>
                                  <Skeleton></Skeleton>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                            </>
                          ):(
                            <>
                              <EnhancedTableHead
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={userList.total}
                              />
                              <TableBody>
                                {stableSort(userList.data, getComparator(order, orderBy))
                                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                  // const isItemSelected = isSelected(row.name);
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                      <TableRow
                                      hover
                                      // onClick={(event) => handleClick(event, row.name)}
                                      role="checkbox"
                                      // aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.name}
                                      // selected={isItemSelected}
                                      >
                                          <TableCell id={labelId}>{no++}</TableCell>
                                          <TableCell>{row.name}</TableCell>
                                          <TableCell>
                                              {row.number_handphone}
                                          </TableCell>
                                          <TableCell>
                                              {row.user_role.role}
                                          </TableCell>
                                          <TableCell>
                                            <Grid container spacing={2}>
                                              <Grid item>
                                                <Tooltip arrow title="Edit Sosial Media">
                                                  <IconButton component={CustomRouterLink} to={`/users/edit/${row.id}`}>
                                                    <img src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`} alt="Edit Sosial Media" />
                                                  </IconButton>
                                                </Tooltip>
                                              </Grid>
                                            </Grid>
                                          </TableCell>
                                      </TableRow>
                                  );
                                })}
                              </TableBody>
                            </>
                          )}
                      </Table>
                      </TableContainer>
                      {loadingUserList || userList == null ? (
                        <Skeleton></Skeleton>
                      ):(
                          <TablePagination
                          rowsPerPageOptions={[12]}
                          component="div"
                          count={userList.total}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          />
                      )}
                  </Paper>
              </Grid>
          </Grid>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
    userList : state.user.userList,
    loadingUserList: state.user.loadingUserList,
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserList : (page, keyword) => (dispatch(actions.fetchUserList(page, keyword))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)