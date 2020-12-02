import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { CSVLink } from 'react-csv'
import "../../../App.css"

const columns = [
  { id: 'no', label: 'No', minWidth: 100 },
  { id: 'code', label: 'Task Code', minWidth: 100 },
  { id: 'assign_date', label: 'Assign Date', minWidth: 100 },
  { id: 'customer_name', label: 'Customer Name', minWidth: 170 },
  { id: 'member_name', label: 'Member Name', minWidth: 170 },
  { id: 'task_status', label: 'Task Status', minWidth: 100 },
];

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
    return order === "desc"
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
    return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
    const {
        classes,
        order,
        orderBy,
        onRequestSort
    } = props;

    const createSortHandler = property => event => {
    onRequestSort(event, property);
    };

    return (
    <TableHead>
        <TableRow>
        {columns.map(column => (
            <TableCell
            key={column.id}
            sortDirection={orderBy === column.id ? order : false}
            >
            <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
            >
                <div className="text">
                    {column.label}
                </div>
                {orderBy === column.id ? (
                <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
                ) : null}
            </TableSortLabel>
            </TableCell>
        ))}
        </TableRow>
    </TableHead>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        padding: theme.spacing(2),
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
    },
    textHeader: {
        color: '#000000',
        fontFamily: 'Montserrat',
        fontWeight: 700
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

const TableCustomer = props => {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    
    const { 
        listTask,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
        } = props
        
    var no = listTask.from

    const customer = () => {
        let headers = []
        headers.push(
            ["Code (freetext | REQUIRED) ", "Description (freetext | OPTIONAL) ", "Customer Code (Ref: Master Customer | REQUIRED) ", "Task Type Code (Ref: Master Task Type | REQUIRED) ","User Code (Ref: Master User | REQUIRED) ","Assigndate (Date Format : yyyy-mm-dd | REQUIRED) "],
            ["ex: TASK-1199", "ex: This task has problem with the bill", "ex: CUST001", "ex: KYC","ex: andrew@gmail.com","ex: 2020-05-21"]
        )
        return headers
    }

  const [exCust] = useState(customer)

  return (
      <Card className={classes.paper}>
          <CardHeader 
              title="Master Task"
              classes={{
                  title: classes.textHeader
              }}
              action={
                  <Button className={classes.button}>
                      <CSVLink data={exCust} filename={`Template Task.csv`} separator={";"}>
                        <div className={classes.textMenu}>
                          Download Template
                        </div>
                      </CSVLink>
                  </Button>
              }
          />
          <CardContent>
            <TableContainer className={classes.container}>
              <Table stickyHeader size="small" aria-label="sticky table">
                <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={listTask.total}
                />  
              <TableBody>
                    {stableSort(listTask.data, getComparator(order, orderBy)).map(
                        (row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow key={row.task.code}>
                                    <TableCell id={labelId}>
                                        <div className="text">
                                            {no++}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text">
                                            {row.task.code}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text">
                                            {row.assign_date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text">
                                            {row.task.customer.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text">
                                            {row.user_id.display_name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text">
                                            {row.task.status}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        }
                    )}
              </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                count={listTask.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </CardContent>
      </Card>
  );
}

export default TableCustomer