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
    CardMedia,
    CardActionArea,
    CardActions
} from '@material-ui/core'
import {Delete as DeleteIcon} from '@material-ui/icons';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";
import { useHistory, useParams } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
// import { getProvince, getCities, getDistrict, getVillage } from '../../../../store/actions/province'
// import { addCategory } from '../../../../store/actions/Master/category'
import {
    Dropzone
} from '../../../components/UI';
import * as actions from '../../../store/actions'

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
    name: yup.string().required("Warehouse Name cannot be Null"),
})

const CreateCategory = props => {
    const classes = useStyles()
    const history = useHistory()
    const params = useParams()
    const {
        onUploadImage,
        onAlert,
        onSubmitSocialMedia,
        imageUrl,
        loadingUploadImage,
        loadingAddSocialMedia,
        onClearImage,
        onDeleteImage,
        onGetDetailSocialMedia,
        loadingDetailSocialMedia
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

    const handleChangeBanner = event => {
        setImage(event)
        let reader = new FileReader();
        reader.readAsDataURL(event[0]);
        reader.onload = function(){
            // setB64(reader.result);

            if(event[0].size < 5000000){
                onUploadImage(reader.result.split(',')[1]);
            }else{
                onAlert('maksimal file 4 mb', 'error')
            }
        }
    }

    let imageUpload = '';
    if(imageUrl !== null){
        imageUpload = (
        <Fragment>
            {/* {imageUrl.map((image, index) => ( */}
            <Grid key={imageUrl.url} item lg={3} md={3} sm={12} xs={12}>
                <Card>
                <CardActionArea>
                    <CardMedia
                    style={{height: '140px'}}
                    image={imageUrl.url}
                    title="image upload"
                    />
                </CardActionArea>
                <CardActions>
                    <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonDelete}
                    startIcon={<DeleteIcon />}
                    onClick={() => onDeleteImage()}
                    fullWidth
                    >
                    Delete
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            {/* ))} */}
        </Fragment>
        );
    };

    // let loadingUploadImages = null;
    // if (loadingUploadImage) {
    //     loadingUploadImages = <Loading/>
    // }

    const onSubmit = e => {
        onSubmitSocialMedia(params.id, formState.values, imageUrl.url, history)
    }

    useEffect(() => {
        onClearImage()
        onGetDetailSocialMedia(params.id, setFormState)
    }, [onClearImage, params, onGetDetailSocialMedia, setFormState])

    return loadingAddSocialMedia || loadingUploadImage || loadingDetailSocialMedia ? 
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
                        Buat Link Sosial Media
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
                                    label="Nama Sosial Media"
                                    value={formState.values.name || ''}
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
                                <TextField 
                                    fullWidth
                                    name="ref_url"
                                    label="URL Sosial Media"
                                    value={formState.values.ref_url || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.ref_url && errors.ref_url.message
                                    }
                                    error={errors.ref_url && true}
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
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <Dropzone
                                    multiple={false}
                                    fileType={'image/*'}
                                    value={image}
                                    handleChangeBanner={handleChangeBanner}
                                />
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={2}>
                                            {imageUpload}
                                        </Grid>
                                    </Grid>
                                </Grid>
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
        loadingAddSocialMedia: state.socialMedia.loadingAddSocialMedia,
        loadingUploadImage: state.socialMedia.loadingUploadImage,
        imageUrl: state.socialMedia.urlImage,
        loadingDetailSocialMedia: state.socialMedia.loadingDetailSocialMedia
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onUploadImage: (storeData) => dispatch(actions.uploadSocialMediaImageEdit(storeData)),
      onAlert: (message, status) => dispatch(actions.setAlert(message, status)),
      onSubmitSocialMedia: (id, formData, imageUrl, history) => dispatch(actions.editSocialMedia(id, formData, imageUrl, history)),
      onClearImage: () => dispatch(actions.onClearImageSocialMedia()),
      onDeleteImage: () => dispatch(actions.deleteImageSocialMedia()),
      onGetDetailSocialMedia: (id, setFormState) => dispatch(actions.fetchSocialMediaDetail(id, setFormState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory)