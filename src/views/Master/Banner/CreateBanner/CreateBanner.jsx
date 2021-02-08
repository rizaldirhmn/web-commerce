import React, { useState, Fragment, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Typography, 
    Button,
    Backdrop,
    CircularProgress,
    Select,
    FormControl,
    InputLabel,
    FormHelperText
} from '@material-ui/core'
// import {Delete as DeleteIcon} from '@material-ui/icons';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";
import { useHistory } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
// import { getProvince, getCities, getDistrict, getVillage } from '../../../../store/actions/province'
// import { addCategory } from '../../../../store/actions/Master/category'
import UploadBanner from './UploadBanner'
import * as actions from '../../../../store/actions'

// import UploadImage from './UploadImage'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    title: {
        fontFamily: 'Montserrat'
    },
    select: {
        minHeight: 40,
    },
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        overflow: 'visible'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
}))

const SchemaValidation = yup.object().shape({
    name: yup.string().required("Nama Banner harus diisi"),
})

const CreateBanner = props => {
    const classes = useStyles()
    const history = useHistory()
    const {
        onSubmitBanner,
        loadingBannerData,
        onFetchCollection,
        collectionList,
        loadingFetchCollection
    } = props

    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });

    const [formState, setFormState] = useState({
        values: {},
    });

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

    const [image, setImage] = useState('');
    const [ base64, setB64 ] = useState('')

    const handleChangeBanner = event => {
        setImage(event)
        let reader = new FileReader();
        reader.readAsDataURL(event[0]);
        reader.onload = function(){
            setB64(reader.result);
        }
    }

    const onSubmit = e => {
        onSubmitBanner(formState.values, base64, history)
    }

    useEffect(() => {
        onFetchCollection('', 1)
    }, [onFetchCollection])

    return loadingBannerData || loadingFetchCollection || collectionList === null ? 
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
                <Grid
                    item
                    lg={12}
                >
                    <Typography variant="h4" className={classes.title}>
                        Buat Banner Baru
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    name="name"
                                    label="Nama Banner"
                                    defaultValue={formState.values.name || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.name && errors.name.message
                                    }
                                    error={errors.name && true}
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <FormControl error={errors.type & true} fullWidth>
                                    <InputLabel>Tipe Banner</InputLabel>
                                    <Select 
                                        native
                                        name="type"
                                        label="Tipe Banner"
                                        defaultValue={formState.values.type || ''}
                                        onChange={handleChange}
                                        inputRef={register}
                                    >
                                        <option value="" />
                                        <option value="info">Info</option>
                                        <option value="collection">Collection</option>
                                        <option value="product">Product</option>
                                    </Select>
                                    <FormHelperText>{errors.type && errors.type.message}</FormHelperText>
                                </FormControl>
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
                                    fullWidth
                                    multiline
                                    name="description"
                                    label="Deskripsi Banner"
                                    rows={4}
                                    defaultValue={formState.values.description || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.description && errors.description.message
                                    }
                                    error={errors.description && true}
                                    inputRef={register}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <UploadBanner image={image} handleChangeBanner={handleChangeBanner} />
                            </Grid>
                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <FormControl error={errors.collection & true} fullWidth>
                                    <InputLabel>Pilih Koleksi</InputLabel>
                                    <Select 
                                        native
                                        name="collection"
                                        defaultValue={formState.values.collection || ''}
                                        onChange={handleChange}
                                        inputRef={register}
                                    >
                                        <option value="" />
                                        {collectionList.data.map(item => (
                                            <option value={item.id}>{item.name}</option>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.collection && errors.collection.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Grid 
                    container
                    spacing={2}
                    justify='space-between'
                >
                    <Grid
                        item
                    >
                        <Typography variant="subtitle1" className={classes.title}>
                            Make sure you have a valid data
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button fullWidth variant="contained" type="submit" color="primary">Simpan</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        loadingBannerData: state.banner.loadingBannerData,
        bannerData: state.banner.bannerData,
        collectionList: state.collection.collectionList,
        loadingFetchCollection: state.collection.loadingFetchCollection
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onSubmitBanner: (formData, image, history) => dispatch(actions.addBanner(formData, image, history)),
      onFetchCollection: (search, page) => dispatch(actions.fetchCollection(search, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBanner)