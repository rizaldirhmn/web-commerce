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

import { CSVLink } from 'react-csv'

// const columns = [
//   { id: 'no', label: 'No', minWidth: 100 },
//   { id: 'code', label: 'Task Code', minWidth: 100 },
//   { id: 'task_description', label: 'Task Description' , minWidth: 270 },
//   { id: 'assign_date', label: 'Assign Date', minWidth: 100 },
//   { id: 'valid_until', label: 'Valid Until', minWidth: 100 },
//   { id: 'customer_name', label: 'Customer Name', minWidth: 170 },
//   { id: 'customer_email', label: 'Customer Email', minWidth: 170 },
//   { id: 'task_status', label: 'Task Status', minWidth: 100 },
//   { id: 'assign_to', label: 'Assign To', minWidth: 200 },
// ];

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
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
}));

const TableCustomer = props => {
    const classes = useStyles();
    
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
              title="Customer"
              action={
                  <Button className={classes.button}>
                      <CSVLink data={exCust} filename="Template Task" separator={";"}>
                        <div className={classes.textMenu}>
                          Download Template
                        </div>
                      </CSVLink>
                  </Button>
              }
          />
          <CardContent>
            <TableContainer className={classes.container}>
              <Table stickyHeader>
              <TableHead>
                  <TableRow>
                  {/* {columns.map((column) => (
                      <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      >
                      {column.label}
                      </TableCell>
                  ))} */}
                    <TableCell>
                        No
                    </TableCell>
                    <TableCell>
                        Task Code
                    </TableCell>
                    <TableCell>
                        Task Description
                    </TableCell>
                    <TableCell>
                        Assign date
                    </TableCell>
                    <TableCell>
                        Valid Until
                    </TableCell>
                    <TableCell>
                        Customer Name
                    </TableCell>
                    <TableCell>
                        Customer Email
                    </TableCell>
                    <TableCell>
                        Task Status
                    </TableCell>
                    <TableCell>
                        Assign To
                    </TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {listTask.data.map((row) => (
                      <TableRow key={row.task.code}>
                          <TableCell>
                              {no++}
                          </TableCell>
                          <TableCell>
                              {row.task.code}
                          </TableCell>
                          <TableCell>
                              {row.task.description}
                          </TableCell>
                          <TableCell>
                              {row.assign_date}
                          </TableCell>
                          <TableCell>
                              {row.valid_until}
                          </TableCell>
                          <TableCell>
                              {row.task.customer.name}
                          </TableCell>
                          <TableCell>
                              {row.task.customer.email}
                          </TableCell>
                          <TableCell>
                              {row.task.status}
                          </TableCell>
                          <TableCell>
                              {row.user_id.display_name}({row.user_id.username})
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
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