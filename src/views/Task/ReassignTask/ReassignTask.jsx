import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid,
    TextField,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Backdrop,
    Dialog,
    DialogTitle,
    Typography,
    useMediaQuery
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom'

import TableMember from './TableMember'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0),
        // width: '600px'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    text: {
        color: '#000000',
        fontFamily: 'Montserrat'
    },
    card:{
        overflow: 'visible'
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
}))

const ReassignTask = props => {
    const classes = useStyles()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { 
        listMember,
        taskId,
        onSubmitReassignTask,
        loadingReassignTask,
    } = props

    const params = useParams()
    const { handleSubmit } = useForm();

    const [ openDialogMember, setOpenDialogMember ] = useState(false)

    const [formState, setFormState] = useState({
        values: {
            from_user_id: taskId.user_id.id,
            task_id: taskId.task.id,
            profile_id: parseInt(params.id),
        },
    });

    const handleCloseMember = () => {
        setOpenDialogMember(false)
    }

    const handleSelectChange = (event) => {
        setOpenDialogMember(false)
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              'to_user_id': event.id,
              'name_user_to': event.username
            }
        }));
    }

    const onSubmit = e => {
        onSubmitReassignTask(formState.values, taskId)
    }

    return loadingReassignTask ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.card}>
                    {/* <DialogContentText>
                        To create .
                    </DialogContentText> */}
                        <Grid
                            container
                            spacing={2}
                            className={classes.root}
                        >
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    name="form_user_id"
                                    label="Assigned Member"
                                    defaultValue={formState.values.from_user_id || ''}
                                    select
                                    disabled
                                >
                                    <option value={formState.values.from_user_id}>{taskId.user_id.username}</option>
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    name="to_user_id"
                                    label="Reassign To"
                                    value={formState.values.name_user_to || ''}
                                    onClick={e => setOpenDialogMember(true)}
                                />
                            </Grid>
                            
                        </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" className={classes.button}>
                        <div className={classes.textMenu}>
                            Save
                        </div>
                    </Button>
                </DialogActions>
            </form>
            <Dialog
                open={openDialogMember}
                onClose={handleCloseMember}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    <Typography className={classes.title}>
                        Member List
                    </Typography>
                </DialogTitle>
                <TableMember
                    handleCloseMember={handleCloseMember}
                    listMember={listMember}
                    setOpenDialogMember={setOpenDialogMember}
                    handleSelectChange={handleSelectChange}
                />
            </Dialog>
        </div>
    </Fragment>
}

export default ReassignTask