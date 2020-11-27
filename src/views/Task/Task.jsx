import React, { useState, useEffect } from 'react'
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
} from '@material-ui/core'
import { Alert as Alerts } from '@material-ui/lab'
import TableTask from './TableTask'
import { connect } from 'react-redux'
import { getTask } from '../../store/actions/task'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import UploadCustomer from './UploadTask'
import { Skeleton } from '@material-ui/lab'


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
}))

const Task = props => {
    const classes = useStyles()
    const { 
        getTask,
        task: {
            listTask,
        }
    } = props

    const [open, setOpen] = React.useState(false)
    const params = useParams()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setErrorUpload(null)
    }

    const [banner, setBanner] = useState([])
    const [ uploadPercentage, setUploadPercentage ] = useState(0)
    const [ errorUpload, setErrorUpload ] = useState(null)
    const [ openAlert, setOpenAlert ] = useState(false)

    // Table
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    
    useEffect(() => {
        getTask(params.id, page+1)
    }, [params, getTask, page])

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>Task</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                justify="space-between"
            >
                <Grid item>  
                    <Button className={classes.button}>
                        <div className={classes.textMenu}>
                            Add
                        </div>
                    </Button>
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
                            // value={keyword.values.keyword || ''}
                            // onClick={handleClickOpen}
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
        </div>
    )
}

const mapStateToProps = state => ({
    task : state.task
})

export default connect(mapStateToProps, { getTask })(Task)