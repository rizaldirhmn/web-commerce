import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid,
    Typography,
    Paper,
    InputBase,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { getTaskType } from '../../../store/actions/task'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@material-ui/lab'
import TableTaskType from './TableTaskType'

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

const TaskType = props => {
    const classes = useStyles()
    const { 
        getTaskType,
        task: {
            taskType,
            loadingTaskType
        }
    } = props
    const params = useParams()

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

    const handleChangeSearch = event => {
        setKeyword(event.target.value)
        setPage(0)
    }
    
    useEffect(() => {
        getTaskType(params.id, page+1, keyword, rowsPerPage)
    }, [params, getTaskType, page, keyword, rowsPerPage])

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.title}>Task Type</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                justify="space-between"
            >
                <Grid item> 
                </Grid>
                <Grid item>
                    <Paper component="form" className={classes.searchRoot}>
                        <InputBase
                            className={classes.input}
                            name="nama"
                            value={keyword || ''}
                            onChange={handleChangeSearch}
                            placeholder="Search Task Type"
                            inputProps={{ 'aria-label': 'Search Task Type' }}
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
                    {!loadingTaskType && taskType !== null ? (
                        <TableTaskType 
                            taskType={taskType}
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
        </div>
    )
}

const mapStateToProps = state => ({
    task : state.task
})

export default connect(mapStateToProps, { getTaskType })(TaskType)