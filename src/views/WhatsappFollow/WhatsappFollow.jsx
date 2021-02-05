import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fragment } from 'react'
import { 
    Grid, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    Typography,
    TableRow,
    TableHead,
    Tooltip,
    IconButton,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions
} from '@material-ui/core'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { Skeleton } from '@material-ui/lab'

import CreateTemplate from './CreateTemplate'
import EditTemplate from './EditTemplate'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const WhatsappFollow = props => {
    const classes = useStyles()
    const {
        onFetchListTextFollowUp,
        textFollowUpList,
        loadingTextFollowUpList,
        loadingTextFollowUpData,
        onFetchListVariableFollowUp,
        variableFollowUpList,
        loadingVariableFollowUpList,
        onAddTextFollowUp,
        onDeleteTextFollowUp
    } = props

    // Create Template
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Edit Template
    const [openEdit, setOpenEdit] = useState({
        open: false,
        item: {}
    });

    const handleClickOpenEdit = (event) => {
        console.log(event)
        setOpenEdit({
            open: true,
            item: {
                id: event.id,
                title: event.title,
                text: event.title
            }
        });
    };

    const handleCloseEdit = (event) => {
        setOpenEdit({
            open: false,
            item: {
                id: event.id,
                title: event.title,
                text: event.title
            }
        });
    };

    // Delete Template
    const [openDelete, setOpenDelete] = useState({
        open: false,
        item: {}
    });

    const handleClickOpenDelete = (event) => {
        console.log(event)
        setOpenDelete({
            open: true,
            item: {
                id: event.id,
                title: event.title,
                text: event.title
            }
        });
    };

    const handleCloseDelete = (event) => {
        setOpenDelete({
            open: false,
            item: {
                id: event.id,
                title: event.title,
                text: event.title
            }
        });
    };

    const [ formState, setFormState ] = useState({
        values: {}
    })

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: 
                event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
          }
        }));
    };

    const onSubmit = () => {
        onAddTextFollowUp(formState.values)
        handleClose()
        setFormState({
            values: {}
        })
    }

    const onDelete = event => {
        onDeleteTextFollowUp(event.id)
        handleCloseDelete(event)
    }

    useEffect(() => {
        onFetchListTextFollowUp()
        onFetchListVariableFollowUp()
    }, [onFetchListTextFollowUp, onFetchListVariableFollowUp])

    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container spacing={2} justify="space-between">
                    <Grid item>
                        <Typography variant="h4">
                            Pengaturan Whatsapp Template
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleClickOpen}>
                            Tambah Template
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item lg={8} md={8} sm={6} xs={12}>
                        <TableContainer>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Judul Template</TableCell>
                                        <TableCell>Isi Template</TableCell>
                                        <TableCell>Aksi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loadingTextFollowUpList || textFollowUpList === null || loadingTextFollowUpData ? (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Skeleton></Skeleton>
                                            </TableCell>
                                        </TableRow>
                                    ):(
                                        <>
                                        {textFollowUpList.map(item => (
                                            <TableRow>
                                                <TableCell>
                                                    {item.title}
                                                </TableCell>
                                                <TableCell>
                                                    {item.text}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip arrow title="Edit Template">
                                                        <IconButton onClick={() => handleClickOpenEdit(item)}>
                                                            <img src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`} alt="Dashboard" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip arrow title="Delete Template">
                                                        <IconButton onClick={() => handleClickOpenDelete(item)}>
                                                            <img src={`${process.env.PUBLIC_URL}/images/icon/cancel.svg`} alt="Dashboard" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                        <TableContainer>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    {loadingVariableFollowUpList || variableFollowUpList === null ? (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Skeleton></Skeleton>
                                            </TableCell>
                                        </TableRow>
                                    ):(
                                        <>
                                        {variableFollowUpList.map(item => (
                                            <TableRow>
                                                <TableCell width="100%">
                                                    {item.display_attribute}
                                                </TableCell>
                                                <TableCell>
                                                    {item.attribute}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
            <CreateTemplate
                open={open}
                handleClose={handleClose}
                formState={formState}
                handleChange={handleChange}
                onAdd={onSubmit}
            />
            {loadingTextFollowUpList || textFollowUpList === null || loadingTextFollowUpData ? (
                <div></div>
            ):(
                <EditTemplate
                    open={openEdit.open}
                    item={openEdit.item}
                    handleCloseEdit={handleCloseEdit}
                    formState={formState}
                    handleChange={handleChange}
                    onAdd={onSubmit}
                />
            )}
            <Dialog
                open={openDelete.open}
                onClose={() => handleCloseDelete(openDelete.item)}
            >
                <DialogTitle>
                    Konfirmasi Penghapusan Template WhatsApp
                </DialogTitle>
                <DialogContent>
                    <Typography variant="p">
                        Apakah anda yakin ingin menghapus template WhatsApp ini?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDelete(openDelete.item)}>
                        Batal
                    </Button>
                    <Button onClick={() => onDelete(openDelete.item)}>
                        Ya
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    textFollowUpList: state.settings.textFollowUpList,
    loadingTextFollowUpList : state.settings.loadingTextFollowUpList,
    loadingTextFollowUpData : state.settings.loadingTextFollowUpData,
    variableFollowUpList: state.settings.variableFollowUpList,
    loadingVariableFollowUpList: state.settings.loadingVariableFollowUpList
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchListTextFollowUp : () => dispatch(actions.fetchListText()),
        onFetchListVariableFollowUp : () => dispatch(actions.fetchListVariable()),
        onAddTextFollowUp : (formData) => dispatch(actions.addTextFollowUp(formData)),
        onDeleteTextFollowUp : (id) => dispatch(actions.deleteTextFollowUp(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatsappFollow)