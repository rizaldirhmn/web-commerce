import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fragment } from 'react'
import { 
    CardContent, 
    Card, 
    FormControl, 
    Grid, 
    TextField, 
    Typography, 
    Dialog,
    DialogContent,
    Button,
    DialogTitle,
    DialogActions,
    Backdrop,
    CircularProgress
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import CollectionList from './CollectionList'

import { connect } from 'react-redux'
import * as actions from '../../../../store/actions'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0)
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const ProductNotif = props => {
    const classes = useStyles()
    const history = useHistory()
    const {
        onSendNotificationCollection,
        loadingNotificationCollection
    } = props

    const [ formState, setFormState ] = useState({
        values: {}
    })

    const [ idProduct, setIdProduct ] = useState({
        id_product: null,
        title: null
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

    const handleChangeProduct = event => {
        console.log(event)
        setIdProduct({
            id_product: event.id,
            title: event.name
        })
        setOpenDialogProduct(false)
    }

    const [ openDialogConfirmation, setOpenDialogConfirmation ] = useState(false)

    const onSendNotif = () => {
        onSendNotificationCollection(formState.values, idProduct.id_product, history)
        setOpenDialogConfirmation(false)
        setFormState({
            values: {}
        })
        setIdProduct({
            id_product: null,
            title: null
        })
    }

    const [ openDialogProduct, setOpenDialogProduct ] = useState(false)

    return loadingNotificationCollection ?
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <Grid container spacing={2} justify="space-between">
                <Grid item lg={12}>
                    <Typography variant="h4">
                        Notifikasi Koleksi Produk
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <form action="">
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                name="title"
                                                label="Judul Notifikasi"
                                                value={formState.values.title || ''}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                multiline
                                                rows={4}
                                                name="body"
                                                label="Deskripsi Notifikasi"
                                                value={formState.values.body || ''}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                name="id_product"
                                                label="Pilih Koleksi Produk"
                                                value={idProduct.title || ''}
                                                onClick={() => setOpenDialogProduct(true)}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Button className={classes.button} onClick={() => setOpenDialogConfirmation(true)}>
                                            Kirim
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </div>
        <Dialog
            open={openDialogConfirmation}
            onClose={() => setOpenDialogConfirmation(false)}
        >
            <DialogTitle>Konfirmasi Pengiriman Notifikasi</DialogTitle>
            <DialogContent>
                Anda akan mengirimkan informasi ini kepada semua pengguna Apps Dzualan!
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialogConfirmation(false)}>
                    Batal
                </Button>
                <Button className={classes.button} onClick={onSendNotif}>
                    Kirim
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={openDialogProduct}
            onClose={() => setOpenDialogProduct(false)}
        >
            <DialogContent>
                <CollectionList handleChangeProduct={handleChangeProduct} />
            </DialogContent>
        </Dialog>
    </Fragment>
}

const mapStateToProps = state => ({
    loadingNotificationCollection : state.notification.loadingNotificationCollection
})

const mapDispatchToProps = dispatch => {
    return {
        onSendNotificationCollection : (formData, idCollection, history) => dispatch(actions.sendNotifProductCollection(formData, idCollection, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductNotif)