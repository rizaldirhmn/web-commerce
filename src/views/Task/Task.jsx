import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Button,
    Grid,
    Typography,
    Paper,
    InputBase,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    LinearProgress,
    Snackbar,
    useMediaQuery,
    Backdrop,
    CircularProgress
} from '@material-ui/core'
import { Alert as Alerts } from '@material-ui/lab'
import TableTask from './TableTask'
import { connect } from 'react-redux'
import { getTask, getTaskType, reassignTask, updateCancelTask } from '../../store/actions/task'
import { getCustomer } from '../../store/actions/customer'
import { getMember } from '../../store/actions/member'
import { useParams, useHistory } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles';

import axios from 'axios'

import UploadCustomer from './UploadTask'
import { Skeleton } from '@material-ui/lab'

import CreateTask from './CreateTask'
import ReassignTask from './ReassignTask'


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
        width: '120px',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
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
        height: '35px'
	},
	iconButton: {
        padding: 10,
	},
	divider: {
        height: 28,
        margin: 4,
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
}))

const Task = props => {
    const classes = useStyles()
    const history = useHistory()
    const { 
        getTask,
        getTaskType,
        getCustomer,
        getMember,
        reassignTask,
        updateCancelTask,
        task: {
            listTask,
            taskType,
            loadingCancelTask,
            loadingReassignTask
        },
        customer: {
            listCustomer,
        },
        member: {
            listMember
        }
    } = props

    const [open, setOpen] = useState(false)
    const params = useParams()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setErrorUpload(null)
        setOpenCreateTask(false)
    }

    const [banner, setBanner] = useState([])
    const [ uploadPercentage, setUploadPercentage ] = useState(0)
    const [ errorUpload, setErrorUpload ] = useState(null)
    const [ openAlert, setOpenAlert ] = useState(false)

    // Dialog for create task
    const [openCreateTask, setOpenCreateTask ] = useState(false)
    // Dialog for Re-assign Task
    const [openReassignTask, setOpenReassignTask ] = useState({
        open: false,
        task: null
    })
    // Dialog for Cancel Task
    const [openCancelTask, setOpenCancelTask ] = useState({
        open: false,
        task: null
    })

    // Table
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [keyword, setKeyword] = useState('')

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeBanner = event => {
        setBanner(event[0])

    }

    const uploadFile = async event => {
        let data = new FormData()
        data.append('profile_id', params.id)
        data.append('file_csv', event )
        try {
            const res = await axios({
                url: "https://dev.api.jrvis.id/task/import",
                method: "POST",
                data: data,
                onUploadProgress : (progressEvent) => {
                    const {loaded, total} = progressEvent
                    let percent = Math.floor( (loaded * 100 ) / total )
        
                    if( percent < 100 ){
                        setUploadPercentage(percent)
                    }
                },
                headers: { 
                  'Content-Type': 'application/json', 
                  'Accept' : 'application/json', 
                  'Token' : `${sessionStorage.getItem('access_token')}`
                }
            })
            
            setUploadPercentage(100)
            setTimeout(() => {
                setUploadPercentage(0)
            }, 1000)
            if(res.data.code === "200"){
                handleClose()
                getTask(params.id, page+1)
                setOpenAlert(true)
            }else{
                setErrorUpload(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleChangeSearch = event => {
        setKeyword(event.target.value)
        setPage(0)
    }

    const handleOpenReassignTask = e => {
        // console.log(e)
        setOpenReassignTask({
            open: true,
            task: e
        })
    }

    const handleCloseReassignTask = (e) => {
        // console.log(e)
        setOpenReassignTask({
            open: false,
            task: e
        })
    }

    const handleOpenCancelTask = e => {
        // console.log(e)
        setOpenCancelTask({
            open: true,
            task: e
        })
    }

    const handleCloseCancelTask = (e) => {
        // console.log(e)
        setOpenCancelTask({
            open: false,
            task: e
        })
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const onCancelTask = e => {
        updateCancelTask(e, history, params.id)
        handleCloseCancelTask(e)
    }

    useEffect(() => {
        getTask(params.id, page+1, keyword, rowsPerPage)
        getTaskType(params.id, page+1, keyword, rowsPerPage)
        getCustomer(params.id, page+1, keyword, rowsPerPage)
        getMember(params.id, page+1, keyword, rowsPerPage)
    }, [params, getTask, page, keyword, rowsPerPage, getTaskType, getCustomer, getMember])

    const onSubmitReassignTask = (e, task) => {
        reassignTask(e, history)
        // getTask(params.id, page+1, keyword, rowsPerPage)
        handleCloseReassignTask(task)
    }

    return loadingCancelTask ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>Master Task</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                justify="space-between"
            >
                <Grid item>  
                    {taskType !== null && listCustomer !== null && listMember !== null ? (
                        <Button className={classes.button} onClick={e => setOpenCreateTask(true)}>
                            <div className={classes.textMenu}>
                                Add
                            </div>
                        </Button>
                    ):(
                        <Skeleton variant="rect"></Skeleton>
                    )}
                    <Button className={classes.button} onClick={handleClickOpen}>
                        <div className={classes.textMenu}>
                            Upload
                        </div>
                    </Button>
                </Grid>
                <Grid item>
                    <Paper component="form" className={classes.searchRoot}>
                        <InputBase
                            className={classes.input}
                            name="nama"
                            value={keyword || ''}
                            onChange={handleChangeSearch}
                            placeholder="Search Task"
                            inputProps={{ 'aria-label': 'Cari Customer' }}
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
                    lg={12}
                >
                    {listTask !== null ? (
                        <TableTask 
                            listTask={listTask}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            handleOpenReassignTask={handleOpenReassignTask}
                            handleOpenCancelTask={handleOpenCancelTask}
                        />
                    ):(
                        <Skeleton variant="rect"></Skeleton>
                    )}
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className={classes.title}>
                        Upload File Master Customer
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <UploadCustomer value={banner} handleChangeBanner={handleChangeBanner} />
                    {uploadPercentage > 0 && (
                        <Box display="flex" alignItems="center">
                            <Box width="100%" mr={1}>
                                <LinearProgress variant="determinate" value={uploadPercentage} />
                            </Box>
                            <Box minWidth={35}>
                                <Typography variant="body2" color="textSecondary">{uploadPercentage}</Typography>
                            </Box>
                        </Box>
                    )}
                    {!isEmpty(errorUpload) && errorUpload !== null ? (
                        <div>
                            {errorUpload.map(item => (
                                <Typography>
                                    {item}
                                </Typography>
                            ))}
                        </div>
                    ):(
                        <div>
                            {isEmpty(errorUpload) && errorUpload !== null && (
                                <Typography>
                                    Format Dokumen anda salah
                                </Typography>
                            )}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} onClick={handleClose}>
                        <div className={classes.textMenu}>
                            Tutup
                        </div>
                    </Button>
                    {uploadPercentage === 0 && (
                        <Button className={classes.button} onClick={e => uploadFile(banner)}>
                            <div className={classes.textMenu}>
                                Upload
                            </div>
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <Snackbar 
                open={openAlert} 
                autoHideDuration={2000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                key="customer"
                onClose={handleCloseAlert}
            >
                <Alerts variant="filled" severity="success" onClose={handleCloseAlert}>
                    Task Added
                </Alerts>
            </Snackbar>
            <Dialog
                open={openCreateTask}
                onClose={handleClose}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    <Typography className={classes.title}>
                        Create New Task
                    </Typography>
                </DialogTitle>
                <CreateTask
                    taskType={taskType}
                    listCustomer={listCustomer}
                    handleClose={handleClose}
                    listMember={listMember}
                    setOpenCreateTask={setOpenCreateTask}
                />
            </Dialog>
            <Dialog
                open={openReassignTask.open}
                onClose={e => handleCloseReassignTask(openReassignTask.task)}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    {openReassignTask.task !== null && (
                        <Typography className={classes.title}>
                                Re-Assign Task {openReassignTask.task.task.code}
                        </Typography>
                    )}
                </DialogTitle>
                {openReassignTask.task !== null && (
                    <ReassignTask
                        taskId={openReassignTask.task}
                        listMember={listMember}
                        onSubmitReassignTask={onSubmitReassignTask}
                        loadingReassignTask={loadingReassignTask}
                    />
                )}
            </Dialog>
            <Dialog
                open={openCancelTask.open}
                onClose={e => handleCloseCancelTask(openCancelTask.task)}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    {openCancelTask.task !== null && (
                        <Typography className={classes.title}>
                                Cancel Task {openCancelTask.task.task.code}
                        </Typography>
                    )}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure want to delete this Task?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} onClick={e => handleCloseCancelTask(openCancelTask.task)}>
                        <div className={classes.textMenu}>
                            Close
                        </div>
                    </Button>
                    <Button className={classes.button} onClick={e => onCancelTask(openCancelTask.task)}>
                        <div className={classes.textMenu}>
                            Cancel Anyway
                        </div>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    task : state.task,
    customer: state.customer,
    member: state.member
})

export default connect(mapStateToProps, { getTask, getTaskType, getCustomer, getMember, reassignTask, updateCancelTask })(Task)