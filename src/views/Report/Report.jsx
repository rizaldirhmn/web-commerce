import React, { useState } from 'react'
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/styles'
import {
    Grid,
    InputBase,
    Typography,
    Paper,
    IconButton,
    Divider,
    useMediaQuery,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Button,
    Hidden
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import { useParams } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { CSVLink } from 'react-csv'

import { connect } from 'react-redux'
import { getReport, exportReport, exportReportAbsence } from '../../store/actions/report'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    title: {
        fontFamily: 'Montserrat'
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '200px',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginTop: theme.spacing(3)
    },
    textMenu: {
        color: '#000000',
        fontFamily: 'Montserrat',
    },
    textButton: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
    },
    searchRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 'auto',
		// marginTop: theme.spacing(2)
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
			padding: 10,
	},
	divider: {
			height: 28,
			margin: 4,
	},
}))

const columns = [
	{ id: 'no', label: 'No', minWidth: 100 },
	{ id: 'code', label: 'Report Code', minWidth: 150 },
	{ id: 'name', label: 'Report Name', minWidth: 100 },	
  ];

const Report = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
  	const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const params = useParams()
    var no = 1
    const { 
        getReport,
        exportReport,
        exportReportAbsence,
        report: {
            listReport,
            dataReport,
        }
    } = props

    const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0)
	};

	const handleClickOpen = () => {
        setOpen(true);
        getReport(params.id, page+1)
	};

	const handleClose = () => {
		setOpen(false);
    };
    
    const [ selectedReport, setSelectedReport ] = useState(null)
    const handleSelectChange = event => {
        if(event.code === 'TASKRESULT'){
            exportReport(params.id, startDate.submit.submit, endDate.submit.submit)
        }else{
            exportReportAbsence(params.id, startDate.submit.submit, endDate.submit.submit)
        }
        setSelectedReport(event)
		setOpen(false)
    };
    
    const submitDefault = moment().format('YYYY-MM-DD')
	// const minDate = moment().subtract(2, 'd').format('YYYY-MM-DD')
	const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: new Date()
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
            submit: submitDefault
        },
        view: {
            view: new Date()
        }
        
	});
    const handleEndDate = (date) => {
        const changeDate = moment(date).format('YYYY-MM-DD');
        setEndDate(endDate => ({
            ...endDate,
                submit: {
                    submit: changeDate
            },
                view: {
                    view: date
            }
        }));
    };
    
    // useEffect(() => {
    //     exportReport(params.id, startDate.submit.submit, endDate.submit.submit)
    // }, [exportReport, params, startDate, endDate])

    return(
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>Report</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
            >
                <Grid 
                    item 
                    lg={6}
                    md={8}
                    sm={8}
                    xs={12}
                >
                    <Paper component="form" className={classes.searchRoot}>
                        <IconButton type="button" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical" />
                        <InputBase
                            className={classes.input}
                            name="nama"
                            // value={keyword.values.keyword || ''}
                            onClick={handleClickOpen}
                            placeholder="Click To Choose Report"
                            inputProps={{ 'aria-label': 'Cari Customer' }}
                        />
                        
                    </Paper>
                </Grid>
            </Grid>
            {dataReport !== null && (
                <>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1" className={classes.textMenu}>
                                <div>
                                    {selectedReport.name}
                                </div>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid 
                        item 
                        lg={6}
                        md={8}
                        sm={8}
                        xs={12}
                    >
                        <Typography>Transaction Start Date (*)</Typography>
						<div className={classes.row}>
							<Paper component="form" className={classes.searchRoot}>
								<IconButton type="button" className={classes.iconButton} aria-label="search">
									<CalendarIcon />
								</IconButton>
								<Divider className={classes.divider} orientation="vertical" />
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										fullWidth
										disableFuture
										// minDate={minDate}
										ampm={false}
										variant="outlined"
										name="start_date"
										format="dd MMMM yyyy"
										value={startDate.view.view} 
										onChange={handleStartDate} 
									/>
								</MuiPickersUtilsProvider>
							</Paper>
						</div>
                    </Grid>
                    <Hidden xsDown>
                        <Grid 
                            item 
                            lg={6}
                            md={4}
                            sm={4}
                            xs={12}
                        >
                            <CSVLink data={dataReport} filename={`${selectedReport.name}.csv`} separator={";"}>
                                <Button className={classes.button}>
                                    <div className={classes.textButton}>
                                    Download Report
                                    </div>
                                </Button>
                            </CSVLink>
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid container spacing={2}>
                    <Grid 
                        item 
                        lg={6}
                        md={8}
                        sm={8}
                        xs={12}
                    >
                        <Typography>Transaction End Date (*)</Typography>
						<div className={classes.row}>
							<Paper component="form" className={classes.searchRoot}>
								<IconButton type="button" className={classes.iconButton} aria-label="search">
									<CalendarIcon />
								</IconButton>
								<Divider className={classes.divider} orientation="vertical" />
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										fullWidth
										disableFuture
										// minDate={minDate}
										ampm={false}
										variant="outlined"
										name="end_date"
										format="dd MMMM yyyy"
										value={endDate.view.view} 
										onChange={handleEndDate} 
									/>
								</MuiPickersUtilsProvider>
							</Paper>
						</div>
                    </Grid>
                    <Hidden smUp>
                        <Grid 
                            item 
                            lg={6}
                            md={4}
                            sm={4}
                            xs={12}
                        >
                            <CSVLink data={dataReport} filename={`${selectedReport.name}.csv`} separator={";"}>
                                <Button fullWidth className={classes.button}>
                                    <div className={classes.textButton}>
                                    Download Report
                                    </div>
                                </Button>
                            </CSVLink>
                        </Grid>
                    </Hidden>
                </Grid>
                </>
            )}
            <Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"List Report"}</DialogTitle>
				<DialogContent>
                    <DialogContentText>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <div className={classes.row}>
                                    {listReport !== null && (
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
                                                    {listReport.data.map(item => (
                                                        <TableRow hover key={item.code} onClick={e => handleSelectChange(item)}>
                                                            <TableCell>
                                                                {no++}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item.code}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item.name}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[5]}
                                                component="div"
                                                count={listReport.total}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                                // ActionsComponent={TablePaginationActions}
                                            />
                                        </Paper>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContentText>
				</DialogContent>
			</Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    report: state.report
})

export default connect(mapStateToProps, { getReport, exportReport, exportReportAbsence })(Report)