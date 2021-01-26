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
} from '@material-ui/core'
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
} from '../../../../components/UI';
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
    name: yup.string().required("Warehouse Name cannot be Null"),
})

const CreateCategory = props => {
    const classes = useStyles()
    const history = useHistory()
    const params = useParams()
    const {
        onUploadImage,
        onAlert,
        onSubmitCategory,
        imageUrl,
        loadingUploadImage,
        loadingAddCategory,
        onClearImageCategory,
        onGetDetailCategory,
        loadingDetailCategory
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
        onSubmitCategory(params.id, formState.values, imageUrl.url, history)
    }

    useEffect(() => {
        onClearImageCategory()
        onGetDetailCategory(params.id, setFormState)
    }, [onClearImageCategory, onGetDetailCategory, params])

    return loadingAddCategory || loadingUploadImage || loadingDetailCategory ? 
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
                        Create New Category
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
                                    label="Category Name"
                                    value={formState.values.name || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.name && errors.name.message
                                    }
                                    error={errors.name && true}
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
        loadingAddCategory: state.category.loadingAddCategory,
        loadingUploadImage: state.categoryImage.loadingUploadImage,
        imageUrl: state.categoryImage.urlImage,
        loadingDetailCategory: state.category.loadingDetailCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onUploadImage: (storeData) => dispatch(actions.uploadCategoryImage(storeData)),
      onAlert: (message, status) => dispatch(actions.setAlert(message, status)),
      onSubmitCategory: (id, formData, imageUrl, history) => dispatch(actions.updateCategory(id, formData, imageUrl, history)),
      onClearImageCategory: () => dispatch(actions.onClearImageCategory()),
      onGetDetailCategory: (id, setFormState) => dispatch(actions.getDetailCategory(id, setFormState))
    //   onDeleteImage: (index) => dispatch(actions.deleteImageProduct(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory)